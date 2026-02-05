import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

import { styles } from "./styles"

interface SubscriptionConfirmedEmailProps {
  planName: string
  userName?: string
  settingsUrl?: string
  appUrl?: string
}

export function SubscriptionConfirmedEmail({
  planName,
  userName,
  settingsUrl = "https://yourapp.com/dashboard/settings",
  appUrl = "https://yourapp.com",
}: SubscriptionConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription is now active 🎉</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            {userName ? `Thanks, ${userName}!` : "You're all set!"} 🎉
          </Heading>

          <Text style={styles.text}>
            Your <strong>{planName}</strong> subscription to 60 Projects Ecosystem is now
            active. Welcome aboard!
          </Text>

          <Text style={styles.text}>
            Your support helps me continue building production-ready projects with complete
            codebases, deployment guides, and documentation. You now have full access to:
          </Text>

          <Text style={styles.text}>
            • All 60+ projects with complete source code
            <br />
            • Detailed deployment and setup guides
            <br />
            • Production-ready architecture patterns
            <br />
            • Real-world implementations of AI, SaaS, and web apps
          </Text>

          <Section style={{ marginTop: "24px" }}>
            <Button style={styles.button} href={settingsUrl}>
              Manage Your Subscription →
            </Button>
          </Section>

          <Section style={styles.hr} />

          <Text style={styles.text}>
            You can manage or cancel your subscription at any time from your dashboard
            settings. If you have any questions or need help getting started, just reply to
            this email.
          </Text>

          <Text style={styles.text}>Happy building! 🚀</Text>

          <Text style={styles.footer}>
            You received this email because you subscribed to 60 Projects Ecosystem.
            <br />
            <br />
            © {new Date().getFullYear()} 60 Projects Ecosystem. All rights reserved.
            <br />
            <Link href={`${appUrl}/privacy`}>Privacy Policy</Link> •{" "}
            <Link href={`${appUrl}/terms`}>Terms of Service</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default SubscriptionConfirmedEmail
