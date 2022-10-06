import { createContext, useState, useContext, useEffect } from "react";
import { getDatabase, ref as dbref, set, get, child } from "firebase/database";
import { v4 as uuid } from "uuid";
import { ComunContext } from "./ComunContext";

export const UploadContext = createContext({});

const containerBrandSelector = document.getElementsByClassName(
  "upload-selector-bar__item--brand"
);
const containerFuelSelector = document.getElementsByClassName(
  "upload-selector-bar__item--fuel"
);
const containerBrand = document.getElementsByClassName(
  "upload-box-input__container--brand"
);
const containerFuel = document.getElementsByClassName(
  "upload-box-input__container--fuel"
);
const containerDate = document.getElementsByClassName(
  "upload-box-input__container--date"
);
const containerModel = document.getElementsByClassName(
  "selector-model upload-box-input__container"
);
const containerEmail = document.getElementsByClassName(
  "upload-box-input__container--email"
);

const containerOptionBrand = document.getElementsByClassName(
  "upload-bar-input__option--brand"
);
const containerOptionFuel = document.getElementsByClassName(
  "upload-bar-input__option--fuel"
);

const UploadContextProvider = ({ children }) => {
  const [brands, setBrands] = useState({});
  const [fuelTypes, setFuelTypes] = useState({});
  const [models, setModels] = useState([]);
  const [formValues, setFormValues] = useState({});

  const { setDisplay, findBrandByUid, findFuelByUid } =
    useContext(ComunContext);

  document.addEventListener("click", function (e) {
    if (
      containerBrandSelector &&
      containerBrandSelector[0] &&
      !containerBrandSelector[0].contains(e.target)
    ) {
      setDisplayNone(containerBrandSelector[0]);
    }
    if (
      containerFuelSelector &&
      containerFuelSelector[0] &&
      !containerFuelSelector[0].contains(e.target)
    ) {
      setDisplayNone(containerFuelSelector[0]);
    }

    verifyUpdateSelectedOption(
      e,
      containerOptionBrand,
      containerBrandSelector[0],
      "brand"
    );
    verifyUpdateSelectedOption(
      e,
      containerOptionFuel,
      containerFuelSelector[0],
      "fuel"
    );
  });

  const verifyUpdateSelectedOption = (e, options, container, type) => {
    for (let item of options) {
      if (item.contains(e.target)) {
        document.getElementById(type).value = e.target.innerHTML;
        let newObject = {};
        newObject[type] = e.target.innerHTML;
        updateFormValues(newObject);
        setDisplayNone(container);
      }
    }
  };

  const updateFormValues = (newObject) => {
    setFormValues((prevState) => ({
      ...prevState,
      ...newObject,
    }));
  };

  const setDisplayNone = (container) => {
    container.style.display = "none";
  };

  const verifyFormValuesCompleted = () => {
    return formValues != null &&
      formValues?.brand &&
      formValues?.fuel &&
      formValues?.date
      ? true
      : false;
  };

  const clearInputs = () => {
    setFormValues({});
  };

  const getBrands = async () => {
    const db = getDatabase();
    const dbRef = dbref(db);
    try {
      const snapshot = await get(child(dbRef, "car-brands/"));
      snapshot.exists()
        ? setBrands(snapshot.val())
        : console.log("No data available");
    } catch (error) {
      console.error(error);
    }
  };

  const getFuelTypes = async () => {
    const db = getDatabase();
    const dbRef = dbref(db);
    try {
      const snapshot = await get(child(dbRef, "fuel-types/"));
      snapshot.exists()
        ? setFuelTypes(snapshot.val())
        : console.log("No data available");
    } catch (error) {
      console.error(error);
    }
  };

  const getModels = async (string) => {
    fetch(
      ` https://api-sandbox.swipoo.com/v1/check-car-models/?brand=${
        formValues?.brand
      }&enrollmentDate=${"2015/02/06"}&fuel=${formValues?.fuel}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const emptyOption = [''];
          setModels(emptyOption.concat(result["cars"]?.map((x) => x.model)));
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleChange = (event) => {
    let newObject = {};
    newObject[event.target.name] = event.target.value;

    if (event.target.name === "fuel") {
      getFuelTypesByFilter();
    } else if (event.target.name === "brand") {
      getCarBrandsByFilter();
    }

    updateFormValues(newObject);
  };

  const getCarBrandsByFilter = async () => {
    const db = getDatabase();
    const dbRef = dbref(db);
    setDisplay(containerBrandSelector[0], "block");

    await get(child(dbRef, `car-brands`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setBrands([]);
          Object.keys(snapshot.val()).forEach((key) => {
            addDataIfBrandMeetConditionFilter(snapshot.val()[key], key);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFuelTypesByFilter = async () => {
    const db = getDatabase();
    const dbRef = dbref(db);
    setDisplay(containerFuelSelector[0], "block");

    await get(child(dbRef, `fuel-types`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFuelTypes([]);
          Object.keys(snapshot.val()).forEach((key) => {
            addDataIfFuelMeetConditionFilter(snapshot.val()[key], key);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addDataIfFuelMeetConditionFilter = (carObj, key) => {
    console.log(formValues);
    if (carObj?.name?.toUpperCase().includes(formValues.fuel.toUpperCase()))
      addDataFuelType(carObj, key);
  };

  const addDataIfBrandMeetConditionFilter = (carObj, key) => {
    if (carObj?.name?.toUpperCase().includes(formValues.brand.toUpperCase())) {
      addDataBrand(carObj, key);
    }
  };

  const addDataBrand = async (carObj, key) => {
    const brand =
      carObj.name && carObj.name !== "0" ? await findBrandByUid(key) : "";

    carObj["uid"] = key;
    carObj["name"] = brand;

    setBrands((prevState) => [...prevState, carObj]);
  };

  const addDataFuelType = async (carObj, key) => {
    const fuel =
      carObj.name && carObj.name !== "0" ? await findFuelByUid(key) : "";

    carObj["uid"] = key;
    carObj["name"] = fuel;

    setFuelTypes((prevState) => [...prevState, carObj]);
  };

  const writeData = (e) => {
    const db = getDatabase();
    if (verifyFormIsCompleted(e)) {
      const id = uuid();
      writeCarDatabase(db, id);
    }
  };

  const verifyFormIsCompleted = (e) => {
    e.preventDefault();

    cleanClassErrors();

    if (formValues?.brand == null || formValues?.brand === "") {
      addClassError(containerBrand[0]);
      return false;
    } else if (formValues?.fuel == null || formValues?.fuel === "") {
      addClassError(containerFuel[0]);
      return false;
    } else if (formValues?.date == null || formValues?.date === "") {
      addClassError(containerDate[0]);
      return false;
    } else if (formValues?.email == null || formValues?.email === "") {
      addClassError(containerEmail[0]);
      return false;
    } else if (
      (containerModel != null && containerModel && formValues?.model == null) ||
      formValues?.model === ""
    ) {
      addClassError(containerModel[0]);
      return false;
    }

    return true;
  };

  const cleanClassErrors = () => {
    containerBrand[0]?.classList.remove("form-error");
    containerFuel[0]?.classList.remove("form-error");
    if (containerModel != null && containerModel)
      containerModel[0]?.classList.remove("form-error");
    containerDate[0]?.classList.remove("form-error");
    containerEmail[0]?.classList.remove("form-error");
  };

  const addClassError = (container) => {
    container?.classList.add("form-error");
  };

  const writeCarDatabase = (db, unique_id) => {
    set(dbref(db, "cars/" + unique_id), {
      email: formValues?.email,
      brand: formValues?.brand,
      model: formValues?.model,
      fuel: formValues?.fuel,
      date: formValues?.date,
    });
    clearInputs();
    window.location.reload();
  };

  return (
    <UploadContext.Provider
      value={{
        writeData,
        clearInputs,
        brands,
        models,
        fuelTypes,
        formValues,
        handleChange,
        getBrands,
        getFuelTypes,
        verifyFormValuesCompleted,
        getModels,
        setModels,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
