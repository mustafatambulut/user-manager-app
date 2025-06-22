<template>
  <div class="w-full">
    <div class="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <!-- Search -->
      <div class="flex-1 flex items-center max-w-md w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
        <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search in table..."
          class="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
      <!-- Filters -->
      <div class="flex gap-4 flex-1 md:justify-end w-full">
        <select v-model="selectedCountry" class="appearance-none border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-6 py-3 bg-white text-[16px] font-medium text-black shadow-sm transition-all outline-none w-full md:min-w-[180px]">
          <option value="" class="text-[16px] font-medium text-black">All Countries</option>
          <option v-for="country in uniqueCountries" :key="country" :value="country" class="text-[16px] font-medium text-black">
            {{ country }}
          </option>
        </select>
        <select v-model="selectedGender" class="appearance-none border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-6 py-3 bg-white text-[16px] font-medium text-black shadow-sm transition-all outline-none w-full md:min-w-[180px]">
          <option value="" class="text-[16px] font-medium text-black">All Genders</option>
          <option value="male" class="text-[16px] font-medium text-black">Male</option>
          <option value="female" class="text-[16px] font-medium text-black">Female</option>
        </select>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-6">User List</h2>

    <!-- Loading or List -->
    <div v-if="loading && users.length === 0" class="flex flex-col items-center justify-center min-h-[40vh]">
      <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." class="w-16 h-16 mb-4" />
      <span class="text-gray-500 text-lg">Loading users...</span>
    </div>

    <div v-else-if="filteredUsers.length === 0" class="text-center text-gray-500">
      No users match your filters.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        @click="goToUser(user.id)"
        class="cursor-pointer bg-white border border-gray-200 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center group"
      >
        <img :src="user.picture" alt="User" class="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-100 group-hover:scale-105 transition" />
        <h3 class="text-lg font-semibold text-center text-gray-800">{{ user.name }}</h3>
        <p class="text-center text-gray-500 text-sm">{{ user.email }}</p>
        <p class="text-center text-xs text-gray-400 mt-1">{{ user.city }}, {{ user.country }}</p>
      </div>
    </div>

    <!-- Infinite scroll sentinel -->
    <div ref="infiniteScrollTrigger" style="height: 1px;"></div>
    <div v-if="!hasMore && users.length > 0" class="text-center text-gray-400 my-4">No more users to load.</div>

    <!-- Overlay loading spinner for infinite scroll -->
    <div v-if="loading && users.length > 0" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div class="flex flex-col items-center">
        <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." class="w-16 h-16 mb-4" />
        <span class="text-white text-lg drop-shadow">Loading users...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useUsers } from "../composables/useUsers";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const { users, loading, loadMoreUsers, hasMore } = useUsers();
const router = useRouter();
const userStore = useUserStore();

const searchQuery = ref("");
const selectedCountry = ref("");
const selectedGender = ref("");

// Ref for infinite scroll 
const infiniteScrollTrigger = ref<null | HTMLElement>(null);
let observer: null | IntersectionObserver = null;

onMounted(() => {
  observer = new window.IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !loading.value) {
      loadMoreUsers();
    }
  });
  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value);
  }
});

onUnmounted(() => {
  if (observer && infiniteScrollTrigger.value) {
    observer.unobserve(infiniteScrollTrigger.value);
  }
});

// Combination of search and filtering
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

// On user click
const goToUser = (id: string) => {
  const selected = users.value.find((u) => u.id === id);
  if (selected) {
    userStore.setSelectedUser(selected);
    router.push(`/user/${id}`);
  }
};
</script>
