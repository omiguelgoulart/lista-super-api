import express from "express";
import { userRouter } from "./routes/userRoute";
import { authRouter } from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
import { apiKeyMiddleware } from "./middlewares/apiKey";

const app = express();

app.use(express.json());
app.use(apiKeyMiddleware);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(errorHandler);

export default app;