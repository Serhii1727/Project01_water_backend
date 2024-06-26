import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import waterNotesRouter from "./routes/waterNotesRouter.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import googleRouter from "./googleAuth/auth.router.js";
import usersRouter from "./routes/usersRouter.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dotenv.config();

const { DB_HOST, PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/auth", googleRouter);
app.use("/link", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/link.html"));
});

/*!
 * TO DO: 
 * 1. It is necessary to remove link.html once we have a frontend. 
 * 2. To update links with real frontend link
 * 3. Render
    
 */

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/water-notes", waterNotesRouter);
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
