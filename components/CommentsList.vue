<template>
  <section class="comments">
    <h3>Comments</h3>
    <hr>
    <CommentsForm v-if="username" />
    <b-row v-if="comments">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment__username">
          {{ comment.username }}
        </div>
        <div class="comment__timestamp">
          {{ getDateTime(comment.datetime) }}
        </div>
        <div class="comment__text">
          {{ comment.text }}
        </div>
      </div>
    </b-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentsForm from '@/components/CommentsForm';

export default {
  name: 'CommentsList',

  components: {
    CommentsForm
  },

  props: {
    comments: {
      type: [Array, Object],
      default: null
    }
  },

  computed: {
    ...mapGetters({
      username: 'user/username'
    })
  },

  methods: {
    getDateTime(timestamp) {
      const datetime = new Date(timestamp);
      const year = datetime.getFullYear();
      const month = datetime.getMonth() + 1;
      const date = datetime.getDate();
      const hour = datetime.getHours();
      const min = datetime.getMinutes();
      return `${date}/${month}/${year} ${hour}:${min}`;
    }
  }
};
</script>

<style scoped>
.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-bottom: 15px;
}
.comment__timestamp {
  font-size: 0.75rem;
  color: gray;
  margin-bottom: 5px;
}
</style>
