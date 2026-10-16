import { createFileRoute } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { BookOpen, FileText, Globe2, ChevronRight, ChevronDown, ArrowUpRight, Library, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteLayout, SectionHeading, ResourceGrid, ReadingBanner, ServiceList } from '@/components/site/site';
import { pageHead } from '@/lib/company';
import hero from '@/assets/publishing-hero-green.jpg';
import heroRed from '@/assets/publishing-hero-red.jpg';
import heroBlue from '@/assets/publishing-hero-blue.jpg';
import books from '@/assets/books-banner.jpg';
import heroPen from '@/assets/hero-pen-red.jpg';
import heroLibrary from '@/assets/hero-library-blue.jpg';
import heroIdea from '@/assets/hero-idea-green.jpg';
import heroBooks from '@/assets/hero-books-blue.jpg';
import heroReading from '@/assets/hero-reading-room-green.jpg';
import heroJournals from '@/assets/hero-journals-red.jpg';
import heroDigital from '@/assets/hero-digital-blue.jpg';

export const Route = createFileRoute("/")({
  head: () => pageHead('Publishing & knowledge resources', 'Finesse Publishing Limited provides quality book publishing, distribution, journal subscriptions, digital resources and research consultancy in Nairobi.', hero),
  component: Index,
});

const slides = [
  { image: hero, theme: 'green', alt: 'Hardcover books on a forest-green table', eyebrow: 'QUALITY. VALUE. CONVENIENCE.', title: <>Finesse<br />Publishing Limited</>, text: 'Your partner in quality publishing, book distribution and information resources for research, teaching and learning.', cta: 'Explore our resources', to: '/resources' },
  { image: heroReading, theme: 'green', key: 'reading', alt: 'Library reading room with wooden tables and full bookshelves', eyebrow: 'LIBRARIES & INFORMATION CENTRES', title: <>Spaces built<br />for learning</>, text: 'We stock, organize and equip libraries so students and researchers find what they need.', cta: 'Library services', to: '/services' },
  { image: heroRed, theme: 'red', alt: 'Burgundy cloth-bound books on a crimson table', eyebrow: 'FROM MANUSCRIPT TO PUBLISHED WORK', title: <>Book publishing<br />for the modern<br />society</>, text: 'Credible manuscripts. High-quality publishing. Hardcover, paperback and digital formats for your ideas.', cta: 'Explore publishing', to: '/services' },
  { image: heroBlue, theme: 'blue', alt: 'Blue cloth-bound books on a petrol-blue table', eyebrow: 'RESEARCH. TEACHING. LEARNING.', title: <>Quality information<br />resources</>, text: 'Books, journals and digital content that meet the emerging information needs of individuals and institutions.', cta: 'Discover our services', to: '/services' },
  { image: heroPen, theme: 'red', key: 'pen', alt: 'Fountain pen on handwritten manuscript pages beside old books', eyebrow: 'EDITING. DESIGN. PRINT.', title: <>Every great book<br />starts with<br />a manuscript</>, text: 'We guide your work from first draft to finished book, with careful editing and good style.', cta: 'Publish with us', to: '/services' },
  { image: heroLibrary, theme: 'blue', key: 'library', alt: 'Reading desk and lamp beside a full bookshelf', eyebrow: 'LIBRARY & INFORMATION CONSULTANCY', title: <>A stronger library<br />for your institution</>, text: 'Collection development, book processing, library planning and training tailored to your needs.', cta: 'Our consultancy', to: '/services' },
  { image: heroIdea, theme: 'green', key: 'idea', alt: 'Glowing light bulb in fresh grass on an open book', eyebrow: 'RESEARCH CONSULTANCY', title: <>Insight for<br />informed decisions</>, text: 'Commissioned research in health, education, policy, market surveys and technology.', cta: 'Explore research', to: '/services' },
  { image: heroJournals, theme: 'red', key: 'journals', alt: 'Wooden stand of academic journals beside a brass lamp', eyebrow: 'JOURNAL SUBSCRIPTION SERVICE', title: <>Research that<br />keeps you informed</>, text: 'Journal subscriptions for schools, universities, research organizations and corporations.', cta: 'Subscribe with us', to: '/services' },
  { image: heroDigital, theme: 'blue', key: 'digital', alt: 'Laptop and tablet beside hardcover books on a wooden desk', eyebrow: 'E-BOOKS & E-JOURNALS', title: <>Knowledge beyond<br />the printed page</>, text: 'Digital content on the FinesseGlobal platform for every learning and research need.', cta: 'Go digital', to: '/resources' },
  { image: heroBooks, theme: 'blue', key: 'books', alt: 'Colourful hardcover books standing in a zig-zag row', eyebrow: 'BOOK SUPPLY & DISTRIBUTION', title: <>Quality books.<br />Reliable delivery.</>, text: 'Efficient book supply to libraries, schools, universities and research organizations.', cta: 'Book supply', to: '/services' },
] as const;

function Index() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [carouselRef, carousel] = useEmblaCarousel({ loop: true, duration: 32 });
  const autoPlaying = !paused && !interacting && !reducedMotion && pageVisible;
  const onSelect = useCallback(() => { if (carousel) setSlide(carousel.selectedScrollSnap()); }, [carousel]);
  useEffect(() => {
    if (!carousel) return;
    onSelect();
    carousel.on('select', onSelect);
    return () => { carousel.off('select', onSelect); };
  }, [carousel, onSelect]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  useEffect(() => {
    if (!carousel || !autoPlaying) return;
    const timer = window.setTimeout(() => carousel.scrollNext(), 4000);
    return () => window.clearTimeout(timer);
  }, [carousel, autoPlaying, slide]);
  return <SiteLayout>
    <section className="hero" aria-roledescription="carousel" aria-label="Publishing highlights" data-playing={autoPlaying} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="hero-viewport" ref={carouselRef}><div className="hero-track">
        {slides.map((current, i) => <div className={`hero-slide hero-slide-${current.theme}`} key={current.key ?? current.theme} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} aria-hidden={slide !== i} inert={slide !== i}>
          <img className="hero-image" src={current.image} alt={current.alt} width={1440} height={768} fetchPriority={i === 0 ? 'high' : 'auto'} />
          <div className="container hero-content"><span className="eyebrow">{current.eyebrow}</span><h1>{current.title}</h1><p>{current.text}</p><div className="hero-actions"><Button asChild variant="hero"><Link to={current.to}>{current.cta}<ChevronRight /></Link></Button><Link to="/about" className="hero-secondary">Get to know Finesse <ArrowUpRight size={16} /></Link></div></div>
        </div>)}
      </div></div>
      <Button variant="carousel" size="icon" className="hero-arrow-left" aria-label="Previous highlight" title="Previous highlight" onClick={() => carousel?.scrollPrev()}><ArrowLeft /></Button>
      <Button variant="carousel" size="icon" className="hero-arrow-right" aria-label="Next highlight" title="Next highlight" onClick={() => carousel?.scrollNext()}><ArrowRight /></Button>
      <button type="button" className="hero-scroll" aria-label="Scroll to see more" title="Scroll to see more" onClick={() => document.querySelector('.category-section')?.scrollIntoView({ behavior: 'smooth' })}>Scroll to see more<ChevronDown size={16} /></button>
      <div className="container hero-controls"><div className="hero-dots">{slides.map((s, i) => <Button key={s.eyebrow} variant="ghost" aria-label={`Show highlight ${i + 1}`} title={`Show highlight ${i + 1}`} aria-pressed={slide === i} onClick={() => carousel?.scrollTo(i)} />)}</div><span className="hero-counter" aria-live={autoPlaying ? 'off' : 'polite'}>0{slide + 1} / 0{slides.length}</span><Button variant="carousel" size="icon" aria-label={paused || reducedMotion ? 'Play highlights' : 'Pause highlights'} title={paused || reducedMotion ? 'Play highlights' : 'Pause highlights'} onClick={() => { setPaused(!paused); if (reducedMotion) { setReducedMotion(false); setPaused(false); } }}>{paused || reducedMotion ? <Play /> : <Pause />}</Button></div>
    </section>
    <section className="category-section"><div className="container category-strip">{[{ title: 'Books & publishing', text: 'Ideas brought to life', Icon: BookOpen, hash: 'publishing' }, { title: 'Journals & research', text: 'Knowledge that moves you forward', Icon: FileText, hash: 'journals' }, { title: 'Digital resources', text: 'Learning beyond the page', Icon: Globe2, hash: 'digital' }].map(({ title, text, Icon, hash }) => <Link key={title} to="/services" hash={hash}><span className="category-icon"><Icon size={22} strokeWidth={1.4} /></span><span><h3>{title}</h3><p>{text}</p></span><span className="category-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></Link>)}</div></section>
    <section className="section container"><SectionHeading eyebrow="A WORLD OF KNOWLEDGE" title="Explore our resources" description="Quality print and digital information resources for libraries, educational institutions and research organizations." /><ResourceGrid /><div className="center-action"><Button asChild variant="brand"><Link to="/resources">Explore all resources <ChevronRight /></Link></Button></div></section>
    <section className="container promo-grid"><div className="promo"><img src={books} alt="Books and reading glasses on a teal table" loading="lazy" width={1280} height={768} /><div className="promo-copy"><span className="eyebrow">YOUR IDEAS. OUR EXPERTISE.</span><h2>Bring your<br />next book<br />to life.</h2><p>Quality publishing solutions, from editing and graphic design to print and digital formats.</p><Button asChild variant="hero"><Link to="/services" hash="publishing">Publishing services <ChevronRight /></Link></Button></div></div><div className="promo promo-dark"><Library className="promo-deco" strokeWidth={1} /><div className="promo-copy"><span className="eyebrow">BUILT AROUND YOUR NEEDS</span><h2>A stronger<br />library starts here.</h2><p>Collection development, book supply and information solutions tailored to your institution.</p><Button asChild variant="hero"><Link to="/services" hash="consultancy">Find out more <ChevronRight /></Link></Button></div></div></section>
    <section className="container section"><SectionHeading eyebrow="WHAT WE DO" title="More than publishing" description="Publishing, distribution and consultancy solutions that connect people and institutions with knowledge." /><ServiceList compact /></section>
    <ReadingBanner />
    <section className="mission-section"><div className="container"><span className="eyebrow">OUR VISION OF EXCELLENCE</span><h2>Knowledge for a modern society</h2><blockquote>“World-class publisher, distributor and supplier of quality information resources in support of research, teaching, learning and living in a knowledge society.”</blockquote><Button asChild variant="hero"><Link to="/about">Our story & purpose <ChevronRight /></Link></Button></div></section>
    <section className="container section"><SectionHeading eyebrow="OUR COMMITMENT" title="Purpose in every page" description="Identifying and fulfilling the emerging research information needs of individuals and communities around the globe." /><div className="objectives">{['Access to quality information resources', 'Quality publishing solutions', 'Positive relationships with staff and customers', 'Service to our communities'].map((t, i) => <div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div></section>
  </SiteLayout>;
}
