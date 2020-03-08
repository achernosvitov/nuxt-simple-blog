<template>
  <b-navbar tag="header" variant="light" type="light" toggleable="lg" sticky>
    <b-navbar-brand to="/">
      <img src="https://placekitten.com/g/30/30" alt="Kitten">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">
          Home
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-md-auto" tag="ul">
        <template v-if="!username">
          <b-nav-item v-b-modal.modal-signup>
            Sign up
          </b-nav-item>
          <b-nav-item v-b-modal.modal-signin>
            Sign in
          </b-nav-item>
        </template>
        <b-nav-item-dropdown v-else right :text="username">
          <b-dropdown-item @click.prevent="logout">
            Log out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapGetters({
      username: 'user/username'
    })
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    }
  }
};
</script>
