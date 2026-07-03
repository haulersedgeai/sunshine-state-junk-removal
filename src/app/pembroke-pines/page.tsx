import type { Metadata } from 'next';
import { CityServicePage } from '@/components/CityServicePage';
import { serviceCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = serviceCityContent['/pembroke-pines/'];

export const metadata: Metadata = pageMetadata({
  title: 'Junk Removal in Pembroke Pines FL | Sunshine State Junk Removal',
  description:
    'Get dependable junk removal in Pembroke Pines, FL. Fast photo quotes, same-day availability, and 5-star service from Sunshine State Junk Removal. Call today for a free quote!',
  path: '/pembroke-pines/',
});

export default function Page() {
  return <CityServicePage content={content} />;
}
