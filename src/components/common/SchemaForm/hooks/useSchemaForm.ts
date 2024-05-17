import { SchemaFormProps,SchemaType } from '@/components/common/SchemaForm/type/props'
import { MaybeRef } from 'vue'

const useSchemaForm = <T extends Recordable>(schema: MaybeRef<SchemaType<T>[]>,props?: SchemaFormProps) => {
  // 注册
  const register = () => {

  }

  // 重置
  const resetFields = () => {

  }

  // 校验
  const validate = () => {

  }

  // 根据field进行更新
  const updateByField = () => {

  }

  // 删除


  return { register,resetFields,schema }
}

export default useSchemaForm
