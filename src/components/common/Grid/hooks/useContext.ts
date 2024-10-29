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

    // 获取断定value
    const getBreakpointRecodValue = (recod: Partial<Record<BreakpointType, any>>) => {
        const breakpointKeys: BreakpointType[] = [ 'xl', 'lg', 'md', 'sm', 'xs' ]
        // 遍历断点，从大到小判断当前窗口宽度是否符合条件
        for (const key of breakpointKeys) {
            if (recod[key]) {
                if (key === 'xs' && width.value <= AppConstant.SCREEN_BREAKPOINTS[key]) {
                    return recod[key]
                } else if (width.value >= AppConstant.SCREEN_BREAKPOINTS[key]) {
                    return recod[key]
                }
            }
        }
    }


    return { props, space, rowEl, getBreakpointRecodValue }
})

export { useProvideGridContext, useGridContext }
