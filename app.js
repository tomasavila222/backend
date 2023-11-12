const express = require('express');
const ProductManager = require('ProductManager');

const app = express();
const port = 8080; 

const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Pproducto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: ' Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
