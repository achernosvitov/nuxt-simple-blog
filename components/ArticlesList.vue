<template>
  <div class="articles flex">
    <article v-for="item in articles" :key="item.id" class="card mb-3">
      <img class="card-img" src="{{ item.link }}" alt="{{ item.title }}">
      <div class="card-body">
        <nuxt-link class="card-img" to="/articles/:slug" />
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    articles: {
      type: Object,
      default: null
    }
  }
}
</script>
