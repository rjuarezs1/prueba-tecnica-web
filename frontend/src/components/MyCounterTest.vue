<script setup>
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
</script>
<template>
  <div class="container text-center mt-2">
    <h1>Incremento: {{ counter.count }}</h1>
    <h2>El doble: {{ counter.doubleCount }}</h2>
  </div>
  <div class="d-grid gap-2 col-4 mx-auto">
    <button class="btn btn-sm btn-success" @click="counter.increment">Increment</button>
    <button class="btn btn-sm btn-success" @click="counter.clearCounter">Clear</button>
    <button class="btn btn-sm btn-success" @click="counter.decrement">Decrement</button>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .btn {
    background-color: #41b883;
  }
}
</style>
