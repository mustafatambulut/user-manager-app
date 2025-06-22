# Vue 3 User List App

A modern Vue 3 application where you can view a list of users, see their details, and add them to your favorites.

[Live Demo](https://user-list-vue3.netlify.app/)

## Features
- View user list
- Show user details in a modal
- Add or remove users from favorites
- List favorite users on a separate page
- Modern code structure with Vue 3 Composition API
- Global state management with Pinia
- Multi-page support with Vue Router
- Stylish and responsive UI with Tailwind CSS

## Getting Started

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Built With
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript


## Documentation

This project is a user listing application developed using Vue 3 and TypeScript. Its main features are as follows:

- Users are listed with infinite scroll: As you scroll down the page, new users are automatically loaded and added to the list.
- User details: When a user is selected from the list, detailed information about that user is displayed in a separate component.
- Add to favorites: Users can be added to favorites, and favorite users can be viewed on a separate page.
- Page navigation with Vue Router: You can navigate between different pages such as the home page, user details, and favorites.
- State management with Pinia: Data such as the user list and favorites are managed in a centralized store.

Modern and responsive interface with Tailwind CSS. In summary, this application provides a user-friendly, dynamic, and scalable user listing experience using the modern Vue 3 ecosystem.

### Project Structure

The project follows a modular and organized folder structure:

```
vue3-user-app/
├── dist/                # Compiled and bundled files (production build output)
├── node_modules/        # Node.js dependencies
├── public/              # Static assets (favicon, etc.)
│   └── favicon.ico
├── index.html           # Main HTML file
├── src/                 # Source code folder
│   ├── assets/          # Images, styles, and other static assets
│   ├── components/      # UI components (UserList, UserDetails, etc.)
│   ├── composables/     # Reusable logic (e.g., useUsers)
│   ├── router/          # Application routes
│   ├── stores/          # Pinia stores (state management)
│   ├── views/           # Page components (HomeView, UserView, FavoritesView)
│   └── main.ts          # App entry point
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── ...                  # Other config and setup files
```

### Technical Info

- **Vue 3**: For building reusable and reactive UI components.
- **Vite**: For fast development server and build tooling.
- **Pinia**: For global state management.
- **Vue Router**: For client-side routing and navigation.
- **Tailwind CSS**: For utility-first, responsive styling.
- **TypeScript**: For type safety and better developer experience.
- **ESLint & Prettier**: For code quality and consistent formatting.

This structure and stack enable clean, modular, and maintainable front-end development.

## License
[MIT](LICENSE)