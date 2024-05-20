import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { musicians, instruments, venues, gigs } from "./seedData";

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

  const createGigs = gigs.map(async (gig) => {
    const { name, startTime, endTime, venue, musicians, instrumentation, pay } = gig;

    const musicianObjs = await prisma.musician.findMany({
      select: {
        name: true,
        id: true,
        instruments: {
          include: {
            instrument: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const musicianData = musicians.map((m) => {
      const match = musicianObjs.find((mus) => m.name === mus.name);
      if (match) {
        return {
          ...m,
          id: match.id,
        };
      }
    });

    // Make sure to CREATE A USER, GRAB THE ID, and CHANGE ID IN ORGANIZER BELOW every time you run seed!

    return await prisma.gig.create({
      data: {
        name,
        startTime,
        endTime,
        pay,
        organizer: {
          connect: {
            id: 'clwf9lee3000hjssnx12fd971',
          },
        },
        venue: {
          connect: {
            name: venue,
          },
        },
        musicians: {
          create: musicianData.map((mus) => ({
            musician: {
              connect: {
                id: mus?.id,
              },
            },
            instrument: {
              connect: {
                name: mus?.inst,
              },
            },
          })),
        },
        instrumentation: {
          create: instrumentation.map((name) => ({
            instrument: {
              connect: {
                name,
              },
            },
          })),
        },
      },
    });
  });
  await Promise.all(createGigs);
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
