import { Card } from "react-bootstrap";
import { FiArrowUp, FiX } from "react-icons/fi";
import { useState } from "react";
const UploadImage = () => {
  const [ImageChossen, setImageChossen] = useState("");
  const handleChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageChossen(reader.result);
    };
    console.log(ImageChossen);
  };
  const handleClose = () => {
    setImageChossen();
  };
  return (
    <div>
      <Card className="w880 ">
        <Card.Body className="d-flex">
          <div className="image-upload ">
            {ImageChossen && (
              <img
                src={ImageChossen}
                alt="image-choosen"
                style={{
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                }}
              />
            )}
            {ImageChossen && (
              <FiX onClick={handleClose} className="btn-close" />
            )}
            {!ImageChossen && (
              <div className="file-upload ">
                <input type="file" onChange={handleChange} />
                <FiArrowUp className="i-color" />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UploadImage;
