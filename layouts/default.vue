<template>
  <div>
    <b-navbar tag="header" variant="light" type="light" toggleable="lg" sticky>
      <b-navbar-brand to="/">
        <img src="https://placekitten.com/g/30/30" alt="Kitten">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            Главная
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>
