import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Accordion from "./Accordion";

/**
 * MovieList component fetches a list of movies from the OMDB API based on a search query.
 * It handles loading state, pagination on scroll, and displays error messages if data retrieval fails.
 */
const MovieList = () => {
  // State variables to manage movie list, search query, pagination, loading, error, and end of results
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);

  const OMDB_API_URL = "https://www.omdbapi.com/";
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  /**
   * Fetches movies from the OMDB API and manages loading, error, and end-of-results states.
   * @param {boolean} reset - If true, resets the movie list.
   */
  const fetchMovies = async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(OMDB_API_URL, {
        params: {
          apikey: API_KEY,
          s: query || "batman", // Default search term if no query is provided
          page: page,
        },
      });

      if (response.data.Response === "True") {
        const fetchedMovies = response.data.Search;
        setMovies((prevMovies) =>
          reset ? fetchedMovies : [...prevMovies, ...fetchedMovies]
        );

        // Mark end if fewer than 10 results are returned, assuming no more data.
        setIsEndReached(fetchedMovies.length < 10);
      } else {
        if (reset) setMovies([]);
        setError(response.data.Error || "Unable to fetch movies.");
        setIsEndReached(true);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("An error occurred while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles infinite scroll to load additional movie pages when the end of the page is reached.
   */
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      !isEndReached
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, isEndReached]);

  // Adds a scroll event listener and cleans up on component unmount.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Fetches movies whenever the page number or query changes
  useEffect(() => {
    fetchMovies(page === 1);
  }, [page, query]);

  /**
   * Debounced function to update the query after a delay.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === "") {
        setQuery("batman"); // Reset to default search if the search bar is cleared
      } else {
        setQuery(searchTerm);
      }
      setPage(1);
      setIsEndReached(false);
    }, 300); // 300ms debounce delay
    return () => clearTimeout(handler);
  }, [searchTerm]);

  /**
   * Updates the search term state to apply debounce on query.
   * @param {Event} e - The input event.
   */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  /**
   * Toggles the expanded state of a movie in the accordion.
   * @param {string} movieId - The IMDB ID of the movie to toggle.
   */
  const toggleExpanded = (movieId) => {
    setExpandedMovie(expandedMovie === movieId ? null : movieId);
  };

  return (
    <div className="max-w-[90rem] w-full flex flex-col justify-center px-4 2xl:px-2">
      <div className="pt-5 pb-6 lg:pb-10">
        <label htmlFor="search-movie" className="font-semibold flex gap-2">
          Search Movie <span className="hidden lg:block font-normal">(Press TAB to search)</span>
        </label>
        <input
          id="search-movie"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search movies by title"
          className="w-full p-2 my-2.5 border border-neutral-300 rounded-md outline-none focus:border-neutral-400"
        />
      </div>

      <div className="flex flex-col gap-3 lg:gap-5">
        {movies.map((movie) => (
          <Accordion
            movie={movie}
            expandedMovie={expandedMovie}
            key={movie.imdbID}
            toggleExpanded={toggleExpanded}
          />
        ))}
      </div>

      {/* Conditional loading and error messages */}
      {loading && <p>Loading...</p>}
      {movies.length === 0 && error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default MovieList;
