import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Function to create multer instance with dynamic destination
const createMulter = (subPath: string) => {
  const destinationFolder = path.join('uploads', subPath);
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  // Set up multer storage and file filter
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationFolder); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      // Define filename to avoid conflicts
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });

  const fileFilter = function (req:any, file:any, cb:any) {
    // Check if the file already exists in the destination folder
    const filePath = path.join(destinationFolder, file.originalname);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File doesn't exist, it's okay to upload
        cb(null, true);
      } else {
        // File already exists, reject the upload
        cb(new Error('File already exists!'));
      }
    });
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  // Return multer instance
  return upload;
};

export default createMulter;
