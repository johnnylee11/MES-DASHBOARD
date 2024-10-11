// Importing necessary modules
import express from 'express';
import {
  createQualityControl,   // Controller to handle creation of quality control records
  getAllQualityControl,    // Controller to retrieve all quality control records
  updateQualityControl,    // Controller to update a specific quality control record
  deleteQualityControl,    // Controller to delete a specific quality control record
  exportQualityControlCSV  // Controller to export quality control data as CSV
} from '../controller/qcController';

const router = express.Router();  // Initializing express Router to define API routes

// Route to create a new quality control record
router.post('/create/', createQualityControl);

// Route to get all quality control records
router.get('/get/', getAllQualityControl);

// Route to update a specific quality control record based on inspection_id
router.put('/update/:inspection_id', updateQualityControl);

// Route to delete a specific quality control record based on inspection_id
router.delete('/delete/:inspection_id', deleteQualityControl);

// Route to export all quality control data as a CSV file
router.get('/export/csv', exportQualityControlCSV);

export default router;  // Export the router to be used in the main app
