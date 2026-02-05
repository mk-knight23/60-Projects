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

interface WelcomeEmailProps {
  name?: string
  dashboardUrl?: string
  appUrl?: string
}

export function WelcomeEmail({
  name = "there",
  dashboardUrl = "https://yourapp.com/dashboard",
  appUrl = "https://yourapp.com",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to 60 Projects Ecosystem 🚀</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Welcome to 60 Projects Ecosystem, {name}! 👋</Heading>

          <Text style={styles.text}>
            I Don&apos;t Just Build Projects, I Build Products. You&apos;ve just joined a curated
            ecosystem of 60 real-world projects covering AI, SaaS, web apps, games, tools,
            and developer utilities.
          </Text>

          <Text style={styles.text}>
            From complete codebases to deployment guides, you now have access to
            production-ready projects that demonstrate end-to-end product building with
            modern tech stacks.
          </Text>

          <Section style={{ marginTop: "24px" }}>
            <Button style={styles.button} href={dashboardUrl}>
              Explore Your Dashboard →
            </Button>
          </Section>

          <Section style={styles.hr} />

          <Text style={styles.subheading}>What&apos;s Next?</Text>

          <Text style={styles.text}>
            • Browse the project library and find something that excites you
            <br />
            • Dive into complete source code with detailed documentation
            <br />
            • Follow deployment guides to get projects live in minutes
          </Text>

          <Text style={styles.text}>
            Questions? Just reply to this email — I&apos;m here to help you build real skills
            with real projects.
          </Text>

          <Text style={styles.footer}>
            You received this email because you signed up for 60 Projects Ecosystem. If you
            didn&apos;t create an account, you can safely ignore this email.
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

export default WelcomeEmail
