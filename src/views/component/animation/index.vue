<script setup lang="ts"></script>

<template>
  <div>
    <a-card class="mb-1" title="立即执行动画">
      <a-flex justify="space-between">
        <a-card
          class="h-400px"
          hoverable
          title="折叠动画"
        >
          <a-flex gap="10">
            <fold-animation fixed-length appear>
              <div v-if="isReload" class="demo overflow-auto">
                <p
                  v-for="item in 15"
                  :key="item"
                  class="text-center"
                >
                  高度固定
                </p>
              </div>
            </fold-animation>
            <fold-animation appear>
              <div class="demo h-auto">
                <p
                  v-for="item in 13"
                  :key="item"
                  class="text-center"
                >
                  高度不固定
                </p>
              </div>
            </fold-animation>
          </a-flex>
        </a-card>
      </a-flex>
    </a-card>
    <a-card title="立即执行动画">
      <a-flex>
        <a-card hoverable title="折叠动画">
          <fold-animation>
            <div class="demo" />
          </fold-animation>
        </a-card>
      </a-flex>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.demo{
  @apply: w-150px h-150px bg-primary rounded-sm text-white p-2;
}
</style>