import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";

const UploadSelector = ({ selectorTitle, selectorName }) => {
  const { brands } = useContext(UploadContext);
  const { formValues, handleChange } = useContext(UploadContext);

  return (
    <div className="">
      <label
        htmlFor="brand"
      >
        {selectorTitle}
      </label>
      <select
      required
        defaultValue={formValues.value}
        onChange={handleChange}
        name={selectorName}
        aria-label="Default select example"
        data-cy={selectorName}
      >
        {[...Object.keys(brands)].map((key) => (
          <option
            key={key}
            value={key}
          >
            {brands[key].name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default UploadSelector;
