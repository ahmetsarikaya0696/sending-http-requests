import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-6f76f-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          openingText: result.opening_crawl,
          releaseDate: result.release_date,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = (movie) => {
    console.log(movie);
  };

  const content = (
    <React.Fragment>
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
