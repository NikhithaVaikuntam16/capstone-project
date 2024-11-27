import { getCartByUserId, getCartByUserAndProductId, addProductToCart, updateCart } from "../models/cartModel.js";

export const getCart = async (req, res) => {
    try {
        const cart = await getCartByUserId(req.user.id);
        return res.status(200).json({cart});
    }catch(err) {
        return res.status(500).json({error: "Something went wrong while fetching cart items"});
    }
}

export const addToCart = async (req, res) => {
    const productObj = req.body;
    const userId = req.user.id;
    try {
        const itemExistsInCart = await getCartByUserAndProductId(userId, productObj.productId);
        if(itemExistsInCart) {
            const updatedQuantity = itemExistsInCart.quantity + productObj.quantity;
            await updateCart(updatedQuantity, userId, productObj.productId);
        }else {
            await addProductToCart(userId, productObj.productId, productObj.quantity);
        }
        return res.status(200).json({message: "Added cart items to database successfully"});
    }catch(err) {
        return res.status(500).json({error: "Something went wrong while adding items to cart"});
    }
}

export const syncCart = async (req, res) => {
    const localCart = req.body;
    const userId = req.user.id;
    if(localCart.length > 0) {
        localCart.forEach(async (item) => {
            try {
                const itemExistsInCart = await getCartByUserAndProductId(userId, item.product_id);
                if(itemExistsInCart) {
                    const updatedQuantity = itemExistsInCart.quantity + item.quantity;
                    await updateCart(updatedQuantity, userId, item.product_id);
                }else {
                    await addProductToCart(userId, item.product_id, item.quantity);
                }
                return res.status(200).json({message: "Cart items synced to database successfully"});
            }catch(err) {
                return res.status(500).json({error: "Something went wrong while syncing items to cart"});
            }
        })
    }else {
        return res.status(200).json({message: "Cart items synced successfully"});
    }   
}