import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import MovieDetails from "./MovieDetails";

/**
 * Accordion component for displaying a single movie with expandable details.
 * Provides accessible controls for toggling content visibility.
 */
const Accordion = ({ toggleExpanded, movie, expandedMovie }) => {
  const isExpanded = expandedMovie === movie?.imdbID;

  return (
    <div className="border rounded-md mb-2 transition-all duration-300 bg-white">
      <button
        onClick={() => toggleExpanded(movie?.imdbID)}
        aria-expanded={isExpanded}
        aria-controls={`movie-details-${movie?.imdbID}`}
        className="w-full p-3 rounded-md border-b flex items-center justify-between gap-5 cursor-pointer"
      >
        <div className="text-left">
          <p className="text-lg lg:text-2xl font-medium">{movie?.Title}</p>
          <p className="text-sm lg:text-base text-neutral-400">{movie?.Year}</p>
        </div>
        <div className="w-5 h-5 transform transition-transform duration-200">
          <IoIosArrowDown
            size={20}
            className={isExpanded ? "rotate-180" : "rotate-0"}
          />
        </div>
      </button>
      <div
        id={`movie-details-${movie?.imdbID}`}
        role="region"
        aria-labelledby={`movie-title-${movie?.imdbID}`}
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {isExpanded && (
          <div className="p-3">
            <MovieDetails imdbID={movie?.imdbID} />
          </div>
        )}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    imdbID: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
  }).isRequired,
  expandedMovie: PropTypes.string,
};

export default Accordion;
