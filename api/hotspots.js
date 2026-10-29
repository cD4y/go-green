const LAMPUNG_BBOX = '103.5,-6.2,106.1,-3.7';
const DEFAULT_SOURCE = 'VIIRS_NOAA21_NRT';

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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.FIRMS_MAP_KEY;
  if (!key) return res.status(500).json({ error: 'FIRMS_MAP_KEY is not configured on the server.' });

  const days = 3;
  const source = DEFAULT_SOURCE;

  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${source}/${LAMPUNG_BBOX}/${days}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'text/csv' } });
    const text = await response.text();
    if (!response.ok) return res.status(response.status).json({ error: `NASA FIRMS returned HTTP ${response.status}.` });

    const raw = parseCsv(text);
    const requiredHeaders = ['latitude', 'longitude', 'acq_date', 'acq_time', 'confidence', 'satellite', 'instrument', 'frp', 'daynight'];
    const missingHeaders = requiredHeaders.filter(h => !Object.prototype.hasOwnProperty.call(raw[0] || {}, h));
    if (missingHeaders.length) {
      return res.status(502).json({
        error: 'NASA FIRMS response is missing required fields.',
        missingFields: missingHeaders
      });
    }

    const data = raw.filter(row => {
      const lat = Number(row.latitude), lng = Number(row.longitude);
      const confidence = String(row.confidence || '').trim().toLowerCase();
      const validConfidence = ['l', 'n', 'h', 'low', 'nominal', 'high'].includes(confidence);
      return Number.isFinite(lat) && Number.isFinite(lng) &&
        lat >= -6.2 && lat <= -3.7 && lng >= 103.5 && lng <= 106.1 &&
        /^\d{4}-\d{2}-\d{2}$/.test(row.acq_date || '') &&
        /^\d{3,4}$/.test(String(row.acq_time || '').trim()) &&
        validConfidence;
    }).map(row => ({
      ...row,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      frp: Number.isFinite(Number(row.frp)) ? Number(row.frp) : null,
      confidence: String(row.confidence || '').trim().toLowerCase()
    }));

    const retrievedAt = new Date().toISOString();
    const latestDetection = data.reduce((latest, row) => {
      const value = `${row.acq_date} ${String(row.acq_time || '').padStart(4, '0')}`;
      return !latest || value > latest ? value : latest;
    }, null);

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    return res.status(200).json({
      region: 'Lampung',
      source,
      days,
      data,
      meta: {
        retrievedAt,
        latestDetectionUtc: latestDetection,
        rawRecords: raw.length,
        validRecords: data.length,
        bbox: LAMPUNG_BBOX,
        confidenceScheme: 'VIIRS categorical: l=low, n=nominal, h=high',
        note: 'NASA FIRMS hotspot detections are thermal anomaly indicators, not confirmed fires.'
      }
    });
  } catch (error) {
    const message = error?.name === 'AbortError' ? 'NASA FIRMS request timed out.' : (error?.message || 'Unable to reach NASA FIRMS.');
    return res.status(502).json({ error: message });
  } finally {
    clearTimeout(timer);
  }
}
