import { askAnthropic, askGoogle, askOpenAI } from '$lib/repositories/chat.repository'
import type { Provider } from '$lib/types/chat'
import { json, type RequestHandler } from '@sveltejs/kit'
import { match } from 'ts-pattern'

export const POST = async function ({ request }) {
  const requestJson = await request.json()
  if (!requestJson) {
    return json({
      error: {
        status: 400,
        message: 'Please enter a valid prompt',
      },
    })
  }

  try {
    const result = await match<Provider>(requestJson.provider)
      .with('openai', () =>
        askOpenAI({
          model: requestJson.model,
          messageFeeds: requestJson.messageFeeds,
        }),
      )
      .with('anthropic', () =>
        askAnthropic({
          model: requestJson.model,
          messageFeeds: requestJson.messageFeeds,
        }),
      )
      .with('google', () =>
        askGoogle({
          model: requestJson.model,
          messageFeeds: requestJson.messageFeeds,
        }),
      )
      .exhaustive()

    return json({ code: 200, result })
  } catch (error) {
    return json({
      error: {
        code: 500,
        message: 'An error occurred during your request.',
      },
    })
  }
} satisfies RequestHandler
