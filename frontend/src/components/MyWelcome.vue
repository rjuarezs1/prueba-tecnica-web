<script setup>
import { ref } from "vue";

const rem_size = ref("18rem");
</script>

<template>
  <!-- El presente div se muestra independientemente del valor del token gestionado en el 
  useAuthStore de acuerdo al inicio de sesión o el logout de la aplicación -->
  <div class="card mx-auto mt-2" :style="{ width: rem_size }" id="my-card">
    <img src="../assets/logo.svg" class="card-img-top" alt="svg logo" />
    <div class="card-body">
      <h5 class="card-title">Proyecto de Raúl Juarez</h5>
      <p class="card-text">Interfaz para gestionar los productos</p>
    </div>
  </div>
</template>
