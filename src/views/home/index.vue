<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import useTabBarStore from '@/store/modules/tabBar'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const tabBarStore = useTabBarStore()
onMounted(() => {
  console.log(1)
  store.toggleFullScreenLoading(true)
})
onActivated(() => {
  console.log(2)
})
</script>

<template>
  <div>
    <n-button
      @click="router.push({
        path:'/home',
        query:{key:1}
      })"
    >
      test1
    </n-button>
    <n-button
      @click="router.push({
        path:'/home',
        query:{key:2}
      })"
    >
      test2
    </n-button>
    <n-button
      @click="router.push({
        path:'/about',
        query:{key:2}
      })"
    >
      test3
    </n-button>
    <n-button
      @click="tabBarStore.refresh()"
    >
      test3
    </n-button>
    {{ route.query.key }}
    <Row>
      <Col>
        <div class="bg-primary text-white rounded-md">1</div>
      </Col>
    </Row>
  </div>
</template>

<style scoped lang="scss">
div {
  text-align: center;
}
</style>