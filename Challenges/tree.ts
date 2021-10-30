type TNode<T> = {
    value: T;
    children?: TNode<T>[];
}

type Tree<T> = TNode<T>;

const tree: Tree<number> = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 3
                },
                {
                    value: 4
                }
            ]
        },
        {
            value: 5,
            children: [
                {
                    value: 6
                }
            ]
        },
        {
            value: 7
        }
    ]
}