import express from "express";
import userRouter from "./routes/user.js";
import categoriesRouter from "./routes/categories.js"

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

