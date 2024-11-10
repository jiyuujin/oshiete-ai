import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { RequestProps } from '$lib/types/chat'
import { ANTHROPIC_API_KEY, GOOGLE_API_KEY, OPENAI_API_KEY } from '$env/static/private'

export async function openAI({ model, messageFeeds }: RequestProps) {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })

  const result = await openai.chat.completions.create({
    model,
    messages: messageFeeds.map((m) => ({ role: 'user', content: m.message })),
  })
  return result.choices[0].message.content
}

export async function anthropic({ model, messageFeeds }: RequestProps) {
  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  })

  const result = await anthropic.messages.create({
    model,
    messages: messageFeeds.map((m) => ({ role: 'user', content: m.message })),
    max_tokens: 1024,
  })
  return result.content[0].text
}

export async function google({ model, messageFeeds }: RequestProps) {
  const google = new GoogleGenerativeAI(GOOGLE_API_KEY)

  const result = await google
    .getGenerativeModel({ model })
    .generateContent(messageFeeds[messageFeeds.length - 1].message)
  return result.response.text()
}
