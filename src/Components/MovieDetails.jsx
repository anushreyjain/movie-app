import { useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import axios from "axios";

/**
 * MovieDetails component fetches and displays additional details for a movie by its IMDB ID.
 * Displays a loading spinner while fetching data and handles errors gracefully.
 */
const MovieDetails = ({ imdbID }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches movie details from the OMDB API.
     */
    const fetchDetails = async () => {
      const OMDB_API_URL = "https://www.omdbapi.com/";
      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

      try {
        const response = await axios.get(OMDB_API_URL, {
          params: { apikey: API_KEY, i: imdbID },
        });
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-6" aria-busy="true">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-500"></div>
      </div>
    );

  return (
    details && (
      <div className="flex items-start gap-5">
        {details.Poster && (
          <img
            src={details.Poster}
            alt={`Poster of ${details.Title}`}
            className="rounded w-20 lg:w-40"
          />
        )}
        <div className="flex flex-col gap-2">
          <p>
            <strong>Genre:</strong> {details.Genre}
          </p>
          <p>
            <strong>Director:</strong> {details.Director}
          </p>
          <p>
            <strong>Plot:</strong> {details.Plot}
          </p>
        </div>
      </div>
    )
  );
};

MovieDetails.propTypes = {
  imdbID: PropTypes.string.isRequired,
};

export default MovieDetails;
