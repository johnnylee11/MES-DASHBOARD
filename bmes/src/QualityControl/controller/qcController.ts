import { Request, Response } from 'express';
import { pool } from '../../db';
import { QueryResult } from 'pg';
import path from 'path';
import { Parser } from 'json2csv';
import fs from 'fs';

// Create Quality Control Record
export const createQualityControl = async (req: Request, res: Response) => {
  const { product_id, inspection_date, scheduled_date, result: inspection_result } = req.body;
  try {
    const result: QueryResult = await pool.query(
      'INSERT INTO quality_control (product_id, inspection_date, scheduled_date, result) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_id, inspection_date, scheduled_date, inspection_result]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Get All Quality Control Records
export const getAllQualityControl = async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM quality_control');
    res.json(result.rows);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Update Quality Control Record
export const updateQualityControl = async (req: Request, res: Response) => {
  const { inspection_id } = req.params;
  const { product_id, inspection_date, scheduled_date, result: inspection_result } = req.body; // Added scheduled_date

  try {
    const result: QueryResult = await pool.query(
      'UPDATE quality_control SET product_id = $1, inspection_date = $2, scheduled_date = $3, result = $4 WHERE inspection_id = $5 RETURNING *',
      [product_id, inspection_date, scheduled_date, inspection_result, inspection_id] // Updated SQL query to include scheduled_date
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Delete Quality Control Record
export const deleteQualityControl = async (req: Request, res: Response) => {
  const { inspection_id } = req.params;  // Changed 'id' to 'inspection_id'
  try {
    await pool.query('DELETE FROM quality_control WHERE inspection_id = $1', [inspection_id]);  // Using inspection_id
    res.send('Record Deleted');
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};


// Export Quality Control Data as CSV
export const exportQualityControlCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get the current date and time
    const now = new Date();

    // Malaysia is UTC+8, so we adjust the time accordingly
    const malaysiaOffset = 8 * 60; // Malaysia is 8 hours ahead of UTC in minutes
    const localTime = new Date(now.getTime() + malaysiaOffset * 60 * 1000);

    // Format the adjusted date and time similar to your existing format
    const dateString = localTime.toISOString()
      .slice(0, 19) // Take the part up to seconds, discard milliseconds and 'Z'
      .replace('T', ' ') // Replace 'T' separator with a space
      .replace(/:/g, '-'); // Replace colons with dashes for valid file name

    const result: QueryResult = await pool.query('SELECT * FROM quality_control');

    if (result.rows.length === 0) {
      res.status(404).send('No quality control data available to export.');
      return;
    }

    // Modify the date fields to only show the date in YYYY-MM-DD format
    const formattedRows = result.rows.map(row => ({
      ...row,
      inspection_date: new Date(row.inspection_date).toISOString().slice(0, 10),
      scheduled_date: new Date(row.scheduled_date).toISOString().slice(0, 10)
    }));

    const fields = ['inspection_id', 'product_id', 'inspection_date', 'scheduled_date', 'result']; // Define CSV headers
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(formattedRows);

    // Create a CSV file and save it in the 'exports' folder
    const filePath = path.join(__dirname, '../../exports', `QualityControl_report_${dateString}.csv`);
    fs.writeFileSync(filePath, csv);

    // Send the CSV file as a download
    res.download(filePath, 'quality_control_report.csv', (err: Error | null) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading the file.');
      } else {
        console.log('CSV report generated and downloaded successfully.');
      }
    });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

