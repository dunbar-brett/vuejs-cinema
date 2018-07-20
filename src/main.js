import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: []
  },
  methods: {
    checkFilter(categorty, title, checked) {
      if (checked) {
        this[categorty].push(title);  
      } else {
        var index = this[categorty].indexOf(title);
        if (index > -1) {
          this[categorty].splice(index, 1);
        } 
      }
    }
  },
  components: {
    'movie-list': {
      template: `<div id="movie-list">
                  <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
                </div>`,
      data: function() {
        return {
          movies: [
            {title: 'Pulp Fiction', genre: genres.CRIME},
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
    },
    'movie-filter': {
      data() {
        return {
          genres
        }
      },
      template: `<div id="movie-filter">
                  <h2>Filter Results</h2>
                  <div class="filter-group">
                    <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                  </div>
                </div>`,
      methods: {
        checkFilter(categorty, title, checked) {
          this.$emit('check-filter', categorty, title, checked);
        }
      },
      components: {
        'check-filter': {
          data() {
            return {
              checked: false
            }
          },
          props: [ 'title' ],
          template: `<div v-bind:class="{'check-filter': true , active: checked }" v-on:click="checkFilter">
                        <span class="checkbox"></span>
                        <span class="check-filter-title">{{title}}</span>
                    </div>`,
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit('check-filter', 'genre', this.title, this.checked);
            }
          }
        }
      }
    }
  }
})

// save node_modules/.bin/webpack