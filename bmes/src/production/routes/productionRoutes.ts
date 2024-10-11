import { Router } from 'express';
import { createProduction, getAllProduction, updateProduction, deleteProduction, exportProductionCSV } from '../controller/productionController';

const router = Router();

// Create a production record
router.post('/create/', createProduction);

// Get all production records
router.get('/get/', getAllProduction);

// Update a production record
router.put('/update/:product_id', updateProduction); // Update by product_id

// Delete a production record
router.delete('/delete/:product_id', deleteProduction); // Use product_id here

//export to csv
router.get('/export/csv', exportProductionCSV);


export default router;
