class utils {
  isEmptyValue(value: any) {
    return (
      typeof value === "undefined" ||
      typeof value === "undefined" ||
      typeof value === undefined ||
      value === null ||
      value === "" ||
      value === "" ||
      value.length === 0 ||
      value === "undefined"
    );
  }

  isEmptyObject(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}
const MainUtils = new utils();
export default MainUtils;
