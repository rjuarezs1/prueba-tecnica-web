<script setup>
// Permite renderizar el componente de la vista LogOutView.vue
// que esta configurada como ruta "/logout"
import LogOut from "@/components/LogOut.vue";
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
  <LogOut v-if="auth.token !== null" />
</template>
