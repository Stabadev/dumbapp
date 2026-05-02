import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { status } = await request.json();

  const updated = await prisma.contactRequest.update({
    where: { id: Number(id) },
    data: { status },
  });

  return Response.json(updated);
}
