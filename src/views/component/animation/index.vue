<script setup lang="ts">
const [ isShow,toggleShow ] = useToggle()
</script>

<template>
  <a-card
    class="h-full"
    title="立即执行动画"
  >
    <template #extra>
      <a-button type="primary" @click="toggleShow()">{{ isShow ? '隐藏':'显示' }}</a-button>
    </template>
    <div class="w-100px h-0px p-[10px] bg-red" />
    <a-flex justify="space-between">
      <a-card
        class="h-450px w-full"
        hoverable
        title="折叠动画"
      >
        <a-flex gap="10">
          <fold-animation fixed-length appear>
            <div class="demo overflow-auto">
              <p v-for="item in 15" :key="item">高度固定</p>
            </div>
          </fold-animation>
          <fold-animation appear>
            <div class="demo h-auto">
              <p v-for="item in 13" :key="item">高度不固定</p>
            </div>
          </fold-animation>
          <fold-animation
            :duration="3"
            direction="horizontal"
            fixed-length
            appear
          >
            <div class="demo overflow-auto">
              <p v-for="item in 15" :key="item">高度固定</p>
            </div>
          </fold-animation>
          <fold-animation
            fixed-length
            :duration="3"
            appear
          >
            <div v-if="isShow" class="demo overflow-auto">
              <p v-for="item in 13" :key="item">高度固定</p>
            </div>
          </fold-animation>
        </a-flex>
      </a-card>
    </a-flex>
  </a-card>
</template>

<style scoped lang="scss">
.demo{
  @apply: w-150px h-150px bg-primary rounded-sm text-white p-[10px]  text-[16px];
}
</style>