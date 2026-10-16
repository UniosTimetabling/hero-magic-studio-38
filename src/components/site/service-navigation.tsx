import { Link } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, FileText, Globe2, Library, Microscope, PenLine, Building2, Target, Mail, MapPin, Send } from 'lucide-react';
import type { ComponentType } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { services } from '@/lib/company';
import imgBooks from '@/assets/books-banner.jpg';


const icons = { books: BookOpen, journal: FileText, pen: PenLine, digital: Globe2, research: Microscope, library: Library };
export const navigationGroups = [
  { to: '/about', label: 'About us', panelImg: imgBooks, options: [
    { hash: 'our-story', title: 'Our story', desc: 'How we grew into a trusted knowledge partner.', Icon: Building2 },
    { hash: 'vision-mission', title: 'Vision & mission', desc: 'The purpose that guides every book we deliver.', Icon: Globe2 },
    { hash: 'objectives', title: 'Our objectives', desc: 'Clear goals for quality, access and service.', Icon: Target },
  ] },
  { to: '/services', label: 'Our services', panelImg: imgBooks, options: services.map(service => ({ hash: service.id, title: service.title, desc: service.short, Icon: icons[service.icon] })) },
  { to: '/resources', label: 'Resources', panelImg: imgBooks, options: [
    { hash: 'resource-formats', title: 'Print & digital resources', desc: 'Books, journals and e-content in every format.', Icon: BookOpen },
    { hash: 'finesseglobal', title: 'FinesseGlobal', desc: 'Our online platform for e-books and e-journals.', Icon: Globe2 },
    { hash: 'library-collections', title: 'Library collections', desc: 'Curated titles built for your institution.', Icon: Library },
  ] },
  { to: '/contact', label: 'Contact', panelImg: imgBooks, options: [
    { hash: 'enquiry', title: 'Send an enquiry', desc: 'Tell us what you need and we will respond quickly.', Icon: Send },
    { hash: 'contact-details', title: 'Call & email us', desc: 'Reach our team directly by phone or email.', Icon: Mail },
    { hash: 'office-location', title: 'Visit our office', desc: 'Find us and drop by during working hours.', Icon: MapPin },
  ] },
] as const;

type Tile = { title: string; hash?: string; desc?: string; Icon: ComponentType<{ size?: number | string; strokeWidth?: number | string }> };

export function DesktopNavigation({ pathname }: { pathname: string }) {
  return <NavigationMenu className="desktop-nav" aria-label="Main navigation" delayDuration={120}>
    <NavigationMenuList className="site-nav-list">
      <NavigationMenuItem><NavigationMenuLink asChild active={pathname === '/'}><Link to="/" aria-current={pathname === '/' ? 'page' : undefined} className={`nav-link${pathname === '/' ? ' active' : ''}`}>Home</Link></NavigationMenuLink></NavigationMenuItem>
      {navigationGroups.map(group => {
        const pairs = group.options.length <= 3;
        const tiles: Tile[] = pairs ? [...group.options, { title: `${group.label} overview`, desc: 'See everything in one place.', Icon: ArrowUpRight }] : [...group.options];
        return <NavigationMenuItem key={group.to}>
          <NavigationMenuTrigger className={`nav-link services-trigger${pathname === group.to ? ' active' : ''}`}>{group.label}</NavigationMenuTrigger>
          <NavigationMenuContent className="services-dropdown">
            <img className="services-dropdown-bg" src={group.panelImg} alt="" loading="lazy" decoding="async" aria-hidden="true" onError={e => { e.currentTarget.remove(); }} onLoad={e => { e.currentTarget.parentElement?.classList.add('has-bg'); }} />
            <div className="menu-feature"><span className="eyebrow">FINESSE PUBLISHING</span><h2>{group.label}</h2><p>{group.to === '/about' ? 'Our purpose, our people and our commitment to knowledge.' : group.to === '/services' ? 'Publishing, distribution and expertise for your institution.' : group.to === '/resources' ? 'Discover knowledge in print and digital formats.' : 'Connect with our team. We’re ready to listen.'}</p><NavigationMenuLink asChild><Link to={group.to} className="services-overview">View overview <ArrowUpRight size={18} /></Link></NavigationMenuLink><BookOpen className="menu-feature-mark" size={64} strokeWidth={1} aria-hidden="true" /></div>
            <ul className={`services-dropdown-grid${pairs ? ' menu-grid-2' : ''}`}>{tiles.map(({ hash, title, desc, Icon }) => <li key={title}><NavigationMenuLink asChild><Link to={group.to} {...(hash ? { hash } : {})} className="service-nav-option"><span className="service-nav-icon"><Icon size={20} strokeWidth={1.6} /></span><span className="service-nav-foot"><span className="service-nav-text"><span className="service-nav-title">{title}</span>{desc && <span className="service-nav-desc">{desc}</span>}</span><ArrowUpRight className="service-nav-arrow" size={15} /></span></Link></NavigationMenuLink></li>)}</ul>
          </NavigationMenuContent>
        </NavigationMenuItem>;
      })}
    </NavigationMenuList>
  </NavigationMenu>;
}
