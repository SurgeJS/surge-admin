<script setup lang="ts">
import { cloneDeep } from 'lodash-es'

const model = ref({
  inputValue: undefined,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null
})
const init = cloneDeep(model.value)
const test = () => {
  model.value = cloneDeep(init)
}
</script>

<template>
  <div>
    <n-card>
      <n-button @click="test">xxx</n-button>
      <icon-selector />
      <n-form
        ref="formRef"
        :model="model"
        label-placement="top"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi
            :span="12"
            label="Input"
            path="inputValue"
          >
            <n-input v-model:value="model.inputValue" placeholder="Input" />
          </n-form-item-gi>
          <n-form-item-gi
            :span="12"
            label="Textarea"
            path="textareaValue"
          >
            <n-input
              v-model:value="model.textareaValue"
              placeholder="Textarea"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped lang="scss">

</style>