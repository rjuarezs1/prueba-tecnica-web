<script setup>
// Permite renderizar el componente formulario de la vista UpdateProductView.vue
// que esta configurada como ruta "/put_products/:product_id"
import MyUpdateProductForm from "../components/MyUpdateProductForm.vue";
import { useAuthStore, oneProductStore } from "@/stores";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();

const route = useRoute();
const { product_id } = route.params;

const product = oneProductStore();

onBeforeMount(() => {
  product.get_one(product_id);
});
</script>

<template>
  <!-- si el usuario no ha iniciado sesión se muestra un div con la advertencia
   por lo tanto deberá loguearse o iniciar sesión -->
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyUpdateProductForm v-if="auth.token !== null" :param="product_id" :one_product="product.body" />
</template>
