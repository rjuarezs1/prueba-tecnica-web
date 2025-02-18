<script setup>
import { useAuthStore } from "@/stores";
import { ref, useTemplateRef, onMounted, watch } from "vue";
import { login_submit_handler } from "@/utils";
import Swal from "sweetalert2"; // Import Swal

const bg_color = ref("#41b883");

// instancia del auth stores para el manejo de sus valores iniciales y actualizaciones
const auth = useAuthStore();
auth.clearData();

// Referencias a enviar durante el submit del formulario
const signin_form = useTemplateRef("signin-form");
const email_form = useTemplateRef("email-form");
const password_form = useTemplateRef("password-form");

const handleSubmit = (e) => {
  e.preventDefault();
  // Función que permite enviar las referencias hacia el store correspondiente
  // en este caso hacia el useAuthStore.
  login_submit_handler(auth, email_form, password_form);
};

// Verifica el estado de la referencia errors del useAuthStore
// mostrando un sweet alert de acuerdo al valor que persista durante la
// ejecución de la aplicación.
function getAuthErrorsValue() {
  if (auth.errors === null) return;
  return auth.errors;
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
  signin_form.value.addEventListener("submit", handleSubmit);
});
</script>

<template>
  <form
    ref="signin-form"
    class="mt-2 px-2 py-2 mx-auto border border-primary-subtle border-opacity-70 rounded"
    style="width: 300px"
  >
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        ref="email-form"
        type="email"
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
        ref="password-form"
        type="password"
        autocomplete="off"
        class="form-control"
        id="password"
        name="password"
        placeholder="tu password aquí"
        required
      />
    </div>
    <button type="submit" class="btn" :style="{ background: bg_color }">Enviar</button>
  </form>
</template>
