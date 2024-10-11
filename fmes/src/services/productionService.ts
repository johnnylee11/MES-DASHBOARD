import axios from 'axios';

// Define the types for production data
export interface Production {
  id: number;
  name: string;
  status: string;
}

// API calls related to production

// Get all productions with error handling
export const getProductions = async (): Promise<Production[]> => {
  try {
    const response = await axios.get<Production[]>('/api/production/get/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch productions:", error);
    throw error; // Re-throw the error so the caller knows it failed
  }
};

// Create a new production record
export const createProduction = async (data: Omit<Production, 'id'>): Promise<Production> => {
  try {
    const response = await axios.post<Production>('/api/production/create/', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create production:", error);
    throw error;
  }
};

// Update an existing production record
export const updateProduction = async (id: number, data: Omit<Production, 'id'>): Promise<Production> => {
  try {
    const response = await axios.put<Production>(`/api/production/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update production with id ${id}:`, error);
    throw error;
  }
};

// Delete a production record
export const deleteProduction = async (product_id: number): Promise<void> => {
  try {
    await axios.delete(`/api/production/delete/${product_id}`);
  } catch (error) {
    console.error(`Failed to delete production with id ${product_id}:`, error);
    throw error;
  }
};
