<script setup lang="ts">
import { RouterView } from "vue-router";
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
