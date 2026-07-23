import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCities, getCityBySlug } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { JunkRemovalCityPage } from '@/components/JunkRemovalCityPage';

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const content = getCityBySlug(city);
  if (!content) return {};
  return pageMetadata({
    title: content.title,
    description: content.metaDescription,
    path: `/junk-removal/${content.slug}/`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityBySlug(city);
  if (!content) notFound();
  return <JunkRemovalCityPage content={content} />;
}
