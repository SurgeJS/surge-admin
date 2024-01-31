<script lang="ts" setup>
import AntDesignIconJson from '@iconify/json/json/ant-design.json'

defineOptions({ name: 'DashboardAnalysis' })
const icons = Object.keys(AntDesignIconJson.icons).map(key=>`${AntDesignIconJson.prefix}:${key}`)
</script>

<template>
  <div class="analysis">
    <a-form>
      <a-form-item label="test">
        <icon-select :icons="icons" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
