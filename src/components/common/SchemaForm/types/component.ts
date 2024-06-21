// 自定义选择器Props
import {
    AutoCompleteProps,
    CascaderProps,
    CheckboxGroupProps,
    CheckboxProps,
    DatePickerProps,
    InputNumberProps,
    InputPassword,
    InputProps,
    MentionsProps,
    RadioGroupProps,
    RadioProps,
    RateProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TextAreaProps,
    TimePickerProps,
    TimeRangePickerProps,
    TreeSelectProps,
    UploadProps
} from 'ant-design-vue'


// SchemaForm 可渲染的组件
export interface ComponentsProps {
  // 输入框
  Input: MaybeRefs<InputProps>

  // 密码输入框
  InputPassword: MaybeRefs<InstanceType<typeof InputPassword>['$props']>

  // 文本域
  Textarea: MaybeRefs<TextAreaProps>

  // 选择器
  Select: MaybeRefs<SelectProps>

  // 自动完成
  AutoComplete: MaybeRefs<AutoCompleteProps>

  // 级联选择
  Cascader: MaybeRefs<CascaderProps>

  // 复选框
  Checkbox: MaybeRefs<CheckboxProps>

  // 复选框组
  CheckboxGroup: MaybeRefs<CheckboxGroupProps>

  // 日期选择器
  DatePicker: MaybeRefs<DatePickerProps>

  // 日期范围选择器
  DateRangePicker: MaybeRefs<DatePickerProps>

  // 数字输入框
  InputNumber: MaybeRefs<InputNumberProps>

  // 提及
  Mentions: MaybeRefs<MentionsProps>

  // 单选框
  Radio: MaybeRefs<RadioProps>

  // 单选框组
  RadioGroup: MaybeRefs<RadioGroupProps>

  // 评分
  Rate: MaybeRefs<RateProps>

  // 滑动输入条
  Slider: MaybeRefs<SliderProps>

  // 开关
  Switch: MaybeRefs<SwitchProps>

  // 时间选择框
  TimePicker: MaybeRefs<TimePickerProps>

  // 时间范围选择框
  TimeRangePicker: MaybeRefs<TimeRangePickerProps>

  // 树选择器
  TreeSelect: MaybeRefs<TreeSelectProps>

  // 上传
  Upload: MaybeRefs<UploadProps>
}

// 组件名称
export type ComponentsName = keyof ComponentsProps
