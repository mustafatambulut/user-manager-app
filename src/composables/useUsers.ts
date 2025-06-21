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
  const loading = ref(true);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const res = await fetch("https://randomuser.me/api/?results=20");
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

      users.value = data.results.map((u: ApiUser) => ({
        id: u.login.uuid,
        name: `${u.name.first} ${u.name.last}`,
        age: u.dob.age,
        gender: u.gender,
        email: u.email,
        city: u.location.city,
        country: u.location.country,
        picture: u.picture.medium,
      }));
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchUsers);

  return {
    users,
    loading,
    fetchUsers,
  };
}
