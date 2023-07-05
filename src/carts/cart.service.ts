import { Cart, ResponseObject } from "../entities/classes";
import { ICartService, IProductService, Product } from "../entities/products";
import { ProductManager } from "../services/fs.dao";
import { Response } from 'express';
const productManager = new ProductManager<Cart>("./src/carts/carts.json")

export class CartService<T extends { pid: string, quantity: number }> implements ICartService {
    constructor(
        protected dao = productManager,
        public createCart = async (products: { pid: string, quantity: number }[]) => {
            const cartObject = new Cart(products)
            try {
                const response = await this.dao.addProduct(cartObject)
                if (response !== undefined) {
                    return new ResponseObject<Cart>(null, true, response)
                } else return new ResponseObject("Crasheeed", false, null)
            } catch (error) {
                console.log(error)
                return new ResponseObject(error, false, null)
            }

        },
        public getCarts = async () => {
            try {
                const response = await this.dao.getProducts()
                if (response !== undefined) {
                    return new ResponseObject(null, true, response)
                } else return new ResponseObject("SOmething went Wrong", false, null)


            } catch (error) {
                console.log(error)
                return new ResponseObject(error, false, null)

            }
        },
        public getById = async (id: string) => {
            try {
                const response = await this.dao.getProductById(id)
                if (response !== undefined) {
                    return new ResponseObject(null, true, response)
                } else return new ResponseObject("SOmething went wrong", false, null)

            } catch (error) {
                console.log(error)
                return new ResponseObject(error, false, null)
            }
        },
        public addProductById = async (id: string, product: T) => {
            try {
                const cartData = await this.dao.getProductById(id)
                if (cartData !== undefined) {
                    const productData = cartData.products.findIndex(productField => product.pid === productField.pid)
                    if (productData !== -1) {
                        cartData.products[productData].quantity++
                    } else {
                        cartData.products.push(product)
                    }
                    const response = await this.dao.updateProduct(id, cartData)
                    if (response !== undefined) {
                        return new ResponseObject(null, true, response)
                    } else return new ResponseObject("Caboom", false, null)
                }
            } catch (error) {
                console.log(error)
                return new ResponseObject(error, false, null)
            }
        }
    ) { }
}