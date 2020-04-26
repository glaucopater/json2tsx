import data from "../json_samples/iss-now.json";
import { Iss } from "./iss";

const functionalTemplate = ({ importChildStatement, name, props }:
    { importChildStatement: string[], name: string, props: any }) => {
    console.log("importChildStatement, name, props", importChildStatement, name, props);

    return `
import React from 'react'; 
${importChildStatement.join("\r")}

const ${name} = (props) => { 
    return (
        <div>
            ${props}
        </div>
    )
}
export default ${name};
`};

export const TestComponent = (props: Iss) => {
    const result = Object.entries(props).map((prop) => {
        const [key, value] = prop;
        if (typeof value === "object") {
            return GenericInnerComponent(key, value)
        }
        return `<div>${key}:{${value}}</div>`;
    });
    return result.join("\n");
};

export const GenericInnerComponent = (key: string, props: any) => {
    const result = Object.entries(props).map(([key, value]) => {
        return `<div>${key}:${value}</div>`;
    });
    return `<${key}>${result.join("\n")}</${key}>`;
}

export const GetComponent = (props: any) => {
    let importChildStatement: string[] = [];
    let children: string[] = [];
    const result = Object.entries(props).map((prop) => {
        const [key, value] = prop;
        if (typeof value === "object") {
            importChildStatement.push(key);
            children.push(functionalTemplate({ name: key, props: { value }, importChildStatement: [] }))
            return GetGenericInnerComponent(key, value)
        }
        return `<div>${key}:{props.${key}}</div>`;
    });
    return {
        traversedProps: result.join("\n"),
        importChildStatement: importChildStatement,
        children: children
    };
};

export const GetGenericInnerComponent = (key: string, props: any) => {
    return `<${key} props={props.${key}}/>`;
}

// export const TestInject = (props: Iss) => {
//     const result = functionalTemplate({ name: "Iss", importChildStatement: "", props: TestComponent(props) });
//     return result;
// };

export const Inject = (props: any) => {
    const { traversedProps, importChildStatement, children } = GetComponent(props);
    const result = functionalTemplate(
        {
            name: "Iss",
            props: traversedProps,
            importChildStatement: importChildStatement,
        }
    );
    console.log("Inject -> children", children); // to be saved as inner component
    return result;
};


//import types file ❌
//import data ✔️

console.log(Inject(data));
