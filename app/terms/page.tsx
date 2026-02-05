import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using 60 Projects Ecosystem.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-base-content/60">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 prose prose-lg max-w-none">
          <section>
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using 60 Projects Ecosystem (&quot;Platform,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Platform.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and 60 Projects Ecosystem. We reserve the right to modify these Terms at any time, and your continued use of the Platform after any changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Description of Service</h2>
            <p>
              60 Projects Ecosystem provides a curated collection of 60 real-world projects covering AI, SaaS, web apps, games, tools, and developer utilities. Our Platform includes:
            </p>
            <ul>
              <li>Access to complete source code for all projects</li>
              <li>Documentation and deployment guides</li>
              <li>Best practices and real-world implementation examples</li>
              <li>Community features and updates</li>
            </ul>
            <p className="alert alert-info mt-4">
              <strong>Note:</strong> Some features may require a paid subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Account Registration and Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Account Creation</h3>
            <p>To access certain features, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Account Security</h3>
            <p>You are solely responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Paid Subscriptions and Payments</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Subscription Plans</h3>
            <p>We offer subscription-based access to premium features. Subscriptions are billed monthly and automatically renew unless cancelled. Pricing is displayed on our pricing page and may be changed at any time with notice to existing subscribers.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Payment Terms</h3>
            <ul>
              <li>Payments are processed through <strong>Stripe</strong></li>
              <li>You agree to provide accurate payment information</li>
              <li>You authorize us to charge your payment method for your subscription</li>
              <li>Failed payments may result in service suspension or cancellation</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Refunds</h3>
            <p>
              Due to the nature of digital products, refunds are handled on a case-by-case basis. You may request a refund within 7 days of purchase if you are dissatisfied with our service. To request a refund, contact us with your reason for the request.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Cancellation</h3>
            <p>You may cancel your subscription at any time through your account dashboard or by contacting customer support. Cancellation will take effect at the end of the current billing period, and you will retain access until that date. No partial refunds will be issued for cancellations mid-period.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Permitted Use</h3>
            <p>You may use the Platform and its content for:</p>
            <ul>
              <li>Personal and commercial projects</li>
              <li>Learning and educational purposes</li>
              <li>Building products for yourself or clients</li>
              <li>Modifying and adapting the code for your needs</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Prohibited Activities</h3>
            <p>You agree NOT to:</p>
            <ul>
              <li><strong>Redistribute or resell</strong> the project code as your own</li>
              <li><strong>Reverse engineer</strong> or attempt to extract the source code</li>
              <li><strong>Violate laws</strong> or regulations in your jurisdiction</li>
              <li><strong>Infringe intellectual property</strong> rights of others</li>
              <li><strong>Upload malicious code</strong> or attempt to harm our systems</li>
              <li><strong>Spam or abuse</strong> our services or community features</li>
              <li><strong>Share account credentials</strong> with others</li>
              <li><strong>Remove attribution</strong> or license notices from the code</li>
              <li><strong>Use automated tools</strong> to access the Platform excessively</li>
              <li><strong>Interfere with security features</strong> or bypass authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Our Content</h3>
            <p>
              The Platform, including all content, features, and functionality (collectively, &quot;Content&quot;) is owned by 60 Projects Ecosystem and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Your Rights</h3>
            <p>
              When you subscribe, you receive a license to use the project code for your projects. You do not acquire ownership of the underlying code or content. You may not:
            </p>
            <ul>
              <li>Sublicense, transfer, or assign your license to others</li>
              <li>Claim the code as your original work</li>
              <li>Use our brand or trademarks without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User-Generated Content</h2>
            <p>
              If you submit content to our Platform (comments, feedback, community posts), you grant us a non-exclusive, royalty-free license to use, display, and distribute that content for operating and improving our services. You represent that you own or have permission to use any content you submit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Termination</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Termination by You</h3>
            <p>You may terminate your account at any time by contacting us or using the account deletion feature. Upon termination, your right to use the Platform will immediately cease.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Termination by Us</h3>
            <p>We reserve the right to suspend or terminate your account at any time for:</p>
            <ul>
              <li>Violation of these Terms</li>
              <li>Non-payment of subscription fees</li>
              <li>Fraudulent or illegal activities</li>
              <li>Abuse of our services or community</li>
              <li>Any reason at our sole discretion</li>
            </ul>
            <p className="mt-4">
              Upon termination, we may delete your account data and revoke your access to the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Disclaimers and Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>MERCHANTABILITY</li>
              <li>FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT</li>
              <li>AVAILABILITY, SECURITY, OR UNINTERRUPTED OPERATION</li>
            </ul>
            <p className="alert alert-warning mt-4">
              <strong>Warning:</strong> We do not guarantee that the Platform will be error-free, secure, or always available. You use the Platform at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, 60 PROJECTS ECOSYSTEM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>DAMAGE TO YOUR COMPUTER OR SOFTWARE</li>
              <li>DATA BREACHES OR SECURITY ISSUES</li>
              <li>INTERRUPTION OF SERVICE</li>
            </ul>
            <p className="mt-4">
              Our total liability shall not exceed the amount you paid for your subscription in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless 60 Projects Ecosystem and its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorneys&apos; fees) arising from:
            </p>
            <ul>
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your violation of applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which 60 Projects Ecosystem is established. Any disputes arising from these Terms shall be resolved through binding arbitration, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p>
              Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our Platform, you agree to the terms of our Privacy Policy.
            </p>
            <p>
              <a href="/privacy" className="link link-primary font-semibold">View Privacy Policy →</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time, including features, content, or subscription plans. We will provide reasonable notice for material changes that affect your subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Links and Services</h2>
            <p>
              The Platform may contain links to third-party websites or services. We are not responsible for the practices, policies, or content of these third parties. Your interactions with third parties are solely between you and the third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Waiver and Amendments</h2>
            <p>
              Our failure to enforce any right or provision of these Terms does not constitute a waiver. Any amendments to these Terms will be effective upon posting on this page. Your continued use of the Platform after amendments constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="card bg-base-200 mt-4">
              <div className="card-body">
                <ul className="space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:onboarding@resend.dev" className="link link-primary">onboarding@resend.dev</a></li>
                  <li><strong>Website:</strong> <a href="https://yourapp.com" className="link link-primary">https://yourapp.com</a></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Important Legal Notice</h3>
              <div className="text-sm">These Terms are a binding legal agreement. Please read them carefully. If you do not agree to these Terms, do not use the Platform.</div>
            </div>
          </section>

          <section className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Questions?</h3>
              <div className="text-sm">We&apos;re here to help. Contact us if you need clarification on any part of these Terms.</div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
