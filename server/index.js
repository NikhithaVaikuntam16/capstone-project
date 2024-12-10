import express from "express";
import passport from "./config/passport.js";
import userRouter from "./routes/user.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/user", userRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

