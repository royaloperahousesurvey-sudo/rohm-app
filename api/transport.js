export default async function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || '';
  if (country !== 'OM') {
    return res.status(403).json({ error: 'Access restricted to Oman' });
  }
  const { date } = req.query;
  const filename = date + ' TS.pdf';
  const KEY    = 'AIzaSyCLCy5G9R8zd3RRbpZQjp-SNQrClfVMrd4';
  const FOLDER = '1Rg-4oCVFAmTqZVAEG8qBy8Tfiwtivc1y';
  const q      = encodeURIComponent("'" + FOLDER + "' in parents and name='" + filename + "' and trashed=false");
  const r      = await fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,modifiedTime)&supportsAllDrives=true&includeItemsFromAllDrives=true&key=' + KEY);
  const data   = await r.json();
  const file   = data.files && data.files[0];
  res.json(file
    ? { found: true, url: 'https://drive.google.com/file/d/' + file.id + '/view', modifiedTime: file.modifiedTime }
    : { found: false });
}