import { GridItemData } from '@/components/common/Grid/types'

export const resolveItemData = (
    cols: number,
    props: GridItemData
): GridItemData => {
    const originSpan = props.span ?? 1
    const originOffset = props.offset ?? 0
    const offset = Math.min(originOffset, cols)
    const span = Math.min(
        offset > 0 ? originSpan + originOffset : originSpan,
        cols
    )
    return {
        span,
        offset,
        suffix: 'suffix' in props ? props.suffix !== false : false
    }
}