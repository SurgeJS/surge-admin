<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const store = useAppStore()
onMounted(() => {
  // store.toggleFullScreenLoading(true)
})
</script>

<template>
  <!--  <div />-->
  <div>
    <Row>
      <Col>
        <div class="bg-primary text-white rounded-md">1</div>
      </Col>
    </Row>
  </div>
</template>

<style scoped lang="scss">
div{
  text-align: center;
}
</style>