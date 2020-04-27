const transformImport = (importChildStatement: string[]) =>
    (importChildStatement.map(item => `import ${item} from "./${item}";`));

export const functionalComponentTemplate = (
    { importChildStatement, name, props }:
        { importChildStatement: string[], name: string, props: string | object }) => `
import React from "react"; 
import { ${name} as propTypes} from "./types.d";
${transformImport(importChildStatement)}

const ${name} = ( props : propTypes ) => { 
    return (
        <div>
            ${props}
        </div>
    )
}
export default ${name};
`;

