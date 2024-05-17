<script lang="ts" setup>
import AntDesignIconJson from '@iconify/json/json/ant-design.json'
import { ref } from 'vue'
import { TestApi } from '@/services/api/test'

defineOptions({ name: 'DashboardAnalysis' })
const icons = [
  ...Object.keys(AntDesignIconJson.icons).map(key => `${ AntDesignIconJson.prefix }:${ key }`)
]
const icon = ref()
const test = async () => {
  const data = await TestApi.getATodoList({ pageNo: 1,pageSize: 10 })
}
</script>

<template>
  <div v-focus class="analysis">
    <a-form>
      <a-form-item label="test">
        <icon-select v-model:value="icon" :icons="icons" />
      </a-form-item>
    </a-form>
    <a-button @click="test">test</a-button>
  </div>
</template>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
