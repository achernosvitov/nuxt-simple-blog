<template>
  <b-modal
    id="modal-signin"
    title="Sign in"
    ok-title="Sign in"
    centered
    ok-only
    @shown="focusFirstInput"
    @ok="handleOk"
  >
    <b-form
      ref="form"
      @submit.prevent="handleSubmit"
      @keyup.enter="handleSubmit"
    >
      <b-form-group
        :state="formState"
        :invalid-feedback="formFeedback"
      >
        <b-form-group
          label="Login"
          label-for="sign-in-input-login"
          :state="loginState"
          :invalid-feedback="loginFeedback"
        >
          <b-form-input
            id="sign-in-input-login"
            ref="loginInput"
            v-model="login"
            :state="loginState"
            required
          />
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="sign-in-input-password"
          :state="passwordState"
          :invalid-feedback="passwordFeedback"
        >
          <b-form-input
            id="sign-in-input-password"
            v-model="password"
            :state="passwordState"
            type="password"
            required
          />
        </b-form-group>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      loginState: null,
      loginFeedback: false,
      password: '',
      passwordState: null,
      passwordFeedback: false,
      formState: null,
      formFeedback: false
    };
  },

  methods: {
    async handleSubmit() {
      this.formFeedback = false;
      if (!this.validateForm()) {
        return false;
      }
      try {
        await this.$store.dispatch('user/login', { username: this.login, password: this.password });
        this.$nextTick(() => {
          this.$bvModal.hide('modal-signin');
        });
        this.resetForm();
      } catch (e) {
        this.formState = false;
        this.loginState = false;
        this.loginFeedback = false;
        this.passwordState = false;
        this.passwordFeedback = false;
        this.formFeedback = e.message || 'An error occured. Please try later.';
      }
    },
    handleOk(modalEvent) {
      modalEvent.preventDefault();
      this.handleSubmit();
    },
    validateForm() {
      const isLoginValid = this.login.length >= 3;
      this.loginState = isLoginValid;
      this.loginFeedback = 'Login length must be at least 3 characters';
      const isPasswordValid = this.password.length >= 4;
      this.passwordState = isPasswordValid;
      this.passwordFeedback = 'Password length must be at least 4 characters';

      return isLoginValid && isPasswordValid;
    },
    focusFirstInput() {
      this.$refs.loginInput.focus();
    },
    resetForm() {
      this.login = '';
      this.loginState = null;
      this.loginFeedback = false;
      this.password = '';
      this.passwordState = null;
      this.passwordFeedback = false;
      this.formState = null;
      this.formFeedback = false;
    }
  }
};
</script>
