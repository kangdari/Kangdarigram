const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../model/Users");
const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일 저장 위치
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    // 파일 저장 이름
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

// 회원 가입
router.post("/register", async (req, res) => {
  // 클라이언트에서 회원 정보를 전달 받음.
  const user = new User(req.body);
  // id 중복 체크
  const exists = await User.findById(req.body.id);
  if (exists) {
    return res
      .status(409)
      .json({ registerSuccess: false, message: "이미 존재하는 아이디입니다." });
  }

  user.save((err, userInfo) => {
    if (err) return res.json({ registerSuccess: false, err });

    return res.status(200).json({
      registerSuccess: true,
    });
  });
});

router.post("/login", async (req, res) => {
  // 요청된 id 체크
  const user = await User.findOne({ id: req.body.id });

  if (!user) {
    return res
      .status(401)
      .json({ loginSuccess: false, message: "아이디가 존재하지 않습니다." });
  }
  // 비밀번호 체크
  user.comparePassword(req.body.password, (err, isMatch) => {
    // 비밀번호가 틀린 경우
    if (!isMatch)
      return res.status(401).json({
        loginSuccess: false,
        message: "잘못된 비밀번호입니다. 다시 확인하세요.",
      });
    // 비밀번호가 맞은 경우 토큰 생성
    user.createToken((err, user) => {
      if (err) return res.status(400).send(err);
      // user token > localStorage에 저장

      // 토큰 저장 => 쿠키
      res
        // .cookie("auth", user.token, {
        //   //httpOnly: true,
        //   // secure: true,
        //   // sameSite: "none",
        // })
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id,
          token: user.token,
        });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  // console.log(req.user);
  // auth 미들웨어 수행 시 req에서 user 정보 조회 가능
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true, // role: 1 > admin
    isAuth: true,
    role: req.user.role,
    image: req.user.image,
    intro: req.user.intro,
  });
});

router.get("/logout", auth, (req, res) => {
  // auth 미들웨어 수행 시 req에서 user 정보 조회 가능
  // user를 찾아 token 제거
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({ logoutSuccess: true });
  });
});

router.post("/get-user-id", (req, res) => {
  User.find({ id: req.body.userId }).exec((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});

// 전체 사용자 로드 및 검색
router.post("/load-user-list", (req, res) => {
  User.find().exec((err, userList) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, userList });
  });
});

// 유저 프로필 이미지
router.post("/upload/user-image", (req, res) => {
  const { userId } = req.query;
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });
    User.findOneAndUpdate(
      { _id: userId },
      { image: res.req.file.path },
      { new: true }, // 이미지 파일 업데이트 된 정보 반환
      (err, userInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, userInfo });
      },
    );
  });
});
// 프로필 수정
router.post("/edit-profile", (req, res) => {
  const { id, name, intro, _id } = req.body;

  User.findOneAndUpdate(
    { _id },
    { name, id, intro },
    { new: true },
    (err, userInfo) => {
      // id 중복 시 에러 발생
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, userInfo });
    },
  );
});

module.exports = router;
