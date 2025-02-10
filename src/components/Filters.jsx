// TO DO:  Create navbar with filters by genre, order (ASC or DESC) by rating

const Filters = ({ movieRating, setMovieRatingset, searchGenre, setSearchGenre }) => {
  // Rating
  const rating = Array.from({ length: 10 }, (_, index) => index + 1);
  // Genres
  const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    Science_Fiction: 878,
    TV_Movie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };

  return (
    <div className="search">
      <form className="filters" method="GET">
        <label htmlFor="number-select">Order by rating:</label>
        <select
          id="number-select">
          {rating.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <label htmlFor="genre-select">Select by genre:</label>
        <select id="genre-select">
          {Object.entries(genres).map(([genre, id]) => (
            <option key={id} value={id}>
              {genre}
            </option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>
    </div>
  )
}

export default Filters
