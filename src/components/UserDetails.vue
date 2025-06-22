<template>
  <div v-if="user" class="max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 relative">
    <!-- Close Icon -->
    <button
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
      @click="goHome"
    >
      &times;
    </button>

    <!-- Profile Section -->
    <div class="flex items-center gap-4 mb-8">
      <div class="relative">
        <img
          :src="user.picture"
          alt="User"
          class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
        <button
          class="absolute bottom-1 right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z"
            />
          </svg>
        </button>
      </div>
      <div>
        <div class="text-lg font-semibold">{{ user.name || "Your name" }}</div>
        <div class="text-gray-500 text-sm">{{ user.email || "yourname@gmail.com" }}</div>
      </div>
    </div>

    <!-- User Info Fields -->
    <div class="divide-y divide-gray-200">
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">Name</span>
        <span class="text-gray-500">{{ user.name || "your name" }}</span>
      </div>
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">Age</span>
        <span class="text-gray-500">{{ user.age !== undefined ? user.age : "-" }}</span>
      </div>
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">Gender</span>
        <span class="text-gray-500">{{ user.gender || "-" }}</span>
      </div>
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">Email account</span>
        <span class="text-gray-500">{{ user.email || "yourname@gmail.com" }}</span>
      </div>
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">City</span>
        <span class="text-gray-500">{{ user.city || "-" }}</span>
      </div>
      <div class="flex justify-between items-center py-4">
        <span class="text-gray-600 font-medium">Country</span>
        <span class="text-gray-500">{{ user.country || "USA" }}</span>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-8 w-full flex justify-center">
      <button
        v-if="!isFavorite"
        @click="addToFavorites"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded focus:outline-none"
      >
        Add to Favorites
      </button>
      <button
        v-else
        @click="removeFromFavorites"
        class="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Remove from Favorites
      </button>
    </div>
  </div>
  <div v-else class="text-center text-gray-500">User not found.</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const user = computed(() => userStore.selectedUser);

const isFavorite = computed(() => (user.value ? userStore.isFavorite(user.value.id) : false));

const addToFavorites = () => {
  if (user.value) {
    userStore.addFavorite(user.value);
  }
};

const removeFromFavorites = () => {
  if (user.value) {
    userStore.removeFavorite(user.value.id);
  }
};

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
