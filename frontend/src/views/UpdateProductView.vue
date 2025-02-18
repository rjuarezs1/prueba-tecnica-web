<script setup>
import MyUpdateProductForm from "../components/MyUpdateProductForm.vue";
import { useAuthStore, oneProductStore } from "@/stores";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const auth = useAuthStore();

const route = useRoute();
const { product_id } = route.params;

const product = oneProductStore();

onBeforeMount(() => {
  product.get_one(product_id);
});
</script>

<template>
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyUpdateProductForm v-if="auth.token !== null" :param="product_id" :one_product="product.body" />
</template>
