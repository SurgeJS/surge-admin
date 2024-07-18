import { useQuery } from "@tanstack/vue-query"

const form  = ref({
    pageNo:1,
    pageSize:10,
})

const usePageQuery = () => {
    return useQuery({
        queryKey: []
    })
}