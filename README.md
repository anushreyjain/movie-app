# 🎬 Movie Explorer App

A React-based web application that allows users to search for movies, view detailed information, and explore more as they scroll. This app uses the [OMDB API](https://www.omdbapi.com/) for fetching movie data and displays it in a visually structured, accessible, and user-friendly manner.

## ✨ Features

- Search movies by title.
- Infinite scroll to load more movies.
- Expandable sections to show detailed information about each movie.
- Smooth and accessible UI for easy navigation and viewing.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Git](https://git-scm.com/) for cloning the repository.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/movie-explorer-app.git
   cd movie-explorer-app

2. **Install dependencies**:
    ```bash
    npm install
    ```
    
3. **Get an OMDB API Key**:
    - Visit the [OMDB](https://www.omdbapi.com/) API website.
    - Sign up to get a free or paid API key.
    - Once you have your key, proceed to the next step.

4. **Configure Environment Variables**:
    - In the root directory of the project, create a .env file.
    - Add your OMDB API key to the .env file as follows: <br>
    ```bash
    VITE_OMDB_API_KEY=your-api-key
    ```
    - Replace your-api-key with the actual API key obtained from OMDB.
  
---

## 💻 Running the Application

1. **Start the Development Server**:
    ```bash
     npm run dev
    ```

2. **Open the App**:
    Once the server is running, you can open the app in your browser by navigating to:
    ```bash
   http://localhost:5173
    ```
  - Note: The default port for Vite is 5173. Adjust the URL if you've configured a different port.

---

## 📂 Project Structure
```
movie-explorer-app/
├── public/             # Public assets like images and favicon
├── src/                # Source code for the app
│   ├── components/     # Reusable components (Accordion, MovieList, MovieDetails)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point of the application
├── .env                # Environment variables
├── package.json        # NPM dependencies and scripts
└── README.md           # This README file
```

---

## 📚 Usage and Instructions

1. **Searching Movies:** Enter a movie title in the search bar to retrieve relevant results.

2. **Loading More Results:** Scroll to the bottom of the page to load more movies automatically.

3. **Viewing Movie Details:** Click on a movie’s title to expand and view additional details like genre, director, and plot.

---

## 🛠️ Built With

- **React-** A JavaScript library for building user interfaces.
- **Axios-** For making API requests to OMDB.
- **Vite-** Frontend tooling for fast development.

---

## 🌟 Acknowledgments
- Thanks to the [OMDB API](https://www.omdbapi.com/) for providing the movie data.

---
Enjoy exploring movies with the Movie Explorer App! 🎥
