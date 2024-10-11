import axios from 'axios';

// Define the types for quality control inspections
export interface Inspection {
  inspection_id: number; // Assuming the API uses inspection_id
  product_id: number;
  inspection_date: string;
  result: string;
  scheduled_date: string | null;
}

// Get all inspections with error handling
export const getInspections = async (): Promise<Inspection[]> => {
  try {
    const response = await axios.get<Inspection[]>('/api/quality-control/get/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch inspections:", error);
    throw error;
  }
};

// Create a new inspection record
export const createInspection = async (data: Omit<Inspection, 'inspection_id'>): Promise<Inspection> => {
  try {
    const response = await axios.post<Inspection>('/api/quality-control/create/', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create inspection:", error);
    throw error;
  }
};

// Update an existing inspection record
export const updateInspection = async (id: number, data: Omit<Inspection, 'inspection_id'>): Promise<Inspection> => {
  try {
    const response = await axios.put<Inspection>(`/api/quality-control/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update inspection with id ${id}:`, error);
    throw error;
  }
};

// Delete an inspection record
export const deleteInspection = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/quality-control/delete/${id}`);
  } catch (error) {
    console.error(`Failed to delete inspection with id ${id}:`, error);
    throw error;
  }
};
