<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({ name: 'DashboardAnalysis' })
const iconV = ref()

</script>

<template>
  <div class="analysis">
    <a-form>
      <a-form-item label="test">
        <icon-selector v-model:value="iconV" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
//.analysis {
//  width: 100%;
//  height: 100%;
//  overflow: auto;
//}
</style>
