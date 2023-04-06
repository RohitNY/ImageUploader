<template>
  <section id="container">
    <the-header></the-header>
    <main-content>
        <slot></slot>
    </main-content>
  </section>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import MainContent from "./MainContent.vue";
export default {
  components: {
    TheHeader,
    MainContent,
  },
};
</script>

<style scoped>
#container {
  display: grid;
  grid-template-rows: 100px 5fr 1em;
  grid-gap:2em;
  /* gap: 1em; */
}
</style>
