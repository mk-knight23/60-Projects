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

interface OnboardingCompleteEmailProps {
  userName?: string
  completedSteps?: string[]
  nextStepsUrl?: string
  appUrl?: string
}

export function OnboardingCompleteEmail({
  userName,
  completedSteps = [
    "Set up your profile",
    "Connected your account",
    "Reviewed the documentation",
  ],
  nextStepsUrl,
  appUrl = "https://yourapp.com",
}: OnboardingCompleteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re all set up! 🎉</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            {userName ? `Congratulations, ${userName}!` : "Congratulations!"} 🎉
          </Heading>

          <Text style={styles.text}>
            You&apos;ve completed your onboarding for 60 Projects Ecosystem. You&apos;re now
            ready to dive in and start building!
          </Text>

          <Text style={styles.subheading}>Here&apos;s what you&apos;ve accomplished:</Text>

          <Text style={styles.text}>
            {completedSteps.map((step, index) => (
              <React.Fragment key={index}>
                ✓ {step}
                <br />
              </React.Fragment>
            ))}
          </Text>

          <Section style={styles.hr} />

          <Text style={styles.subheading}>Ready to Start Building?</Text>

          <Text style={styles.text}>
            Explore the project library and find your next challenge. Each project comes
            with complete source code, deployment guides, and production-ready patterns.
          </Text>

          {nextStepsUrl && (
            <Section style={{ marginTop: "24px" }}>
              <Button style={styles.button} href={nextStepsUrl}>
                Explore Projects →
              </Button>
            </Section>
          )}

          <Text style={styles.footer}>
            You received this email because you completed onboarding for 60 Projects
            Ecosystem.
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

export default OnboardingCompleteEmail
