import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment }});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment
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
    MovieList,
    MovieFilter 
  },
  created: function () {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
  }
})

// save node_modules/.bin/webpack