const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/key.js");

const corsOptions = {
  // origin: "http://localhost:3000", // local
  origin: "http://kangdarigram.s3-website.ap-northeast-2.amazonaws.com", // s3
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded 분석
app.use(bodyParser.json()); // application/json 분석
app.use(cookieParser());

mongoose
  .connect(config.mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello"));
// static 파일이 있는 upload 폴더는 내부적으로 /upload라는 가상 경로로 접근
app.use("/upload", express.static("upload"));

// 라우트 적용ç
app.use("/api/users", require("./routes/users"));
app.use("/api/post", require("./routes/post"));
app.use("/api/save", require("./routes/save"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/search", require("./routes/search"));

const port = 5000;

app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
// app.listen(port, () => console.log(`Listening on port ${port}`));
