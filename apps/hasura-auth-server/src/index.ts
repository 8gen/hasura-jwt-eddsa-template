import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import * as jwks from "./controllers/jwks";
import * as device from "./controllers/device";
import * as user from "./controllers/user";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "127.0.0.1");
app.set("json spaces", process.env.NODE_ENV === "production" ? 0 : 2);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors());

app.post("/api/v1/device/issue", device.issue);
app.post("/api/v1/device/refresh", device.issue);
app.post("/api/v1/device/mock_issue", device.mock_issue);
app.post("/api/v1/user/issue", user.issue);
app.post("/api/v1/user/mock_issue", user.mock_issue);
app.get("/powix.jwks", jwks.jwk);
app.get("/api/v1/config", jwks.config);

const start = async (): Promise<void> => {
    try {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();
