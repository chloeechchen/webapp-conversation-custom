import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
  params: { taskId: string }
}) {
  const body = await request.json()
  const {
    inputs,
    query,
    files,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  const { user } = getInfo(request)
  // TODO
  // const res = await client.createChatMessage(params.appId, inputs, query, user, responseMode, conversationId, files)
  // return new Response(res.data as any)
  return new Response([] as any)
}
