<script lang="ts" setup>
import { useRouter } from 'vue-router'
import RouterConfig from '@/config/router'

defineOptions({ name: 'NotFound' })
const router = useRouter()
const goHome = () => {
    router.push(RouterConfig.HOME_PATH)
}
</script>

<template>
    <div class="notFound">
        <i-local-404 class="w-[50%] h-[50%]" />
        <a-button size="large" type="primary" @click="goHome">返回首页</a-button>
    </div>
</template>

<style lang="scss" scoped>
.notFound {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 20px;
}
</style>
