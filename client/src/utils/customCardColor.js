export const customCardColor = (idx) => {
  if (idx % 2 !== 0) {
    return "bg-blue-50";
  } else {
    return "bg-blue-100 text-white";
  }
};

export const customCardTextColor = (str) => {
  if (str === "returned") {
    return "text-brown-700 bg-brown-100 rounded-xl flex justify-center";
  } else if (str === "due soon") {
    return "text-yellow-700  bg-yellow-100 rounded-xl flex justify-center";
  } else if (str === "did not return") {
    return "text-red-700 bg-red-100 rounded-xl flex justify-center";
  } else {
    return "text-green-700 bg-green-100 rounded-xl flex justify-center";
  }
};
