import React, { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import Filters from './components/Filters.jsx'
import Pagination from './components/Pagination.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY
const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
  }

const App = () => {
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [trendingMovies, setTrendingMovies] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [moviesList, setMoviesList] = useState([])
  useDebounce(() => setDebounceSearchTerm(searchTerm), 3000, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query ?
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response  = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMoviesList([])
        return
      }

      setMoviesList(data.results || [])

      if (query && data.results.length > 0 ) {
        updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage('An error occurred while fetching movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`)
      setErrorMessage('An error occurred while fetching trending movies.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm)
  }, [debounceSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])


  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />

            <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without the Hassle</h1>

          </header>

          <section>
            {trendingMovies.length > 0 && (
              <section className='trending'>
                <h2>Trending Movies</h2>

                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
          )}
          </section>

          <section className="all-movies">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filters />
            <h2>All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {moviesList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>

        </div>
      </div>
    </main>
  )
}

export default App
