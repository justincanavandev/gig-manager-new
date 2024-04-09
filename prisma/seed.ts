import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedInstruments = async () => {
  const instruments = [
    "Electric Guitar",
    "Acoustic Guitar",
    "Bass",
    "Drums",
    "Percussion",
    "Vocals",
    "Keyboards",
    "Saxophone",
    "Trumpet",
    "Trombone",
  ];

  const createInstruments = instruments.map(async (inst: string) => {
    return await prisma.instrument.create({
      data: {
        name: inst,
      },
    });
  });
  await Promise.all(createInstruments);
}

seedInstruments()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
