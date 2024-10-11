<template>
  <div class="p-6">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold">Production Dashboard</h1>
    </div>

    <div class="flex justify-center space-x-4 mt-8">
      <!-- Create New Inspection Button -->
      <button @click="showCreateModal"
        class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center">
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" /> Create Inspection Record
      </button>

      <!-- Export Button -->
      <button @click="exportCsv"
        class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center">
        <i class="fas fa-file-export mr-2"></i> Export
      </button>
    </div>

    <!-- Production List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="production in productions" :key="production.product_id"
        class="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 class="text-xl font-bold mb-4">{{ production.name }}</h3>
        <p class="text-gray-500">Product ID: {{ production.product_id }}</p>
        <p class="text-gray-500">Material: {{ production.material }}</p>

        <!-- Status Display -->
        <div class="mt-4">
          <span v-if="production.status === 'Completed'"
            class="px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-medium mt-4 block">Completed</span>
          <span v-else class="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium mt-4 block">In
            Progress</span>

        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4 mt-4">
          <!-- Edit Production -->
          <button @click="showEditModal(production)"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            <font-awesome-icon :icon="['fas', 'edit']" /> Edit
          </button>

          <!-- Delete Production -->
          <button @click="deleteProduction(production.product_id)"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            <font-awesome-icon :icon="['fas', 'trash']" /> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Create New Production</h2>

        <!-- Form for New Production -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input v-model="newProductionName" type="text" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Material:</label>
          <input v-model="newMaterialName" type="text" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select v-model="newProductionStatus" class="w-full p-2 border rounded">
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <!-- Modal Buttons -->
        <div class="flex justify-end">
          <button @click="hideCreateModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="createNewProduction" class="bg-green-500 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Edit Production</h2>

        <!-- Form for Editing Production -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input v-model="editedProductionName" type="text" class="w-full p-2 border rounded" disabled>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select v-model="editedProductionStatus" class="w-full p-2 border rounded">
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <!-- Modal Buttons -->
        <div class="flex justify-end">
          <button @click="hideEditModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="updateProduction" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Import the FontAwesome library and icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faPlus, faEdit, faTrash);

import { getProductions, createProduction, updateProduction, deleteProduction } from '@/services/productionService';

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      productions: [], // List of productions
      showCreateModalVisible: false, // For showing/hiding Create modal
      showEditModalVisible: false, // For showing/hiding Edit modal
      newProductionName: '', // To store the new production name
      newMaterialName: '', // To store the new material name
      newProductionStatus: 'In Progress', // To store the new production status
      editedProductionId: null, // ID of the production being edited
      editedProductionName: '', // Name of the production being edited
      editedProductionStatus: '', // Status of the production being edited
    };
  },
  async mounted() {
    try {
      this.productions = await getProductions(); // Load all productions on mount
    } catch (error) {
      console.error('Failed to load productions:', error);
    }
  },
  methods: {
    showCreateModal() {
      this.showCreateModalVisible = true;
    },
    hideCreateModal() {
      this.showCreateModalVisible = false;
      this.newProductionName = ''; // Reset inputs
      this.newProductionStatus = 'In Progress';
    },
    // Show Edit Modal and populate it with selected production's data
    showEditModal(production) {
      this.editedProductionId = production.product_id;
      this.editedProductionName = production.name;
      this.editedProductionStatus = production.status;
      this.showEditModalVisible = true;
    },
    hideEditModal() {
      this.showEditModalVisible = false;
      this.editedProductionName = ''; // Reset inputs
      this.editedProductionStatus = '';
    },
    // Create New Production
    async createNewProduction() {
      const newProduction = {
        name: this.newProductionName, // Use the input value
        status: this.newProductionStatus, // Use the selected status
        material: this.newMaterialName
      };
      try {
        const createdProduction = await createProduction(newProduction);
        this.productions.push(createdProduction); // Add new production to the list
        this.hideCreateModal(); // Hide the modal after creation
      } catch (error) {
        console.error('Failed to create production:', error);
      }
    },
    // Update the selected production
    async updateProduction() {
      const updatedProduction = {
        name: this.editedProductionName, // Use the input value
        status: this.editedProductionStatus, // Use the selected status
      };
      try {
        const updated = await updateProduction(this.editedProductionId, updatedProduction);
        const index = this.productions.findIndex(prod => prod.product_id === this.editedProductionId);
        if (index !== -1) {
          this.productions[index] = updated; // Update the local list with the new data
        }
        this.hideEditModal(); // Hide the modal after update
      } catch (error) {
        console.error('Failed to update production:', error);
      }
    },
    // Delete a Production
    async deleteProduction(id) {
      try {
        await deleteProduction(id);
        this.productions = this.productions.filter(prod => prod.product_id !== id); // Update the list
      } catch (error) {
        console.error(`Failed to delete production with id ${id}:`, error);
      }
    },
    async exportCsv() {
      try {
        // Directly navigating to the endpoint to trigger download
        window.location.href = '    http://localhost:3000/api/production/export/csv';
      } catch (error) {
        console.error('Error exporting CSV:', error);
      }
    }
  }
};
</script>


<style scoped>
/* Custom styling for the grid and buttons */
h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.grid {
  margin-top: 20px;
}

button {
  transition: background-color 0.3s;
}

/* Modal styling */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: black;
  letter-spacing: 1px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); /* Optional: Adds a subtle shadow */
}
</style>
