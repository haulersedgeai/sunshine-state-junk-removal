import { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSite } from '@/data';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions | Sunshine State Junk Removal',
  description: 'Terms and conditions for using Sunshine State Junk Removal services and website.',
  path: '/terms-and-condition/',
});

export default function TermsPage() {
  const site = getSite();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions', href: '/terms-and-condition/' }]} />
      <section className="section">
        <div className="container-p max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2">Terms & Conditions</h1>
          <p className="mt-4 text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="prose-basic mt-8">
            <p>These terms govern your use of the {site.businessName} website and the services we provide. By requesting a quote, scheduling service, or using this website you agree to these terms.</p>

            <h3>Services</h3>
            <p>We provide residential and commercial junk removal, dump-trailer rentals, and related hauling services in Broward County, FL, and select surrounding areas. Availability, pricing, and scheduling are estimates until confirmed in writing (SMS or email).</p>

            <h3>Quotes & pricing</h3>
            <p>Quotes are based on the information and photos you provide. Final pricing may adjust if the actual job scope differs from what was quoted (for example, volume, access, or item type). We will discuss and confirm any change with you before starting work.</p>

            <h3>What we cannot accept</h3>
            <p>We do not accept hazardous or restricted materials, including chemicals, paints, propane tanks, pool chemicals, used oil, batteries, pesticides, asbestos, or biohazard waste. Items requiring special handling (such as bed bug–infested furniture) are always disclosed before work begins.</p>

            <h3>Property & access</h3>
            <p>You represent that you have the authority to have the specified items removed and that access to the property is authorized. Please secure pets and remove valuables from the removal area before we arrive.</p>

            <h3>Payment</h3>
            <p>Payment is due upon completion of service unless otherwise agreed. Accepted payment methods will be confirmed at time of quote.</p>

            <h3>Cancellations & rescheduling</h3>
            <p>Please contact us as soon as possible to reschedule or cancel. Same-day cancellations may incur a fee for jobs already dispatched.</p>

            <h3>Limitation of liability</h3>
            <p>We are licensed and insured. Our liability is limited to the direct cost of the services performed. We are not liable for indirect, incidental, or consequential damages.</p>

            <h3>Photos & marketing</h3>
            <p>Photos taken during the job may be used for marketing purposes without disclosing personal information. Let us know before we start if you prefer we do not photograph your job.</p>

            <h3>Governing law</h3>
            <p>These terms are governed by the laws of the State of Florida.</p>

            <h3>Contact</h3>
            <p>Questions? Reach out any time: <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
