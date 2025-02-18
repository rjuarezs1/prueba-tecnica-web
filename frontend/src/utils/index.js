// Tratamiento correspondiente sobre las referencias del formulario
// y las instancias de los stores en "@/stores"
export const login_submit_handler = (auth, email_form, password_form) => {
  let formData = new FormData();
  formData.append("email", email_form.value.value);
  formData.append("password", password_form.value.value);
  const datos = Object.fromEntries(formData);
  auth.signin(datos);
};

export const logout_handler = (auth) => {
  auth.logout();
};

export const update_handler = (putProduct, param, name, description, price, stock) => {
  let formData = new FormData();
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  const datos = Object.fromEntries(formData);
  putProduct.update(param, datos);
};

export const post_handler = (postProduct, name, description, price, stock) => {
  let formData = new FormData();
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  const datos = Object.fromEntries(formData);
  postProduct.post(datos);
};

export const signup_handler = (postUser, first_name, surname, email, password) => {
  let formData = new FormData();
  formData.append("first_name", first_name.value);
  formData.append("surname", surname.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  const datos = Object.fromEntries(formData);
  postUser.post(datos);
};

export const delete_handler = (delProduct, param) => {
  delProduct.del(param);
};
