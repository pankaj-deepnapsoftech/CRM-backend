const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Define allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."), false);
  }
};

// Multer middleware to handle file uploads
const upload = multer({ storage, fileFilter });

// Middleware to handle multiple file uploads
const uploadMiddleware = upload.fields([
  { name: "doc", maxCount: 1 },
  { name: "term", maxCount: 1 },
  { name: "contractAttachment", maxCount: 1 },
]);

module.exports = uploadMiddleware;
