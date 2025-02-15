const mongoose = require("mongoose");

const excelSchema = mongoose.Schema(
  {
    custumerName: {
      type: String,
      required: true,
    },
    phnNumber: {
      type: Number,
      required: true,
    },
    contractType: {
      type: String,
      required: true,
    },
    otherContractType: {
      type: String,
      default: null, // Stores custom contract type if "Other" is selected
    },
    contractNumber: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    doc: {
      type: String,
      default: null,
    },
    term: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      required: true,
    },
    otherMode: {
      type: String,
      default: null, // Stores custom mode if "Other" is selected
    },
    contractAttachment: {
      type: String,
      default: null,
    },
    renewalDate: {
      type: String,
      required: true,
    },
    lastRenewalDate: {
      type: String,
      required: true,
    },
    renewalTimes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Fixed the typo (timeStamps -> timestamps)
  }
);

const excelModel = mongoose.model("Excel", excelSchema);

module.exports = excelModel;
