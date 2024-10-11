import express from 'express';
import {
  createQualityControl,
  getAllQualityControl,
  updateQualityControl,
  deleteQualityControl,
  exportQualityControlCSV
} from '../controller/qcController';

const router = express.Router();

router.post('/create/', createQualityControl);
router.get('/get/', getAllQualityControl);
router.put('/update/:inspection_id', updateQualityControl);  
router.delete('/delete/:inspection_id', deleteQualityControl);  
router.get('/export/csv', exportQualityControlCSV)

export default router;
