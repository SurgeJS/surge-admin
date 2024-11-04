import { createInjectionState } from '@vueuse/core'
import { GridItemData, GridItemProps, GridProps } from '@/components/common/Grid/types'
import useResponsivePropsValue from '@/components/common/Grid/hooks/use-responsive-props-value.ts'

const [ useProvideGridContext, useGridContext ] = createInjectionState((props: GridProps) => {
    const rowEl = ref<HTMLElement>()
    const itemDataMap = reactive<Map<number, GridItemProps>>(new Map())

    const { width: elWidth } = useElementSize(rowEl)
    const { width: windowsWidth } = useWindowSize()

    const width = computed(() => props.responsive === 'screen' ? windowsWidth.value : elWidth.value)
    const itemDataList = computed(() => Array.from(itemDataMap.entries()).map(([ , itemData ]) => itemData))

    const responsiveCols = useResponsivePropsValue(width, props, 'cols')
    const responsiveXGap = useResponsivePropsValue(width, props, 'xGap')
    const responsiveYGap = useResponsivePropsValue(width, props, 'yGap')

    const setItemMap = (index: number, itemProps: GridItemData) => {
        itemDataMap.set(index, itemProps)
    }
    const removeItemMap = (index: number) => {
        itemDataMap.delete(index)
    }

    return {
        props,
        rowEl,
        width,
        itemDataMap,
        itemDataList,
        responsiveCols,
        responsiveXGap,
        responsiveYGap,
        setItemMap,
        removeItemMap
    }
})

export { useProvideGridContext, useGridContext }
