require("dotenv").config();
require("express-async-errors")
// async errors

const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products")
const app = express();
const print = console.log;
app.use(express.json());

print("siema");
const homePage = "<h1>Home Page</h1><a href='/api/v1/products'>Go to Products</a>"
// routes
app.get('/', (req, res) => res.send(homePage))
app.use('/api/v1/products', productsRouter)
// app.use('/api/v1/products')

// product route
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3300;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log("Server is listening on port : 3300"))
        
    } catch (error) {
        console.log(error);
    }
}

start()