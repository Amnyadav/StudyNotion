const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/database");
const { connectCloudinary } = require("./config/cloudinary");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
  })
);
app.use(
  // cors()
      cors({
      origin:'http://localhost:3000',
      credentials:true
  })
);
app.use("/api/v1",routes);

dbConnect();
connectCloudinary();

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "server is running successfully",
  });
});

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
