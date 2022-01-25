const faker = require('faker');

const AMOUNT_OF_PROVIDERS = 5;

function* fakeCompanyNameGenerator() {
  let i = 0;

  while (i < AMOUNT_OF_PROVIDERS) {
    i += 1;
    yield faker.company.companyName();
  }
}

module.exports = {
  async up(db) {
    const companyNames = [...fakeCompanyNameGenerator()];

    const fakeProviders = companyNames.map((name) => ({
      name,
      seeded: true,
    }));

    await db.collection('providers').insertMany(fakeProviders);
  },

  async down(db) {
    await db.collection('providers').deleteMany({ seeded: true });
  },
};
