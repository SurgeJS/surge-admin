import { createInjectionState } from '@vueuse/core'
import { RowProps } from '@/components/common/Grid/types'
import { isArray } from 'es-toolkit/compat'

const [ useProvideGridContext,useGridContext ] = createInjectionState((gutter:RowProps['gutter']) => {
    const space = computed(() => (isArray(gutter) ? gutter : [ gutter, 0 ]) as [number, number])
    return { gutter,space }
})

export { useProvideGridContext,useGridContext }
