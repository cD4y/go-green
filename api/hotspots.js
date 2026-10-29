const LAMPUNG_BBOX = '103.5,-6.2,106.1,-3.7';
const NRT_SOURCES = ['VIIRS_SNPP_NRT', 'VIIRS_NOAA20_NRT', 'VIIRS_NOAA21_NRT'];
const SENSOR_PAIRS = [
  ['VIIRS_SNPP_NRT', 'VIIRS_SNPP_SP'],
  ['VIIRS_NOAA20_NRT', 'VIIRS_NOAA20_SP'],
  ['VIIRS_NOAA21_NRT', 'VIIRS_NOAA21_SP']
];
const CACHE_SECONDS = 600;
let availabilityCache = { at: 0, data: null };

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

function validDate(value) {
  const s = String(value || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
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
      validDate(row.acq_date) && validTime(row.acq_time) && validConfidence;
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

async function requestCsv(key, source, days, date = null) {
  const datePart = date ? `/${date}` : '';
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${source}/${LAMPUNG_BBOX}/${days}${datePart}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
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
}

async function getAvailability(key) {
  const now = Date.now();
  if (availabilityCache.data && now - availabilityCache.at < CACHE_SECONDS * 1000) return availabilityCache.data;
  const url = `https://firms.modaps.eosdis.nasa.gov/api/data_availability/csv/${encodeURIComponent(key)}/all`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'text/csv' } });
    const text = await response.text();
    if (!response.ok) {
      const error = new Error(`NASA FIRMS availability returned HTTP ${response.status}.`);
      error.status = response.status;
      error.nasaMessage = text.trim().replace(/\s+/g, ' ').slice(0, 500);
      throw error;
    }
    const rows = parseCsv(text).map(row => ({
      data_id: String(row.data_id || '').trim(),
      min_date: String(row.min_date || '').slice(0, 10),
      max_date: String(row.max_date || '').slice(0, 10)
    })).filter(row => row.data_id && validDate(row.min_date) && validDate(row.max_date));
    availabilityCache = { at: now, data: rows };
    return rows;
  } finally {
    clearTimeout(timer);
  }
}

function sourceForDate(availability, date, nrtSource, spSource) {
  const nrt = availability.find(x => x.data_id === nrtSource);
  if (nrt && date >= nrt.min_date && date <= nrt.max_date) return nrtSource;
  const sp = availability.find(x => x.data_id === spSource);
  if (sp && date >= sp.min_date && date <= sp.max_date) return spSource;
  return null;
}

async function fetchLatest(key, mode) {
  const today = new Date().toISOString().slice(0, 10);
  let requests;
  if (mode === 'today') {
    requests = NRT_SOURCES.map(source => ({ source, days: 1, date: null }));
  } else if (mode === '24h') {
    // NASA's Area API is day based. Fetch yesterday + today, then the frontend
    // applies the exact 24-hour UTC window to the returned acquisition times.
    requests = NRT_SOURCES.map(source => ({ source, days: 2, date: dateMinusDays(today, 1) }));
  } else {
    // Same seven-calendar-day concept as FIRMS' 7days layer. The Area API
    // allows max 5 days per request, so this is split into 5 + 2 days.
    requests = NRT_SOURCES.flatMap(source => [
      { source, days: 5, date: null },
      { source, days: 2, date: dateMinusDays(today, 6) }
    ]);
  }
  const results = await Promise.all(requests.map(async q => {
    const raw = await requestCsv(key, q.source, q.days, q.date);
    const normalized = normalizeRows(raw, q.source);
    if (normalized.missingHeaders.length) {
      const error = new Error('NASA FIRMS response is missing required fields.');
      error.status = 502;
      error.missingFields = normalized.missingHeaders;
      throw error;
    }
    return { source: q.source, rawRecords: raw.length, data: normalized.data };
  }));
  return {
    data: results.flatMap(x => x.data),
    rawRecords: results.reduce((sum, x) => sum + x.rawRecords, 0),
    sources: [...new Set(results.map(x => x.source))]
  };
}

async function fetchHistorical(key, date) {
  const availability = await getAvailability(key);
  const selections = SENSOR_PAIRS.map(([nrt, sp]) => ({ nrt, sp, source: sourceForDate(availability, date, nrt, sp) }));
  const unavailable = selections.filter(x => !x.source).map(x => x.nrt.replace('_NRT', ''));
  const requests = selections.filter(x => x.source).map(x => ({ source: x.source, days: 1, date }));
  const results = await Promise.all(requests.map(async q => {
    const raw = await requestCsv(key, q.source, q.days, q.date);
    const normalized = normalizeRows(raw, q.source);
    if (normalized.missingHeaders.length) {
      const error = new Error('NASA FIRMS response is missing required fields.');
      error.status = 502;
      error.missingFields = normalized.missingHeaders;
      throw error;
    }
    return { source: q.source, rawRecords: raw.length, data: normalized.data };
  }));
  return {
    data: results.flatMap(x => x.data),
    rawRecords: results.reduce((sum, x) => sum + x.rawRecords, 0),
    sources: [...new Set(results.map(x => x.source))],
    unavailable,
    availabilityChecked: true
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = String(process.env.FIRMS_MAP_KEY || '').trim().replace(/^['"]|['"]$/g, '');
  if (!key) return res.status(500).json({ error: 'FIRMS_MAP_KEY is not configured on the server.' });

  const mode = String(req.query?.mode || '7d').toLowerCase();
  const date = String(req.query?.date || '');
  if (!['today', '24h', '7d', 'date'].includes(mode)) return res.status(400).json({ error: 'Invalid mode. Use today, 24h, 7d, or date.' });
  if (mode === 'date' && !validDate(date)) return res.status(400).json({ error: 'Invalid date. Use YYYY-MM-DD.' });

  try {
    const result = mode === 'date' ? await fetchHistorical(key, date) : await fetchLatest(key, mode);
    const retrievedAt = new Date().toISOString();
    const latestDetection = result.data.reduce((latest, row) => {
      const value = `${row.acq_date} ${String(row.acq_time || '').padStart(4, '0')}`;
      return !latest || value > latest ? value : latest;
    }, null);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    return res.status(200).json({
      region: 'Lampung',
      mode,
      date: mode === 'date' ? date : null,
      source: mode === 'date' ? 'NASA FIRMS historical data (NRT/SP by availability)' : 'VIIRS S-NPP + NOAA-20 + NOAA-21 NRT',
      sources: result.sources,
      data: result.data,
      meta: {
        retrievedAt,
        latestDetectionUtc: latestDetection,
        rawRecords: result.rawRecords,
        validRecords: result.data.length,
        bbox: LAMPUNG_BBOX,
        confidenceScheme: 'VIIRS categorical: l=low, n=nominal, h=high',
        unavailableSensors: result.unavailable || [],
        availabilityChecked: Boolean(result.availabilityChecked),
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
