const fs = require('fs');

const processData = (filename) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const nodes = new Set(); // Populate this with your nodes
        const links = []; // Populate this with your links
        let currentQuery = null;
        let queryCount = 0; // Counter for processed queries
        let subjectCount = 1; 
        const lines = data.split('\n');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            
            if (line.startsWith('Query:')) {
                /*if (queryCount == 50) {
                    break; // Exit the loop after 10 queries
                }*/
                currentQuery = line.split(' ')[1];
                nodes.add(currentQuery);
                queryCount++; // Increment the query counter
                subjectCount = 1; // Reset counter for subjects
            } else if (line.startsWith('Subject:') && currentQuery) {
                const parts = line.split(/\s+/);
                const subjectId = parts[1];
                const eValue = parseFloat(parts[3]);
                nodes.add(subjectId);
                links.push({ source: currentQuery, target: subjectId, value: eValue, subject: subjectCount });
                subjectCount++;
            }
        }

        // Convert nodes Set to an array of objects
        const nodesArray = Array.from(nodes).map(id => ({ id }));

        // Write the processed data to a JSON file
        const output = { nodes: nodesArray, links };
        fs.writeFile('processedData435.json', JSON.stringify(output, null, 2), err => {
            if (err) {
                console.error('Error writing processed data:', err);
                return;
            }
            console.log('Data processed and saved.');
        });
    });
};

processData('/Users/chenlab/Desktop/blastcodetesting/fdgtest/43membergraphdata5percent.txt');
