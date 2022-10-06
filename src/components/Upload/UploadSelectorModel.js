import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";

const UploadSelectorModel = ({ selectorTitle, selectorName }) => {
  const { models } = useContext(UploadContext);
  const { formValues, handleChange } = useContext(UploadContext);

  return (
    <select
      defaultValue={formValues.value}
      onChange={handleChange}
      name={selectorName}
      className="selector-model upload-box-input__container"
      aria-label="Default select example"
      data-cy={selectorName}
    >
      <option className="" defaultValue></option>
      {models.map((key) => (
        <option key={key} className="" value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};
export default UploadSelectorModel;
