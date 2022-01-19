const dotenv = require('dotenv');
const path = require('path');
const yup = require('yup');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const schema = yup.object()
  .noUnknown()
  .shape({
    NODE_ENV: yup.string().oneOf(['development', 'production']).default('production'),
    PORT: yup.number().default(3000),
    MONGODB_URL: yup.string().required(),
  });

let env = {};

try {
  env = schema.validateSync(process.env);
} catch (err) {
  throw new Error(`Config validation error: ${err.name}`);
}

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongoose: {
    url: env.MONGODB_URL,
    options: {},
  },
};
