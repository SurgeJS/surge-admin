import {Directive, ObjectDirective} from 'vue';

declare module 'vue' {
    export interface ComponentCustomProperties {
        $directives: {
            focus: Directive;
        };
        vFocus: Directive;
    }

    export declare const vTest: ObjectDirective<VShowElement> & {
        name?: 'show';
    };
}

