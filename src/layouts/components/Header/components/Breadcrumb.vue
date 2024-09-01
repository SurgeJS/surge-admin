<script lang="ts" setup>
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import RouterConstant from '@/constant/router'

interface Breadcrumb {
  key: string
  label?: string
  children?: Breadcrumb[]
}

defineOptions({ name: 'Breadcrumb' })

const routes = ref<Breadcrumb[]>([])
const route = useRoute()
const router = useRouter()

const routeMatchedToBreadcrumb = (routeMatched: RouteLocationMatched[]) => routeMatched.map<Breadcrumb>(item => {
  return {
    key: item.path,
    label: item.meta?.title,
    children: item.children?.length ? routeMatchedToBreadcrumb(item.children as RouteLocationMatched[]) : undefined
  }
})

const handleSelect = (key) => {
  router.push(key)
}

watch(() => route.path, () => {
  routes.value = routeMatchedToBreadcrumb(route.matched).filter(item => !item.key.includes(RouterConstant.CONTAINER_SUFFIX))
}, { immediate: true })

</script>

<template>
  <n-breadcrumb class="breadcrumb">
    <n-breadcrumb-item v-for="item in routes" :key="item.key">
      <n-dropdown :options="item.children" @select="handleSelect">
        <span>{{ item.label }}</span>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
}
</style>
