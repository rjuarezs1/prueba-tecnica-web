import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2"; // Import Swal
import {
  get_products,
  post_signin,
  post_logout,
  get_product,
  put_product,
  delete_product,
  post_product,
  post_user,
} from "@/services/getApi";
import router from "@/router";

export const useProductStore = defineStore("product", () => {
  const data = ref([]);

  async function get() {
    // se asigna la respuesta proveniente del fetch ejecutado dentro de la función
    // get_products de los servicios del "@/services/getApi.js"
    data.value = await get_products();
  }

  return { data, get };
});

export const oneProductStore = defineStore("oneProduct", () => {
  const data = ref({});
  const body = ref({});
  async function get_one(param) {
    data.value = await get_product(param);
    body.value = data.value.body;
    if (body.value === null) {
      router.push({ name: "products" });
    }
  }

  return { data, body, get_one };
});

export const putOneProductStore = defineStore("putOneProduct", () => {
  const data = ref({});
  const ok = ref(false);
  const errors = ref(null);

  async function update(param, form_data) {
    const isConfirmed = await Swal.fire({
      title: "Confirm Action",
      text: "Are you sure you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed.isConfirmed) {
      data.value = await put_product(param, form_data);
      ok.value = data.value.ok;

      if (ok.value === false) {
        errors.value = data.value.errors;
        if (Array.isArray(errors.value)) {
          errors.value = data.value.errors[0].path + "-" + data.value.errors[0].msg;
          console.log("putProduct store", errors.value);
        } else {
          // para mostrar en caso el data.value.erros sea un string y no un array
          console.log("putProduct store", errors.value);
        }
      } else {
        errors.value = null;
        Swal.fire({
          icon: "success",
          title: "Action Response",
          text: data.value.body,
        });
        router.push({ name: "products" });
      }
    }
  }

  return { data, ok, errors, update };
});

export const postOneProductStore = defineStore("postOneProduct", () => {
  const data = ref({});
  const ok = ref(false);
  const errors = ref(null);

  async function post(form_data) {
    const isConfirmed = await Swal.fire({
      title: "Confirm Action",
      text: "Are you sure you want to create this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed.isConfirmed) {
      data.value = await post_product(form_data);
      ok.value = data.value.ok;

      if (ok.value === false) {
        errors.value = data.value.errors;
        if (Array.isArray(errors.value)) {
          errors.value = data.value.errors[0].path + "-" + data.value.errors[0].msg;
          console.log("postProduct stores", errors.value);
        } else {
          // para mostrar en caso el data.value.erros sea un string y no un array
          console.log("postProduct stores", errors.value);
        }
      } else {
        errors.value = null;
        Swal.fire({
          icon: "success",
          title: "Action Response",
          text: data.value.body,
        });
        router.push({ name: "products" });
      }
    }
  }

  return { data, ok, errors, post };
});

export const postOneUserStore = defineStore("postOneUser", () => {
  const data = ref({});
  const ok = ref(false);
  const errors = ref(null);

  async function post(form_data) {
    const isConfirmed = await Swal.fire({
      title: "Confirm Action",
      text: "Are you sure you want to create this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed.isConfirmed) {
      data.value = await post_user(form_data);
      ok.value = data.value.ok;

      if (ok.value === false) {
        errors.value = data.value.errors;
        if (Array.isArray(errors.value)) {
          errors.value = data.value.errors[0].path + "-" + data.value.errors[0].msg;
          console.log("postUser stores", errors.value);
        } else {
          // para mostrar en caso el data.value.erros sea un string y no un array
          console.log("postUser stores", errors.value);
        }
      } else {
        errors.value = null;
        Swal.fire({
          icon: "success",
          title: "Action Response",
          text: data.value.body,
        });
        router.push({ name: "home" });
      }
    }
  }

  return { data, ok, errors, post };
});

export const delOneProductStore = defineStore("delOneProduct", () => {
  const data = ref({});
  const ok = ref(false);
  const errors = ref(null);

  async function del(param) {
    const isConfirmed = await Swal.fire({
      title: "Confirm Action",
      text: `Are you sure you want to delete product ${param}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed.isConfirmed) {
      data.value = await delete_product(param);
      ok.value = data.value.ok;

      if (ok.value === false) {
        errors.value = data.value.errors;
        if (Array.isArray(errors.value)) {
          errors.value = data.value.errors[0].path + "-" + data.value.errors[0].msg;
          console.log("delProduct stores", errors.value);
        } else {
          // para mostrar en caso el data.value.erros sea un string y no un array
          console.log("delProduct stores", errors.value);
        }
      } else {
        errors.value = null;
        Swal.fire({
          icon: "success",
          title: "Action Response",
          text: data.value.body,
        });
        router.push({ name: "products" });
      }
    } else {
      router.push({ name: "products" });
    }
  }

  return { data, ok, errors, del };
});

export const useAuthStore = defineStore("auth", () => {
  const data = ref({});
  const ok = ref(false);
  const token = ref(localStorage.getItem("authToken"));
  const errors = ref(null);

  async function signin(form_data) {
    // se asigna la respuesta proveniente del fetch ejecutado dentro de la función
    // post_signin de los servicios del "@/services/getApi.js"
    data.value = await post_signin(form_data);
    ok.value = data.value.ok;
    // si la respuesta de la api rest de la ruta /signin es insatisfactoria
    // se actualiza el auth.errors.value
    // caso contrario se actualiza el auth.token.value
    // con el token proveniente de la respuesta satisfactoria
    // y se envia hacia la vista ProductView utilizando el path del router
    // en "@/router"
    if (ok.value === false) {
      errors.value = data.value.errors;
      if (Array.isArray(errors.value)) {
        errors.value = data.value.errors[0].path + "-" + data.value.errors[0].msg;
        console.log("auth stores:", errors.value);
      } else {
        // para mostrar en caso el data.value.erros sea un string y no un array
        console.log("auth stores:", errors.value);
      }
    } else {
      token.value = data.value.body;
      // console.log("data despues de singin:", data.value);
      // console.log("token despues de singin:", token.value);
      localStorage.setItem("authToken", token.value);
      router.push({ name: "products" });
    }
  }

  async function logout() {
    data.value = await post_logout();
    // console.log(data.value);
    ok.value = data.value.ok;
    if (ok.value === true) {
      token.value = null;
      localStorage.removeItem("authToken");
      Swal.fire({
        icon: "success",
        title: "Action Response",
        text: data.value.body,
      });
      router.push({ name: "home" });
    }
  }

  // permite limpiar los valores de las referencias de auth
  // al renderizar el componente MySignInForm
  function clearData() {
    data.value = {};
    if (token.value != null) {
      token.value = null;
      localStorage.removeItem("authToken");
    }
  }

  // Watch for changes in token and save to localStorage
  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
  });

  return { data, ok, token, errors, signin, logout, clearData };
});

export const ivaOneProductStore = defineStore("ivaOneProduct", () => {
  const price = ref(0);
  const iva = computed(() => (price.value * 0.12).toFixed(2));

  function setPrice(precio) {
    price.value = precio;
  }

  async function getIva(name) {
    Swal.fire({
      icon: "success",
      title: "Impuesto al valor agregado",
      text: `producto: ${name}, IVA: ${iva.value}`,
    });
  }

  return { iva, price, setPrice, getIva };
});
