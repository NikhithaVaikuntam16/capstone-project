import pool from "../config/db.js";
import { insertOrderDetails, insertAllOrderedItems } from "../models/ordersModel.js";
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