const http = require("http");

const server = http.createServer((req, res) => {
    if(req.url === "/") return res.end("Welcome to Homepage")
    if(req.url === "/about") return res.end("About page")

    return res.end("Oops, there is no site you are looking for");
    // res.write("Welcome to our homepage");
    // res.end();
})

server.listen(5000, () => console.log("Server listening on port: 5000...")); 