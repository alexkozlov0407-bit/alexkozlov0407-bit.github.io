import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleArrowOutUpRight,
  Code2,
  Command,
  Copy,
  Download,
  ExternalLink,
  Heart,
  Layers3,
  Menu,
  MessageCircle,
  MoveUpRight,
  Palette,
  Play,
  Quote,
  Sparkles,
  SquareArrowOutUpRight,
  X,
  Zap,
} from 'lucide-react'
import WatermarkOverlay from './components/WatermarkOverlay'
import './styles.css'

const projects = [
  {
    id: 'bannerpreview',
    type: 'Micro-Tool',
    title: 'bannerpreview.tech',
    eyebrow: '01 / Visual utility',
    description: 'A focused preview suite for Discord server banners, profiles, and every pixel in between.',
    tags: ['React', 'Canvas API', 'GIF parser'],
    metric: '2.4k',
    metricLabel: 'previews this month',
    featured: true,
    accent: 'blurple',
  },
  {
    id: 'student',
    type: 'Micro-Tool',
    title: 'Aesthetic Student Link Builder',
    eyebrow: '02 / Personal brand',
    description: 'A cozy, opinionated link-in-bio builder with Tailwind preset export for students.',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    metric: '184',
    metricLabel: 'presets shipped',
    accent: 'mint',
  },
  {
    id: 'canvas',
    type: 'Micro-Tool',
    title: 'Canvas LMS Grade Calculator',
    eyebrow: '03 / Student utility',
    description: 'An auto-sync visualizer that turns target grades into a plan you can actually follow.',
    tags: ['TypeScript', 'Canvas API', 'Recharts'],
    metric: '91%',
    metricLabel: 'weekly return rate',
    accent: 'amber',
  },
  {
    id: 'discord-dashboard',
    type: 'Client Work',
    title: 'Discord operations dashboard',
    eyebrow: '04 / Client build',
    description: 'A calm command center for a 40k-member community team managing events and moderation.',
    tags: ['React', 'Node.js', 'Discord.js'],
    metric: '−38%',
    metricLabel: 'mod response time',
    accent: 'rose',
  },
  {
    id: 'landing-page',
    type: 'Client Work',
    title: 'Launch page for Loops',
    eyebrow: '05 / Client build',
    description: 'A conversion-minded landing page for a tiny product with a big point of view.',
    tags: ['Vite', 'Motion', 'Analytics'],
    metric: '+62%',
    metricLabel: 'demo conversion',
    accent: 'violet',
  },
]

const testimonials = [
  {
    quote: 'They took a messy idea and turned it into the one tool our community actually uses every day.',
    name: 'Maya Chen',
    role: 'Founder, Loops',
    initials: 'MC',
    color: 'mint',
  },
  {
    quote: 'The new dashboard gave our mods room to think. The work feels invisible in the best possible way.',
    name: 'Jordan Alvarez',
    role: 'Community lead, Northstar',
    initials: 'JA',
    color: 'blurple',
  },
]

const defaultPalette = ['#5865F2', '#AEB3FF', '#1E1F22', '#C9F6DD']

function colorToHex(red, green, blue) {
  return `#${[red, green, blue].map(channel => channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

function extractDominantColors(image) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const scale = Math.min(1, 320 / image.naturalWidth)
  canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale))
  canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale))
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
  const buckets = new Map()
  for (let index = 0; index < pixels.length; index += 16) {
    if (pixels[index + 3] < 180) continue
    const red = Math.min(255, Math.round(pixels[index] / 32) * 32)
    const green = Math.min(255, Math.round(pixels[index + 1] / 32) * 32)
    const blue = Math.min(255, Math.round(pixels[index + 2] / 32) * 32)
    const key = colorToHex(red, green, blue)
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }

  const colors = [...buckets.entries()]
    .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
    .map(([color]) => color)
  return [...new Set([...colors, ...defaultPalette])].slice(0, 4)
}

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character]))
}

function BrandMark() {
  return <span className="brand-mark"><span /><span /><span /></span>
}

function StatusBadge() {
  return <span className="status-badge"><span className="status-dot" /> Available for freelance projects</span>
}

function SectionLabel({ children, number }) {
  return <div className="section-label"><span className="section-index">{number}</span><span>{children}</span><span className="label-line" /></div>
}

function BannerPreviewTool() {
  const fileInputRef = useRef(null)
  const [bannerImage, setBannerImage] = useState('')
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 })
  const [palette, setPalette] = useState(defaultPalette)
  const [copiedColor, setCopiedColor] = useState('')

  function handleBannerUpload(event) {
    const [file] = event.target.files
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      const image = new Image()
      image.onload = () => {
        setBannerImage(dataUrl)
        setDimensions({ width: image.naturalWidth, height: image.naturalHeight })
        setPalette(extractDominantColors(image))
      }
      image.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  async function copyColor(color) {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      window.setTimeout(() => setCopiedColor(''), 1500)
    } catch {
      setCopiedColor('')
    }
  }

  function downloadSpecSheet() {
    const safeWidth = 1280
    const safeHeight = Math.round(safeWidth * (dimensions.height / dimensions.width))
    const preview = bannerImage
      ? `<image href="${bannerImage}" x="56" y="126" width="688" height="${Math.min(387, safeHeight)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#previewClip)"/>`
      : '<rect x="56" y="126" width="688" height="387" fill="url(#fallback)" clip-path="url(#previewClip)"/><text x="88" y="224" fill="#FFFFFF" font-size="30" font-family="Arial, sans-serif" font-weight="700">bannerpreview.tech</text><text x="88" y="257" fill="#C9F6DD" font-size="18" font-family="monospace">UPLOAD A BANNER TO PREVIEW</text>'
    const swatches = palette.map((color, index) => `<rect x="56" y="${554 + index * 64}" width="40" height="40" rx="8" fill="${color}"/><text x="116" y="${580 + index * 64}" fill="#949BA4" font-size="16" font-family="monospace">${color}</text>`).join('')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="900" viewBox="0 0 800 900"><defs><linearGradient id="fallback" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3733A5"/><stop offset="1" stop-color="#D17AFF"/></linearGradient><clipPath id="previewClip"><rect x="56" y="126" width="688" height="387" rx="12"/></clipPath></defs><rect width="800" height="900" fill="#1E1F22"/><text x="56" y="62" fill="#F2F3F5" font-size="30" font-family="Arial, sans-serif" font-weight="700">bannerpreview.tech</text><text x="56" y="91" fill="#949BA4" font-size="13" font-family="monospace">ASSET SPEC SHEET / 2026</text>${preview}<text x="56" y="537" fill="#949BA4" font-size="11" font-family="monospace">DOMINANT PALETTE</text>${swatches}<text x="520" y="579" fill="#949BA4" font-size="11" font-family="monospace">DIMENSIONS</text><text x="520" y="613" fill="#F2F3F5" font-size="24" font-family="monospace">${escapeXml(`${dimensions.width} × ${dimensions.height}`)}</text><text x="520" y="646" fill="#949BA4" font-size="11" font-family="monospace">SAFE ZONE</text><text x="520" y="680" fill="#F2F3F5" font-size="17" font-family="monospace">960 × 540 px</text><text x="56" y="854" fill="#5865F2" font-size="12" font-family="monospace">GENERATED WITH BANNERPREVIEW.TECH</text></svg>`
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    link.download = 'bannerpreview-tech-spec-sheet.svg'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return <div className="banner-tool"><div className="preview-window banner-preview">
    <div className="window-top"><span className="traffic"><i /><i /><i /></span><span className="window-url">bannerpreview.tech / preview</span><span className="window-action"><SquareArrowOutUpRight size={13} /></span></div>
    <div className="banner-scene" style={bannerImage ? { backgroundImage: `url(${bannerImage})` } : undefined}>
      <div className="scene-grid" /><div className="safe-zone"><span>safe zone</span></div>
      {!bannerImage && <div className="scene-copy"><span className="tiny-mono">SERVER BANNER / 01</span><strong>make your<br /><em>first glance</em><br />count.</strong></div>}
      <div className="scene-orb orb-one" /><div className="scene-orb orb-two" />
      <div className="scene-toolbar"><span>{dimensions.width} × {dimensions.height}</span><span className="toolbar-pill">{bannerImage ? 'IMAGE' : 'GIF'}</span><span><Palette size={12} /> Palette</span></div>
    </div>
  </div><div className="banner-tool-controls"><div className="palette-row"><div><span className="control-kicker">Dominant colors</span><div className="swatches">{palette.map(color => <button className="color-swatch" key={color} style={{ '--swatch': color }} onClick={() => copyColor(color)} title={`Copy ${color}`}><span /> <b>{copiedColor === color ? 'copied' : color}</b>{copiedColor === color ? <Check size={12} /> : <Copy size={11} />}</button>)}</div></div><div className="tool-control-actions"><input ref={fileInputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={handleBannerUpload} /><button className="text-button" onClick={() => fileInputRef.current?.click()}>Upload banner <ArrowUpRight size={14} /></button><button className="spec-button" onClick={downloadSpecSheet}><Download size={14} /> Download Spec Sheet</button></div></div></div></div>
}

function ProjectVisual({ project }) {
  if (project.id === 'student') {
    return <div className="abstract-visual student-visual"><div className="student-phone"><div className="phone-notch" /><div className="student-avatar">✦</div><strong>mia / online</strong><small>small links, big energy</small><span /><span /><span /></div><div className="floating-card card-a">preset <b>04</b></div><div className="floating-card card-b"><Palette size={14} /> #c9f6dd</div></div>
  }
  if (project.id === 'canvas') {
    return <div className="abstract-visual canvas-visual"><div className="grade-ring"><strong>86<span>%</span></strong><small>current grade</small></div><div className="grade-line line-one"><span>target</span><b>90%</b></div><div className="grade-line line-two"><span>next assignment</span><b>A−</b></div><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /></div></div>
  }
  return <div className={`abstract-visual client-visual ${project.accent}`}><div className="client-bars"><span /><span /><span /><span /></div><div className="client-panel"><small>LIVE SYSTEM</small><strong>{project.id === 'discord-dashboard' ? 'northstar / ops' : 'loops / launch'}</strong><div><i /><i /><i /><i /></div></div><ArrowUpRight size={19} /></div>
}

function ProjectCard({ project }) {
  return <article className={`project-card ${project.featured ? 'featured-card' : ''}`}>
    {project.featured ? <BannerPreviewTool /> : <ProjectVisual project={project} />}
    <div className="project-body">
      <div className="project-meta"><span>{project.eyebrow}</span><ArrowUpRight size={16} /></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-bottom"><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-metric"><strong>{project.metric}</strong><small>{project.metricLabel}</small></div></div>
      {project.featured && <div className="project-actions"><button className="button button-primary">Launch tool <ArrowUpRight size={16} /></button><button className="text-button">View case study <ArrowUpRight size={14} /></button></div>}
    </div>
  </article>
}

function App() {
  const [filter, setFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleProjects = filter === 'All' ? projects : projects.filter(project => project.type === filter)

  return <div className="app-shell">
    <div className="noise" />
    <WatermarkOverlay handle="alexcodes" portfolioHref="https://alexcodes.me" discordUsername="alexcodes1" githubHref="https://github.com/alexkozlov0407-bit" contactEmail="alexkozlov0407@gmail.com" />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="alexcodes.me home"><BrandMark /><span>alexcodes<span className="brand-dot">.</span>me</span></a>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#proof" onClick={() => setMenuOpen(false)}>Client work</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
      </nav>
      <a className="header-cta" href="#services">Let’s work <ArrowUpRight size={15} /></a>
      <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy reveal-up"><StatusBadge /><h1>Building <span>micro-SaaS</span> &amp; developer tools.</h1><p>I’m an independent product engineer crafting useful, slightly obsessive tools for people who care about how the internet feels.</p><div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#services">Work with me <MoveUpRight size={16} /></a></div><div className="social-links"><span>Find me in the wild</span><a href="https://github.com/alexkozlov0407-bit" aria-label="GitHub"><Code2 size={17} /></a><span className="social-discord" title="Discord: @alexcodes1"><MessageCircle size={17} /><small>@alexcodes1</small></span><a href="https://x.com" aria-label="X"><CircleArrowOutUpRight size={16} /></a><a href="https://linkedin.com" aria-label="LinkedIn"><SquareArrowOutUpRight size={16} /></a></div></div>
        <div className="hero-art reveal-up delay-one"><div className="art-ring ring-large" /><div className="art-ring ring-small" /><div className="art-grid" /><div className="avatar-plate"><div className="avatar-face"><span className="avatar-eye left" /><span className="avatar-eye right" /><span className="avatar-smile" /><span className="avatar-star">✦</span></div><span className="avatar-label">BP / 2026</span></div><div className="orbit-chip chip-top"><Sparkles size={14} /> <span>Product<br /><b>curious</b></span></div><div className="orbit-chip chip-bottom"><span className="pulse-bar" /> <span>Shipping<br /><b>consistently</b></span></div><div className="coordinate">51° 03' 12" N<br />01° 20' 44" W</div></div>
      </section>

      <section className="stats-strip section-wrap reveal-up delay-two"><div><strong>05</strong><span>tiny products<br />in orbit</span></div><div><strong>03</strong><span>years building<br />on the web</span></div><div><strong>100%</strong><span>independent<br />&amp; hands-on</span></div><div className="stats-note"><Zap size={17} /><span>Good software should<br /><b>feel like a shortcut.</b></span></div></section>

      <section className="projects-section section-wrap" id="projects"><SectionLabel number="01">Selected projects</SectionLabel><div className="section-heading"><h2>Small tools.<br /><em>Real utility.</em></h2><p>A rotating collection of experiments, products, and client work. Built with care, shipped into the wild.</p></div><div className="filter-tabs" role="tablist">{['All', 'Micro-Tool', 'Client Work'].map(tab => <button key={tab} className={filter === tab ? 'active' : ''} onClick={() => setFilter(tab)} role="tab" aria-selected={filter === tab}>{tab}<span>{tab === 'All' ? '05' : tab === 'Micro-Tool' ? '03' : '02'}</span></button>)}</div><div className="project-grid">{visibleProjects.map(project => <ProjectCard key={project.id} project={project} />)}</div></section>

      <section className="proof-section section-wrap" id="proof"><SectionLabel number="02">A little proof</SectionLabel><div className="proof-layout"><div className="proof-heading"><h2>Good work leaves<br /><em>a signal.</em></h2><p>Behind every polished interface is a quieter outcome: less friction, more momentum, and a team that can get back to the work.</p><a className="text-button" href="#services">See what we can make <ArrowUpRight size={14} /></a></div><div className="testimonial-stack">{testimonials.map(testimonial => <figure className="testimonial" key={testimonial.name}><Quote className="quote-icon" size={20} /><blockquote>“{testimonial.quote}”</blockquote><figcaption><span className={`testimonial-avatar ${testimonial.color}`}>{testimonial.initials}</span><span><b>{testimonial.name}</b><small>{testimonial.role}</small></span><Heart size={15} /></figcaption></figure>)}</div></div></section>

      <section className="services-section section-wrap" id="services"><div className="services-intro"><SectionLabel number="03">Let’s build a thing</SectionLabel><h2>Make the internet<br /><em>a little better.</em></h2><p>Have a sharp idea, a tangled workflow, or just a hunch? Bring it over. I’ll bring the pixels, code, and unreasonable attention to detail.</p><a className="button button-primary" href="mailto:alexkozlov0407@gmail.com">Contact me <ArrowUpRight size={17} /></a></div><div className="service-list"><div className="service-row"><span className="service-number">01</span><div><h3>Landing pages</h3><p>High-signal marketing pages that make your product easy to choose.</p></div><strong>from <b>$50</b></strong><ArrowUpRight className="service-arrow" size={19} /></div><div className="service-row featured-service"><span className="service-number">02</span><div><h3>Micro-tools &amp; MVPs</h3><p>Focused, useful software with a clear path from idea to first users.</p></div><strong>from <b>$150</b></strong><ArrowUpRight className="service-arrow" size={19} /></div><div className="service-row"><span className="service-number">03</span><div><h3>Discord systems</h3><p>Custom tools, dashboards, and bots that give communities superpowers.</p></div><strong>let’s talk</strong><ArrowUpRight className="service-arrow" size={19} /></div></div></section>
    </main>

    <footer className="site-footer section-wrap"><div className="footer-top"><a className="brand" href="#top"><BrandMark /><span>alexcodes<span className="brand-dot">.</span>me</span></a><span className="footer-status"><span className="status-dot" /> Available for custom web applications, landing pages, and developer tool builds.</span><div className="footer-links"><a href="https://github.com/alexkozlov0407-bit">GitHub</a><a href="https://alexcodes.me">Portfolio</a><span>Discord: @alexcodes1</span><a href="mailto:alexkozlov0407@gmail.com">Email</a></div></div><div className="footer-bottom"><span>© 2026 alexcodes.me</span><span>Made with curiosity, caffeine &amp; <Code2 size={14} /> <span className="mono">good code</span></span><a href="#top">Back to top <ChevronDown size={14} className="rotate-up" /></a></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
