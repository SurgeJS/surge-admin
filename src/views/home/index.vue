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
const formRef = ref()
const test = () => {
  formRef.value?.validate((errors) => {
    console.log(errors)
  })
}
</script>

<template>
  <div>
    <n-card>
      <n-button @click="test">xxx</n-button>
      <n-form
        ref="formRef"
        :model="model"
      >
        <n-form-item
          label="Input"
          path="inputValue"
          show-require-mark
        >
          <n-input v-model:value="model.inputValue" placeholder="Input" />
        </n-form-item>
        <n-form-item
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
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped lang="scss">

</style>