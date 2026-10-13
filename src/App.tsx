import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { addEnquiry, openLightbox, selectPackage, setFilter, setPkgGroup, toggleMenu, toggleTheme } from './store'
import { CATEGORIES, HANDLE, INSTAGRAM, PACKAGES, PAYMENT, PHOTOS, STATS, TIMELINE, inr, src, type PkgGroup } from './data'

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector = <T,>(fn: (s: RootState) => T) => useSelector(fn)

function useReveal(dep?: unknown) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

const LINKS = [['work', 'Work'], ['packages', 'Packages'], ['process', 'Process'], ['book', 'Book']]

function Nav() {
  const open = useAppSelector((s) => s.ui.menu)
  const theme = useAppSelector((s) => s.ui.theme)
  const d = useAppDispatch()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('swappy-theme', theme) } catch { /* ignore */ }
  }, [theme])
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60)
    f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <a href="#top" className="logo">Swappy<span> Pawar</span></a>
      <nav className={open ? 'open' : ''}>
        {LINKS.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => d(toggleMenu(false))}>{label}</a>)}
        <a className="btn sm" href="#book" onClick={() => d(toggleMenu(false))}>Check dates</a>
        <button className="theme" aria-label="Toggle day or night mode" onClick={() => d(toggleTheme())}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
      <button className="burger" aria-label="Menu" onClick={() => d(toggleMenu())}><i /><i /></button>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" />
      <div className="hero-in">
        <p className="eyebrow rv">Photographer & Filmmaker · Pune</p>
        <h1 className="rv d1">Swappy <em>Pawar</em></h1>
        <p className="lead rv d2">Weddings, pre-weddings and engagements, told as honest, cinematic stories. Across India.</p>
        <div className="row rv d3">
          <a className="btn" href="#packages">View packages</a>
          <a className="btn ghost" href={INSTAGRAM} target="_blank" rel="noreferrer">{HANDLE}</a>
        </div>
      </div>
      <div className="scroll">Scroll</div>
    </section>
  )
}

function Marquee() {
  const words = ['Weddings', 'Pre-Weddings', 'Engagements', 'Cinematic Films', 'Drone', 'Albums', 'Reels']
  return (
    <div className="marquee"><div>{[...words, ...words, ...words].map((w, i) => <span key={i}>{w}<b>✦</b></span>)}</div></div>
  )
}

function About() {
  useReveal()
  return (
    <section className="sec about">
      <div className="about-img rv"><img src={`${import.meta.env.BASE_URL}photos/about.jpg`} alt="Swappy Pawar with camera" loading="lazy" /></div>
      <div>
        <p className="eyebrow rv">Hello, I am Swappy & Crew</p>
        <h2 className="rv d1">Ten years of moments, <em>framed with care</em></h2>
        <p className="muted rv d2">Every shoot is shaped around the people in front of the lens. A beachside wedding, a mountain celebration or a quiet engagement: we bring artistry and technical skill to all of it.</p>
        <div className="stats rv d3">{STATS.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
      </div>
    </section>
  )
}

function Gallery() {
  const filter = useAppSelector((s) => s.ui.filter)
  const lb = useAppSelector((s) => s.ui.lightbox)
  const d = useAppDispatch()
  const list = filter === 'All' ? PHOTOS : PHOTOS.filter((p) => p.cat === filter)
  useReveal(filter)
  useEffect(() => {
    if (lb === null) return
    const k = (e: KeyboardEvent) => {
      const i = list.findIndex((p) => p.id === lb)
      if (e.key === 'Escape') d(openLightbox(null))
      if (e.key === 'ArrowRight') d(openLightbox(list[(i + 1) % list.length].id))
      if (e.key === 'ArrowLeft') d(openLightbox(list[(i - 1 + list.length) % list.length].id))
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [lb, list, d])
  const cur = PHOTOS.find((p) => p.id === lb)
  return (
    <section id="work" className="sec">
      <p className="eyebrow rv">Selected work</p>
      <h2 className="rv d1">The <em>portfolio</em></h2>
      <div className="chips rv d2">
        {(['All', ...CATEGORIES] as const).map((c) => (
          <button key={c} className={filter === c ? 'on' : ''} onClick={() => d(setFilter(c))}>{c}</button>
        ))}
      </div>
      <div className="masonry">
        {list.map((p) => (
          <figure key={p.id} className="rv" onClick={() => d(openLightbox(p.id))}>
            <img src={src(p)} alt={p.alt} loading="lazy" />
            <figcaption>{p.cat}</figcaption>
          </figure>
        ))}
      </div>
      <a className="more" href={INSTAGRAM} target="_blank" rel="noreferrer">See more on Instagram →</a>
      {cur && (
        <div className="lightbox" onClick={() => d(openLightbox(null))}>
          <img src={src(cur)} alt={cur.alt} onClick={(e) => e.stopPropagation()} />
          <button aria-label="Close">✕</button>
        </div>
      )}
    </section>
  )
}

function Packages() {
  const group = useAppSelector((s) => s.ui.pkgGroup)
  const d = useAppDispatch()
  const list = PACKAGES.filter((p) => p.group === group)
  useReveal(group)
  return (
    <section id="packages" className="sec dark">
      <p className="eyebrow rv">Packages 2025-26</p>
      <h2 className="rv d1">Simple, <em>clear pricing</em></h2>
      <div className="chips rv d2">
        {(['Pre-Wedding', 'Engagement', 'Wedding'] as PkgGroup[]).map((g) => (
          <button key={g} className={group === g ? 'on' : ''} onClick={() => d(setPkgGroup(g))}>{g}</button>
        ))}
      </div>
      <div className="cards">
        {list.map((p) => (
          <article key={p.id} className={`card rv ${p.featured ? 'feat' : ''}`}>
            {p.featured && <span className="tag">Most booked</span>}
            <small>{p.days} · {p.crew.length} crew</small>
            <h3>{p.name}</h3>
            <div className="price">{inr(p.price)}</div>
            <h4>Crew</h4>
            <ul>{p.crew.map((c) => <li key={c}>{c}</li>)}</ul>
            <h4>Deliverables</h4>
            <ul>{p.items.map((c) => <li key={c}>{c}</li>)}</ul>
            <a className="btn" href="#book" onClick={() => d(selectPackage(p.id))}>Choose this</a>
          </article>
        ))}
      </div>
      <p className="note rv">Client covers crew travel, stay and meals for outstation events.</p>
    </section>
  )
}

function Process() {
  useReveal()
  return (
    <section id="process" className="sec">
      <p className="eyebrow rv">How it works</p>
      <h2 className="rv d1">Payments & <em>delivery timeline</em></h2>
      <div className="pay">{PAYMENT.map((p) => (
        <div key={p.pct} className="rv"><strong>{p.pct}</strong><h4>{p.title}</h4><span>{p.text}</span></div>
      ))}</div>
      <ol className="tl">{TIMELINE.map((t) => (
        <li key={t.title} className="rv"><b>{t.when}</b><h4>{t.title}</h4><p>{t.text}</p></li>
      ))}</ol>
      <p className="note rv">One correction round for album and film. Data is backed up for 3 months. Album printing takes about 7-10 days. Deliverables are released after full payment.</p>
    </section>
  )
}

function Booking() {
  const d = useAppDispatch()
  const selected = useAppSelector((s) => s.enquiries.selected)
  const count = useAppSelector((s) => s.enquiries.items.length)
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' })
  const [done, setDone] = useState(false)
  useReveal()
  const set = (k: string) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })
  const submit = (e: FormEvent) => {
    e.preventDefault()
    d(addEnquiry({ ...form, packageId: selected }))
    setForm({ name: '', phone: '', date: '', message: '' }); setDone(true)
  }
  return (
    <section id="book" className="sec book">
      <p className="eyebrow rv">Confirm your booking</p>
      <h2 className="rv d1">Let's lock <em>your dates</em></h2>
      <form className="form rv d2" onSubmit={submit}>
        <input required placeholder="Your name" value={form.name} onChange={set('name')} />
        <input required type="tel" placeholder="Phone number" value={form.phone} onChange={set('phone')} />
        <input required type="date" value={form.date} onChange={set('date')} />
        <select value={selected} onChange={(e) => d(selectPackage(e.target.value))}>
          {PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.days} · {inr(p.price)}</option>)}
        </select>
        <textarea rows={4} placeholder="Venue, city, anything we should know" value={form.message} onChange={set('message')} />
        <button className="btn" type="submit">Send enquiry</button>
        {done && <p className="ok">Thank you! Enquiry saved. ({count} stored on this device)</p>}
      </form>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Gallery />
      <Packages />
      <Process />
      <Booking />
      <footer>
        <div className="logo">Swappy<span> Pawar</span></div>
        <p>Photography & Films · Pune, Maharashtra, India</p>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">{HANDLE}</a>
        <small>© 2025-26</small>
      </footer>
    </>
  )
}
