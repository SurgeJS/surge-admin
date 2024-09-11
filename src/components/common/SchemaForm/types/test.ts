// 定义每个组件的属性
interface SelectProps {
    options: string[];
    multiple: boolean;
}

interface InputProps {
    placeholder: string;
    maxLength: number;
}

interface ButtonProps {
    label: string;
    onClick: () => void;
}

interface CheckboxProps {
    checked: boolean;
    disabled: boolean;
}

// 其他组件属性定义...
// 继续定义其他组件的30个属性

// 定义组件名称和对应属性的映射
type ComponentsPropsMap = {
    select: SelectProps;
    input: InputProps;
    button: ButtonProps;
    checkbox: CheckboxProps;
    // 添加更多组件映射
};

// 提取组件名称
type ComponentName = keyof ComponentsPropsMap;

// 显式定义组件的 Schema 类型
type ComponentSchema = {
    [K in ComponentName]: {
        component: K;
        componentProps: ComponentsPropsMap[K];
    };
}[ComponentName];

// 批量使用 Schema 类型
const testSchemas: ComponentSchema[] = [
    {
        component: 'select',
        componentProps: {

            options: [ 'Option 1', 'Option 2' ],
            multiple: true,
        },
    },
    {
        component: 'input',
        componentProps: {
            placeholder: 'Enter text here',
            maxLength: 100,
        },
    },
    {
        component: 'button',
        componentProps: {
            label: 'Click me',
            onClick: () => {
                console.log('Clicked')
            },
        },
    },
    {
        component: 'checkbox',
        componentProps: {
            checked: true,
            disabled: false,
        },
    },
    // 错误示例：会报错
    {
        component: 'input',
        componentProps: {
            placeholder: 'xx',
            options: [ 'Option 1', 'Option 2' ], // 错误属性，不会被提示
        },
    },
]
