<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length" class="no-results">
      <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      No results for {{selectedGenres}}.
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import MovieItem from './MovieItem.vue';
  
  export default {
      methods: {
        moviePassesGenreFilter(movie) {
          if (this.genre.length === 0) {return true;}
          var movieGenres = movie.movie.Genre.split(", ");
          var matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;

          //return this.genre.filter(e => movieGenres.includes(e)).length > 0;//this.genre.includes(movieGenres);
        }
      },
      computed: {
        filteredMovies() {
          return this.movies.filter(movie => this.moviePassesGenreFilter(movie))
        },
        selectedGenres() {
          var results = "";
          this.genre.forEach(genre => {
            results += genre;
            if (this.genre.length - 1 != this.genre.indexOf(genre)) {
              results += ", ";
            }
          });
          return results;
        }
      },
      props: ['genre', 'time', 'movies'],
      components: {
        MovieItem
      },
      created() {
        console.log(this.$moment);
      }
    } 
</script>
<style>

</style>
