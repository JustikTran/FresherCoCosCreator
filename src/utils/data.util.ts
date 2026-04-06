import {readFile, writeFile} from 'fs/promises';

export async function readLocalFile(fileName: string): Promise<any> {
    try {
        const data = await readFile(fileName, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

export async function writeLocalFile<T>(data: T, fileName:string): Promise<void> {
    try {
        await writeFile(fileName, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing files:', err);
    }
}
