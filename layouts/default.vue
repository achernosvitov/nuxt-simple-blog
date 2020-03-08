<template>
  <div>
    <Header />
    <nuxt />
    <ModalAuth />
  </div>
</template>

<script>
import Header from '@/components/Header';
import ModalAuth from '@/components/ModalAuth';

export default {
  components: {
    Header,
    ModalAuth
  }
};
</script>
