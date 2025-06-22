<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="sticky top-0 z-30 w-full bg-white">
      <div class="max-w-screen-xl mx-auto w-full px-4 xl:px-0">
        <nav class="shadow-none py-4 flex items-center justify-between bg-transparent">
          <div>
            <RouterLink to="/" class="inline-flex flex-col items-start cursor-pointer">
              <img src="./assets/scorp-logo.png" alt="Scorp Logo" class="h-10" />
            </RouterLink>
          </div>
          <div class="flex gap-4">
            <RouterLink
              to="/"
              class="px-5 py-2 rounded-xl bg-[#e53935] text-white font-medium hover:bg-[#b71c1c] transition"
              >Home</RouterLink
            >
            <RouterLink
              to="/favorites"
              class="px-5 py-2 rounded-xl bg-[#e53935] text-white font-medium hover:bg-[#b71c1c] transition"
              >Favorites</RouterLink
            >
          </div>
        </nav>
      </div>
    </div>

    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>
