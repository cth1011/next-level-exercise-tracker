import { PrismaClient } from "@prisma/client";
import { EXERCISES } from "./constant";
const prisma = new PrismaClient();
const userData = [
  {
    email: "guest@trial.com",
    name: "Guest User",
  },
  {
    email: "test@gmail.com",
    name: "Test Dummy",
  },
];

async function main() {
  const user = await prisma.user.createMany({
    data: userData,
  });
  // Create template

  for (const exercise of EXERCISES) {
    const result = await prisma.exercise.create({
      data: exercise,
    });
    console.log(`Created exercise with id: ${result.id}`);
  }

  await prisma.template.create({
    data: {
      workout_name: "Leg Day",
      exercises: {
        create: [
          {
            exercise: { connect: { id: 2 } },
            sets: 3,
          },
        ],
      },
      last_date_performed: new Date("2022-04-15T18:00:00Z"),
      user: { connect: { id: 1 } },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
