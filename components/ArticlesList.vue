<template>
  <b-row v-if="posts">
    <b-card
      v-for="post in posts"
      :key="post.id"
      title="Lorem ipsum dolor"
      :img-src="post.picture"
      :img-alt="post.title"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ post.previewText }}
      </b-card-text>
      <b-button :to="`/articles/${post.id}`" variant="primary">
        Read more
      </b-button>
    </b-card>
  </b-row>
</template>

<script>
export default {
  name: 'ArticlesList',
  props: {
    posts: {
      type: Array,
      default: null
    }
  }
};
</script>
