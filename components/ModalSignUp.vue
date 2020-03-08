<template>
  <b-modal
    id="modal-signup"
    title="Sign up"
    ok-title="Sign up"
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
        label="Login"
        label-for="sign-up-input-login"
        :state="loginState"
        :invalid-feedback="loginFeedback"
      >
        <b-form-input
          id="sign-up-input-login"
          ref="loginInput"
          v-model="login"
          :state="loginState"
          required
        />
      </b-form-group>
      <b-form-group
        label="Password"
        label-for="sign-up-input-password"
        :state="passwordState"
        :invalid-feedback="passwordFeedback"
      >
        <b-form-input
          id="sign-up-input-password"
          v-model="password"
          :state="passwordState"
          type="password"
          required
        />
      </b-form-group>
      <b-form-group
        label="Confirm password"
        label-for="sign-up-input-confirm-password"
        :state="confirmPasswordState"
        :invalid-feedback="confirmPasswordFeedback"
      >
        <b-form-input
          id="sign-up-input-confirm-password"
          v-model="confirmPassword"
          :state="passwordState"
          type="password"
          required
        />
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
      loginFeedback: '',
      password: '',
      passwordState: null,
      passwordFeedback: '',
      confirmPassword: '',
      confirmPasswordState: null,
      confirmPasswordFeedback: ''
    };
  },

  methods: {
    async handleSubmit() {
      if (!this.validateForm()) {
        return false;
      }
      try {
        await this.$store.dispatch('user/registerNewUser', { username: this.login, password: this.password });
        await this.$store.dispatch('user/login', { username: this.login, password: this.password });
        this.$nextTick(() => {
          this.$bvModal.hide('modal-signup');
        });
        this.resetForm();
        console.log('submitted');
      } catch (e) {
        console.log('error');
        if (e.message === 'User with this username already exists') {
          this.loginState = false;
          this.loginFeedback = 'User with this username already exists';
        } else {
          this.loginState = false;
          this.loginFeedback = '';
          this.passwordState = false;
          this.passwordFeedback = '';
        }
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
      const DoesPasswordsMatch = this.password === this.confirmPassword;
      this.confirmPasswordState = DoesPasswordsMatch;
      this.confirmPasswordFeedback = 'Passwords must match';

      return isLoginValid && isPasswordValid;
    },
    focusFirstInput() {
      this.$refs.loginInput.focus();
    },
    resetForm() {
      this.login = '';
      this.loginState = null;
      this.loginFeedback = '';
      this.password = '';
      this.passwordState = null;
      this.passwordFeedback = '';
      this.confirmPassword = '';
      this.confirmPasswordState = null;
      this.confirmPasswordFeedback = '';
    }
  }
};
</script>
