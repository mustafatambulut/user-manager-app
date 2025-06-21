<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Favorite Users</h2>

    <div v-if="favorites.length === 0" class="text-center text-gray-500">
      No favorite users yet.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="user in favorites"
        :key="user.id"
        @click="goToUser(user.id)"
        class="cursor-pointer border p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        <img :src="user.picture" alt="User" class="w-16 h-16 rounded-full mx-auto mb-2" />
        <h3 class="text-lg font-semibold text-center">{{ user.name }}</h3>
        <p class="text-center text-gray-600">{{ user.email }}</p>
        <p class="text-center text-sm text-gray-500">{{ user.city }}, {{ user.country }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const favorites = userStore.favoriteUsers
const router = useRouter()

const goToUser = (id: string) => {
  const user = favorites.find((u) => u.id === id)
  if (user) {
    userStore.setSelectedUser(user)
    router.push(`/user/${id}`)
  }
}
</script>
