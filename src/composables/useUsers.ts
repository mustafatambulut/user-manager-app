import { ref, onMounted } from "vue";

export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  city: string;
  country: string;
  picture: string;
}

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const page = ref(1); // Page number
  const resultsPerPage = 20; // Number of users to fetch each time
  const hasMore = ref(true); // Are there more users?

  const fetchUsers = async (reset = false) => {
    if (loading.value) return;
    loading.value = true;
    try {
      if (reset) {
        page.value = 1;
        users.value = [];
        hasMore.value = true;
      }
      const res = await fetch(
        `https://randomuser.me/api/?results=${resultsPerPage}&page=${page.value}`
      );
      const data = await res.json();

      type ApiUser = {
        login: { uuid: string };
        name: { first: string; last: string };
        dob: { age: number };
        gender: string;
        email: string;
        location: { city: string; country: string };
        picture: { medium: string };
      };

      const newUsers = data.results.map((u: ApiUser) => ({
        id: u.login.uuid,
        name: `${u.name.first} ${u.name.last}`,
        age: u.dob.age,
        gender: u.gender,
        email: u.email,
        city: u.location.city,
        country: u.location.country,
        picture: u.picture.medium,
      }));

      if (reset) {
        users.value = newUsers;
      } else {
        users.value = [...users.value, ...newUsers];
      }
      // If the number of returned users is low, there is no more data
      if (newUsers.length < resultsPerPage) {
        hasMore.value = false;
      } else {
        page.value += 1;
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      loading.value = false;
    }
  };

  // Function to be called at the end of scroll
  const loadMoreUsers = async () => {
    if (!loading.value && hasMore.value) {
      await fetchUsers();
    }
  };

  onMounted(() => fetchUsers(true));

  return {
    users,
    loading,
    fetchUsers,
    loadMoreUsers,
    hasMore,
  };
}
