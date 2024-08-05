import { SchemaFormEmits, SchemaFormExpose, SchemaFormProps } from '@/components/common/SchemaForm/types/type'
import { ModelRef } from 'vue'
import { Modal } from 'ant-design-vue'

const useSchemaFormPopup = (props:SchemaFormProps,emits:SchemaFormEmits,expose:SchemaFormExpose,visible:ModelRef<boolean>) => {
    // 关闭弹框并重置表单
    const closeAndReset = () => {
        props.closeResetModel && expose.resetFields()
        visible.value = false
    }

    const showConfirmModal = () => {
        Modal.confirm({
            title: props.confirmTitle,
            content: props.confirmContent,
            centered: true,
            onOk() {
                closeAndReset()
            },
            onCancel() {
                visible.value = true
            }
        })
    }

    const onCancel = (e) => {
        if (props.closeConfirm) return showConfirmModal()
        // 点击的遮罩层
        if (e.target.tagName === 'DIV') {
            props.maskClosable && closeAndReset()
        } else {
            closeAndReset()
        }
    }

    return { closeAndReset,showConfirmModal,onCancel }
}

export default useSchemaFormPopup