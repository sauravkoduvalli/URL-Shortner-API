import "dotenv/config";
import express from "express";

import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use("/user", userRoutes);


app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
