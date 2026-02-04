import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

import { styles } from "./styles"

interface WelcomeEmailProps {
  name: string
  dashboardUrl?: string
}

export function WelcomeEmail({
  name,
  dashboardUrl = "https://yourapp.com/dashboard",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the app!</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Welcome aboard, {name}!</Heading>
          <Text style={styles.text}>
            Thanks for joining. We&apos;re excited to have you!
          </Text>
          <Text style={styles.text}>
            Get started by exploring your dashboard.
          </Text>
          <Section style={{ marginTop: "24px" }}>
            <Button style={styles.button} href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
