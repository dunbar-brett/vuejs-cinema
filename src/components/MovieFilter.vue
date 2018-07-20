<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import CheckFilter from './CheckFilter.vue';
  
  export default {
    data() {
      return {
        genres
      }
    },
    methods: {
      checkFilter(categorty, title, checked) {
        this.$emit('check-filter', categorty, title, checked);
      }
    },
    components: {
      CheckFilter 
    }
  }
</script>