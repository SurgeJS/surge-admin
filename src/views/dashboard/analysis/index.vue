<script lang="ts" setup>

defineOptions({ name: 'DashboardAnalysis' })
</script>

<template>
  <div class="analysis">
    <icon-selector />
    <a-form>
      <a-form-item label="test">
        <icon-selector />
      </a-form-item>
    </a-form>
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        Hover me
      </a>
      <template #overlay>
        asdasds
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
