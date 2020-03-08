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
        invalid-feedback="Login length must be at least 3 characters"
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
        invalid-feedback="Password length must be at least 4 characters"
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
        label-for="signup-input-confirm-password"
        :state="confirmPasswordState"
        invalid-feedback="Passwords must match"
      >
        <b-form-input
          id="signup-input-confirm-password"
          v-model="confirmPassword"
          :state="confirmPasswordState"
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
      password: '',
      confirmPassword: '',
      loginState: null,
      passwordState: null,
      confirmPasswordState: null
    };
  },

  methods: {
    handleSubmit() {
      if (!this.validateForm()) {
        return false;
      }
      window.alert(`Login is ${this.login} and password is ${this.password}`);
      this.$nextTick(() => {
        this.$bvModal.hide('modal-auth');
      });
    },
    handleOk(modalEvent) {
      modalEvent.preventDefault();
      this.handleSubmit();
    },
    validateForm() {
      const isLoginValid = this.login.length >= 3;
      this.loginState = isLoginValid;
      const isPasswordValid = this.password.length >= 4;
      this.passwordState = isPasswordValid;
      const doesPasswordsMatch = this.password === this.confirmPassword;
      this.confirmPasswordState = doesPasswordsMatch;

      return isLoginValid && isPasswordValid && doesPasswordsMatch;
    },
    focusFirstInput() {
      this.$refs.loginInput.focus();
    }
  }
};
</script>
