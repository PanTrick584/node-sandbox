const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
        const products = await Product.find({}).sort("-name price")
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const {featured, company, name,  sort} = req.query;
    const queryObject = {};

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (featured) {
        queryObject.featured = featured === "true" ?? false
    }
    if (company) {
        queryObject.company = company
    }

    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList);
    } else {
        result = result.sort('createAt')
    }
    const products = await result;

    res.status(200).json({ products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}