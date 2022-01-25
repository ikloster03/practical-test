const yup = require('yup');

require('../../utils/yup-rules');

const providerParamsSchema = yup.object({
  id: yup.string().objectId(),
});

const providerSchema = yup.object({
  name: yup.string().min(1).required(),
});

module.exports = { providerParamsSchema, providerSchema };
