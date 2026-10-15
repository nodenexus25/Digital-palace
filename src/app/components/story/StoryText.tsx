import React from 'react';

/**
 * Renders archive prose. Supports the light markup used across the content:
 * `## Heading` / `**Heading**` lines, `---` section breaks, `**bold**` and
 * `*italic*` spans, and single line breaks inside a paragraph (dialogue).
 */
export default function StoryText({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;
  const blocks = text
    .replace(/\r\n/g, '\n')
    .replace(/\[IMAGE_PLACEHOLDER:.*?\]/g, '')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, i) => {
        if (/^-{3,}$/.test(block)) {
          return <hr key={i} className="my-6 border-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />;
        }
        const heading = block.match(/^#{1,4}\s+(.+)$/) || block.match(/^\*\*\s*([^*]+?)\s*\*\*$/);
        if (heading && !block.includes('\n')) {
          return (
            <h3 key={i} className="pt-4 text-2xl font-cinzel font-bold text-maroon">
              {heading[1]}
            </h3>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed whitespace-pre-line">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}

function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] ? <strong key={m.index}>{m[1]}</strong> : <em key={m.index}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Plain text for narration (markup removed). */
export function toSpeech(...parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .join('\n\n')
    .replace(/^#{1,4}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^-{3,}$/gm, '');
}
