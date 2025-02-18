<script setup>
// Permite renderizar el componente de la vista DeleteProductView.vue
// que esta configurada como ruta "/del_products/:product_id"
import MyDeleteProduct from "../components/MyDeleteProduct.vue";
import { useAuthStore } from "@/stores";

import { useRoute } from "vue-router";
// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();

const route = useRoute();
const { product_id } = route.params;
</script>

<template>
  <!-- si el usuario no ha iniciado sesión se muestra un div con la advertencia
   por lo tanto deberá loguearse o iniciar sesión -->
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyDeleteProduct v-if="auth.token !== null" :param="product_id" />
</template>
