import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";

const UploadSelectorItemsFuel = ({ name }) => {
  let { fuelTypes } = useContext(UploadContext);
  fuelTypes = fuelTypes != null && fuelTypes.length > 5 ? fuelTypes.slice(0,6): fuelTypes;

  return (
    <div className={`selector-bar__item upload-selector-bar__item--${name}`}>
      {fuelTypes != null
        ? [...Object.keys(fuelTypes)].map((key) => (
            <div key={key} className={`upload-bar-input__option upload-bar-input__option--${name}`} value={key}>
              {fuelTypes[key].name}
            </div>
          ))
        : null}
    </div>
  );
};

export default UploadSelectorItemsFuel;
