const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

async function writeFile(data) {
    try {
        await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing files:', err);
    }
}

module.exports = { readFile, writeFile }