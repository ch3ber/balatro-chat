import type { IAiService } from './IAiService'

interface OpenAIResponse {
  output_text?: string
  output?: Array<{
    content?: Array<{
      text?: {
        value?: string
      }
    }>
  }>
}

const DEFAULT_MODEL = 'gpt-4o-mini'
const RESPONSES_ENDPOINT = 'https://api.openai.com/v1/responses'

export class AIService implements IAiService {
  token: string

  constructor(token?: string) {
    this.token = token ?? ((import.meta.env?.PUBLIC_OPENAI_API_KEY as string | undefined) ?? '')
  }

  async sendMessage(message: string): Promise<string> {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      throw new Error('Cannot send an empty message.')
    }

    if (!this.token) {
      throw new Error('Missing OpenAI token.')
    }

    const response = await fetch(RESPONSES_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        input: trimmedMessage,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI request failed: ${errorText || response.statusText}`)
    }

    const data = (await response.json()) as OpenAIResponse

    if (typeof data.output_text === 'string' && data.output_text.trim().length > 0) {
      return data.output_text.trim()
    }

    const fallbackText = data.output
      ?.flatMap((item) =>
        item.content?.map((contentItem) => contentItem.text?.value ?? '') ?? []
      )
      .join('')
      .trim()

    if (fallbackText && fallbackText.length > 0) {
      return fallbackText
    }

    throw new Error('Received an empty response from OpenAI.')
  }
}
