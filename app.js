const { readFile, writeFile } = require("fs/promises");
const http = require("http");
const util = require("util");
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// getText("./content/text.txt")
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

const start = async () => {
    try {
        const first = await readFile("./content/text.txt", "utf8")
        const second = await readFile("./content/text-mean.txt", "utf8")
        console.log(first);
        console.log(second);
        await writeFile("./content/result-texts.txt", `This are ${first} ${second}`)

    } catch (error) {
        console.log(error);

    }
}

start()

// const server = http.createServer((req, res) => {
//     if (req.url === "/") return res.end("Welcome to Homepage")
//     if (req.url === "/about") return res.end("About page")

//     return res.end("Oops, there is no site you are looking for");
//     // res.write("Welcome to our homepage");
//     // res.end();
// })

// server.listen(5000, () => console.log("Server listening on port: 5000..."));


// EVENTS

const EventEmitter = require("events");
const customEmitter = new EventEmitter();

customEmitter.on("response", () => {
    console.log(`data recieved`)
}
)

customEmitter.emit("response");
