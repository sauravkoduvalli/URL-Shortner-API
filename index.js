import "dotenv/config";
import express from "express";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";
import userRoutes from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);
app.use("/user", userRoutes);
app.use(urlRouter);

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
