import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const srcDir = path.resolve('decks');
const outDir = path.resolve('public/decks');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.csv'));

for (const file of files) {
  const csv = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
  if (parsed.errors.length) {
    console.error('CSV parse errors in', file, parsed.errors);
    process.exit(1);
  }
  // Minimal validation
  const rows = parsed.data.map((r, idx) => {
    if (!r.image || !r.answer) {
      console.warn(`Row ${idx+1} missing image or answer in ${file}`);
    }
    return {
      image: r.image.trim(),
      answer: r.answer.trim(),
      alt: (r.alt || '').trim(),
      deck: (r.deck || 'Default').trim()
    };
  });
  const outName = file.replace(/\.csv$/i, '.json');
  fs.writeFileSync(path.join(outDir, outName), JSON.stringify(rows, null, 2), 'utf-8');
  console.log('Wrote', path.join(outDir, outName));
}
