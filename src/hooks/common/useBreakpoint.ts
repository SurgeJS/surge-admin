import AppConstant from '@/constant/app'

const useBreakpoint = () => {
    return useBreakpoints<BreakpointPresets>(AppConstant.SCREEN_BREAKPOINTS)
}

export default useBreakpoint