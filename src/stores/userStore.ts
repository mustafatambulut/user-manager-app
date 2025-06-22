import { defineStore } from "pinia";
import type { User } from "../composables/useUsers";

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedUser: null as User | null,
    favoriteUsers: [] as User[],
  }),
  actions: {
    setSelectedUser(user: User) {
      this.selectedUser = user;
    },
    addFavorite(user: User) {
      if (!this.favoriteUsers.find((u) => u.id === user.id)) {
        this.favoriteUsers.push(user);
      }
    },
    removeFavorite(userId: string) {
      this.favoriteUsers = this.favoriteUsers.filter((u) => u.id !== userId);
    },
    isFavorite(userId: string) {
      return this.favoriteUsers.some((u) => u.id === userId);
    },
  },
  persist: true,
});
