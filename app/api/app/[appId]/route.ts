import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { platformClient } from '@/app/api/utils/common'

export async function GET(request: NextRequest, { params }: {
  params: { appId: string }
}) {
  try {
    const { data } = await platformClient.getAppById(params.appId)
    return NextResponse.json(data as object)
  }
  catch (error) {
    return NextResponse.json([])
  }
}
