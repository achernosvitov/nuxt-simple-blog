<template>
  <b-container class="mt-4 mb-4">
    <ArticleDetail :post="post" />
    <CommentsList :comments="comments" />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleDetail from '@/components/ArticleDetail';
import CommentsList from '@/components/CommentsList';

export default {
  components: {
    ArticleDetail,
    CommentsList
  },

  async fetch({ store, params }) {
    await store.dispatch('post/loadPost', { postId: params.id });
    await store.dispatch('post/loadComments', { postId: params.id });
  },

  computed: {
    ...mapGetters({
      post: 'post/post',
      comments: 'post/comments'
    })
  },

  head() {
    return {
      title: this.post.title
    };
  }
};
</script>
