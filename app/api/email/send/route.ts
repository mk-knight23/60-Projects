import { NextRequest, NextResponse } from "next/server"
import { sendEmail, emailTemplates } from "@/lib/resend"
import { createClient } from "@/lib/supabase/server"

/**
 * POST /api/email/send
 * Send transactional emails
 *
 * Request body:
 * {
 *   template: "welcome" | "subscriptionConfirmed",
 *   to: "user@example.com",
 *   data: { name: "John", planName: "Pro" }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication (optional - remove if sending from server actions)
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { template, to, data } = body

    if (!to) {
      return NextResponse.json(
        { error: "Recipient email required" },
        { status: 400 }
      )
    }

    // Get email content from template
    let emailContent
    if (template) {
      switch (template) {
        case "welcome":
          emailContent = emailTemplates.welcome(data?.name || "there")
          break
        case "subscriptionConfirmed":
          emailContent = emailTemplates.subscriptionConfirmed(data?.planName || "your plan")
          break
        default:
          return NextResponse.json(
            { error: `Unknown template: ${template}` },
            { status: 400 }
          )
      }
    } else {
      return NextResponse.json(
        { error: "Template required" },
        { status: 400 }
      )
    }

    // Send email
    const result = await sendEmail({
      to,
      subject: emailContent.subject,
      react: emailContent.react,
    })

    return NextResponse.json({ success: true, id: result?.id })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
