import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mainRouter from "./api/routers/index";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
const PORT = process.env.PORT;

app.use(mainRouter);

app.listen(PORT, () => {
    return console.log(`server started at http://localhost:${PORT}`);
});

export default app;
