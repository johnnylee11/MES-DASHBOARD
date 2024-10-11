# ASeriousTask Overview
This Manufacturing Execution System (MES) project is built using Vue.js for the frontend and Express.js with TypeScript for the backend, connected to PostgreSQL for data management. The system features a dashboard that provides real-time insights into production and quality control processes. Users can manage production data, track product statuses from raw materials to finished goods, and conduct quality inspections. It supports full CRUD functionality, data export as CSV, and visualizes key metrics such as production status, machine utilization, and defect rates.

# Make sure Node.js is installed

# PostgreSQL
Navigate to https://www.postgresql.org/download/windows/

Run the following to create table after database created
Create Table:

CREATE TABLE production (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    material VARCHAR(255)
);

CREATE TABLE quality_control (
    inspection_id SERIAL PRIMARY KEY,     -- Auto-incrementing primary key
    product_id INTEGER NOT NULL,          -- Product ID, assuming it references a product table
    inspection_date DATE NOT NULL,        -- Date when the inspection was conducted
    result VARCHAR(50) NOT NULL,          -- Result of the inspection (e.g., Passed, Failed)
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(), -- Timestamp when the record was created
    scheduled_date DATE NOT NULL          -- Date when the inspection was scheduled
);

Configure DB Settings (backend - db.ts):

![Screenshot 2024-10-12 022355](https://github.com/user-attachments/assets/6c3b2317-20f6-47ff-8c92-f8544954675d)

# Install Vue.js
npm install -g @vue/cli

# Typescript
npm install typescript

# Tailwind CSS
npm install tailwindcss postcss autoprefixer


# NPM INSTALL

Run in terminal:

### Frontend (fmes):
1. Change directory:
   ```bash
   cd fmes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install **Axios**:
   ```bash
   npm install axios
   npm install @types/axios
   ```

### Backend (bmes):
1. Change directory:
   ```bash
   cd bmes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. After installing node_modules, compile TypeScript:
   ```bash
   npx tsc
   ```

# Running

Run in terminal:

### Frontend:
   ```bash
   npm run serve
   ```

### Backend:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```
