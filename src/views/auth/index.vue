<template>
  <div class="w-h-full flex flex-center relative">
    <dynamic-background />
    <div class="absolute right-[10px] top-[10px] bg-layer p-[5px] rounded-sm flex gap-[5px]">
      <theme-palette />
      <theme-switch />
    </div>
    <n-card
      v-motion-pop-visible
      bordered
      size="large"
      class="auth-card lg:w-[55vh] md:w-[60%] w-[70%] h-[60vh] transition-width"
      content-class="h-full"
    >
      <div class="w-h-full flex overflow-hidden">
        <div class="h-full flex-1 flex-shrink-0 p-[10px]">
          <router-view v-slot="{ Component, route }">
            <component
              :is="Component"
              :key="route.fullPath"
              v-motion-slide-visible-right
            />
          </router-view>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import DynamicBackground from '@/views/auth/components/DynamicBackground.vue'
</script>

<style lang="scss" scoped>
.auth-card {
  box-shadow: 0 0 50px -30px theme('colors.primary');
}
</style>

