<script lang="ts" setup>
import { RouteLocationMatched,useRoute,useRouter } from 'vue-router'
import { ref,watch } from 'vue'
import useAppStore from '@/store/modules/app'
import RouterConfig from '@/config/router'

interface Breadcrumb {
    key: string
    label?: string
    children?: Breadcrumb[]
}

defineOptions({ name: 'Breadcrumb' })

const appStore = useAppStore()
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

const accessMenu = (menu) => {
    router.push(menu.key)
}

watch(() => route.path, () => {
    routes.value = routeMatchedToBreadcrumb(route.matched).filter(item => !item.key.includes(RouterConfig.BASIC_SELF_CONTAINER_ROUTE_PATH_SUFFIX))
}, { immediate: true })

</script>

<template>
    <a-breadcrumb
            :class="{dark :appStore.base.layoutStyle === 'side-top-dark'}"
            class="breadcrumb">
        <a-breadcrumb-item v-for="item in routes" :key="item.key">
            <span @click="!item.children?.length&&router.push(item.key)">
            {{ item.label }}
            </span>
            <template v-if="item.children" #overlay>
                <a-menu :items="item.children" @click="accessMenu" />
            </template>
        </a-breadcrumb-item>
    </a-breadcrumb>

</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;

  &.dark {
    color: theme('textColor.light');

    &:hover {
      color: theme('textColor.light');
    }

    :deep(.ant-dropdown-trigger) {
      color: theme('textColor.light');
    }

    :deep(li:last-child), :deep(.ant-breadcrumb-separator) {
      color: theme('textColor.light');
    }
  }
}
</style>
