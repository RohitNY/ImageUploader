

<template>
  <!-- <the-header></the-header> -->
  <router-view></router-view>
</template>
<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@400;700&family=Roboto&display=swap");
* {
  box-sizing: border-box;
}
html {
  font-family: "Roboto", "Open Sans", sans-serif;
}
body {
  margin: 0;
  background: #e4ebf5;
}
label {
  font-size: larger;
  color: #8faec9;
}
</style>
