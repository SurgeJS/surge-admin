import AppConstant from '@/constant/app'

const useBreakpoint = () => {
    return useBreakpoints<BreakpointType>(AppConstant.SCREEN_BREAKPOINTS)
}

export default useBreakpoint