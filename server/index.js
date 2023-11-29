const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./configs/db_connection.js");
const bodyParser = require("body-parser");
const route = require("./routes/index.js");
const cookieParser = require("cookie-parser");

dotenv.config();
const port = process.env.PORT;
const app = express();
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

route(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
