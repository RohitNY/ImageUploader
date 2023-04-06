<template>
  <page-layout>
    <div>
      <label>Upload Image(s)</label>
      <div class="container" v-bind="getRootProps()">
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Drop the files here</p>
        <p v-else>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
    <div class="custom-content-holder" v-if="files.length">
      <label>Preview Images</label>
      <div class="container preview-container">
        <label class="sub-label">Click on image(s) to remove.</label>
        <div class="sub-container">
          <ul class="file-list" v-if="files.length">
            <li class="item" v-for="file of files" :key="file.id">
              <div class="image-container">
                <img
                  :src="file.url"
                  :alt="file.name"
                  :title="file.name"
                  @click="remove(file.name)"
                />

                <!-- <button class="upload-button">remove</button> -->
                <!-- <font-awesome-icon icon="fa-solid fa-trash" /> -->
                <!-- </button> -->
              </div>
              <img
                v-if="file.loading"
                class="loader"
                src="../../components/icons/loader2.gif"
                alt="loader"
              />
              <span v-if="!file.loading" class="img-desc">{{ file.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <button class="upload-button" @click="upload">Upload</button>
      </div>
    </div>

    <div class="custom-content-holder" v-if="list.length">
      <label>Uploaded Images</label>
      <div class="container uploaded-container">
        <label class="sub-label">Click on a row to copy the URL.</label>
        <ul class="data-list">
          <upload-image-item
            v-for="data in list"
            :key="data.location"
            :imageData="data"
          ></upload-image-item>
        </ul>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../../components/layout/PageLayout.vue";
import ContentHolder from "../../components/ui/ContentHolder.vue";
import { useDropzone } from "vue3-dropzone";
import axios from "axios";
import { ref } from "vue";
import UploadImageItem from "../../components/upload/UploadImageItem.vue";

export default {
  components: {
    PageLayout,
    ContentHolder,
    UploadImageItem,
  },
  setup() {
    const files = ref([]);
    const list = ref([]);
    function onDrop(acceptFiles, rejectReasons) {
      files.value.push(...acceptFiles);
      files.value.forEach((file) => {
        file.url = URL.createObjectURL(file);
      });
      console.log(files);
      list.value = [];
    }

    const remove = (name) => {
      files.value = files.value.filter((f) => f.name !== name);
      //console.log(name)
    };
    const upload_prev = () => {
      const filesToBeUploaded = files.value[0];
      const fd = new FormData();
      fd.append("images", filesToBeUploaded);
      axios
        .post("http://localhost:8080/uploadImages", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => console.log(res));
    };

    const upload = () => {
      const filesToBeUploaded = files.value;
      filesToBeUploaded.forEach(async (file) => {
        file.loading = true;
        const fd = new FormData();
        fd.append("images", file);
        const result = await axios.post(
          "http://localhost:8080/uploadImages",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        list.value = [
          ...list.value,
          { file, location: result?.data?.Location },
        ];
        remove(file.name);
      });
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      files,
      remove,
      upload,
      list,
      ...rest,
    };
  },
};
</script>
<style scoped>
.container {
  padding: 0;
  background: white;
  min-height: 200px;
  width: 100%;
  margin-bottom: 20px;
  line-height: 200px;
  vertical-align: middle;
  color: #263238;
  text-align: center;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.1rem 1rem #c8d0e7, -0.2rem -0.2rem 1.1rem #ffffff;

  margin-top: 10px;
}
.preview-container {
  display: grid;
  grid-template-rows: 35px 1fr;
  line-height: initial;
}
.uploaded-container {
  display: grid;
}
.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-auto-flow: dense;
  grid-gap: 1em;
  margin: 1em;
  padding: 2em;
  justify-content: center;
}
.data-list {
  display: grid;
  grid-gap: 1em;
  margin: 1em;
  padding: 2em;
}
.item {
  border-radius: 20px;
  /* overflow: hidden; */
  width: 120px;
  height: 140px;
  position: relative;
  display: block;
  z-index: 10;
  margin: 0.4em;
}
.image-container {
  border-radius: 20px;
  overflow: hidden;
  height: 80%;
}
img {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.img-desc {
  font-size: xx-small;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-button {
  background-color: #5148d4;
  color: #fff;
  font-size: 1em;
  border-radius: 2em;
  height: 50px;
  border: none;
  cursor: pointer;
  width: 200px;
}
.loader {
  width: 30px;
  height: 30px;
}
.sub-label {
  font-size: small;
  line-height: 20px;
  padding: 10px;
}
</style>