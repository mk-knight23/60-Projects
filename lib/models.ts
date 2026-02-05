/**
 * Model configuration for AI chat
 * Supports both OpenRouter free models and custom API providers
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
// Custom Models (Z.AI and others)
// ============================================

export const CUSTOM_MODELS = {
  "glm-4-7": {
    id: "glm-4.7",
    name: "GLM-4.7 [Z.AI Coding Plan]",
    baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
    provider: "z-ai",
    maxOutputTokens: 131072,
  },
} as const

// ============================================
// All Available Models
// ============================================

export const ALL_MODELS = {
  ...OPENROUTER_FREE_MODELS,
  ...CUSTOM_MODELS,
} as const

export type ModelKey = keyof typeof ALL_MODELS

// ============================================
// Model Selection Groups
// ============================================

export const OPENROUTER_MODELS = Object.keys(OPENROUTER_FREE_MODELS) as ModelKey[]
export const ZAI_MODELS = Object.keys(CUSTOM_MODELS) as ModelKey[]

// ============================================
// Default Model
// ============================================

export const DEFAULT_MODEL: ModelKey = "glm-4-7"
