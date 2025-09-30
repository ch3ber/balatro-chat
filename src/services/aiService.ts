import OpenAI from 'openai'
import type { IAiService } from './IAiService'

export class AIService implements IAiService {
  sendMessage(message: string): Promise<string> {
    // const client = new OpenAI({
    //   apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    // });
    // const response = await client.responses.create({
    //   model: 'gpt-4o',
    //   instructions: 'You are a coding assistant that talks like a pirate',
    //   input: 'Are semicolons optional in JavaScript?',
    // });
    // console.log(response.output_text);
  }
}
