<script setup>
import LogOut from "@/components/LogOut.vue";
import { useAuthStore } from "@/stores";

const auth = useAuthStore();
</script>

<template>
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <LogOut v-if="auth.token !== null" />
</template>
