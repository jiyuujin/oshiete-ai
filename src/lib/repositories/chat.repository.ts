import { models } from '$lib/models/chat.model'
import type { RequestProps } from '$lib/types/chat'

export async function askOpenAI({ model, messageFeeds }: RequestProps) {
  if (!model || !(model in models)) throw new Error('Model not found')

  try {
    return models[model]({ model, messageFeeds })
  } catch (error) {
    throw new Error('Failed to ask OpenAI')
  }
}

export async function askAnthropic({ model, messageFeeds }: RequestProps) {
  if (!model || !(model in models)) throw new Error('Model not found')

  try {
    return models[model]({ model, messageFeeds })
  } catch (error) {
    throw new Error('Failed to ask Anthropic')
  }
}

export async function askGoogle({ model, messageFeeds }: RequestProps) {
  if (!model || !(model in models)) throw new Error('Model not found')

  try {
    return models[model]({ model, messageFeeds })
  } catch (error) {
    throw new Error('Failed to ask Google')
  }
}
