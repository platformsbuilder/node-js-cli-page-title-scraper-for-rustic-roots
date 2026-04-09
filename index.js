const https = require('node:https');
const { URL } = require('node:url');

if (process.argv.length < 3) {
    console.error('Usage: npx rrt <url>');
    process.exit(1);
}

const url = new URL(process.argv[2]);

https.get(url, (res) => {
    let data = '';

    // Collect data
    res.on('data', (chunk) => {
        data += chunk;
    });

    // On end, extract title
    res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        if (titleMatch && titleMatch[1]) {
            console.log(titleMatch[1]);
        } else {
            console.error('Title not found');
        }
    });
}).on('error', (err) => {
    console.error('Error fetching the URL:', err.message);
});