const express = require("express");
const Excel = require("../../models/excel");

// Create a new record
const createRecord = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      custumerName,
      phnNumber,
      contractType,
      otherContractType,
      contractNumber,
      productName,
      mode,
      otherMode,
      renewalDate,
      lastRenewalDate,
      renewalTimes,
    } = req.body;

    // Base URL where your backend is hosted
    const baseUrl = process.env.IMG_BASE_URL;

    // Construct public URLs for images
    const doc = req.files["doc"]
      ? `${baseUrl}/images/${req.files["doc"][0].filename}`
      : null;
    const term = req.files["term"]
      ? `${baseUrl}/images/${req.files["term"][0].filename}`
      : null;
    const contractAttachment = req.files["contractAttachment"]
      ? `${baseUrl}/images/${req.files["contractAttachment"][0].filename}`
      : null;

    const newRecord = new Excel({
      custumerName,
      phnNumber,
      contractType: contractType === "Other" ? otherContractType : contractType,
      otherContractType: contractType === "Other" ? otherContractType : null,
      contractNumber,
      productName,
      doc,
      term,
      mode: mode === "Other" ? otherMode : mode,
      otherMode: mode === "Other" ? otherMode : null,
      contractAttachment,
      renewalDate,
      lastRenewalDate,
      renewalTimes,
    });

    await newRecord.save();
    res.status(201).json({ success: true, data: newRecord });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Excel.find();

    const formattedRecords = records.map((record) => ({
      _id: record._id,
      contractType: record.contractType || "N/A",
      otherMode: record.otherMode || "N/A",
      custumerName: record.custumerName || "N/A",
      phnNumber: record.phnNumber || "N/A",
      contractNumber: record.contractNumber || "N/A",
      productName: record.productName || "N/A",
      doc: record.doc || "N/A",
      mode: record.otherMode || "N/A",
      contractAttachment: record.contractAttachment || "N/A",
      renewalDate: record.renewalDate || "N/A",
      lastRenewalDate: record.lastRenewalDate || "N/A",
      renewalTimes: record.renewalTimes || "N/A",

      createdAt: record.createdAt || new Date(),
    }));

    res.status(200).json({ success: true, data: formattedRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single record by ID
const getRecordById = async (req, res) => {
  try {
    const record = await Excel.findById(req.params.id);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a record by ID

const updateRecord = async (req, res) => {
  try {
    const {
      custumerName,
      phnNumber,
      contractType,
      otherContractType,
      contractNumber,
      productName,
      mode,
      otherMode,
      renewalDate,
      lastRenewalDate,
      renewalTimes,
    } = req.body;

    const { doc, term, contractAttachment } = req.files || {};

    // Validate required fields
    // if (!custumerName || !contractNumber) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Customer Name and Contract Number are required",
    //   });
    // }

    // Prepare update data
    const updateData = {
      custumerName,
      phnNumber,
      contractNumber,
      productName,
      renewalDate,
      lastRenewalDate,
      renewalTimes,
    };

    // Handle contract type
    updateData.contractType =
      contractType === "other" ? otherContractType : contractType;

    // Handle mode
    updateData.mode = mode === "other" ? otherMode : mode;

    // Handle file uploads
    if (doc) updateData.doc = doc[0].filename;
    if (term) updateData.term = term[0].filename;
    if (contractAttachment)
      updateData.contractAttachment = contractAttachment[0].filename;

    // Update the record in the database
    const updatedRecord = await Excel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Delete a record by ID
const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Excel.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const DateWiseRecord = async (_req, res) => {
  try {
    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

   
    const records = await Excel.find();
    const filter = records.filter((item)=> item.lastRenewalDate >= currentDate && item.lastRenewalDate <= sevenDaysFromNow)

    return res.status(200).json({
      data: filter,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "something wrong",
    });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  DateWiseRecord,
};
