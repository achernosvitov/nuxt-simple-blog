<template>
  <section class="bd-content">
    <h1>{{ post.title }}</h1>
    <hr>
    <b-img v-if="post.picture" :src="post.picture" fluid :alt="post.title" />
    <div v-if="post.detailText" class="detail-text mt-4" v-html="post.detailText" />
  </section>
</template>

<script>
export default {
  name: 'ArticleDetail',
  props: {
    post: {
      type: Object,
      default: null
    }
  }
};
</script>
