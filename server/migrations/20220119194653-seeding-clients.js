const faker = require('faker/locale/en_US');

const AMOUNT_OF_CLIENTS = 15;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function* fakeClientGenerator() {
  let i = 0;

  while (i < AMOUNT_OF_CLIENTS) {
    i += 1;
    yield {
      name: faker.fake('{{name.firstName}} {{name.lastName}}'),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('(!##) !##-####'),
      providers: [],
      seeded: true,
    };
  }
}

async function getRandomProviders(dbProvider) {
  return dbProvider.aggregate(
    [{ $sample: { size: getRandom(0, 4) } }],
  ).toArray();
}

module.exports = {
  async up(db) {
    const fakeClients = [...fakeClientGenerator()];

    for await (const client of fakeClients) {
      const fakeProviders = await getRandomProviders(db.collection('providers'));

      client.providers = fakeProviders.map((p) => p._id);
    }

    await db.collection('clients').insertMany(fakeClients);
  },

  async down(db) {
    await db.collection('clients').deleteMany({ seeded: true });
  },
};
