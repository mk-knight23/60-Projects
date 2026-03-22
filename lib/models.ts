/**
 * Model configuration for AI chat
 * Supports both OpenRouter models and custom API providers
 * Updated: March 2026 — includes Claude 4.x, Gemini 2.x, Llama 4, Qwen 3
 */

// ============================================
// OpenRouter Free Models
// ============================================

export const OPENROUTER_FREE_MODELS = {
  "glm-4-5-air": {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM 4.5 Air",
    provider: "openrouter",
  },
  "deepseek-chat": {
    id: "deepseek/deepseek-chat:free",
    name: "DeepSeek Chat",
    provider: "openrouter",
  },
  "llama-3-2-3b": {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B",
    provider: "openrouter",
  },
  "qwen-3-coder": {
    id: "qwen/qwen3-coder:free",
    name: "Qwen 3 Coder",
    provider: "openrouter",
  },
  "phi-3-mini": {
    id: "microsoft/phi-3-mini-128k-instruct:free",
    name: "Phi 3 Mini",
    provider: "openrouter",
  },
} as const

// ============================================
// OpenRouter Paid Models (Claude 4.x — March 2026)
// ============================================

export const OPENROUTER_PAID_MODELS = {
  // Claude 4.6 family — Anthropic's latest
  "claude-haiku-4-5": {
    id: "anthropic/claude-haiku-4-5-20251001",
    name: "Claude Haiku 4.5",
    provider: "openrouter",
    description: "Fast, efficient — ideal for quick tasks (3x cost savings vs Sonnet)",
  },
  "claude-sonnet-4-6": {
    id: "anthropic/claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "openrouter",
    description: "Best coding model — primary for complex development tasks",
  },
  "claude-opus-4-6": {
    id: "anthropic/claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "openrouter",
    description: "Deepest reasoning — architectural decisions, research",
  },
  // Other frontier models
  "gpt-4o": {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "openrouter",
    description: "OpenAI's flagship multimodal model",
  },
  "gemini-2-flash": {
    id: "google/gemini-2.0-flash-001",
    name: "Gemini 2.0 Flash",
    provider: "openrouter",
    description: "Google's fast, efficient model",
  },
} as const

// ============================================
// Custom Models (Z.AI and others)
// ============================================

export const CUSTOM_MODELS = {
  "glm-4-7": {
    id: "glm-4.7",
    name: "GLM-4.7 [Z.AI Coding Plan]",
    baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
    provider: "z-ai",
    maxOutputTokens: 131072,
    description: "Z.AI's powerful coding-optimized model",
  },
} as const

// ============================================
// All Available Models
// ============================================

export const ALL_MODELS = {
  ...OPENROUTER_FREE_MODELS,
  ...OPENROUTER_PAID_MODELS,
  ...CUSTOM_MODELS,
} as const

export type ModelKey = keyof typeof ALL_MODELS

// ============================================
// Model Selection Groups
// ============================================

export const FREE_MODEL_KEYS = Object.keys(OPENROUTER_FREE_MODELS) as ModelKey[]
export const PAID_MODEL_KEYS = Object.keys(OPENROUTER_PAID_MODELS) as ModelKey[]
export const OPENROUTER_MODELS = [...FREE_MODEL_KEYS, ...PAID_MODEL_KEYS]
export const ZAI_MODELS = Object.keys(CUSTOM_MODELS) as ModelKey[]

// ============================================
// Default Model
// ============================================

export const DEFAULT_MODEL: ModelKey = "glm-4-7"

// ============================================
// Model Metadata Helpers
// ============================================

export function getModelName(key: ModelKey): string {
  return ALL_MODELS[key].name
}

export function isOpenRouterModel(key: ModelKey): boolean {
  return ALL_MODELS[key].provider === "openrouter"
}

export function isZAIModel(key: ModelKey): boolean {
  return ALL_MODELS[key].provider === "z-ai"
}
