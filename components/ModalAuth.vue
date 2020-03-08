<template>
  <b-modal
    id="modal-auth"
    title="Sign in"
    centered
    @shown="focusFirstInput"
    @ok="handleOk"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Login"
        label-for="input-login"
        :state="loginState"
        invalid-feedback="Login length must be at least 3 characters"
      >
        <b-form-input
          id="input-login"
          ref="loginInput"
          v-model="login"
          :state="loginState"
          required
        />
      </b-form-group>
      <b-form-group
        label="Password"
        label-for="input-password"
        :state="passwordState"
        invalid-feedback="Password length must be at least 4 characters"
      >
        <b-form-input
          id="input-password"
          v-model="password"
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
      password: '',
      loginState: null,
      passwordState: null
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

      return isLoginValid && isPasswordValid;
    },
    focusFirstInput() {
      this.$refs.loginInput.focus();
    }
  }
};
</script>
