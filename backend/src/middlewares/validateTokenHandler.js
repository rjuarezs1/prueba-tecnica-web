import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/config";

export const validateAccessToken = (req, res, next) => {
  const { access_token } = req.body;
  jwt.verify(access_token, ACCESS_TOKEN, (err, decoded) => {
    // if (err) throw new DevErr(79401, "Unauthorizeded", 401);
    if (err) {
      return res.status(401).json({
        ok: false,
        body: "Sin autorización",
      });
    } else {
      req.body.decoded = decoded;
    }
    next();
  });
};
