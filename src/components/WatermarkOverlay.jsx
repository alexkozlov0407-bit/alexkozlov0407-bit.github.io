import { useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Code2, MessageCircle, X } from 'lucide-react'

/**
 * A small, reusable attribution widget for product and portfolio surfaces.
 * The outer wrapper ignores empty-screen clicks; only the widget itself is interactive.
 */
export default function WatermarkOverlay({
  handle = 'alexcodes',
  portfolioHref = 'https://alexcodes.me',
  discordUsername = 'alexcodes1',
  githubHref = 'https://github.com/alexkozlov0407-bit',
  contactEmail = 'alexkozlov0407@gmail.com',
}) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return (
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100]">
        <button
          type="button"
          aria-label="Show alexcodes watermark"
          title="Show watermark"
          onClick={() => setIsDismissed(false)}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#3f4147] bg-[#2b2d31]/80 text-[#949ba4] shadow-[0_8px_30px_rgba(0,0,0,.24)] backdrop-blur-md transition hover:border-[#5865F2]/50 hover:text-[#f2f3f5]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#23a55a] shadow-[0_0_10px_#23a55a]" />
        </button>
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] max-w-[calc(100vw-2.5rem)]">
      <div className="watermark-group pointer-events-auto group flex max-w-full items-center overflow-hidden rounded-full border border-[#3f4147] bg-[#2b2d31]/80 p-1.5 text-[#f2f3f5] shadow-[0_8px_30px_rgba(0,0,0,.24)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[#5865F2]/50 hover:shadow-[0_10px_34px_rgba(88,101,242,.16)]">
        <span className="flex shrink-0 items-center gap-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[.04em] text-[#949ba4]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#23a55a] shadow-[0_0_9px_#23a55a]" />
          <span className="hidden sm:inline">Built by {handle}</span>
        </span>

        <span className="flex shrink-0 items-center gap-2 border-l border-[#3f4147] px-3 py-1.5 font-mono text-[10px] tracking-[-.02em] text-[#f2f3f5]">
          <Code2 size={12} className="text-[#aeb3ff]" aria-hidden="true" />
          alexcodes.me ecosystem
        </span>

        <div className="flex max-w-0 items-center overflow-hidden opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover:max-w-[13rem] group-hover:opacity-100">
          <div className="flex items-center border-l border-[#3f4147] px-1">
            <a href={githubHref} target="_blank" rel="noreferrer" aria-label="Open GitHub" title="GitHub" className="flex h-7 w-7 items-center justify-center rounded-full text-[#949ba4] transition hover:bg-[#5865F2]/15 hover:text-[#f2f3f5]"><Code2 size={14} /></a>
            <span aria-label={`Discord username ${discordUsername}`} title={`Discord: ${discordUsername}`} className="flex h-7 items-center gap-1 px-1 font-mono text-[8px] text-[#949ba4]"><MessageCircle size={14} /><span>{discordUsername}</span></span>
            <a href={portfolioHref} aria-label="Open portfolio" title="Portfolio" className="flex h-7 w-7 items-center justify-center rounded-full text-[#949ba4] transition hover:bg-[#5865F2]/15 hover:text-[#f2f3f5]"><BriefcaseBusiness size={14} /></a>
          </div>
          <a href={`mailto:${contactEmail}`} className="hidden items-center gap-1 whitespace-nowrap border-l border-[#3f4147] px-3 py-1.5 font-mono text-[9px] text-[#aeb3ff] transition hover:text-[#f2f3f5] lg:flex">
            Contact me <ArrowUpRight size={12} />
          </a>
        </div>

        <button
          type="button"
          aria-label="Minimize watermark"
          title="Minimize watermark"
          onClick={() => setIsDismissed(true)}
          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#6f747e] transition hover:bg-white/5 hover:text-[#f2f3f5]"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
