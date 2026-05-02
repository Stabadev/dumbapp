import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();

  const contactRequest = await prisma.contactRequest.create({
    data: {
      name: String(data.name),
      email: String(data.email),
      message: String(data.message),
    },
  });

  return Response.json({
    success: true,
    contactRequest,
  });
}
