<script setup lang="ts">
import { SuperButtonEmits,SuperButtonProps,SuperButtonSlots } from '@/components/antd/SuperButton/type'
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'

const slots = defineSlots<SuperButtonSlots>()
const props = defineProps<SuperButtonProps>()
const emits = defineEmits<SuperButtonEmits>()

const [ asyncLoading,setAsyncLoading ] = useToggle()
const isLoading = computed(() => props.loading ? props.loading : asyncLoading.value)
const onClick = () => {
  setAsyncLoading(true)
  emits('async-click',setAsyncLoading)
}
</script>

<template>
  <a-button v-bind="props" @click="onClick" :loading="isLoading">
    <template v-for="(slot,key) in slots" #[key]>
      <slot :name="key" />
    </template>
  </a-button>
</template>

<style scoped lang="scss">

</style>
