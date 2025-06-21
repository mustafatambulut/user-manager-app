<template>
  <div v-if="user" class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
    <div class="text-center mb-4">
      <img :src="user.picture" alt="User" class="w-24 h-24 rounded-full mx-auto" />
      <h2 class="text-xl font-bold mt-2">{{ user.name }}</h2>
      <p class="text-gray-500">{{ user.email }}</p>
    </div>

    <div class="text-sm text-gray-700 space-y-1">
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Gender:</strong> {{ user.gender }}</p>
      <p><strong>City:</strong> {{ user.city }}</p>
      <p><strong>Country:</strong> {{ user.country }}</p>
    </div>

    <div class="mt-4 text-center">
      <button
        v-if="!isFavorite"
        @click="addToFavorites"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Favorites
      </button>
      <button
        v-else
        @click="removeFromFavorites"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Remove from Favorites
      </button>
    </div>
  </div>

  <div v-else class="text-center text-gray-500">User not found.</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const user = computed(() => userStore.selectedUser)
const isFavorite = computed(() => user.value ? userStore.isFavorite(user.value.id) : false)

const addToFavorites = () => {
  if (user.value) {
    userStore.addFavorite(user.value)
  }
}

const removeFromFavorites = () => {
  if (user.value) {
    userStore.removeFavorite(user.value.id)
  }
}
</script>
