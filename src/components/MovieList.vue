<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  
  export default {
      data: function() {
        return {
          movies: [
            {title: 'Kill Bill', genre: genres.CRIME},
            {title: 'Home Alone', genre: genres.COMEDY},
            {title: 'Austin Powers', genre: genres.COMEDY}
          ]
        }
      },
      methods: {
        moviePassesGenreFilter(movie) {
          var doesMovieBelong = this.genre.includes(movie.genre);
          return this.genre.length > 0 ? doesMovieBelong : true;
        }
      },
      computed: {
        filteredMovies() {
          return this.movies.filter(movie => this.moviePassesGenreFilter(movie))
        }
      },
      props: ['genre', 'time']
    } 
</script>
<style>

</style>
