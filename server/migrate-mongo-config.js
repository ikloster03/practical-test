const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, './.env') });

module.exports = {
  mongodb: {
    url: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};
