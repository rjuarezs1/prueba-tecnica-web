<script setup>
import { useAuthStore, postOneProductStore } from "@/stores";
import { ref, useTemplateRef, onMounted, watch } from "vue";
import { post_handler } from "@/utils";
import Swal from "sweetalert2"; // Import Swal

const bg_color = ref("#41b883");

const auth = useAuthStore();
const postProduct = postOneProductStore();

const post_form = useTemplateRef("post-form");
const name = useTemplateRef("name");
const description = useTemplateRef("description");
const price = useTemplateRef("price");
const stock = useTemplateRef("stock");

const handleSubmit = (e) => {
  e.preventDefault();
  // Función que permite enviar las referencias hacia el store correspondiente
  // en este caso hacia el postOneProductStore.
  post_handler(postProduct, name.value, description.value, price.value, stock.value);
};

// Verifica el estado de la referencia errors del postOneProductStore
// mostrando un sweet alert de acuerdo al valor que persista durante la
// ejecución de la aplicación.
function getAuthErrorsValue() {
  if (postProduct.errors === null) return;
  return postProduct.errors;
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
  post_form.value.addEventListener("submit", handleSubmit);
});
</script>

<template>
  <!-- como ejemplo se muestra el estado token que persiste despues del inicio de sesión -->
  <div v-if="auth.token !== null" class="col-6 text-truncate">
    {{ auth.token }}
  </div>
  <form
    ref="post-form"
    class="mt-2 px-2 py-2 mx-auto border border-primary-subtle border-opacity-70 rounded"
    style="width: 300px"
  >
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <input
        type="text"
        ref="name"
        autocomplete="off"
        class="form-control"
        id="name"
        name="name"
        placeholder="nombre de producto aquí"
        required
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Descripción</label>
      <input
        type="text"
        ref="description"
        autocomplete="off"
        class="form-control"
        id="description"
        name="description"
        placeholder="descripción de producto aquí"
        required
      />
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Precio</label>
      <input
        type="text"
        ref="price"
        autocomplete="off"
        class="form-control"
        id="price"
        name="price"
        placeholder="precio de producto aquí"
        required
      />
    </div>
    <div class="mb-3">
      <label for="stock" class="form-label">Stock</label>
      <select class="form-select form-select-sm" name="stock" id="stock" ref="stock">
        <option selected value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
    <button type="submit" class="btn" :style="{ background: bg_color }">Enviar</button>
  </form>
</template>
