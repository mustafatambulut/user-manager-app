<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold mb-4">User List</h2>

    <!-- Filters -->
    <div class="mb-4 flex flex-col sm:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or email"
        class="border p-2 rounded w-full sm:w-1/3"
      />

      <select v-model="selectedCountry" class="border p-2 rounded w-full sm:w-1/3">
        <option value="">All Countries</option>
        <option v-for="country in uniqueCountries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>

      <select v-model="selectedGender" class="border p-2 rounded w-full sm:w-1/3">
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    <!-- Loading or List -->
    <div v-if="loading" class="text-center text-gray-500">Loading users...</div>

    <div v-else-if="filteredUsers.length === 0" class="text-center text-gray-500">
      No users match your filters.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="user in filteredUsers"
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
import { computed, ref } from "vue";
import { useUsers } from "../composables/useUsers";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const { users, loading } = useUsers();
const router = useRouter();
const userStore = useUserStore();

const searchQuery = ref("");
const selectedCountry = ref("");
const selectedGender = ref("");

// Arama ve filtreleme kombinasyonu
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCountry = selectedCountry.value ? user.country === selectedCountry.value : true;

    const matchesGender = selectedGender.value ? user.gender === selectedGender.value : true;

    return matchesSearch && matchesCountry && matchesGender;
  });
});

// Unique country list
const uniqueCountries = computed(() => {
  const allCountries = users.value.map((user) => user.country);
  return [...new Set(allCountries)].sort();
});

// Kullanıcıya tıklama
const goToUser = (id: string) => {
  const selected = users.value.find((u) => u.id === id);
  if (selected) {
    userStore.setSelectedUser(selected);
    router.push(`/user/${id}`);
  }
};
</script>
