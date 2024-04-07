import { createInjectionState } from '@vueuse/core'
import { BaseTableProps } from '@/components/common/BaseTable/utils/type'
import { Ref,ref } from 'vue'
import { SuperTableColumn } from '@/components/antd/SuperTable/utils/type'

const [ useProvideBaseTableStore,useBaseTableStore ] = createInjectionState((props: BaseTableProps,tableColumns: Ref<SuperTableColumn[]>) => {
        // 当前密度
        const currentDensity = ref([ 'large' ])
        return { props,currentDensity,tableColumns }
    })

export { useProvideBaseTableStore,useBaseTableStore }
