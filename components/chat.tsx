"use client"

import { useState, useRef, useEffect } from "react"
import { ALL_MODELS, DEFAULT_MODEL, OPENROUTER_MODELS, ZAI_MODELS, type ModelKey } from "@/lib/models"

type Message = {
  role: "system" | "user" | "assistant"
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with coding, questions, and creative tasks. Select a model and start chatting!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelKey>(DEFAULT_MODEL)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          model: selectedModel,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to get response")
      }

      // Create assistant message for streaming
      const assistantMessage: Message = { role: "assistant", content: "" }
      setMessages((prev) => [...prev, assistantMessage])

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No response body")

      let fullContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n").filter((line) => line.startsWith("data: "))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === "[DONE]") break

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content || parsed.content
            if (content) {
              fullContent += content
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: fullContent,
                }
                return updated
              })
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. How can I help you?",
      },
    ])
  }

  const getModelLabel = (key: ModelKey) => ALL_MODELS[key].name

  return (
    <div className="card bg-base-200 shadow-xl h-[700px] flex flex-col">
      <div className="card-body p-0 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <h2 className="card-title text-lg flex items-center gap-2">
            <span className="text-primary">◆</span>
            AI Chat
          </h2>
          <div className="flex gap-2 items-center">
            <select
              className="select select-sm select-bordered"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as ModelKey)}
              disabled={isLoading}
            >
              <optgroup label="Z.AI Models">
                {ZAI_MODELS.map((key) => (
                  <option key={key} value={key}>
                    {getModelLabel(key)}
                  </option>
                ))}
              </optgroup>
              <optgroup label="OpenRouter Free Models">
                {OPENROUTER_MODELS.map((key) => (
                  <option key={key} value={key}>
                    {getModelLabel(key)}
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              className="btn btn-sm btn-ghost"
              onClick={clearChat}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Model Badge */}
        <div className="px-4 py-2 bg-base-300 border-b border-base-300">
          <div className="flex items-center gap-2 text-sm">
            <span className="badge badge-primary badge-sm">
              {ALL_MODELS[selectedModel].name}
            </span>
            <span className="text-base-content/60">
              {ALL_MODELS[selectedModel].provider === "z-ai" ? "Z.AI" : "OpenRouter"}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="chat-header">
                  <span className="text-xs opacity-70">AI Assistant</span>
                </div>
              )}
              <div className="chat-bubble">
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="chat chat-start">
              <div className="chat-bubble">
                <span className="loading loading-dots loading-sm" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-base-300">
          <div className="join w-full">
            <input
              type="text"
              className="input input-bordered join-item flex-1"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary join-item"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-xs text-base-content/50 mt-2">
            Press Enter to send • Models may have different capabilities
          </div>
        </form>
      </div>
    </div>
  )
}
