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

interface PasswordResetEmailProps {
  resetLink: string
  userName?: string
  expiryMinutes?: number
  appUrl?: string
}

export function PasswordResetEmail({
  resetLink,
  userName,
  expiryMinutes = 60,
  appUrl = "https://yourapp.com",
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            {userName ? `Hi ${userName},` : "Hi there,"}
          </Heading>

          <Text style={styles.text}>
            We received a request to reset your password for your 60 Projects Ecosystem
            account.
          </Text>

          <Text style={styles.text}>
            Click the button below to create a new password. This link will expire in{" "}
            {expiryMinutes} minutes.
          </Text>

          <Section style={{ marginTop: "24px" }}>
            <Button style={styles.button} href={resetLink}>
              Reset Your Password →
            </Button>
          </Section>

          <Section style={styles.hr} />

          <Text style={styles.text}>
            If you didn&apos;t request a password reset, you can safely ignore this email.
            Your password will remain unchanged.
          </Text>

          <Text style={styles.text}>
            For security, this link can only be used once. If you need to reset your
            password again, you&apos;ll need to request a new link.
          </Text>

          <Text style={styles.footer}>
            You received this email because a password reset was requested for this
            account.
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

export default PasswordResetEmail
