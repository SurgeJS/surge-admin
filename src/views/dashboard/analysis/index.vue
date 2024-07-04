<script lang="ts" setup>
import { ref } from 'vue'
import useAuthStore from "@/store/modules/auth";
import { listIcons } from "@iconify/vue";

defineOptions({ name: 'DashboardAnalysis' })
const icons = Array.from(new Set(listIcons()))
const iconV = ref()
const authStore = useAuthStore()

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
