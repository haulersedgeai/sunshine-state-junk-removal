import { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSite } from '@/data';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy | Sunshine State Junk Removal',
  description: 'How Sunshine State Junk Removal collects, uses, and protects your information.',
  path: '/privacy-policy/',
});

export default function PrivacyPage() {
  const site = getSite();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy', href: '/privacy-policy/' }]} />
      <section className="section">
        <div className="container-p max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="prose-basic mt-8">
            <p>{site.businessName} respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.</p>

            <h3>Information we collect</h3>
            <ul>
              <li><strong>Contact details</strong> you provide (name, phone, email, service address).</li>
              <li><strong>Message and photo content</strong> you send us for quoting purposes.</li>
              <li><strong>Website analytics</strong> such as pages viewed, referrer, device type, and general location (via Google Tag Manager / Google Analytics).</li>
            </ul>

            <h3>How we use it</h3>
            <ul>
              <li>To respond to your quote request and schedule service.</li>
              <li>To follow up about your job, invoicing, and service reminders.</li>
              <li>To improve our website and marketing.</li>
              <li>Occasionally, to feature job photos in our portfolio (without personal information).</li>
            </ul>

            <h3>SMS communications</h3>
            <p>By texting us or opting in on our quote form, you consent to receive SMS messages related to your quote and job. Message and data rates may apply. Reply STOP to opt out at any time.</p>

            <h3>Sharing</h3>
            <p>We do not sell your personal information. We share information only with the service providers we use to run the business (for example, email/SMS delivery, analytics, and payment processing), and only to the extent necessary.</p>

            <h3>Cookies</h3>
            <p>Our website uses cookies for basic functionality and analytics. You can disable cookies in your browser settings.</p>

            <h3>Your choices</h3>
            <p>You can request that we correct or delete your personal information by contacting us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

            <h3>Contact</h3>
            <p>Questions? <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
