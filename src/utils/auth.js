const BASE_URL = "https://register.nomoreparties.co";

const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    });
};

const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((data) => {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("email", email);
      return data;
    });
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    });
};

export { register, login, checkToken, BASE_URL };