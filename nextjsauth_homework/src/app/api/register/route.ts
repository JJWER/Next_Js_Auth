import { PrismaClient } from '@prisma/client';
import { Response } from 'node-fetch';

const prisma = new PrismaClient();

interface RequestBody {
  username: string;
  name: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const user = await prisma.user.create({
      data: {
        email: body.username,
        name: body.name,
        password: body.password, // หมายเหตุ: ควรเข้ารหัสรหัสผ่านก่อนเก็บลงในฐานข้อมูล
      },
    });

    if (user) {
      const { password, ...noPassword } = user;
      return new Response(JSON.stringify(noPassword), { status: 201 }); // ส่ง HTTP status code 201 (Created)
    }

    return new Response(JSON.stringify(null), { status: 500 }); // ส่ง HTTP status code 500 (Internal Server Error)
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
