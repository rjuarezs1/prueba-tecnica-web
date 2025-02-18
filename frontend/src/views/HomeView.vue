<script setup>
import { useAuthStore } from "@/stores";
import MyWelcome from "@/components/MyWelcome.vue";
const auth = useAuthStore();
</script>

<template>
  <main>
    <MyWelcome v-if="auth.token !== null || auth.token === null" />
  </main>
</template>
