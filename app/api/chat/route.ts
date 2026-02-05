import { createClient } from "@/lib/supabase/server"
import { NextRequest } from "next/server"
import { ALL_MODELS, type ModelKey } from "@/lib/models"

type Message = {
  role: "system" | "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { messages, model = "glm-4-7" } = body as {
      messages: Message[]
      model?: ModelKey
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages", { status: 400 })
    }

    const modelConfig = ALL_MODELS[model]

    if (!modelConfig) {
      return new Response("Invalid model", { status: 400 })
    }

    // Check if it's an OpenRouter model or custom model
    if (modelConfig.provider === "openrouter") {
      return await handleOpenRouter(messages, modelConfig.id as string)
    } else if (modelConfig.provider === "z-ai") {
      return await handleZAI(messages, modelConfig as any)
    }

    return new Response("Unsupported provider", { status: 400 })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal error", { status: 500 })
  }
}

// ============================================
// OpenRouter Handler
// ============================================

async function handleOpenRouter(messages: Message[], modelId: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME || "60 Projects",
    },
    body: JSON.stringify({
      model: modelId,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("OpenRouter API error:", error)
    return new Response(`OpenRouter API error: ${error}`, { status: response.status })
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

// ============================================
// Z.AI Handler
// ============================================

async function handleZAI(messages: Message[], modelConfig: any) {
  const apiKey = process.env.ZAI_API_KEY

  if (!apiKey) {
    return new Response("ZAI_API_KEY not configured", { status: 500 })
  }

  // Z.AI uses OpenAI-compatible API format
  // baseUrl should include the full path to chat/completions
  const url = modelConfig.baseUrl.endsWith("/chat/completions")
    ? modelConfig.baseUrl
    : `${modelConfig.baseUrl}/chat/completions`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelConfig.id,
      messages,
      temperature: 0.7,
      max_tokens: modelConfig.maxOutputTokens || 4096,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Z.AI API error:", error)
    return new Response(`Z.AI API error: ${error}`, { status: response.status })
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
