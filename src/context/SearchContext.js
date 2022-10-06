import { useContext, createContext, useState, useEffect } from "react";
import { getDatabase, ref as dbref, child, get } from "firebase/database";
import { ComunContext } from "./ComunContext";

export const SearchContext = createContext({});

const db = getDatabase();
const dbRef = dbref(db);

const containerBrand = document.getElementsByClassName(
  "search-selector-bar__item--brand"
);
const containerFuel = document.getElementsByClassName(
  "search-selector-bar__item--fuel"
);
const containerOptionBrand = document.getElementsByClassName(
  "search-bar-input__option--brand"
);
const containerOptionFuel = document.getElementsByClassName(
  "search-bar-input__option--fuel"
);

const SearchContextProvider = ({ children }) => {
  const [dataCars, setDataCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [formValues, setFormValues] = useState({});

  let { setDisplay, verifyCondition, findBrandByUid, findFuelByUid } =
    useContext(ComunContext);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  document.addEventListener("click", function (e) {
    if (
      containerBrand &&
      containerBrand[0] &&
      !containerBrand[0].contains(e.target)
    ) {
      setDisplay(containerBrand[0], "none");
    }
    if (
      containerFuel &&
      containerFuel[0] &&
      !containerFuel[0].contains(e.target)
    ) {
      setDisplay(containerFuel[0], "none");
    }

    verifyUpdateSelectedOption(
      e,
      containerOptionBrand,
      containerBrand[0],
      "brand"
    );
    verifyUpdateSelectedOption(
      e,
      containerOptionFuel,
      containerFuel[0],
      "fuel"
    );
  });

  const verifyUpdateSelectedOption = (e, options, container, type) => {
    for (let item of options) {
      if (item.contains(e.target)) {
        let newObject = {};
        document.getElementById(type).value = e.target.innerHTML;
        newObject[type] = e.target.innerHTML;
        updateFormValues(newObject);
        setDisplay(container, "none");
      }
    }
  };


  const updateFormValues = (newObject) => {
    setFormValues((prevState) => ({
      ...prevState,
      ...newObject,
    }));
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
    setDisplay(containerBrand[0], "block");

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
    setDisplay(containerFuel[0], "block");

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

  const getDataFiltered = async (e) => {
    e.preventDefault();
    console.log(formValues);
    await get(child(dbRef, `cars`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataCars([]);
          Object.keys(snapshot.val()).forEach((key) => {
            console.log(snapshot.val()[key])
            addDataIfCarMeetConditionFilter(snapshot.val()[key], key);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addDataIfCarMeetConditionFilter = async (carObj, key) => {
    const brandName = carObj.brand;
    const fuelName = carObj.fuel;

    if (
      !formValues ||
      (verifyCondition(formValues.fuel, fuelName) &&
        verifyCondition(formValues.brand, brandName))
    ) {
      addDataCar(carObj, key);
    }
  };

  const addDataIfFuelMeetConditionFilter = (carObj, key) => {
    if (carObj?.name?.toUpperCase().includes(formValues.fuel.toUpperCase()))
      addDataFuelType(carObj, key);
  };

  const addDataIfBrandMeetConditionFilter = (carObj, key) => {
    if (carObj?.name?.toUpperCase().includes(formValues.brand.toUpperCase())) {
      addDataBrand(carObj, key);
    }
  };

  const addDataCar = async (carObj, key) => {
    const brand =
      carObj.brand && carObj.brand !== "0"
        ? await findBrandByUid(carObj.brand)
        : "";
    const fuel =
      carObj.fuel && carObj.fuel !== "0"
        ? await findFuelByUid(carObj.fuel)
        : "";

    carObj["uid"] = key;
    carObj["brand"] = brand;
    carObj["fuel"] = fuel;

    setDataCars((prevState) => [...prevState, carObj]);
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

  return (
    <SearchContext.Provider
      value={{
        setDataCars,
        dataCars,
        formValues,
        setFormValues,
        getDataFiltered,
        handleChange,
        brands,
        fuelTypes,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
