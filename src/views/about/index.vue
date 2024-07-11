<script lang="ts" setup>

import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef'

const rowData = ref([
  { make: 'Tesla',model: 'Model Y',price: 64950,electric: true },
  { make: 'Ford',model: 'F-Series',price: 33850,electric: false },
  { make: 'Toyota',model: 'Corolla',price: 29600,electric: false }
])

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref<ColDef[]>([
  { field: 'make',cellRenderer: 's' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' }
])
</script>

<template>
  <div class="w-h-full">
    <ag-grid-vue
      :row-data="rowData"
      :column-defs="colDefs"
      class="ag-theme-quartz h-auto"
    />
  </div>
</template>

<style scoped>

</style>
