<template>
  <b-container class="mt-4 mb-4">
    <ArticlesList :posts="posts" />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticlesList from '@/components/ArticlesList';

export default {
  components: {
    ArticlesList
  },

  async fetch({ store }) {
    await store.dispatch('posts/loadPosts');
  },

  computed: {
    ...mapGetters({
      posts: 'posts/all'
    })
  }
};
</script>
