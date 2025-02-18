<script setup>
// Permite renderizar el componente formulario de la vista NewProductView.vue
// que esta configurada como ruta "/new_product"
import MyCreateProductForm from "../components/MyCreateProductForm.vue";
import { useAuthStore } from "@/stores";
// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();
</script>

<template>
  <!-- si el usuario no ha iniciado sesión se muestra un div con la advertencia
   por lo tanto deberá loguearse o iniciar sesión -->
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyCreateProductForm v-if="auth.token !== null" />
</template>
