import pool from "../config/db.js";
import { insertOrderDetails, insertAllOrderedItems, getOrdersByUserId, getTotalItemsByOrderId } from "../models/ordersModel.js";
import { updateStockById } from "../models/productsModel.js";

export const insertOrder = async (req, res) => {
    const { productDetails, totalPrice } = req.body;
    const userId = req.user.id;

    if (!userId || !productDetails || productDetails.length === 0) {
        return res.status(400).json({ error: 'Invalid request data.' });
    }
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const orderResult = await insertOrderDetails(client, userId, totalPrice);
        const orderId = orderResult[0].id;

        for(const product of productDetails) {
            await updateStockById(client, product.quantity, product.id);
            await insertAllOrderedItems(client, orderId, product.id, product.quantity, product.price);
        }

        await client.query("COMMIT");
        return res.status(200).json({ success: true, orderId });
    }catch(err) {
        await client.query("ROLLBACK");
        return res.status(500).json({error: "Something went wrong while inserting an order"});
    }finally {
        client.release();
    }
}

export const getOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await getOrdersByUserId(userId);
        if(orders.length > 0) {
            const ordersArray = [];
            for (const order of orders) {
                const totalItems = await getTotalItemsByOrderId(order.id);
                ordersArray.push({...order, totalItems});
            }
            return res.status(200).json({orders: ordersArray});
        }else {
            return res.status(404).json({orders:[], message: "No orders found" });
        }
    }catch(err) {
        return res.status(500).json({error: "Something went wrong while fetching orders"});
    }
}