import { UploadContext } from "../../context/UploadContext";
import { useContext } from "react";

const UploadSelectorItemsBrand = ({ name }) => {
  let { brands } = useContext(UploadContext);
  brands = brands != null && brands.length > 5 ? brands.slice(0, 6) : brands;

  return (
    <div className={`selector-bar__item upload-selector-bar__item--${name}`}>
      {brands != null
        ? [...Object.keys(brands)].map((key) => (
            <div
              key={key}
              className={`upload-bar-input__option upload-bar-input__option--${name}`}
              value={key}
            >
              {brands[key].name}
            </div>
          ))
        : null}
    </div>
  );
};

export default UploadSelectorItemsBrand;
