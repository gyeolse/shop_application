import { Icon } from "antd";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload(props) {
  //state 사용
  const [Images, setImages] = useState([]);

  const deleteHandler = (image) => {
    const curIndex = Images.indexOf(image); //현재의 imamge 인덱스 확인
    //인덱스 삭제 과정. spread +
    let newImages = [...Images];
    newImages.splice(curIndex, 1); //spclie = 해당 인덱스로부터 , 1개를 어레이에서 지워준다.
    setImages(newImages);
    //부모 컴포넌트 업데이트
    props.refreshFunction(newImages);
  };

  const dropHandler = (files) => {
    let formData = new FormData(); //1. 형식
    const config = {
      header: { "content-type": "mulitpart/form-data" },
    }; //헤더에 어떤 파일인지 실어서 보내주어야 함.

    formData.append("file", files[0]); //config를 꼭 넣어서 보내주어야함.

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        // 성공한 경우. 로직 적기
        console.log(response.data);

        //spread 연산자[
        setImages([...Images, response.data.filePath]);

        //부모 컴포넌트 업데이트
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("파일 저장 실패");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              sytle={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
