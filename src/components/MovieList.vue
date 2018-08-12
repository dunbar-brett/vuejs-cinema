<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length" class="no-results">
      <movie-item v-for="movie in filteredMovies" 
                  v-bind:movie="movie.movie" 
                  v-bind:sessions="movie.sessions"
                  v-bind:day="day"
                  v-bind:time="time"
      ></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{ noResults }}
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import times from '../util/times';
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
        },
        sessionPassesTimeFilter(session) {
          if (!this.day.isSame(this.$moment(session.time), 'day')) {
            return false; 
          } else if (this.time.length === 0 || this.time.length === 2) {
            return true;
          } else if(this.time[0] === times.AFTER_6PM) {
            return this.$moment(session.time).hour() >= 18;
          } else {
            return this.$moment(session.time).hour() < 18;
          }
        }
      },
      computed: {
        noResults() {
          let times = this.time.join(', ');
          let genres = this.genre.join(', ');
          return `No results for ${times}${times.length && genres.length ? ', ' : ''} ${genres}.`
        },
        filteredMovies() {
          return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
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
      props: ['genre', 'time', 'movies', 'day'],
      components: {
        MovieItem
      }
    } 
</script>
<style>

</style>

