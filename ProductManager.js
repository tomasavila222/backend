import fs from 'fs'

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }
    addProduct(product) {
        const products = this.getProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        product.id = newId;
        products.push(product);
        this.saveProducts(products);
    }
    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            products[index] = updatedProduct;
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

//ejemplo
const productManager = new ProductManager('products.json');

//agregar producto
const newProduct = {
    title: "nuevo producto",
    description: "Descripción del nuevo producto",
    price: 29.99,
    thumbnail: "imagen.jpg",
    code: "NP1",
    stock: 20
};
productManager.addProduct(newProduct);

// Consultar producto 
const products = productManager.getProducts();
console.log("Productos:", products);

//consultar produ por ID
const productId = 1;
const productById = productManager.getProductById(productId);
console.log("Producto con ID", productId, ":", productById);

//actualizar un producto
const updatedProduct = {
    title: "Producto actualizado",
    description: "Descripción actualizada",
    price: 39.99,
    thumbnail: "imagen_nueva.jpg",
    code: "PA1",
    stock: 25
};
const success = productManager.updateProduct(productId, updatedProduct);
if (success) {
    console.log("Producto actualizado con éxito.");
} else {
    console.log("No se encontró el producto con ese ID.");
}

// Eeliminar un producto
const deleteSuccess = productManager.deleteProduct(productId);
if (deleteSuccess) {
    console.log("Producto eliminado con éxito.");
} else {
    console.log("No se encontró el producto con el ID para eliminar.");
}
