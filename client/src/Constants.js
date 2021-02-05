// Constants.js
const prod = {
  url: {
    API_URL: "https://teletravapp.herokuapp.com",
  },
  department: "GSS",
};
const dev = {
  url: {
    API_URL: "http://localhost:3001",
  },
  department: "myDepartment",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
