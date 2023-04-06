<template>
  <Transition>
    <li @click="copy(imageData.location)">
      <div class="data-part">
        <aside class="file-type">
          <span v-if="!show">{{ imageData.file?.type }}</span>
          <span v-if="show" class="copy-text">Copied!!</span>
        </aside>
        <aside class="file-name">{{ imageData.file?.name }}</aside>
        <section class="file-url">
          <a :href="imageData.location" ref="link">{{ imageData.location }}</a>
        </section>
      </div>
      <div>
        <img
          :src="imageData.file?.url"
          :alt="imageData.file.name"
          :title="imageData.file.name"
        />
      </div>
    </li>
  </Transition>
</template>


<script>
import { ref } from "vue";
import useClipboard from "vue-clipboard3";

export default {
  props: ["imageData"],
  setup() {
    const { toClipboard } = useClipboard();
    const show = ref(null);

    const copy = async (data) => {
      try {
        await toClipboard(data);
        console.log("Copied to clipboard");
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    };

    return { copy, show };
  },
};
</script>


<style scoped>
li {
  /* border: 1px solid #d0d8d0; */
  border-radius: 12px;
  padding: 5px;
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 70px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.data-part {
  display: grid;
  line-height: initial;
  grid-template-areas:
    "type name"
    "location location";
  grid-template-columns: 1fr 4fr;
  height: fit-content;
  overflow: scroll;
  grid-gap: 10px;
}
.file-type {
  grid-area: type;
  font-size: small;
  color: #8faec9;
}

.file-name {
  grid-area: name;
  font-size: small;
  /* font-weight: bold; */
  color: #8faec9;
}

.file-url {
  grid-area: location;
  font-size: small;
  /* display:flex; */
  align-items: center;
}
.file-url a {
  text-decoration: none;
}
img {
  border-radius: 25px;
  overflow: hidden;
  width: 50px;
  height: 50px;
  position: relative;
  display: block;
  z-index: 10;
  border:3px solid tomato;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.copy-text {
  color:tomato;
}
</style>