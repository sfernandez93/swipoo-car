import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";
import { FaCar } from "react-icons/fa";

const UploadInput = ({
  inputTitle,
  inputName,
  inputType,
  inputAutocomplete,
  placeholder
}) => {
  const { handleChange } = useContext(UploadContext);

  return (
    <div className={`upload-box-input__container upload-box-input__container--${inputName}`}>
    <div className="upload-box__input">
    <div className="upload-box-input__icon">
      <FaCar />
    </div>
    <div className="upload-box-input__entry">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange}
        name={inputName}
        id={inputName}
      ></input>
    </div>
  </div>
  </div>
  );
};
export default UploadInput;
