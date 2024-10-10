export const Nothing = () => {};
export const DateString = () => {
  const newDate = new Date();
  return `${newDate.getFullYear()}${(newDate.getMonth() + 1).toString().padStart(2, "0")}${newDate.getDate().toString().padStart(2, "0")}_${newDate.getHours().toString().padStart(2, "0")}${newDate.getMinutes().toString().padStart(2, "0")}${newDate.getSeconds().toString().padStart(2, "0")}`;
};

export const EnumToKeyValueObjectArray = <T extends { [key: string]: string }>(enumObj: T) => {
  return Object.keys(enumObj).map((key) => ({
    key,
    name: enumObj[key as keyof typeof enumObj],
  }));
}