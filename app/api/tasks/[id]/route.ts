import prisma from '@/app/utils/connect'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    const { id } = params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 })
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    })
    return NextResponse.json(task)
  } catch (error) {
    console.error('ERROR DELETING THE TASK: ', error)
    return NextResponse.json({ error: 'Error deleting the task', status: 500 })
  }
}
