/* --------------弹框表单-------------- */

import {
    DefineSchema,
    SchemaFormCommonExpose,
    SchemaFormCommonProps,
    SchemaFormCommonSlots
} from '@/components/common/SchemaForm/types/common.ts'
import { DrawerProps, ModalProps } from 'naive-ui'

export type PopupType = 'drawer' | 'modal'

export interface PopupSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: DefineSchema[]

    visible?: boolean

    // 弹框类型  抽屉 | 模态框
    popupType?: PopupType

    // 弹框标题
    popupTitle?: string

    // 抽屉属性
    drawerProps?: DrawerProps

    // 模态框属性
    modalProps?: ModalProps

    // 点击遮罩层是否关闭模态框和抽屉
    maskClosable?: boolean

    // 关闭模态框和抽屉的时候重置表单
    closeResetModel?: boolean

    // 关闭模态框和抽屉的时候弹框确定是否关闭
    closeConfirm?: boolean

    // 确认弹框标题
    confirmTitle?: string

    // 确认弹框标题内容
    confirmContent?: string
}

export interface PopupSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface PopupSchemaFormSlots extends SchemaFormCommonSlots {
    // 弹框头部
    popupHeader(): any

    // 表单前
    popupFormBefore(): any

    // 表单后
    popupFormAfter(): any

    // 弹框头部
    popupFooter(): any
}