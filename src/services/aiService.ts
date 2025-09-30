import OpenAI from 'openai'
import type { IAiService } from './IAiService'

const DEFAULT_MODEL = 'gpt-4o-mini'

export class AIService implements IAiService {
  token: string
  private client?: OpenAI

  constructor(token?: string) {
    this.token = token ?? ((import.meta.env?.PUBLIC_OPENAI_API_KEY as string | undefined) ?? '')

    if (this.token) {
      this.client = this.createClient(this.token)
    }
  }

  async sendMessage(message: string): Promise<string> {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      throw new Error('Cannot send an empty message.')
    }

    if (!this.token) {
      throw new Error('Missing OpenAI token.')
    }

    const client = this.getClient()
    const response = await client.responses.create({
      model: DEFAULT_MODEL,
      input: trimmedMessage,
    })

    if (typeof response.output_text === 'string' && response.output_text.trim().length > 0) {
      return response.output_text.trim()
    }

    const fallbackText = response.output
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

  private createClient(apiKey: string) {
    return new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  private getClient() {
    if (!this.client) {
      this.client = this.createClient(this.token)
    }

    return this.client
  }
}
