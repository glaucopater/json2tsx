export interface App {
    MyTestComponent: MyTestComponent;
}

export interface MyTestComponent {
    numberProp:         string;
    stringProp:         string;
    MyTestSubComponent: Array<Array<number[]>>;
}
