import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy",
  description: "Learn how 60 Projects Ecosystem collects, uses, and protects your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-base-content/60">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 prose prose-lg max-w-none">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              Welcome to 60 Projects Ecosystem (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
            <p>We collect information that you provide directly to us:</p>
            <ul>
              <li><strong>Email address:</strong> For account creation and authentication</li>
              <li><strong>Name (optional):</strong> To personalize your experience</li>
              <li><strong>Profile information:</strong> Preferences, interests, and onboarding data</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Payment Information</h3>
            <p>
              We process payments through <strong>Stripe</strong>. We do not store your complete credit card information. Stripe securely processes your payment data and is compliant with PCI-DSS standards.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <p>We may automatically collect certain information about your device and usage:</p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Usage patterns and preferences</li>
              <li>Theme and display settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li><strong>Provide and maintain</strong> your account and access to our platform</li>
              <li><strong>Process payments</strong> and manage subscriptions</li>
              <li><strong>Send communications</strong> about your account, updates, and promotional content (you can opt-out)</li>
              <li><strong>Personalize</strong> your experience based on your preferences</li>
              <li><strong>Improve our platform</strong> and develop new features</li>
              <li><strong>Analyze usage patterns</strong> to enhance performance and user experience</li>
              <li><strong>Respond to inquiries</strong> and provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p>We use the following third-party services to power our platform:</p>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Purpose</th>
                    <th>Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Supabase</strong></td>
                    <td>Authentication, database, and user management</td>
                    <td><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">View Policy</a></td>
                  </tr>
                  <tr>
                    <td><strong>Stripe</strong></td>
                    <td>Payment processing and subscription management</td>
                    <td><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">View Policy</a></td>
                  </tr>
                  <tr>
                    <td><strong>Resend</strong></td>
                    <td>Email delivery and notifications</td>
                    <td><a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">View Policy</a></td>
                  </tr>
                  <tr>
                    <td><strong>Plausible</strong></td>
                    <td>Analytics (privacy-focused, no cookies)</td>
                    <td><a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">View Policy</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our platform (as listed above)</li>
              <li><strong>Legal Requirements:</strong> To comply with legal obligations, court orders, or government requests</li>
              <li><strong>Protect Rights:</strong> To protect our rights, privacy, safety, or property</li>
              <li><strong>Business Transfer:</strong> In connection with a merger, sale, or transfer of assets</li>
              <li><strong>With Consent:</strong> When you explicitly consent to sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data, including:</p>
            <ul>
              <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
              <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
              <li><strong>Secure Authentication:</strong> Passwordless authentication via Supabase</li>
              <li><strong>Regular Audits:</strong> Periodic security reviews and updates</li>
            </ul>
            <p className="alert alert-warning mt-4">
              <strong>Important:</strong> No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
              <li><strong>Restriction:</strong> Request limitation of data processing</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
            <p>
              Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us, and we will delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:</p>
            <div className="card bg-base-200 mt-4">
              <div className="card-body">
                <ul className="space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:onboarding@resend.dev" className="link link-primary">onboarding@resend.dev</a></li>
                  <li><strong>Website:</strong> <a href="https://yourapp.com" className="link link-primary">https://yourapp.com</a></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Remember</h3>
              <div className="text-sm">By using 60 Projects Ecosystem, you agree to the collection and use of your information as described in this policy.</div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
