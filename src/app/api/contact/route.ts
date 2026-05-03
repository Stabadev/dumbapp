import { prisma } from "@/lib/prisma";
import { contactRequestSchema } from "@/lib/validations/contact";

export async function GET() {
  const data = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  const result = contactRequestSchema.safeParse(data);

  if (!result.success) {
    return Response.json(
      {
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const contactRequest = await prisma.contactRequest.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    },
  });

  return Response.json({
    success: true,
    contactRequest,
  });
}
