<template>
  <b-form
    class="mb-3"
    @keyup.enter="submitForm"
    @submit.prevent="submitForm"
  >
    <b-form-group
      :state="formState"
      :invalid-feedback="formFeedback"
    >
      <b-form-group
        :state="commentTextState"
        invalid-feedback="Text length must be at least 10 characters"
      >
        <b-form-textarea
          v-model="commentText"
          placeholder="Enter comment text"
          rows="4"
          max-rows="6"
          required
          @submit.prevent="submitForm"
        />
      </b-form-group>
      <b-btn
        variant="primary"
        type="submit"
      >
        Submit
      </b-btn>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CommentsForm',

  data() {
    return {
      commentText: '',
      commentTextState: null,
      formState: null,
      formFeedback: ''
    };
  },

  computed: {
    ...mapGetters({
      username: 'user/username',
      post: 'post/post'
    })
  },

  methods: {
    async submitForm() {
      this.formFeedback = '';
      this.formState = null;
      if (!this.validateForm()) {
        return false;
      }
      try {
        await this.$store.dispatch('post/postComment', {
          postId: this.post.id,
          username: this.username,
          text: this.commentText
        });
        this.resetForm();
        this.$store.dispatch('post/loadComments', { postId: this.post.id });
      } catch (e) {
        if (e.message === 'Forbidden') {
          this.formState = false;
          this.formFeedback = 'An error occured. Please refresh page and try again';
        }
      }
    },
    validateForm() {
      const isTextareaValid = this.commentText.length > 10;
      this.commentTextState = isTextareaValid;
      return isTextareaValid;
    },
    resetForm() {
      this.commentText = '';
      this.commentTextState = null;
      this.formFeedback = '';
      this.formState = null;
    }
  }
};
</script>
