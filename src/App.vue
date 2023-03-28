<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <header>
      <h1>Renbot Extension</h1>
    </header>

    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped></style>
