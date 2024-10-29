import { Directive } from 'vue'

declare module 'vue' {
    interface ComponentCustomProperties {
        vAdminDisabled: Directive<HTMLElement, never> | undefined;
        vAdminShow: Directive<HTMLElement, never> | undefined;
    }
}