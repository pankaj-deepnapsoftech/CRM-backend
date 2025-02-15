const express = require("express");
const {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../../controllers/excel/controller.js");
const uploadMiddleware = require("../../utils/RenewalMulter.js");

const router = express.Router();

// Define the route with middleware for file upload
router.post("/create-record", uploadMiddleware, createRecord);
router.get("/all-records", getAllRecords);
router.get("/record/:id", getRecordById);
router.put("/update-record/:id", updateRecord);
router.delete("/delete-record/:id", deleteRecord);

module.exports = router;
