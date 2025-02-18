<script setup>
import { useAuthStore, putOneProductStore } from "@/stores";
import { ref, useTemplateRef, onMounted, computed, watch } from "vue";
import { update_handler } from "@/utils";
import Swal from "sweetalert2"; // Import Swal
const bg_color = ref("#41b883");
const auth = useAuthStore();

const putProduct = putOneProductStore();
const props = defineProps({
  param: String,
  one_product: Object,
});

// Create computed reactive values for the input fields
const signin_form = useTemplateRef("signin-form");
const name = computed(() => props.one_product.name);
const description = computed(() => props.one_product.description);
const price = computed(() => props.one_product.price);
const stock = computed(() => props.one_product.stock);
const nombre = useTemplateRef("nombre");
const descripcion = useTemplateRef("descripcion");
const precio = useTemplateRef("precio");
const existencia = useTemplateRef("existencia");

const handleSubmit = (e) => {
  e.preventDefault();
  // función que permite tratar el putProduct de stores el props.param
  // así como enviar los valores de los inputs del formulario
  update_handler(
    putProduct,
    props.param,
    nombre.value,
    descripcion.value,
    precio.value,
    existencia.value
  );
};

// verifica el valor de stores putProduct.errors y muestra un sweet alert
function getAuthErrorsValue() {
  if (putProduct.errors === null) return;
  return putProduct.errors;
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

// ejecuta el handleSubmit tras la escucha del evento submit del formulario
onMounted(() => {
  signin_form.value.addEventListener("submit", handleSubmit);
});
</script>

<template>
  <!-- <p>{{ props.param }}</p> -->
  <!-- <p>{{ props.one_product }}</p> -->
  <div v-if="auth.token !== null" class="col-6 text-truncate">
    {{ auth.token }}
  </div>
  <form
    ref="signin-form"
    class="mt-2 px-2 py-2 mx-auto border border-primary-subtle border-opacity-70 rounded"
    style="width: 300px"
  >
    <div class="mb-3">
      <label for="name" class="form-label">U-Nombre</label>
      <input
        type="text"
        v-model="name"
        ref="nombre"
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
        v-model="description"
        ref="descripcion"
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
        v-model.number="price"
        ref="precio"
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
      <select
        class="form-select form-select-sm"
        name="stock"
        id="stock"
        v-model="stock"
        ref="existencia"
      >
        <option :value="true">True</option>
        <option :value="false">False</option>
      </select>
    </div>
    <button type="submit" class="btn" :style="{ background: bg_color }">Enviar</button>
  </form>
</template>
