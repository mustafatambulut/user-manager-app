<template>
  <div class="w-full max-w-screen-xl mx-auto px-4 py-4">
    <h2 class="text-2xl font-bold mb-4 text-center sm:text-left">Favorite Users</h2>

    <div v-if="favorites.length === 0" class="text-center text-gray-500">
      No favorite users yet.
    </div>

    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="user in favorites"
        :key="user.id"
        @click="goToUser(user.id)"
        class="cursor-pointer bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center group min-w-0"
      >
        <img :src="user.picture" alt="User" class="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-100 group-hover:scale-105 transition" />
        <h3 class="text-lg font-semibold text-center text-gray-800 break-words">{{ user.name }}</h3>
        <p class="text-center text-gray-500 text-sm break-all">{{ user.email }}</p>
        <p class="text-center text-xs text-gray-400 mt-1">{{ user.city }}, {{ user.country }}</p>
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
