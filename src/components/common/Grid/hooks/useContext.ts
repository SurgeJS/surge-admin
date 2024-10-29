import { createInjectionState } from '@vueuse/core'
import { GridProps } from '@/components/common/Grid/types'

const [ useProvideGridContext, useGridContext ] = createInjectionState((props: GridProps) => {
    const rowEl = ref<HTMLElement>()

    const { width: elWidth } = useElementSize(rowEl)
    const { width: windowsWidth } = useWindowSize()

    const width = computed(() => props.responsive === 'screen' ? windowsWidth.value : elWidth.value)

    return { props, rowEl,width  }
})

export { useProvideGridContext, useGridContext }
