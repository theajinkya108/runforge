import { createOllama } from 'ai-sdk-ollama'
import { createOpenAI } from '@ai-sdk/openai'
import type { LanguageModel } from 'ai'

export function createLlmModel(): LanguageModel {
  const provider = process.env.LLM_PROVIDER ?? 'ollama'

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required when LLM_PROVIDER=openai')
    }
    const openai = createOpenAI({ apiKey })
    return openai('gpt-4o')
  }

  if (provider === 'ollama') {
    const baseURL = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434'
    const model = process.env.OLLAMA_MODEL ?? 'qwen2.5-coder:7b'
    const ollama = createOllama({ baseURL })
    return ollama(model) as LanguageModel
  }

  throw new Error(
    `Unsupported LLM_PROVIDER: "${provider}". Valid values: ollama, openai`
  )
}