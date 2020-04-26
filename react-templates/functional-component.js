export const template = `
import React from 'react'; 
${importChildStatement}

const ${name} = (props) => { 
    return (
        <div>
            ${props}
            ${childComponent}
        </div>
    )
}
export default ${name};
`;
