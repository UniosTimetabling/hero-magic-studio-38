import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ArrowDown, ArrowUp, ArrowUpRight, BookOpen, BookOpenCheck, Check, ChevronDown, ChevronRight, CircleCheck, FileText, Globe2, GraduationCap, Library, Mail, MapPin, Menu, Microscope, PenLine, Phone, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DesktopNavigation, navigationGroups } from '@/components/site/service-navigation';
import logo from '@/assets/finesse-logo.jpeg';
import reading from '@/assets/reading-banner.jpg';
import book1 from '@/assets/resource-1.jpg';
import book2 from '@/assets/resource-2.jpg';
import book3 from '@/assets/resource-3.jpg';
import book4 from '@/assets/resource-4.jpg';
import introBooksAsset from '@/assets/books-banner.jpg';
import introBlueAsset from '@/assets/publishing-hero-blue.jpg';
import introRedAsset from '@/assets/publishing-hero-red.jpg';
import introGreenAsset from '@/assets/publishing-hero-green.jpg';
import { company, services } from '@/lib/company';

const links = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About us' }, { to: '/services', label: 'Our services' }, { to: '/resources', label: 'Resources' }, { to: '/contact', label: 'Contact' }] as const;

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.058-.372-.03-.521-.086-.148-.66-1.588-.904-2.174-.238-.579-.48-.5-.66-.51-.17-.008-.37-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
}

function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const wa = `https://wa.me/${company.phoneLink.replace(/[^0-9]/g, '')}`;
  return <>
    <a className="float-whatsapp" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"><WhatsAppIcon /></a>
    {showTop && <button type="button" className="float-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>}
  </>;
}
export const serviceIcons = { books: BookOpen, journal: FileText, pen: PenLine, digital: Globe2, research: Microscope, library: Library };

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = useLocation({ select: (location) => location.pathname });
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const searchDialog = useRef<HTMLDivElement>(null);
  useEffect(() => { setMenuOpen(false); setOpenGroup(null); setSearchOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!searchOpen) return;
    searchInput.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); searchTrigger.current?.focus(); }
      if (e.key === 'Tab') {
        const nodes = searchDialog.current?.querySelectorAll<HTMLElement>('button, input, a[href]');
        if (!nodes?.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [searchOpen]);
  const results = services.filter(s => `${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className={`site-header${pathname === '/' ? ' is-home' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" aria-label="Finesse Publishing home" className="brand"><img src={logo} alt="Finesse" width="1044" height="319" /><span>PUBLISHING LIMITED</span></Link>
        <DesktopNavigation pathname={pathname} />
        <div className="header-actions"><Button ref={searchTrigger} variant="ghost" size="icon" aria-label="Search services" title="Search services" onClick={() => setSearchOpen(true)}><Search /></Button><Button asChild variant="outline" className="header-contact"><Link to="/contact">Get in touch <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><Link to="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home<ChevronRight size={16} /></Link>{navigationGroups.map(group => <div key={group.to}><Button variant="ghost" className={`mobile-services-trigger${pathname === group.to ? ' active' : ''}`} aria-expanded={openGroup === group.to} aria-controls={`mobile-options-${group.to.slice(1)}`} onClick={() => setOpenGroup(openGroup === group.to ? null : group.to)}>{group.label}<ChevronDown size={16} /></Button>{openGroup === group.to && <div id={`mobile-options-${group.to.slice(1)}`} className="mobile-service-options"><Link to={group.to} onClick={() => setMenuOpen(false)}>{group.label} overview<ArrowUpRight size={16} /></Link>{group.options.map(option => <Link key={option.hash} to={group.to} hash={option.hash} onClick={() => { setMenuOpen(false); setOpenGroup(null); }}>{option.title}<ChevronRight size={14} /></Link>)}</div>}</div>)}</nav>}
    </header>
    <main id="main-content">{children}</main>
    <ValuesStrip />
    <footer className="site-footer"><div aria-hidden="true" className="footer-stripes"><span /><span /><span /></div><div className="container footer-grid">
      <div className="footer-brand"><Link to="/" aria-label="Finesse Publishing home"><img src={logo} alt="Finesse" width="1044" height="319" loading="lazy" /></Link><span className="footer-company-name">Publishing Limited</span><p>Publishing and distributing knowledge products for research, teaching, learning and living.</p><span className="footer-brand-values">Quality. Value. Convenience.</span></div>
      <div><h3>Explore</h3>{links.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}</div>
      <div><h3>What we do</h3><Link to="/services" hash="publishing">Book publishing</Link><Link to="/services" hash="book-supply">Book distribution</Link><Link to="/services" hash="journals">Journal subscriptions</Link><Link to="/services" hash="digital">Digital publishing</Link><Link to="/services" hash="consultancy">Consultancy</Link></div>
      <div className="footer-address"><h3>Let’s connect</h3><a href={`tel:${company.phoneLink}`}><span className="footer-contact-icon"><Phone size={18} /></span><span>{company.phone}</span></a><a href={`mailto:${company.email}`}><span className="footer-contact-icon"><Mail size={18} /></span><span>{company.email}</span></a><p><span className="footer-contact-icon"><MapPin size={18} /></span><span>{company.address}<small>{company.postal}</small></span></p><Button asChild variant="hero"><Link to="/contact">Start a conversation <ArrowUpRight /></Link></Button></div>
    </div><div className="footer-bottom-band"><div className="container footer-bottom"><span>© {new Date().getFullYear()} Finesse Publishing Limited.</span><span>Knowledge for the modern society.</span></div></div></footer>
    <FloatingActions />
    {searchOpen && <div className="search-backdrop" onClick={() => { setSearchOpen(false); searchTrigger.current?.focus(); }}><div ref={searchDialog} className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title" onClick={e => e.stopPropagation()}><div className="search-title"><h2 id="search-title">Find a service</h2><Button variant="ghost" size="icon" aria-label="Close search" onClick={() => { setSearchOpen(false); searchTrigger.current?.focus(); }}><X /></Button></div><label className="search-field"><Search size={20} /><input ref={searchInput} value={query} onChange={e => setQuery(e.target.value)} placeholder="Books, journals, research…" aria-label="Search services" /></label><div className="search-results">{results.map(s => <Link to="/services" hash={s.id} key={s.id} onClick={() => setSearchOpen(false)}><span>{s.title}<small>{s.short}</small></span><ChevronRight size={18} /></Link>)}{!results.length && <p>No matching services. Try “books”, “research” or “library”.</p>}</div></div></div>}
  </>;
}

export function ValuesStrip() {
  return <section className="values-strip" aria-label="Our core values"><div className="container values-grid">{[{ title: 'Quality', text: 'Credible knowledge. High-quality publishing.', Icon: BookOpenCheck }, { title: 'Value', text: 'Information that supports your goals.', Icon: CircleCheck }, { title: 'Convenience', text: 'Flexible solutions for your institution.', Icon: Globe2 }].map(({ title, text, Icon }) => <div key={title}><Icon size={31} strokeWidth={1.4} /><span><h3>{title}</h3><p>{text}</p></span></div>)}</div></section>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="section-heading">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const pathname = useLocation({ select: location => location.pathname });
  const sectionRef = useRef<HTMLElement>(null);
  const visuals: Record<string, { image: string; alt: string; theme: string; label: string }> = {
    '/about': { image: introBooksAsset, alt: 'Books and reading glasses on a teal table', theme: 'teal', label: 'Discover our story' },
    '/services': { image: introRedAsset, alt: 'Cloth-bound books on a burgundy table', theme: 'red', label: 'Explore our services' },
    '/resources': { image: introBlueAsset, alt: 'A collection of blue cloth-bound books', theme: 'blue', label: 'Discover our resources' },
    '/contact': { image: introGreenAsset, alt: 'Hardcover books on a forest-green table', theme: 'green', label: 'Let’s connect' },
  };
  const visual = visuals[pathname] ?? visuals['/about'];
  if (!visual) return null;
  const scrollNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (!(next instanceof HTMLElement)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = next.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'instant' : 'smooth' });
    next.setAttribute('tabindex', '-1');
    next.focus({ preventScroll: true });
  };
  return <section ref={sectionRef} className={`page-intro page-intro-${visual.theme}`} aria-label={eyebrow}>
    <img className="page-intro-image" src={visual.image} alt={visual.alt} fetchPriority="high" />
    <div className="container page-intro-inner">
      <div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={13} /><span>{eyebrow}</span></div>
      <div className="page-intro-copy"><span className="eyebrow">FINESSE PUBLISHING LIMITED <span aria-hidden="true">/</span> {eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
      <div className="page-intro-bottom"><Button variant="scroll" onClick={scrollNext} aria-label="Scroll to next section" title="Scroll to next section"><span className="page-scroll-icon"><ArrowDown size={20} /></span><span>{visual.label}</span></Button><span className="page-intro-values">Quality. Value. Convenience.</span></div>
    </div>
  </section>;
}
export function ReadingBanner() {
  return <section className="container reading-banner"><img src={reading} alt="A reader enjoying a book in a library" width={1536} height={768} loading="lazy" /><div><span className="eyebrow">KNOWLEDGE FOR THE MODERN SOCIETY</span><h2>Every page opens<br />a new possibility.</h2><p>Quality information resources in support of research, teaching, learning and living.</p><Button asChild variant="hero"><Link to="/contact">Let’s talk books <ChevronRight /></Link></Button></div></section>;
}

const resources = [
  { name: 'Print books', type: 'Print', description: 'Hardcover, trade paperback and mass-market formats.', image: book1 },
  { name: 'Academic journals', type: 'Print', description: 'Journal subscriptions for learning and research.', image: book2 },
  { name: 'E-books', type: 'Digital', description: 'Digital content for organizational learning needs.', image: book3 },
  { name: 'E-journals', type: 'Digital', description: 'Research information through FinesseGlobal.', image: book4 },
];
export function ResourceGrid({ expanded = false }: { expanded?: boolean }) {
  const [filter, setFilter] = useState('All resources');
  return <><div className="resource-tabs" role="tablist" aria-label="Resource formats">{['All resources', 'Print', 'Digital'].map(item => <Button key={item} role="tab" aria-selected={filter === item} aria-controls="resource-panel" id={`tab-${item.replace(' ', '-')}`} variant={filter === item ? 'tabActive' : 'tab'} onClick={() => setFilter(item)}>{item}</Button>)}</div><div id="resource-panel" role="tabpanel" aria-labelledby={`tab-${filter.replace(' ', '-')}`} className="resource-grid">{resources.filter(r => filter === 'All resources' || r.type === filter).map(r => <article className="resource-card" key={r.name}><Link to="/contact" aria-label={`Enquire about ${r.name}`} className="resource-image"><img src={r.image} alt={`Illustrative ${r.name.toLowerCase()} cover, not a catalogue title`} width={384} height={660} loading="lazy" /><span><ArrowUpRight size={20} /></span></Link><span className="resource-type">{r.type === 'Print' ? 'PRINT & PUBLISHING' : 'FINESSEGLOBAL'}</span><h3><Link to="/contact">{r.name}</Link></h3><p>{r.description}</p>{expanded && <Link to="/contact" className="text-link">Enquire about this format <ChevronRight size={15} /></Link>}</article>)}</div></>;
}

export function ServiceList({ compact = false }: { compact?: boolean }) {
 return <div className={compact ? 'service-grid compact' : 'service-grid'}>{services.map(s => { const Icon = serviceIcons[s.icon]; return <article key={s.id} className="service-card"><div className="service-card-top"><Icon size={28} strokeWidth={1.4} /><ArrowUpRight size={20} /></div><h3>{s.title}</h3><p>{compact ? s.short : s.description}</p><Link to="/services" hash={s.id} className="text-link">Explore service <ChevronRight size={15} /></Link></article>; })}</div>;
}
export function CheckItem({ children }: { children: ReactNode }) { return <li><Check size={17} />{children}</li>; }
