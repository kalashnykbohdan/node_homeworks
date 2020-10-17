const http = require("htpp");

const server = http.createServer((req, res) => {
    console.log('Request received');

    const method = req.method;
    const pathParamsAndQuery = req.url;
    const headers = req.headers;
    let body = '';

    req.on('data', (bodyChunk) => {
        body += bodyChunk.toString();
    });

    req.on('end', () => {
        //body received

        console.log("req", req);
    });
});

server.listen(80, () => {
    console.log("Started listening on port", 80);
});