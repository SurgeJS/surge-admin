// 定义组件名称和组件属性类型
type ComponentsProps = {
    select: { options: string[] };  // select 组件的属性
    input: { placeholder: string }; // input 组件的属性
    // 可以继续添加其他组件的属性...
};

type Schema = {
    [K in keyof ComponentsProps]: {
        component: K;
        componentProps: ComponentsProps[K];
    };
}[keyof ComponentsProps]; // 生成分布式联合类型

// 示例数据
const test: Schema[] = [
    {
        component: 'select',
        componentProps: {
            options: [ 'Option 1', 'Option 2' ], // 正确匹配
        },
    },
    {
        component: 'input',
        componentProps: {
            placeholder: 'Enter text here', // 正确匹配
        },
    },
    {
        component: 'input',
        componentProps: {

        },
    } as const,
]
