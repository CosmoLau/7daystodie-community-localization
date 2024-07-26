import * as fs from 'fs';
import * as path from 'path';

function generator(gameFilePath: string, communityPath: string): string[][] {
    const gameFileContent = fs.readFileSync(gameFilePath, 'utf-8');
    const gameFileLines = gameFileContent.split('\n');

    const communityContent = fs.readFileSync(communityPath, 'utf-8');
    const communityLines = communityContent.split('\n');

    const result: string[][] = [];

    gameFileLines.forEach((line, idx, lines) => {
        let items = line.split(/,(?! )/);
        if (communityLines[idx] == null) {
            result.push([items[0]]);
            return;
        }
        let communityItems = communityLines[idx].split(/,(?! )/);

        let key = items[0];
        let schinese = items[17];
        let communitySchinese = communityItems[17];

        if (schinese != communitySchinese) {
            result.push([key, schinese, communitySchinese]);
        }
    })

    return result;
}

const gameFilePath = path.join(process.cwd(), "/public/gamefile/Localization.txt");
const versionPath = path.join(process.cwd(), "/public/gamefile/version.txt");
const communityPath = path.join(process.cwd(), "/public/community/Localization.txt");
const outputPath = path.join(process.cwd(), "/output.txt");

const version = fs.readFileSync(versionPath, 'utf-8');
const changeContent = generator(gameFilePath, communityPath);
let outputStr: string = version + "\n\n";
if (changeContent.length > 0) {
    changeContent.forEach((item, idx, content) => {
        if (item.length == 1) {
            outputStr = outputStr + item[0] + ": Community translate missing\n\n"
        }
        else {
            outputStr = outputStr + item[0] + "\n" + item[1] + " => " + item[2] + "\n\n";
        }
    })
    fs.writeFileSync(outputPath, outputStr, 'utf-8');
    console.log("Generate success");
}
else {
    fs.writeFileSync(outputPath, "No change", 'utf-8');
    console.log("No change");
}
