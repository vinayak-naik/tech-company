import express, { Application } from "express";
import routes from "./routes";
import { Server } from "http";
import connect from "./db/connect";
import config from "config";
import { deserializeUser } from "./middleware";
import log from "./logger";

const port = config.get("port") as number;
const host = config.get("host") as string;
const app: Application = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server: Server = app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
