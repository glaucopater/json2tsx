import { main } from "./lib/quicktype";
import fs from "fs";
import { functionalComponentTemplate } from "./react-templates/";
import { pascalCase, writeFile, createOutputDir, getPrettiefiedJsx } from "./utils";

const transformProps = (props: object | string | undefined) => {
  if (!props)
    return "";
  if (typeof props === "string")
    return props;
  const result = Object.entries(props).map(([key, value]) => {
    return `<div>${key}:{props.${key}}</div>`;
  })
  return result.join("\r");
}

//template should be in a file
const getTemplate = ({ importChildStatement, name, props }:
  { importChildStatement: string[], name: string, props: string | object }) => {
  return functionalComponentTemplate({
    importChildStatement: importChildStatement,
    name: name,
    props: transformProps(props)
  });
};


const parseSubTree = (key: string, value: object, importChildStatement: string[], children: string[]) => {
  const componentName = pascalCase(key);
  importChildStatement.push(componentName);
  const childComponent = getTemplate({ name: componentName, props: value!, importChildStatement: [] });
  children.push(childComponent);
  writeFile(`${componentName}.tsx`, getPrettiefiedJsx(childComponent));
  return `<${componentName} {...props.${key}}/>`;
}


const getComponent = (props: object | object[]) => {
  let importChildStatement: string[] = [];
  let children: string[] = [];
  const result = Object.entries(props).map((prop) => {
    const [key, value] = prop;
    if (typeof value === "object") {
      const componentName = pascalCase(key);
      const val = value!.constructor === Array ? value[0] : value
      importChildStatement.push(componentName);
      const childComponent = getTemplate({ name: componentName, props: val, importChildStatement: [] });
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

const versionKeywords = ["-v", "-ver", "--ver", "--version"];

if (process.argv[2] && versionKeywords.includes(process.argv[2])) {
  const { name, version } = require("./package.json");
  console.log(`${name} version: ${version}`);
} else if (process.argv[2] && fs.existsSync(process.argv[2])) {
  const jsonData = require(process.argv[2]);
  createOutputDir();
  //this should create type file
  main(JSON.stringify(jsonData))

  console.log(jsonData.constructor);
  const data = (jsonData.constructor === Array) ? jsonData[0] : jsonData
  const component = CreateApp(data);
  writeFile("App.tsx", getPrettiefiedJsx(component));

}
else {
  console.log("wrong input parameters");
}


