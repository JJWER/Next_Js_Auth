import { PrismaClient } from '@prisma/client';
import { Response } from 'node-fetch';

const prisma = new PrismaClient();

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password, // หมายเหตุ: ควรเข้ารหัสรหัสผ่านก่อนเก็บลงในฐานข้อมูล
      },
    });

    if (user) {
      const { password, ...noPassword } = user;
      return new Response(JSON.stringify(noPassword), { status: 200, headers: { 'Content-Type': 'application/json' } }); // ส่ง HTTP status code 200 (OK) พร้อมกับหัวเรื่องข้อมูล
    }

    return new Response(JSON.stringify(null), { status: 404, headers: { 'Content-Type': 'application/json' } }); // ส่ง HTTP status code 404 (Not Found) เมื่อไม่พบผู้ใช้
  } catch (error) {
    console.error('Error checking user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  } finally {
    await prisma.$disconnect();
  }
}
