import express from "express";
import cors from "cors";
import morgan from "morgan";
import { urlOrigin } from "./config/config";
import cookieParser from "cookie-parser";
import genErr from "./middlewares/genErrHandler";
import { genTryCatch } from "./middlewares/genTryCatchHandler";
import DevErr from "./utils/DevErrHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";

import { generate_random_products } from "./utils/initialProductSetup";

//objeto del framework express que permite levantar el servidor con los endpoints necesarios para el backend
const app = express();

// *funcion que permite verificar la authenticación hacia la base de datos mysql mediante sequelize
// mysql_test_con();

generate_random_products();

// *middleware que permite recuperar el body del request en formato json
app.use(express.json());
// *dependencia dev que permite mostrar via línea de comandos las respuestas del servidor sobre las peticiones que recibe
app.use(cookieParser());
app.use(morgan("tiny"));
// *dependencia necesaria para habilitar los dominios (cors) que solicitan recursos al servidor
app.use(
  cors({
    origin: urlOrigin,
    credentials: true,
  })
);

// *middleware que permite recuperar las cookies provenientes de lado del cliente

// RUTAS DE LA API REST
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);

// *se verifican rutas inexistentes y se lanza una respuesta con el error customizado
app.use(
  "*",
  genTryCatch(async (req, res) => {
    throw new DevErr(79404, "Resource Not Found", 404);
  })
);

// *middleware que permite verificar si es un tipo de la clase Error o de una clase de error customizada
app.use(genErr);

export default app;
