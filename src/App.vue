<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow p-4 flex gap-6">
      <RouterLink to="/" class="text-blue-600 font-semibold hover:underline">Home</RouterLink>
      <RouterLink to="/favorites" class="text-blue-600 font-semibold hover:underline">Favorites</RouterLink>
    </nav>

    <!-- İçerik alanı -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>
