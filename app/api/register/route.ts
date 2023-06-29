import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) {
      return new NextResponse('Missing parameters', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error, 'Registration failed')

    return new NextResponse('Something went wrong', { status: 500 })
  }
}
