/**
 * OpenRouter client for LLM completions
 * Supports 100+ models through a unified API
 * https://openrouter.ai/docs
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// ============================================
// Types
// ============================================

type Message = {
  role: "system" | "user" | "assistant"
  content: string
}

type CompletionParams = {
  messages: Message[]
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

type CompletionResponse = {
  id: string
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// ============================================
// Popular Models
// ============================================

export const models = {
  // Fast and cheap
  "gpt-4o-mini": "openai/gpt-4o-mini",
  "claude-3-haiku": "anthropic/claude-3-haiku",
  "gemini-flash": "google/gemini-flash-1.5",

  // Balanced
  "gpt-4o": "openai/gpt-4o",
  "claude-3.5-sonnet": "anthropic/claude-3.5-sonnet",
  "gemini-pro": "google/gemini-pro-1.5",

  // Most capable
  "claude-3-opus": "anthropic/claude-3-opus",
  "gpt-4-turbo": "openai/gpt-4-turbo",
} as const

export type ModelKey = keyof typeof models

// ============================================
// Non-streaming Completion
// ============================================

export async function complete({
  messages,
  model = models["gpt-4o-mini"],
  temperature = 0.7,
  maxTokens = 1000,
}: Omit<CompletionParams, "stream">): Promise<CompletionResponse> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME || "Ghoststack",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${error}`)
  }

  return response.json()
}

// ============================================
// Streaming Completion
// ============================================

export async function* streamComplete({
  messages,
  model = models["gpt-4o-mini"],
  temperature = 0.7,
  maxTokens = 1000,
}: Omit<CompletionParams, "stream">): AsyncGenerator<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME || "Ghoststack",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${error}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error("No response body")

  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split("\n").filter((line) => line.startsWith("data: "))

    for (const line of lines) {
      const data = line.slice(6) // Remove "data: " prefix
      if (data === "[DONE]") return

      try {
        const parsed = JSON.parse(data)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) yield content
      } catch {
        // Ignore parse errors for incomplete chunks
      }
    }
  }
}
