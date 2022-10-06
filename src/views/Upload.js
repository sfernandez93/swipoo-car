
import SearchBackgroundImage from "../components/Search/SearchBackgroundImage";
import UploadBox from "../components/Upload/UploadBox";
import { useContext, useEffect } from "react";
import { UploadContext } from "../context/UploadContext";
import NavBar from "../components/Comun/NavBar";

const Upload = () => {
  const {
    getBrands,
    getFuelTypes,
    verifyFormValuesCompleted,
    getModels,
    formValues,
    setModels,
    models
  } = useContext(UploadContext);

  useEffect(() => {
    getBrands();
    getFuelTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    verifyFormValuesCompleted() ? getModels(formValues) : setModels({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  useEffect(() => {
    console.log(models)
  }, [models]);

  return (
    <div>
      <div className="search-bar-container">
        <NavBar />
        <SearchBackgroundImage />
        <div className="upload-box-container">
        <UploadBox />

        </div>
      </div>
    </div>
  );
};
export default Upload;
