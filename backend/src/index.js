import app from "./app";
import { PORT } from "./config/config";
import colors from "colors";

app.listen(PORT, () => {
  console.log(`api-backend running on port: ${PORT}`.blue);
});
