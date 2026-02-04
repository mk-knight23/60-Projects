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

interface SubscriptionConfirmedEmailProps {
  planName: string
  settingsUrl?: string
}

export function SubscriptionConfirmedEmail({
  planName,
  settingsUrl = "https://yourapp.com/dashboard/settings",
}: SubscriptionConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription is active</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>You&apos;re all set!</Heading>
          <Text style={styles.text}>
            Your {planName} subscription is now active. Thanks for your support!
          </Text>
          <Text style={styles.text}>
            You can manage your subscription from your dashboard at any time.
          </Text>
          <Section style={{ marginTop: "24px" }}>
            <Button style={styles.button} href={settingsUrl}>
              Manage Subscription
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SubscriptionConfirmedEmail
