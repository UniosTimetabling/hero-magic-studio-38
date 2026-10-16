import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { SiteLayout, PageIntro } from '@/components/site/site';
import { Button } from '@/components/ui/button';
import { company, pageHead, services } from '@/lib/company';

export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact us', 'Contact Finesse Publishing Limited on +254 727 381 147 or info@finesseglobal.co.ke. Find us on Magadi Road, Ongata-Rongai Shopping Centre, Nairobi.'), component: Contact });
type Fields = { name: string; email: string; organization: string; service: string; message: string };
export function validateEnquiry(fields: Fields) {
 const errors: Partial<Record<keyof Fields,string>> = {};
 if (fields.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = 'Please enter a valid email address.';
 if (fields.message.trim().length < 10) errors.message = 'Please include at least 10 characters in your message.';
 return errors;
}
function Contact() {
 const [fields, setFields] = useState<Fields>({ name:'', email:'', organization:'', service:'General enquiry', message:'' });
 const [errors, setErrors] = useState<Partial<Record<keyof Fields,string>>>({});
 const [draft, setDraft] = useState('');
 function update(key: keyof Fields, value: string) { setFields(old => ({ ...old, [key]:value })); setErrors(old => ({ ...old, [key]: undefined })); setDraft(''); }
 function submit(e: FormEvent) {
  e.preventDefault(); const nextErrors = validateEnquiry(fields); setErrors(nextErrors);
  if (Object.keys(nextErrors).length) { const first = Object.keys(nextErrors)[0]; document.getElementById(`enquiry-${first}`)?.focus(); return; }
  const body = `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\nOrganization: ${fields.organization.trim() || 'Not specified'}\nService: ${fields.service}\n\n${fields.message.trim()}`;
  setDraft(`mailto:${company.email}?subject=${encodeURIComponent(`${fields.service} — ${fields.name.trim()}`)}&body=${encodeURIComponent(body)}`);
 }
 return <SiteLayout><PageIntro eyebrow="Contact" title="Let’s start a conversation." description="Discuss your publishing, book supply, subscription or research requirements with Finesse Publishing Limited." /><section className="container section contact-grid"><div id="contact-details" className="contact-details"><span className="eyebrow">GET IN TOUCH</span><h2>We’d like to hear from you.</h2><p>Connect with us about the information resources and publishing solutions your organization needs.</p><div className="contact-item"><Phone size={22} /><div><h3>Call us</h3><a href={`tel:${company.phoneLink}`}>{company.phone}</a></div></div><div className="contact-item"><Mail size={22} /><div><h3>Email us</h3><a href={`mailto:${company.email}`}>{company.email}</a></div></div><div id="office-location" className="contact-item"><MapPin size={22} /><div><h3>Visit our office</h3><p>{company.address}</p><p>Ongata-Rongai, Nairobi, Kenya</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Magadi+Road+Ongata+Rongai+Shopping+Centre+Kenya" target="_blank" rel="noopener noreferrer">View location <ArrowUpRight size={14} /></a></div></div><div className="contact-item"><Mail size={22} /><div><h3>Postal address</h3><p>{company.postal}</p></div></div></div><form id="enquiry" className="contact-form" noValidate onSubmit={submit}><h2>Your enquiry</h2><p className="form-note">Prepare your enquiry below, then send it using your email app.</p><div className="form-row">{(['name','email'] as const).map(key => <div className="field" key={key}><label htmlFor={`enquiry-${key}`}>{key === 'name' ? 'Your name' : 'Email address'} *</label><input id={`enquiry-${key}`} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required value={fields[key]} onChange={e => update(key,e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <span className="field-error" id={`${key}-error`}>{errors[key]}</span>}</div>)}</div><div className="field"><label htmlFor="enquiry-organization">Organization</label><input id="enquiry-organization" autoComplete="organization" value={fields.organization} onChange={e => update('organization',e.target.value)} /></div><div className="field"><label htmlFor="enquiry-service">I’m interested in</label><select id="enquiry-service" value={fields.service} onChange={e => update('service',e.target.value)}><option>General enquiry</option>{services.map(s => <option key={s.id}>{s.title}</option>)}</select></div><div className="field"><label htmlFor="enquiry-message">Your message *</label><textarea id="enquiry-message" required value={fields.message} onChange={e => update('message',e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell us about your requirements…" />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>{draft ? <div className="enquiry-ready" role="status"><p>Your enquiry is ready. It has not been sent.</p><Button asChild variant="brand" className="mt-4"><a href={draft}>Open email app to send <ArrowUpRight /></a></Button></div> : <Button type="submit" variant="brand">Prepare email enquiry <ArrowUpRight /></Button>}</form></section></SiteLayout>;
}