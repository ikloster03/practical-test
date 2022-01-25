const yup = require('yup');
const { ObjectId } = require('mongoose').Types;

require('yup-phone');

const wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toObjectId = (_id) => ObjectId(_id);

const getNewObjectId = () => new ObjectId();

const PhoneOrUndefinedSchema = yup.lazy((value) => {
  switch (typeof value) {
    case 'undefined':
      return yup.string();
    case 'string':
      return yup.string().phone('US');
    default:
      throw new yup.ValidationError('Value must be a phone or `undefined`');
  }
});

module.exports = {
  wrapAsync, toObjectId, getNewObjectId, PhoneOrUndefinedSchema,
};
