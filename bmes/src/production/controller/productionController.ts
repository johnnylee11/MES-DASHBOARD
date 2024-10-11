import { Request, Response } from 'express';
import { pool } from '../../db';
import { QueryResult } from 'pg';
import path from 'path';
import { Parser } from 'json2csv';
import fs from 'fs';

// Create Production Record
export const createProduction = async (req: Request, res: Response) => {
  const { name, status, material } = req.body;
  try {
    const result: QueryResult = await pool.query(
      'INSERT INTO production (name, status, material) VALUES ($1, $2, $3) RETURNING *',
      [name, status, material]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Get All Production Records
export const getAllProduction = async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM production');
    res.json(result.rows);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Update Production Record
export const updateProduction = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const { name, status } = req.body;
  try {
    const result: QueryResult = await pool.query(
      'UPDATE production SET name = $1, status = $2 WHERE product_id = $3 RETURNING *',
      [name, status, product_id]
    );

    if (result.rowCount === 0) {
      // If no rows were affected, return a "Not Found" response
      res.status(404).send(`Record with Product ID ${product_id} not found.`);
      console.log(`Record with Product ID ${product_id} not found.`);
    } else {
      // If update was successful, send the updated record
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};


// Delete Production Record
export const deleteProduction = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  try {
    const result = await pool.query('DELETE FROM production WHERE product_id = $1', [product_id]);  // Deleting based on product_id
    
    if (result.rowCount === 0) {
      // If no rows were affected, return a "Not Found" response
      res.status(404).send(`Record with Product ID ${product_id} not found.`);
      console.log(`Record with Product ID ${product_id} not found.`);
    } else {
      // If deletion was successful, send confirmation
      res.send('Record Deleted');
    }
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
};

// Export Production Data as CSV
export const exportProductionCSV = async (req: Request, res: Response): Promise<void> => {
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

    const result = await pool.query('SELECT * FROM production');

    if (result.rows.length === 0) {
      res.status(404).send('No data available to export.');
      return;  // Exit early if no data
    }

    const fields = ['product_id', 'name', 'material', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(result.rows);

    const exportDir = path.join(__dirname, '../../exports');

    // Ensure the 'exports' directory exists
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, `Production_report_${dateString}.csv`);
    fs.writeFileSync(filePath, csv);

    // Ensure that res.download is correctly handled
    res.download(filePath, 'production_report.csv', (err: Error | null) => {
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

