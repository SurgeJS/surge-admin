import {App} from "vue";

export const setupGlobalDirectives = (app:App) => {
    app.directive('focus', {
        mounted(el) {
            el.focus();
        }
    });
}