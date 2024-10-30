import { createInjectionState } from '@vueuse/core'
import { GridProps } from '@/components/common/Grid/types'
import { isObject } from 'es-toolkit/compat'
import AppConstant from '@/constant/app.ts'

const [ useProvideGridContext, useGridContext ] = createInjectionState((props: GridProps) => {
    const rowEl = ref<HTMLElement>()

    const { width: elWidth } = useElementSize(rowEl)
    const { width: windowsWidth } = useWindowSize()

    const width = computed(() => props.responsive === 'screen' ? windowsWidth.value : elWidth.value)

    const responsiveCols = computed(() => {
        return Number(isObject(props.cols) ? getResponsiveValue(props.cols) : props.cols)
    })

    /*
    * xs <= 530
    * sm >= xs | 768
    * */
    // 获取响应式Value
    const getResponsiveValue = (record: Partial<Record<BreakpointType, any>>) => {
        const b = AppConstant.SCREEN_BREAKPOINTS
        const { xs, sm, md, lg, xl } = record
        const w = width.value
        if (xs && w <= b.xs) return xs
        let v: any
        if (sm && (w > b.xs || w >= b.sm)) v = sm
        if (md && w >= b.md) v = md
        if (lg && w >= b.lg) v = lg
        if (xl && w >= b.xl) v = xl
        return v
    }

    return { props, rowEl, width, getResponsiveValue, responsiveCols }
})

export { useProvideGridContext, useGridContext }
