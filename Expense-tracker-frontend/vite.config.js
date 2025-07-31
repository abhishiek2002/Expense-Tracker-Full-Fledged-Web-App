// vite.config.js
export default {
  root: '.', // your HTML pages are in root
  port: 3000, // default port
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        signup: 'signup.html',
        expense: 'expenses.html',
        // add more pages here
      },
    },
  },
};
