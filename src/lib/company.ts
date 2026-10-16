import aboutImage from '@/assets/books-banner.jpg';
import serviceImage from '@/assets/publishing-hero-red.jpg';
import resourceImage from '@/assets/publishing-hero-blue.jpg';
import contactImage from '@/assets/publishing-hero-green.jpg';

export const company = {
  name: 'Finesse Publishing Limited',
  phone: '+254 727 381 147',
  phoneLink: '+254727381147',
  email: 'info@finesseglobal.co.ke',
  address: 'Magadi Road, Ongata-Rongai Shopping Centre',
  postal: 'P.O. Box 37032-0200, Nairobi',
};

export const services = [
  { id: 'book-supply', title: 'Book supply & distribution', short: 'Quality books. Meaningful connections.', description: 'We supply and distribute books to libraries, information centres, educational and research institutions in an efficient and reliable manner, guided by quality, value and convenience.', icon: 'books' },
  { id: 'journals', title: 'Journal subscription service', short: 'Research that keeps you informed.', description: 'We provide journal subscription services to schools, universities and colleges, research organizations and private corporations.', icon: 'journal' },
  { id: 'publishing', title: 'Book publishing services', short: 'From manuscript to published work.', description: 'We publish books in hardcover, trade paperback, mass-market and digital formats. Our publishing programme emphasizes credibility, high-quality manuscripts and good style.', icon: 'pen' },
  { id: 'digital', title: 'E-books & e-journals', short: 'Knowledge beyond the printed page.', description: 'Through our FinesseGlobal platform, we publish and provide access to digital content that meets the research and learning requirements of each organization.', icon: 'digital' },
  { id: 'research', title: 'Research consultancy', short: 'Insight for informed decisions.', description: 'We carry out commissioned research in fields including health, education, policy, market surveys and technology.', icon: 'research' },
  { id: 'consultancy', title: 'Library & information consultancy', short: 'Expertise for your institution.', description: 'Customer-tailored advice, collection development, information systems, library planning and training for institutions and information professionals.', icon: 'library' },
] as const;

export const consultancy = [
  ['Collection development', 'Customer-tailored advice on building library collections to fit course and programme requirements, collection evaluation, and community information needs analysis.'],
  ['Book processing', 'Cataloguing and classification, indexing and abstracting, book covering, tattle tapes, barcodes, ownership stamps and RFID tags for supplied materials or on-site collections.'],
  ['Information systems', 'Selection and implementation of library management systems, digital repositories, document and records management systems, academic management systems and e-learning platforms.'],
  ['Library planning', 'Library building planning and project management.'],
  ['Printing & publishing', 'Editing, graphic design and printing of pamphlets, books, journals and research reports for individuals, companies, organizations, and public and private institutions.'],
  ['Web authoring', 'Web authoring and management.'],
  ['Training & capacity building', 'Research and publishing techniques; library, information, records and knowledge management; and digital literacy.'],
  ['Book marketing', 'Book marketing and promotion.'],
];

export function pageHead(title: string, description: string, image?: string) {
  image ??= title === 'About us' ? aboutImage : title === 'Contact us' ? contactImage : title.startsWith('Print & digital') ? resourceImage : title.startsWith('Publishing, distribution') ? serviceImage : undefined;
  const fullTitle = `${title} | Finesse Publishing`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, ...(image?.startsWith('https://') ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : [])] };
}
