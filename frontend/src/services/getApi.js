export const get_products = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_PRODUCTS_URL);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const get_product = async (param) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_GET_ONE_PRODUCT_URL + `${param}`, {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const post_product = async (data) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_POST_PRODUCT_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const post_user = async (data) => {
  try {
    const response = await fetch("http://localhost:4002/api/v1/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const put_product = async (param, data) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_PUT_PRODUCT_URL + `${param}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const delete_product = async (param) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_DELETE_PRODUCT_URL + `${param}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const post_signin = async (data) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_SIGNIN_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error("catch error:", err);
    // return null;
  }
};

export const post_logout = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};
