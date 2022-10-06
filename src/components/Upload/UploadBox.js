import UploadSelectorItemsBrand from "./UploadSelectorItemsBrand";
import UploadSelectorItemsFuel from "./UploadSelectorItemsFuel";
import UploadInput from "./UploadInput";
import UploadInputSelector from "./UploadInputSelector";
import UploadButton from "./UploadButton";
import UploadSelectorModel from "./UploadSelectorModel";
import UploadTitle from "./UploadTitle";
import UploadSubtitle from "./UploadSubtitle";

import { useContext } from "react";
import { UploadContext } from "../../context/UploadContext";

const UploadBox = () => {
  let { models, writeData } = useContext(UploadContext);

  return (
    <form className="upload-box" onSubmit={writeData}>
      <UploadTitle />
      <UploadSubtitle />
      <UploadInputSelector
        name={"brand"}
        placeholder={"¿Qué marca buscas?"}
        selector={<UploadSelectorItemsBrand name="brand" />}
      ></UploadInputSelector>
      <div className="upload-fuel-date-container">
        <UploadInputSelector
          name={"fuel"}
          placeholder={"Combustible"}
          selector={<UploadSelectorItemsFuel name="fuel" />}
        ></UploadInputSelector>
        <UploadInput
          inputTitle="Fecha matriculación"
          inputName="date"
          inputType="date"
          inputAutocomplete="date"
          
        ></UploadInput>{" "}
      </div>

      {models != null && models.length > 0 ? (
        <UploadSelectorModel
          selectorTitle="Modelo"
          selectorName="model"
        ></UploadSelectorModel>
      ) : null}
      <UploadInput
        inputTitle="Email"
        inputName="email"
        inputType="email"
        inputAutocomplete="email"
        placeholder="¿Cuál es tu correo?"
      ></UploadInput>
      <UploadButton></UploadButton>
    </form>
  );
};

export default UploadBox;
