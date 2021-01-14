const express = require("express");
const multer = require("multer");
const { Product } = require("../models/Product");
const router = express.Router();

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //어디에 파일이 저장이 되는지 설정. root에 upload 폴더를 만들고, 파일 경로 설정 ('/uploads/)
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //어떤 이름으로 저장할 것인지
    cb(null, `${Date.now()}_${file.originalname}`); //파일 이름 설정
  },
});

var upload = multer({ storage: storage }).single("file"); // ***** single("file")

router.post("/image", (req, res) => {
  //가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// /api/product
router.post("/", (req, res) => {
  //가져온 정보들을 DB에 저장
  //product 모델을 들고 옴
  const product = new Product(req.body); //객체 생성

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  }); //자동으로 다 저장됨.
});

module.exports = router;
