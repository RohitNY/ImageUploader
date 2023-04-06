<template>
  <main>
    <content-holder>
        <slot></slot>
    </content-holder>
  </main>
</template>

<script>
import ContentHolder from "../ui/ContentHolder.vue";
export default {
  components: {
    ContentHolder,
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  background: #e4ebf5;
}
</style>