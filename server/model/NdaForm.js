const mongoose = require("mongoose");

const ndaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A user id is required."],
    },
    name: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
      require: true,
    },
    contractDate: {
      type: Date,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },

    // Disclosing Party
    discloserName: {
      type: String,
      require: true,
    },
    discloserBusiness: {
      type: String,
      require: true,
    },
    discloserEntity: {
      type: String,
      require: true,
    },
    discloserAddressStreet: {
      type: String,
      require: true,
    },
    discloserAddressStreet2: {
      type: String,
      require: true,
    },
    discloserAddressCity: {
      type: String,
      require: true,
    },
    discloserAddressState: {
      type: String,
      require: true,
    },
    discloserAddressZipcode: {
      type: String,
      require: true,
    },

    // Recipient
    recipientName: {
      type: String,
    },
    recipientEntity: {
      type: String,
    },
    recipientAddressStreet: {
      type: String,
    },
    recipientAddressStreet2: {
      type: String,
    },
    recipientAddressCity: {
      type: String,
    },
    recipientAddressState: {
      type: String,
    },
    recipientAddressZipcode: {
      type: String,
    },
    disclosingToReceiving: {
      type: String,
    },
    receivingToDisclosing: {
      type: String,
    },

    // Confidentiality
    confidentialityAll: {
      type: Boolean,
      default: false,
    },
    confidentiality_1: {
      type: String,
    },
    confidentiality_2: {
      type: String,
    },
    confidentiality_3: {
      type: String,
    },
    confidentiality_4: {
      type: String,
    },
    confidentiality_5: {
      type: String,
    },
    confidentiality_6: {
      type: String,
    },
    confidentiality_other: {
      type: String,
    },
    otherInformation: {
      type: String,
    },

    // Term
    timePeriod: {
      type: String,
    },
    terminationYears: {
      type: String,
    },
    terminationOccurence: {
      type: String,
    },
    terminationException: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NdaForm", ndaSchema);
