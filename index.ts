import { main } from "./lib/quicktype";

//load to be passed through command line or file 
import data from "./json_samples/iss-now.json";

import { functionalComponentTemplate } from "./react-templates/";
import { pascalCase, writeFile, createOutputDir, getPrettiefiedJsx } from "./utils";

const transformProps = (props: object | string) => {
  if (typeof props === "string")
    return props;
  const result = Object.entries(props).map(([key, value]) => {
    return `<div>${key}:{${value}}</div>`;
  })
  return result.join("\r");
}

//template should be in a file
const getTemplate = ({ importChildStatement, name, props }:
  { importChildStatement: string[], name: string, props: string | object }) => {
  return functionalComponentTemplate({ importChildStatement: importChildStatement, name: name, props: transformProps(props) });
};

const getComponent = (props: any) => {
  let importChildStatement: string[] = [];
  let children: string[] = [];
  const result = Object.entries(props).map((prop) => {
    const [key, value] = prop;
    if (typeof value === "object") {
      const componentName = pascalCase(key);
      importChildStatement.push(componentName);
      const childComponent = getTemplate({ name: componentName, props: value!, importChildStatement: [] });
      children.push(childComponent);
      writeFile(`${componentName}.tsx`, getPrettiefiedJsx(childComponent));
      return `<${componentName} {...props.${key}}/>`;
    }
    return `<div>${key}:{props.${key}}</div>`;
  });
  return {
    traversedProps: result.join("\n"),
    importChildStatement: importChildStatement,
    children: children
  };
};

const CreateApp = (props: any) => {
  const { traversedProps, importChildStatement, children } = getComponent(props);
  const result = getTemplate(
    {
      name: "App",
      props: traversedProps,
      importChildStatement: importChildStatement,
    }
  );
  // to be saved as inner component
  return result;
};

//generate types/interface file ❌

const jsonTest = {
  message: "success",
  iss_position: {
    latitude: "-46.4573",
    longitude: "168.0903",
  },
  timestamp: 1550670322,
};


createOutputDir();

//this should create type file
main(JSON.stringify(jsonTest))

//load after type infer step
//import { Iss } from "./output/types.ts";

//import data ✔️
//console.log(CreateApp(data));


//main
const component = CreateApp(data);
writeFile("App.tsx", getPrettiefiedJsx(component));
