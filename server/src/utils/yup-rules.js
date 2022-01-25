const { isValidObjectId } = require('mongoose');
const yup = require('yup');

yup.addMethod(yup.string, 'objectId', function (message = 'ObjectId is wrong') {
  return this.test('objectId', message, function (value) {
    const { createError } = this;

    return isValidObjectId(value) || createError(message);
  });
});
