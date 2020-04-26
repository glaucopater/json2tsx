//load to be passed through command line or file 
import data from "./json_samples/iss-now.json";

//load after type infer step
import { Iss } from "./output/iss";

//template should be in a file
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

const TestComponent = (props: Iss) => {
  const result = Object.entries(props).map((prop) => {
    const [key, value] = prop;
    if (typeof value === "object") {
      return GenericInnerComponent(key, value)
    }
    return `<div>${key}:{${value}}</div>`;
  });
  return result.join("\n");
};

const GenericInnerComponent = (key: string, props: any) => {
  const result = Object.entries(props).map(([key, value]) => {
    return `<div>${key}:${value}</div>`;
  });
  return `<${key}>${result.join("\n")}</${key}>`;
}

const GetComponent = (props: any) => {
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

const GetGenericInnerComponent = (key: string, props: any) => {
  return `<${key} props={props.${key}}/>`;
}


const CreateApp = (props: any) => {
  const { traversedProps, importChildStatement, children } = GetComponent(props);
  const result = functionalTemplate(
    {
      name: "App",
      props: traversedProps,
      importChildStatement: importChildStatement,
    }
  );
  // to be saved as inner component
  console.log("Inject -> children", children);
  return result;
};


//import types file ❌
//import data ✔️

console.log(CreateApp(data));
