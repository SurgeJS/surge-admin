/* --------------分组表单-------------- */

// 模块表单结构
import { ComponentsName } from '@/components/common/SchemaForm/types/component.ts'
import {
    DefineSchema,
    SchemaFormCommonExpose,
    SchemaFormCommonProps,
    SchemaFormCommonSlots
} from '@/components/common/SchemaForm/types/common.ts'

export interface GroupSchemaType<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsName = ComponentsName> {
    // 模块标题
    title: MaybeRef<string>

    // 帮助提示信息
    helpMessage?: MaybeRef<string>

    // 是否隐藏
    hide?: MaybeRef<boolean> | GroupCallbackParamsFunction<TForm, DComponentsName, boolean>

    // 表单
    form: DefineSchema<TForm, DComponentsName>[]

    // 是否隐藏展开收起按钮
    isHideExpandCollapseButton?: MaybeRef<boolean>

    // 是否折叠
    isFold?: MaybeRef<boolean>

    // 禁用表单
    disabled?: MaybeRef<boolean>
}

export interface GroupSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: GroupSchemaType[]
}

export interface GroupSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface GroupSchemaFormSlots extends SchemaFormCommonSlots {
    /**
     * 自定义group标题(使用后helpMessage会失效)
     * @param {{groupSchema: GroupSchemaType}} props
     * @returns {any}
     */
    groupTitle(props: { groupSchema: GroupSchemaType }): any
}

// 回调参数
export interface GroupCallbackParams<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName> {
    group: GroupSchemaType<TForm, DComponentsName>

    model: TForm;
}

// 组回调参数
export type GroupCallbackParamsFunction<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName,
    R = never>
    = ((params: GroupCallbackParams<TForm, DComponentsName>) => R)