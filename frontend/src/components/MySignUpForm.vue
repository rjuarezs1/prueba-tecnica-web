<script setup>
import { ref, useTemplateRef, onMounted, watch } from "vue";
import { signup_handler } from "@/utils";
import { postOneUserStore } from "@/stores";
import Swal from "sweetalert2"; // Import Swal

const bg_color = ref("#41b883");

const postUser = postOneUserStore();

// Referencias a enviar durante el submit del formulario
const signup_form = useTemplateRef("signup-form");
const first_name = useTemplateRef("first-name");
const surname = useTemplateRef("surname");
const email = useTemplateRef("email");
const password = useTemplateRef("password");

const handleSubmit = (e) => {
  e.preventDefault();
  // Función que permite enviar las referencias hacia el store correspondiente
  // en este caso hacia el postOneUserStore.
  signup_handler(postUser, first_name.value, surname.value, email.value, password.value);
};

// Verifica el estado de la referencia errors del postOneUserStore
// mostrando un sweet alert de acuerdo al valor que persista durante la
// ejecución de la aplicación.
function getAuthErrorsValue() {
  if (postUser.errors === null) return;
  return postUser.errors;
}

function handleErrorChange(newError) {
  if (newError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: newError,
    });
  }
}

watch(getAuthErrorsValue, handleErrorChange);

// Ejecuta el handleSubmit tras la escucha del evento submit del formulario
onMounted(() => {
  signup_form.value.addEventListener("submit", handleSubmit);
});
</script>

<template>
  <form
    ref="signup-form"
    class="mt-2 px-2 py-2 mx-auto border border-primary-subtle border-opacity-70 rounded"
    style="width: 300px"
  >
    <div class="mb-3">
      <label for="first_name" class="form-label">Nombre</label>
      <input
        type="text"
        ref="first-name"
        autocomplete="off"
        class="form-control"
        id="first_name"
        name="first_name"
        placeholder="tu nombre aquí"
        required
      />
    </div>
    <div class="mb-3">
      <label for="surname" class="form-label">Apellido</label>
      <input
        type="text"
        ref="surname"
        autocomplete="off"
        class="form-control"
        id="surname"
        name="surname"
        placeholder="tu apellido aquí"
        required
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        ref="email"
        autocomplete="off"
        class="form-control"
        id="email"
        name="email"
        placeholder="example@ibm.com"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        ref="password"
        autocomplete="off"
        class="form-control"
        id="password"
        name="password"
        placeholder="tu nuevo password aquí"
        required
      />
    </div>
    <button type="submit" class="btn" :style="{ background: bg_color }">Enviar</button>
  </form>
</template>
