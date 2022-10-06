import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";
import { FaCar } from "react-icons/fa";

const UploadInputSelector = ({ name, placeholder, selector, value }) => {
  const { handleChange } = useContext(UploadContext);

  return (
    <div className={`upload-box-input__container upload-box-input__container--${name}`}>
      <div className="upload-box__input">
        <div className="upload-box-input__icon">
          <FaCar />
        </div>
        <div className="upload-box-input__entry">
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            id={name}
          ></input>
        </div>
      </div>
      {selector}
    </div>
  );
};

export default UploadInputSelector;
