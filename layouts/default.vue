<template>
  <div>
    <Header />
    <nuxt />
    <ModalAuth />
    <ModalSignUp />
  </div>
</template>

<script>
import Header from '@/components/Header';
import ModalAuth from '@/components/ModalAuth';
import ModalSignUp from '@/components/ModalSignUp';

export default {
  components: {
    Header,
    ModalAuth,
    ModalSignUp
  }
};
</script>
