import { createInjectionState } from '@vueuse/core'
import { TableWrapProps } from '@/components/common/TableWrap/types/type'
import { Ref, ref } from 'vue'
import { SuperTableColumn } from '@/components/antd/SuperTable/type/props'

const [ useProvideBaseTableStore,useBaseTableStore ] = createInjectionState((props: TableWrapProps, tableColumns: Ref<SuperTableColumn[]>) => {
  // 当前密度
  const currentDensity = ref([ 'large' ])
  return { props,currentDensity,tableColumns }
})

export { useProvideBaseTableStore,useBaseTableStore }
