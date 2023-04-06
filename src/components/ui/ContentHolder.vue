<template>
    <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>

.card {
  width: 95%;
  min-height: 80%;
  height: fit-content;
  border-radius: 3rem;
  box-shadow: 0.8rem 0.8rem 1.4rem #c8d0e7, -0.2rem -0.2rem 1.8rem #ffffff;
  padding: 4rem;
  display: grid;
  /* grid-template-columns: 17.6rem 19rem 20.4rem;
  grid-template-rows: repeat(autofit, -webkit-min-content);
  grid-template-rows: repeat(autofit, min-content);
  grid-column-gap: 5rem;
  grid-row-gap: 2.5rem; */
  align-items: center;
}

</style>