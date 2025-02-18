<script setup>
import { onBeforeMount } from "vue";
import { useProductStore } from "@/stores";
import { useAuthStore } from "@/stores";
// Permite renderizar el componente dataTable de la vista ProductView.vue
// que esta configurada como ruta "/products"
import MyProductTable from "@/components/MyProductTable.vue";

const product = useProductStore();
// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();

onBeforeMount(() => {
  product.get();
});
</script>

<template>
  <!-- si el usuario no ha iniciado sesión se muestra un div con la advertencia
   por lo tanto deberá loguearse o iniciar sesión -->
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyProductTable v-if="auth.token !== null" :list_of_products="product.data" />
</template>

// Algunos estilos css específicos para la vista ProductView.vue
<style>
.about {
  font-size: 3em;
  color: "#34495e";
}
</style>
