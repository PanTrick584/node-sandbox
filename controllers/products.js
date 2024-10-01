const Product = require("../models/product");
const print = console.log;
const getAllProductsStatic = async (req, res) => {
    const products = await Product
        .find({ price: { $gt: 30 } })
        .sort("name")
        .select("name price")
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=\b)/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        print(filters)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
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
        console.log(sortList);

        result = result.sort(sortList);
    } else {
        result = result.sort('createAt')
    }

    if (fields) {
        const fieldstList = fields.split(',').join(' ');
        result = result.select(fieldstList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}