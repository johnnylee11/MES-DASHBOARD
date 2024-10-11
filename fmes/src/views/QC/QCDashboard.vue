<template>
  <div class="qc-dashboard p-6">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold">Quality Control Dashboard</h1>
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

    <!-- Inspection List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="inspection in inspectionsWithProductName" :key="inspection.inspection_id"
        class="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 class="text-xl font-bold mb-4">Product: {{ inspection.product_name }}</h3>
        <p class="text-gray-500">Product ID: {{ inspection.product_id }}</p>
        <p class="text-gray-500">Inspection ID: {{ inspection.inspection_id }}</p>
        <p class="text-gray-500">Inspection Date: {{ formatDate(inspection.inspection_date) }}</p>
        <p class="text-gray-500">Scheduled Date: {{ formatDate(inspection.scheduled_date) }}</p>
        <div>
          <span v-if="inspection.result === 'Passed'"
            class="px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-medium mt-4 block">Passed</span>
          <span v-else-if="inspection.result === 'Failed'"
            class="px-4 py-2 bg-red-200 text-red-800 rounded-full text-sm font-medium mt-4 block">Failed</span>
          <span v-else
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium mt-4 block">Pending</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4 mt-4">
          <!-- Edit Inspection -->
          <button @click="showEditModal(inspection)"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            <font-awesome-icon :icon="['fas', 'edit']" /> Edit
          </button>

          <!-- Delete Inspection -->
          <button @click="deleteInspection(inspection.inspection_id)"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            <font-awesome-icon :icon="['fas', 'trash']" /> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Create New Inspection</h2>

        <!-- Form for New Inspection -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Product ID:</label>
          <input v-model="newInspectionProductID" type="text" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Inspection Date:</label>
          <input v-model="newInspectionDate" type="date" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Scheduled Date:</label>
          <input v-model="newInspectionScheduledDate" type="date" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Result:</label>
          <select v-model="newInspectionResult" class="w-full p-2 border rounded">
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <!-- Modal Buttons -->
        <div class="flex justify-end">
          <button @click="hideCreateModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="createNewInspection" class="bg-green-500 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Edit Inspection</h2>

        <!-- Form for Editing Inspection -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Product ID:</label>
          <input v-model="editedInspectionProductID" type="text" class="w-full p-2 border rounded" disabled>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Inspection Date:</label>
          <input v-model="editedInspectionDate" type="date" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Scheduled Date:</label>
          <input v-model="editedInspectionScheduledDate" type="date" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Result:</label>
          <select v-model="editedInspectionResult" class="w-full p-2 border rounded">
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <!-- Modal Buttons -->
        <div class="flex justify-end">
          <button @click="hideEditModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="updateInspection" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import FontAwesome and services
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getProductions } from '@/services/productionService';
import { getInspections, createInspection, deleteInspection, updateInspection } from '@/services/qcService';

// Add icons to library
library.add(faPlus, faEdit, faTrash);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      productions: [], // List of productions
      inspections: [], // List of inspections
      showCreateModalVisible: false, // Modal visibility for create
      showEditModalVisible: false, // Modal visibility for edit
      newInspectionProductID: '', // For new inspection product ID
      newInspectionDate: '', // For new inspection date
      newInspectionScheduledDate: '', // For new inspection scheduled date
      newInspectionResult: 'Pending', // For new inspection result
      editedInspectionId: null, // ID of the inspection being edited
      editedInspectionProductID: '', // Product ID of the inspection being edited
      editedInspectionDate: '', // Date of the inspection being edited
      editedInspectionScheduledDate: '', // Scheduled date of the inspection being edited
      editedInspectionResult: 'Pending', // Result of the inspection being edited
    };
  },
  async mounted() {
    try {
      this.productions = await getProductions();
      this.inspections = await getInspections();
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  },
  computed: {
    inspectionsWithProductName() {
      return this.inspections.map((inspection) => {
        const product = this.productions.find(p => p.product_id === inspection.product_id);
        return {
          ...inspection,
          product_name: product ? product.name : 'Unknown Product',
        };
      });
    },
  },
  methods: {
    showCreateModal() {
      this.showCreateModalVisible = true;
    },
    hideCreateModal() {
      this.showCreateModalVisible = false;
      this.newInspectionProductID = '';
      this.newInspectionDate = '';
      this.newInspectionScheduledDate = '';
      this.newInspectionResult = 'Pending';
    },
    showEditModal(inspection) {
      this.editedInspectionId = inspection.inspection_id;
      this.editedInspectionProductID = inspection.product_id;
      this.editedInspectionDate = this.formatDateForInput(inspection.inspection_date);
      this.editedInspectionScheduledDate = this.formatDateForInput(inspection.scheduled_date);
      this.editedInspectionResult = inspection.result;
      this.showEditModalVisible = true;
    },
    hideEditModal() {
      this.showEditModalVisible = false;
      this.editedInspectionId = null;
      this.editedInspectionProductID = '';
      this.editedInspectionDate = '';
      this.editedInspectionScheduledDate = '';
      this.editedInspectionResult = 'Pending';
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'; // Handle null or empty dates
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    },
    formatDateForInput(dateString) {
      if (!dateString) return ''; // Handle null or empty dates for input fields
      return dateString.split('T')[0]; // Return only the YYYY-MM-DD part for the date input field
    },

    async createNewInspection() {
      const newInspection = {
        product_id: this.newInspectionProductID,
        inspection_date: this.newInspectionDate,
        scheduled_date: this.newInspectionScheduledDate,
        result: this.newInspectionResult,
      };
      try {
        const createdInspection = await createInspection(newInspection);
        this.inspections.push(createdInspection);
        this.hideCreateModal(); // Close the modal
      } catch (error) {
        console.error('Failed to create inspection:', error);
      }
    },
    async updateInspection() {
      const updatedInspection = {
        product_id: this.editedInspectionProductID,
        inspection_date: this.editedInspectionDate,
        scheduled_date: this.editedInspectionScheduledDate,
        result: this.editedInspectionResult,
      };
      try {
        const updated = await updateInspection(this.editedInspectionId, updatedInspection);
        const index = this.inspections.findIndex(ins => ins.inspection_id === this.editedInspectionId);
        if (index !== -1) {
          this.inspections[index] = updated;
        }
        this.hideEditModal();
      } catch (error) {
        console.error(`Failed to update inspection with id ${this.editedInspectionId}:`, error);
      }
    },
    async deleteInspection(id) {
      try {
        await deleteInspection(id);
        this.inspections = this.inspections.filter(ins => ins.inspection_id !== id);
      } catch (error) {
        console.error(`Failed to delete inspection with id ${id}:`, error);
      }
    },
    async exportCsv() {
      try {
        // Directly navigating to the endpoint to trigger download
        window.location.href = 'http://localhost:3000/api/quality-control/export/csv';
      } catch (error) {
        console.error('Error exporting CSV:', error);
      }
    }
  },
};
</script>

<style scoped>
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  /* Optional: Adds a subtle shadow */
}
</style>
