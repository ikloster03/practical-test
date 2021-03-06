const mongoose = require('mongoose');
const yup = require('yup');

require('yup-phone');

const emailSchema = yup.string().email().required();
const phoneSchema = yup.string().phone('US').required();

/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *        phone:
 *          type: string
 *        providers:
 *          type: array
 *          items:
 *            type: string
 *        seeded:
 *          type: boolean
 */
const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => emailSchema.validateSync(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => phoneSchema.validateSync(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    providers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Provider',
      },
    ],
    seeded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Client', ClientSchema);
