import express from "express";
import { userRouter } from "./routes/userRoute";
import { errorHandler } from "./middlewares/errorHandler";
import { apiKeyMiddleware } from "./middlewares/apiKey";

const app = express();

app.use(express.json());
app.use(apiKeyMiddleware);

app.use("/users", userRouter);

app.use(errorHandler);

export default app;