export const INSTAGRAM = 'https://www.instagram.com/swappy__creation/'
export const HANDLE = '@swappy__creation'

export type Category = 'Wedding' | 'Pre-Wedding' | 'Engagement' | 'Portrait'
export const CATEGORIES: Category[] = ['Wedding', 'Pre-Wedding', 'Engagement', 'Portrait']

export interface Photo { id: number; cat: Category; file: string; alt: string }
export const src = (p: Photo) => `${import.meta.env.BASE_URL}photos/${p.file}.jpg`
export const PHOTOS: Photo[] = [
  { id: 0, cat: 'Pre-Wedding', file: 'prewedding', alt: 'Couple on a picnic in a hill meadow' },
  { id: 1, cat: 'Wedding', file: 'ritual', alt: 'Bride offering a garland at the wedding ceremony' },
  { id: 2, cat: 'Engagement', file: 'engagement', alt: 'Groom kissing bride on the forehead at engagement' },
  { id: 3, cat: 'Wedding', file: 'bride-lake', alt: 'Bride in red lehenga by the lake at sunset' },
  { id: 4, cat: 'Portrait', file: 'bride-detail', alt: 'Bride in traditional jewellery' },
  { id: 5, cat: 'Wedding', file: 'couple-green', alt: 'Couple embracing in traditional Maharashtrian attire' },
  { id: 6, cat: 'Portrait', file: 'behind-lens', alt: 'Swappy Pawar with his Nikon camera' },
]

export type PkgGroup = 'Pre-Wedding' | 'Engagement' | 'Wedding'
export interface Pkg {
  id: string; group: PkgGroup; name: string; days: string; price: number
  crew: string[]; items: string[]; featured?: boolean
}
export const PACKAGES: Pkg[] = [
  { id: 'pre', group: 'Pre-Wedding', name: 'Premium Pre-Wedding', days: '1 Day', price: 41000,
    crew: ['Photographer', 'Cinematographer', 'Drone', 'Assistant'],
    items: ['All raw photographs', '50 highly retouched photos', '1 min teaser or 2 reels', '4 min cinematic film'] },
  { id: 'eng', group: 'Engagement', name: 'Engagement', days: '1 Day', price: 40000,
    crew: ['Traditional photographer', 'Candid photographer', 'Cinematographer', 'Drone', 'Assistant'],
    items: ['All raw photographs', '20 highly retouched photos', 'Traditional full film', '1 min teaser or 1 reel', '4 min cinematic film', 'Premium 35 sheet album'] },
  { id: 'bw', group: 'Wedding', name: 'Basic Wedding', days: '1 Day', price: 51000,
    crew: ['Traditional photographer', 'Candid photographer', 'Videographer', 'Assistant'],
    items: ['All raw photo data', '1 min teaser', '1 reel', 'Traditional full film', 'Premium 35 sheet album'] },
  { id: 'pw1', group: 'Wedding', name: 'Premium Wedding', days: '1 Day', price: 95000, featured: true,
    crew: ['Traditional photographer', 'Candid photographer', 'Cinematographer', 'Videographer', 'Drone', 'Assistant'],
    items: ['All raw photo data', '1 min teaser', '2 reels', '4-6 min film', 'Traditional full film', 'Premium 35 sheet album'] },
  { id: 'pw15', group: 'Wedding', name: 'Premium Wedding', days: '1.5 Days', price: 120000,
    crew: ['Traditional photographer', 'Candid photographer', 'Cinematographer', 'Videographer', 'Drone', 'Assistant'],
    items: ['All raw photo data', '1 min teaser', '2 reels', '4-6 min film', 'Traditional full film', 'Premium 40 sheet album'] },
  { id: 'pw2', group: 'Wedding', name: 'Premium Wedding', days: '2 Days', price: 170000,
    crew: ['Traditional photographer', '2 candid photographers', 'Cinematographer + 2nd angle', 'Videographer', 'Drone', 'Assistant'],
    items: ['All raw photo data', '1 min teaser', '2 reels', '4-6 min film', 'Traditional full film', 'Premium 50 sheet album'] },
]
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

export const PAYMENT = [
  { pct: '30%', title: 'To confirm', text: 'Advance to lock your dates.' },
  { pct: '50%', title: 'Wedding day', text: 'Paid on the day of the shoot.' },
  { pct: '20%', title: 'On delivery', text: 'After album and film are ready.' },
]
export const TIMELINE = [
  { when: '+1 day', title: 'Highlight reel', text: 'Instagram-ready reel and 10 edited couple photos.' },
  { when: '+7 days', title: 'Cinematic teaser', text: '1-2 minute teaser. You pick the song and album photos.' },
  { when: '+5 days after picks', title: 'Film and album design', text: '5-7 min cinematic film and album soft copy for approval.' },
  { when: '+4 days after fixes', title: 'Final delivery', text: 'Printed or digital album, Drive link or pen drive.' },
]
export const STATS = [['10+', 'Years behind the lens'], ['All India', 'Destination ready'], ['4-8', 'Member crew'], ['3 mo', 'Data backup']]
