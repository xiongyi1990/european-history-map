"""Index the supplied course PDF without copying its full text into the website."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader

parser = argparse.ArgumentParser()
parser.add_argument('pdf', type=Path)
args = parser.parse_args()
reader = PdfReader(args.pdf)
toc = '\n'.join(page.extract_text() or '' for page in reader.pages[:7])
chapters = {}
for number, title, page in re.findall(r'(\d{2,3})[｜|]\s*(.+?)\s*\.{3,}\s*(\d+)', toc):
    chapters.setdefault(int(number), {'number': int(number), 'title': title.strip(), 'page': int(page)})
assert sorted(chapters) == list(range(1, 261)), 'The expected 260 chapter headings were not found.'
entries = [chapters[n] for n in sorted(chapters)]
for i, entry in enumerate(entries):
    # Chapters can begin halfway down the final page of the preceding chapter.
    entry['endPageInclusive'] = entries[i + 1]['page'] if i + 1 < len(entries) else len(reader.pages)
    assert str(entry['number']) in (reader.pages[entry['page'] - 1].extract_text() or ''), entry
result = {'filename': args.pdf.name, 'sha256': hashlib.sha256(args.pdf.read_bytes()).hexdigest(),
          'pages': len(reader.pages), 'pageNumbering': 'PDF physical pages, 1-based; chapter ranges can share a page',
          'indexedChapters': len(entries), 'chapters': entries}
output = Path(__file__).resolve().parents[1] / 'artifacts/europe-atlas/course-material'
output.mkdir(parents=True, exist_ok=True)
(output / 'course-index.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Indexed {len(entries)} chapters in {len(reader.pages)} pages; SHA-256 {result["sha256"]}')
