import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Copy,
  Check,
  Table as TableIcon,
  ChevronRight,
  Info,
} from "lucide-react";

interface ChatFormattedReplyProps {
  content: string;
}

type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "divider" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "numbered-list";
      items: { num: string; title?: string; text: string }[];
    }
  | { type: "bullet-list"; items: string[] }
  | { type: "callout"; text: string; label?: string }
  | { type: "code"; language?: string; code: string }
  | { type: "paragraph"; text: string };

// Helper to render inline text with bold, links, code, and metrics
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Split by links [label](url), bold **text**, and inline code `code`
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    // Markdown link: [Title](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={idx}
          href={url}
          target={url.startsWith("http") ? "_blank" : undefined}
          rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-0.5 font-bold text-[#2554E8] hover:underline underline-offset-2 decoration-[#2554E8]/40"
        >
          <span>{label}</span>
          <ArrowUpRight size={11} className="inline shrink-0" />
        </a>
      );
    }

    // Bold text: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={idx} className="font-bold text-[#111827]">
          {inner}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 bg-neutral-100 text-[#2554E8] font-mono text-[10px] border border-black/10 rounded-none"
        >
          {inner}
        </code>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

// Parse markdown lines into structured blocks
function parseMarkdownBlocks(rawText: string): ContentBlock[] {
  const lines = rawText.split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Skip completely blank lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Fenced code block (```lang ... ```)
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({
        type: "code",
        language: lang,
        code: codeLines.join("\n"),
      });
      continue;
    }

    // 3. Horizontal Rule / Divider (--- or ***)
    if (/^(\-{3,}|\*{3,}|\_{3,})$/.test(trimmed)) {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    // 4. Headings (#, ##, ###)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      blocks.push({ type: "heading", level, text });
      i++;
      continue;
    }

    // 5. Blockquote / Callout (> text)
    if (trimmed.startsWith(">")) {
      const calloutLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        calloutLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      blocks.push({
        type: "callout",
        text: calloutLines.join(" "),
      });
      continue;
    }

    // 6. Markdown Table (| Col 1 | Col 2 | ...)
    if (
      trimmed.startsWith("|") &&
      i + 1 < lines.length &&
      lines[i + 1].trim().includes("|") &&
      lines[i + 1].trim().includes("-")
    ) {
      const parseCells = (rowStr: string) => {
        const clean = rowStr.trim().replace(/^\|/, "").replace(/\|$/, "");
        return clean.split("|").map((c) => c.trim());
      };

      const headers = parseCells(trimmed);
      i += 2; // skip header and delimiter line (| --- | --- |)
      const rows: string[][] = [];

      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowCells = parseCells(lines[i]);
        if (rowCells.length > 0 && rowCells.some((c) => c.length > 0)) {
          rows.push(rowCells);
        }
        i++;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // 7. Numbered List (1. , 2. )
    const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numMatch) {
      const items: { num: string; title?: string; text: string }[] = [];

      while (i < lines.length) {
        const curTrim = lines[i].trim();
        const curMatch = curTrim.match(/^(\d+)[\.\)]\s+(.*)$/);
        if (!curMatch) break;

        const num = curMatch[1].padStart(2, "0");
        const fullContent = curMatch[2];

        // Check if item has title like **Title:** or Title:
        const colonSplit = fullContent.match(/^(\*\*.*?\*\*|[^:]+):\s*(.*)$/);
        if (colonSplit && colonSplit[1].length < 60) {
          const rawTitle = colonSplit[1].replace(/^\*\*/, "").replace(/\*\*$/, "").trim();
          items.push({
            num,
            title: rawTitle,
            text: colonSplit[2].trim(),
          });
        } else {
          items.push({
            num,
            text: fullContent,
          });
        }
        i++;
      }

      blocks.push({ type: "numbered-list", items });
      continue;
    }

    // 8. Bullet List (- , * , • )
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (i < lines.length) {
        const curTrim = lines[i].trim();
        const bMatch = curTrim.match(/^[-*•]\s+(.*)$/);
        if (!bMatch) break;
        items.push(bMatch[1]);
        i++;
      }

      blocks.push({ type: "bullet-list", items });
      continue;
    }

    // 9. Special Key Callout if line starts with Note:, Important:, Guarantee:, etc.
    const keyCalloutMatch = trimmed.match(
      /^(Note|Important|Tip|Key Standard|Guarantee|Pledge|Ethos|Result):\s*(.*)$/i
    );
    if (keyCalloutMatch) {
      blocks.push({
        type: "callout",
        label: keyCalloutMatch[1].toUpperCase(),
        text: keyCalloutMatch[2],
      });
      i++;
      continue;
    }

    // 10. Default Paragraph
    blocks.push({ type: "paragraph", text: trimmed });
    i++;
  }

  return blocks;
}

export default function ChatFormattedReply({ content }: ChatFormattedReplyProps) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-3.5 text-xs font-sans leading-relaxed text-neutral-800">
      {blocks.map((block, idx) => {
        switch (block.type) {
          // --- HEADINGS ---
          case "heading": {
            return (
              <div
                key={idx}
                className="pt-2 pb-1 border-b border-black/10 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#2554E8] rounded-none shrink-0" />
                  <h4
                    className={`font-mono font-black uppercase tracking-wider text-[#111827] ${
                      block.level === 1
                        ? "text-sm text-[#2554E8]"
                        : block.level === 2
                        ? "text-xs text-neutral-900"
                        : "text-[11px] text-neutral-800"
                    }`}
                  >
                    {block.text}
                  </h4>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                  STANDARD
                </span>
              </div>
            );
          }

          // --- DIVIDER ---
          case "divider": {
            return (
              <div key={idx} className="my-2.5 flex items-center gap-2">
                <div className="h-px bg-black/15 flex-1" />
                <span className="w-1.5 h-1.5 bg-[#2554E8] rounded-none rotate-45" />
                <div className="h-px bg-black/15 flex-1" />
              </div>
            );
          }

          // --- STRUCTURED TABLE ---
          case "table": {
            return (
              <div
                key={idx}
                className="my-3 overflow-x-auto border border-black/20 bg-white shadow-xs rounded-none"
              >
                <div className="px-3 py-1.5 bg-neutral-100 border-b border-black/15 flex items-center justify-between text-[10px] font-mono font-bold text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <TableIcon size={12} className="text-[#2554E8]" />
                    <span>COMPARATIVE MATRIX</span>
                  </div>
                  <span className="text-[9px] text-[#2554E8] uppercase tracking-wider">
                    OneNexus Verified
                  </span>
                </div>

                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-[#111827] text-white font-mono uppercase text-[9px] tracking-wider font-bold">
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-3 py-2 border-r border-white/10 last:border-r-0 font-mono"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white" : "bg-neutral-50/70"}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-3 py-2 text-neutral-800 border-r border-black/10 last:border-r-0 leading-snug"
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          // --- NUMBERED POINT CARDS ---
          case "numbered-list": {
            return (
              <div key={idx} className="my-2 space-y-2">
                {block.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3 bg-neutral-50/90 border border-black/15 hover:border-[#2554E8] transition-all rounded-none flex items-start gap-3 shadow-2xs group"
                  >
                    {/* Number Badge */}
                    <span className="font-mono text-[10px] font-black text-white bg-[#111827] group-hover:bg-[#2554E8] transition-colors px-2 py-0.5 rounded-none shrink-0 shadow-xs">
                      {item.num}
                    </span>

                    {/* Content */}
                    <div className="flex-1 space-y-0.5">
                      {item.title && (
                        <h5 className="font-sans font-bold text-xs text-[#111827] group-hover:text-[#2554E8] transition-colors">
                          {item.title}
                        </h5>
                      )}
                      <p className="text-[11.5px] leading-relaxed text-neutral-700">
                        {renderInline(item.text)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          // --- BULLET LIST ITEMS ---
          case "bullet-list": {
            return (
              <ul key={idx} className="my-2 space-y-1.5 pl-1">
                {block.items.map((bItem, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-[11.5px]">
                    <span className="w-1.5 h-1.5 bg-[#2554E8] rounded-none mt-1.5 shrink-0" />
                    <span className="flex-1 leading-relaxed text-neutral-800">
                      {renderInline(bItem)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }

          // --- HIGHLIGHT / CALLOUT CARD ---
          case "callout": {
            return (
              <div
                key={idx}
                className="my-2.5 p-3.5 bg-blue-50/70 border-l-4 border-[#2554E8] border-t border-r border-b border-black/10 shadow-2xs rounded-none"
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-[#2554E8] mb-1.5">
                  <Sparkles size={12} className="shrink-0" />
                  <span>{block.label || "KEY OPERATIONAL HIGHLIGHT"}</span>
                </div>
                <div className="text-[11.5px] text-neutral-800 font-sans leading-relaxed">
                  {renderInline(block.text)}
                </div>
              </div>
            );
          }

          // --- CODE BLOCK ---
          case "code": {
            return (
              <div
                key={idx}
                className="my-2.5 bg-[#111827] text-neutral-200 border border-black/20 font-mono text-[11px] p-3 overflow-x-auto rounded-none shadow-xs"
              >
                {block.language && (
                  <div className="text-[9px] text-[#2554E8] uppercase tracking-wider mb-1 font-bold border-b border-white/10 pb-1">
                    {block.language}
                  </div>
                )}
                <pre className="leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          }

          // --- STANDARD PARAGRAPH ---
          case "paragraph":
          default: {
            return (
              <p key={idx} className="text-[12px] leading-relaxed text-neutral-800 font-sans">
                {renderInline(block.text)}
              </p>
            );
          }
        }
      })}
    </div>
  );
}
