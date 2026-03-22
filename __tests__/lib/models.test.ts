/**
 * Tests for lib/models.ts
 */
import {
  ALL_MODELS,
  DEFAULT_MODEL,
  FREE_MODEL_KEYS,
  PAID_MODEL_KEYS,
  ZAI_MODELS,
  getModelName,
  isOpenRouterModel,
  isZAIModel,
  type ModelKey,
} from "@/lib/models"

describe("ALL_MODELS", () => {
  it("should have at least one model", () => {
    expect(Object.keys(ALL_MODELS).length).toBeGreaterThan(0)
  })

  it("each model should have required fields", () => {
    for (const [key, model] of Object.entries(ALL_MODELS)) {
      expect(model.id).toBeTruthy()
      expect(model.name).toBeTruthy()
      expect(model.provider).toBeTruthy()
    }
  })

  it("should include Claude 4.x models", () => {
    const modelIds = Object.values(ALL_MODELS).map((m) => m.id)
    const hasClaudeSonnet = modelIds.some((id) => id.includes("claude-sonnet-4-6"))
    expect(hasClaudeSonnet).toBe(true)
  })
})

describe("DEFAULT_MODEL", () => {
  it("should be a valid ModelKey", () => {
    expect(ALL_MODELS[DEFAULT_MODEL]).toBeDefined()
  })
})

describe("FREE_MODEL_KEYS", () => {
  it("should all be valid model keys", () => {
    for (const key of FREE_MODEL_KEYS) {
      expect(ALL_MODELS[key]).toBeDefined()
    }
  })
})

describe("PAID_MODEL_KEYS", () => {
  it("should all be valid model keys", () => {
    for (const key of PAID_MODEL_KEYS) {
      expect(ALL_MODELS[key]).toBeDefined()
    }
  })
})

describe("getModelName", () => {
  it("should return name for DEFAULT_MODEL", () => {
    const name = getModelName(DEFAULT_MODEL)
    expect(typeof name).toBe("string")
    expect(name.length).toBeGreaterThan(0)
  })
})

describe("isOpenRouterModel / isZAIModel", () => {
  it("should correctly identify OpenRouter models", () => {
    for (const key of FREE_MODEL_KEYS) {
      expect(isOpenRouterModel(key)).toBe(true)
      expect(isZAIModel(key)).toBe(false)
    }
  })

  it("should correctly identify Z.AI models", () => {
    for (const key of ZAI_MODELS) {
      expect(isZAIModel(key)).toBe(true)
      expect(isOpenRouterModel(key)).toBe(false)
    }
  })
})
