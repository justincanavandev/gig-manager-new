import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { musicians, instruments, venues } from "./seedData";

const seedDatabase = async () => {
  const createInstruments = instruments.map(async (inst: string) => {
    return await prisma.instrument.create({
      data: {
        name: inst,
      },
    });
  });
  await Promise.all(createInstruments);

  const createMusicians = musicians.map(async (musician) => {
    const { name, phoneNumber, email, instrument } = musician;
    return await prisma.musician.create({
      data: {
        name,
        phoneNumber,
        email,
        instruments: {
          create: [
            {
              instrument: {
                connectOrCreate: {
                  where: {
                    name: instrument,
                  },
                  create: {
                    name: instrument,
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
  await Promise.all(createMusicians);

  const createVenues = venues.map(async (venue) => {
    const { name, location } = venue;
    const { address, city, zipCode, state } = location;
    return await prisma.venue.create({
      data: {
        name,
        location: {
          create: {
            address,
            city,
            zipCode,
            state,
          },
        },
      },
    });
  });
  await Promise.all(createVenues);
};

seedDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
