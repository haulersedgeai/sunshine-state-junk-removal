import { SVGProps } from 'react';

const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
export const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><polyline points="20 6 9 17 4 12"/></svg>
);
export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><polyline points="9 18 15 12 9 6"/></svg>
);
export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><polyline points="6 9 12 15 18 9"/></svg>
);
export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
export const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
export const ShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
export const MapPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const TruckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
);
export const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
