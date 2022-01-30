const yup = require('yup');
const { PhoneOrUndefinedSchema } = require('../../utils');

require('yup-phone');
require('../../utils/yup-rules');

const clientParamsSchema = yup.object({
  id: yup.string().objectId(),
});

const clientCreatingSchema = yup.object({
  name: yup.string().min(1).required(),
  email: yup.string().email().required(),
  phone: yup.string().phone('US').required(),
  providers: yup.array().of(yup.string().objectId()),
});

const clientUpdatingSchema = yup.object({
  name: yup.string().min(1),
  email: yup.string().email(),
  phone: PhoneOrUndefinedSchema,
  providers: yup.array().of(yup.string().objectId()),
});

module.exports = { clientParamsSchema, clientCreatingSchema, clientUpdatingSchema };
