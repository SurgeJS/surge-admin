import { createInjectionState } from '@vueuse/core'
import { RowProps } from '@/components/common/Grid/types'
import { isArray } from 'es-toolkit/compat'
import AppConstant from '@/constant/app.ts'

const [ useProvideGridContext, useGridContext ] = createInjectionState((props: RowProps) => {

    const rowEl = ref<HTMLElement>()

    const { width: elWidth } = useElementSize(rowEl)
    const { width: windowsWidth } = useWindowSize()

    const width = computed(() => props.responsive === 'screen' ? windowsWidth.value : elWidth.value)

    const space = computed(() => (isArray(props.gutter) ? props.gutter : [ props.gutter, 0 ]) as [ number, number ])

    const currentBreakpoint = computed<BreakpointType>(() => {
        const b = AppConstant.SCREEN_BREAKPOINTS
        const w = width.value
        if (w >= b.xl) return 'xl'
        if (w >= b.lg) return 'lg'
        if (w >= b.md) return 'md'
        if (w >= b.sm) return 'sm'
        return 'xs'
    })

    return { props, space, rowEl,currentBreakpoint }
})

export { useProvideGridContext, useGridContext }
