<script setup lang="ts">

</script>

<template>
  <div>
    <Row :gutter="[10,10]">
      <Col span="4">
        <div class="bg-red rounded-md">1</div>
      </Col>
      <Col span="4" pull="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col span="4">
        <div class="bg-red rounded-md">3</div>
      </Col>
      <Col span="4">
        <div class="bg-red rounded-md">4</div>
      </Col>
      <Col span="4">
        <div class="bg-red rounded-md">5</div>
      </Col>
      <Col span="4">
        <div class="bg-red rounded-md">6</div>
      </Col>
      <Col span="24">
        <div class="bg-red rounded-md">7</div>
      </Col>
    </Row>
    <n-divider>123</n-divider>
    <Row :gutter="[10,10]">
      <Col :span="4">
        <div class="bg-red rounded-md">1</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col :span="4">
        <div class="bg-red rounded-md">2</div>
      </Col>
      <Col
        :span="4"
        suffix
      >
        <div class="bg-red rounded-md">3</div>
      </Col>
    </Row>
    <n-divider>123</n-divider>
    <n-row :gutter="[10,10]">
      <n-col span="4">
        <div class="bg-red rounded-md">1</div>
      </n-col>
      <n-col span="4" pull="4">
        <div class="bg-red rounded-md">2</div>
      </n-col>
      <n-col span="4">
        <div class="bg-red rounded-md">3</div>
      </n-col>
      <n-col span="4">
        <div class="bg-red rounded-md">4</div>
      </n-col>
      <n-col span="4">
        <div class="bg-red rounded-md">5</div>
      </n-col>
      <n-col span="4">
        <div class="bg-red rounded-md">6</div>
      </n-col>
      <n-col span="24">
        <div class="bg-red rounded-md">7</div>
      </n-col>
    </n-row>
    <n-divider>123</n-divider>
    <div class="bg-red">1</div>
  </div>
</template>

<style scoped lang="scss">
div{
  text-align: center;
}
</style>