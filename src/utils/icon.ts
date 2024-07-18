import { IconifyJSON } from "@iconify/types"

// 获取 iconify 集合中的图标名称列表
export const getIconifyNameCollection = (collection: IconifyJSON) => {
    return Object.keys(collection.icons).map(key => `i-${ collection.prefix }-${ key }`)
}