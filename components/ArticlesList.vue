<template>
  <b-row v-if="posts">
    <b-card
      v-for="post in posts"
      :key="post.id"
      title="Lorem ipsum dolor"
      img-src="https://picsum.photos/1200/600/"
      img-alt="Image"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eligendi laborum ad reprehenderit unde ex sed accusantium distinctio, nisi voluptatum assumenda, eum doloremque hic officiis ratione dignissimos. Accusantium, quidem qui?
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
