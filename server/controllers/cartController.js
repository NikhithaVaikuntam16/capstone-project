import { getCartByUserId, getCartByUserAndProductId, addProductToCart, updateCart, deleteItemFromCart, deleteAllById } from "../models/cartModel.js";

export const getCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ error: 'Invalid request data.' });
    }
    try {
        const cart = await getCartByUserId(userId);
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

export const deleteItem = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    try {
        const result = await deleteItemFromCart(userId, productId);
        if(result.length > 0) {
            return res.status(200).json({message: "Deleted item from the cart successfully"});
        }else {
            return res.status(400).json({error: "Item doesn't exist in the cart"});
        }
    }catch(err) {
        return res.status(500).json({error: "Something went wrong while deleting item from the cart"});
    }
}

export const deleteAll = async (req, res) => {
    const userId = req.user.id;
    try {
        const deletedRows = await deleteAllById(userId);
        if(deletedRows.length > 0) {
            return res.status(200).json({message: "Deleted all items from the cart successfully"});
        }else {
            return res.status(400).json({error: "Items do not exist in the cart"});
        }
    }catch(err) {
        return res.status(500).json({error: "Something went wrong while deleting items from the cart"});
    }
}