import fs from "fs";
import prettier from "prettier";

const outputFolder = "./output";

export const createDir = (dirName: string) => {
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
}

export const createOutputDir = () => {
    createDir(outputFolder);
}


export const getPrettiefiedJsx = (content: string) => {
    return prettier.format(content, {
        semi: true,
        parser: "babel"
    });
}

//util to write file
export const writeFile = (filename: string, content: string) => {
    fs.writeFile(`${outputFolder}/${filename}`, content, function (err) {
        if (err) {
            return console.warn(err);
        }
    });
}

// util capitalize name
export const capitalize = (name: string) => {
    const [first, ...other] = name;
    const capitalizedName = [first.toUpperCase()].concat(other).join("");
    return capitalizedName;
}

//util normalize component names
export const pascalCase = (name: string) => {
    if (name.indexOf("_") !== -1) {
        return name
            .split("_")
            .map(token => {
                return capitalize(token);
            })
            .join("");
    }
    return capitalize(name);
}
