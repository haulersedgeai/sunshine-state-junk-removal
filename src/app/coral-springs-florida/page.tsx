import type { Metadata } from 'next';
import { CityServicePage } from '@/components/CityServicePage';
import { serviceCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = serviceCityContent['/coral-springs-florida/'];

export const metadata: Metadata = pageMetadata({
  title: 'Junk Removal in Coral Springs FL | Sunshine State Junk Removal',
  description:
    'Get dependable junk removal in Coral Springs, FL. Fast photo quotes, same-day availability, and 5-star service from Sunshine State Junk Removal. Call today for a free quote!',
  path: '/coral-springs-florida/',
});

export default function Page() {
  return <CityServicePage content={content} />;
}
