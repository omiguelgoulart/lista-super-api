import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoute";
import { authRouter } from "./routes/auth";
import { listsRouter } from "./routes/lists";
import { categoriesRouter } from "./routes/categories";
import { itemsRouter } from "./routes/items";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", app: "lista-super-api" });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/lists", listsRouter);
app.use("/lists/:listId/categories", categoriesRouter);
app.use("/items", itemsRouter);

app.use(errorHandler);

export default app;
