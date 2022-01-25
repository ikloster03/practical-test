const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *    Provider:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        seeded:
 *          type: boolean
 *        example:
 *          id: 5ebac534954b54139806c112
 *          name: fake name
 *          seeded: false
 */
const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seeded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Provider', ProviderSchema);
