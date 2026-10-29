const LAMPUNG_BBOX = '103.5,-6.2,106.1,-3.7';
const SOURCES = ['VIIRS_SNPP_NRT', 'VIIRS_NOAA20_NRT', 'VIIRS_NOAA21_NRT'];
const DEFAULT_DAYS = 7;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (ch === '"') {
      if (quoted && next === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      row.push(cell); cell = '';
    } else if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && next === '\n') i++;
      row.push(cell); cell = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    if (row.some(v => v !== '')) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows.shift().map(h => h.trim());
  return rows.map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));
}

function dateMinusDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function validTime(value) {
  const x = String(value ?? '').trim();
  if (!/^\d{1,4}$/.test(x)) return false;
  const n = Number(x);
  return Number.isInteger(n) && n >= 0 && n <= 2359 && Math.floor(n / 100) <= 23 && n % 100 <= 59;
}

function normalizeRows(raw, source) {
  const requiredHeaders = ['latitude','longitude','acq_date','acq_time','confidence','satellite','instrument','frp','daynight'];
  if (!raw.length) return { data: [], missingHeaders: [] };
  const missingHeaders = requiredHeaders.filter(h => !Object.prototype.hasOwnProperty.call(raw[0], h));
  if (missingHeaders.length) return { data: [], missingHeaders };

  const data = raw.filter(row => {
    const lat = Number(row.latitude), lng = Number(row.longitude);
    const confidence = String(row.confidence || '').trim().toLowerCase();
    const validConfidence = ['l','n','h','low','nominal','high'].includes(confidence);
    return Number.isFinite(lat) && Number.isFinite(lng) &&
      lat >= -6.2 && lat <= -3.7 && lng >= 103.5 && lng <= 106.1 &&
      /^\d{4}-\d{2}-\d{2}$/.test(row.acq_date || '') &&
      validTime(row.acq_time) && validConfidence;
  }).map(row => ({
    ...row,
    source,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    frp: Number.isFinite(Number(row.frp)) ? Number(row.frp) : null,
    confidence: String(row.confidence || '').trim().toLowerCase()
  }));

  return { data, missingHeaders: [] };
}

async function fetchSource(key, source, today) {
  const requests = [
    { days: 5, date: null },
    { days: 2, date: dateMinusDays(today, 6) }
  ];

  const results = await Promise.all(requests.map(async ({ days, date }) => {
    const datePart = date ? `/${date}` : '';
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${source}/${LAMPUNG_BBOX}/${days}${datePart}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'text/csv' } });
      const text = await response.text();
      if (!response.ok) {
        const nasaMessage = text.trim().replace(/\s+/g, ' ').slice(0, 500);
        const error = new Error(`NASA FIRMS returned HTTP ${response.status}.`);
        error.status = response.status;
        error.nasaMessage = nasaMessage || 'NASA FIRMS did not provide an error message.';
        throw error;
      }
      return parseCsv(text);
    } finally {
      clearTimeout(timer);
    }
  }));

  const raw = results.flat();
  const normalized = normalizeRows(raw, source);
  if (normalized.missingHeaders?.length) {
    const error = new Error('NASA FIRMS response is missing required fields.');
    error.status = 502;
    error.missingFields = normalized.missingHeaders;
    throw error;
  }
  return { rawRecords: raw.length, data: normalized.data };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = String(process.env.FIRMS_MAP_KEY || '').trim().replace(/^['"]|['"]$/g, '');
  if (!key) return res.status(500).json({ error: 'FIRMS_MAP_KEY is not configured on the server.' });

  const days = DEFAULT_DAYS;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const results = await Promise.all(SOURCES.map(source => fetchSource(key, source, today)));
    const data = results.flatMap(result => result.data);
    const rawRecords = results.reduce((sum, result) => sum + result.rawRecords, 0);
    const retrievedAt = new Date().toISOString();
    const latestDetection = data.reduce((latest, row) => {
      const value = `${row.acq_date} ${String(row.acq_time || '').padStart(4, '0')}`;
      return !latest || value > latest ? value : latest;
    }, null);

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    return res.status(200).json({
      region: 'Lampung',
      source: 'VIIRS S-NPP + NOAA-20 + NOAA-21 NRT',
      sources: SOURCES,
      days,
      data,
      meta: {
        retrievedAt,
        latestDetectionUtc: latestDetection,
        rawRecords,
        validRecords: data.length,
        bbox: LAMPUNG_BBOX,
        confidenceScheme: 'VIIRS categorical: l=low, n=nominal, h=high',
        note: 'NASA FIRMS hotspot detections are thermal anomaly indicators, not confirmed fires.'
      }
    });
  } catch (error) {
    if (error?.name === 'AbortError') return res.status(502).json({ error: 'NASA FIRMS request timed out.' });
    const payload = { error: error?.message || 'Unable to reach NASA FIRMS.' };
    if (error?.nasaMessage) payload.nasaMessage = error.nasaMessage;
    if (error?.missingFields) payload.missingFields = error.missingFields;
    return res.status(error?.status || 502).json(payload);
  }
}
