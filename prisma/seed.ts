import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.upsert({
    where: {
      id: 1
    },
    update: {},
    create: {
      name: "ADMIN"
    }
  });

  console.log({ role });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });