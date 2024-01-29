<script lang="ts" setup>
import { ref } from 'vue'
import { InputGroup } from 'ant-design-vue'
import { useElementBounding } from '@vueuse/core'

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
const { width } = useElementBounding(inputGroupRef)
</script>

<template>
  <a-popover
      :overlayStyle="{width:`${width}px`}"
      autoAdjustOverflow
      placement="bottom"
      trigger="click">
    <a-input-group ref="inputGroupRef" compact>
      <a-input
          placeholder="请选择图标"
          readonly
          style="width: calc(100% - 32px)"
      />
      <a-button>
        <template #icon>
          <i-ic:baseline-10k />
        </template>
      </a-button>
    </a-input-group>
    <template #content>
      <a>Close</a>
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
