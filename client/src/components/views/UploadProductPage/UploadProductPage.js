import React, { useState } from "react";
import { Typography, Button, Form, Input, Descriptions } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Austrailia" },
  { key: 7, value: "Antarctica" },
];
/**
 * 1. form 만들기
 * 2. antd 프레임워크.
 * 3. handler 추가
 * 4. Select option Handler
 * 5. image dropZone => FileUpload.js Component. Dropzone Library
 *
 *
 * 6. Image 정보 처리 => props
 */
function UploadProductPage(props) {
  //state 관리
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  //image 관리
  const [images, setImages] = useState([]); //array setting

  //changeHanler
  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.currentTarget.value);
  };
  const continentChangeHandler = (e) => {
    setContinent(e.currentTarget.value);
  };

  //이미지 정보 처리
  const updateImages = (newImages) => {
    //받아온 것을 넣어줌
    setImages(newImages);
  };

  //submitHandler
  const submitHandler = (e) => {
    e.preventDefault(); //확인 버튼을 누를때 자동으로 refresh 되지 않도록 함

    if (!title || !description || !price || !continent || !images) {
      return alert("모든 칸을 채우세요!");
    }

    //서버에 채운 값들을 request로 보내기
    const body = {
      //로그인된 사람의 ID : REDUX에서 가져와도 되고, auth.js 컴포넌트에 user에 대한 모든 정보를 넣어줘서, 그걸 들고 와도 된다.
      //이 컴포넌트에 props를 추가한다.
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      images: images,
      continent,
      continent,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        //랜딩 페이지로 바로 갈 수 있도록 함.
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "cencter", marginBottom: "2rem" }}>
        <Title level={2}> 상품 업로드 페이지</Title>
      </div>
      <Form onSubmit={submitHandler}>
        {/* image 업로드 부분 별도의 컴포넌트로 선언 Dropbox */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title} />

        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={description} />
        <br />
        <br />

        <label>가격(원)</label>
        <Input type="number" onChange={priceChangeHandler} value={price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
