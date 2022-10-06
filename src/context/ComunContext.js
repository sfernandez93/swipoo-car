import { createContext } from "react";
import { getDatabase, ref as dbref, child, get } from "firebase/database";

export const ComunContext = createContext({});

const db = getDatabase();
const dbRef = dbref(db);

const ComunContextProvider = ({ children }) => {
  const setDisplay = (container, style) => {
    container.style.display = style;
  };

  const verifyCondition = (subject1, subject2) => {
    return subject1 && subject1 !== "0" ? subject2 === subject1 : true;
  };

  const findBrandByUid = async (uid) => {
    try {
      const snapshot = await get(child(dbRef, "car-brands/" + uid));
      if (snapshot.exists()) {
        return snapshot.val().name;
      } else {
        console.log("No data available");
        return "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const findFuelByUid = async (uid) => {
    try {
      const snapshot = await get(child(dbRef, "fuel-types/" + uid));
      if (snapshot.exists()) {
        return snapshot.val().name;
      } else {
        console.log("No data available");
        return "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ComunContext.Provider
      value={{
        setDisplay,
        verifyCondition,
        findBrandByUid,
        findFuelByUid
      }}
    >
      {children}
    </ComunContext.Provider>
  );
};

export default ComunContextProvider;
