<template>
  <page-layout>
    <div v-if="error" class="view-container">
      <p>{{ error }}</p>
    </div>
    <div v-if="!error" class="view-container">
      <label for="table"> Uploaded Images</label>
      <aside class="copy-message">
        <span v-if="show">Url is copied to the clipboard.</span>
      </aside>
      <EasyDataTable
        :headers="headers"
        :items="items"
        :rows-per-page="10"
        show-index
        :filter-options="filterOptions"
      >
        <template #header-name="header">
          <div class="filter-column">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAx9JREFUaEPtmUuojVEUx383E0SRSFFIGSAlDBiIKAwYeIXyJvIoFInyKhQDBgh5K28GDLwjAxNJCkWEAQbEAGWi9Ne6+tzznfOt/e1zrnPz7dG95/zXf+3/XmuvvfY+DbTw0dDC589/IaAvsAqYAHSuYcQ+A9eBM8Blr5+sCGjy54B+XsIq4D4BY4GHHq4sAYeA+UZ0DHjrIc2J6QHMMdvDwAIPT5aAJ7b6m4FNHsJIjHxsBJ4C/T1cWQI+AF2B5hag/dCpGgK2A2uB+8AY4JuHNCemnW3iYcBpYIaHJysCI4A7RnQAWOwhzYnZDywy26nAeQ9PlgBxbLAU0t/LgL0e4kDMUmCP2WgPbPHaewSIS6sxGfhhqXTP68CBG26p0xq4AExx2PyBeAX0NCd9gAcm4kuIozLYjsY7BHhhvG9CeL0CxDk+cUIeSZwPIf6aYlXv59mHOumvhJKFCBD3OmCrOVkJ7A51mMCvAHbZ/+uBbXm4QgXIh0rcNOCnhfx2DsejLHVaWe8zPQfHb5M8ArqZc/VHj0zEx4AJqCFU0zbQTlydL+8C7P+C5hEgAjVbV43pBDA7YALHgVmGHwdcC7AtgeYVIKLVwA5jVB3f55jIXEAFQGMNsNNhUxESI0DEWv2ZwCtgKJCVSjeB0cDJRBSiNMQKmAhctBlMAi5VmI3OkOf2vSKh9lxjENA+Q4XuBl/TMLECxPkdaAssT7QDab5UaU7ZFyoAzwAdkK8dIZCAwbUSoGZPTV9Wy93Y62sejQvXG3jpEFD2flCNCMQI0Ny1hySk0rhhLX0Jph4EOAJQHlIIsAtP3j0QtfrJzRRDFLsHYnzn6oWaOowRoDKqdyfdByqNu8DIeiyjA4DHjhDoktOrHgW0AZY4TuL3wMF6FOBY/MqQoowWZTQyif51CnUAbllLXUlK2afGagg4as/iCwE9x5cbad2ot4zqotSlVlVIfX53e/DSgRMiQFhdK1N7/QTRWUBvpyWjGhHwZnFaBLy2ZXGFgIAlLCJQ7IGAdEmDtvgUkij96qkfMar2i2dzVqHIAKabFwJqsqwBpL8AiSSfMe3JHmMAAAAASUVORK5CYII="
              class="filter-icon"
              @click.stop="showNameFilter = !showNameFilter"
            />
            {{ header.text }}
            <div class="filter-menu" v-if="showNameFilter">
              <input v-model="nameCriteria" />
            </div>
          </div>
        </template>

        <template #item-url="{ Url }">
          <a :href="Url">{{ Url }}</a>
        </template>

        <template #item-preview="{ Preview }">
          <img :src="Preview" class="preview" alt />
        </template>
        
        <template #item-operation="{ operation, Url }">
          <div class="operation-wrapper">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAyxJREFUaEPtmdnLTlEUh58vIiIiIjJFZM6UKZkSkSnTpaFckAv+AfwD3JBcELeIIiVDZM5UhFKKRBlKiVJK9Kt1vlZvZ3zPOe9QZ9dX33vOHp7f3mutvfY+HbR56WhzfioBzV7BagVaeQVmApOAYTkgbwH6S1P6AsuBEcAX4ANwI6lhlAkdAPYnNU75fgbwNKHuWhtvak29C8D6uLZhAiYDz1PCpam2KGEVBHgOIiPiLuBY1EBhAtTgqDV4BZy1zv/FDBLV/6WE2V9j8F1dBxqvF7DCPRsJvA8bJEyAN5+DgH6XUVYZfHfr/C+wxZ7p0X1gjr3bBpxqJQGaXZlNT4P6Y/Cy+aCcATa2ooBlBt/b4H4b/EUHv8FMN3jUMia0xOAVMlV+GfxlB7/O4LvYs8PAvixOXJYPLDT4/gbzw+CvOLjVBt/NBRHtDR+bLWCBgQ00kO/AZuC6A1tpdXo4+E3A67gI0ogoNM/ABhvIN4O/6cA0y0H41GOF70R4VSxbwGwDG2qwnw3+toNfaqbVJ8vMB+3LFKBcSrM63Ab7ZPD3HLx2aYXTfvXAl7kC0wx+lIEpMZPNP3Tw8gvBD6gXviwBUwx+jIG9M/jHDl5+IfhBeeDLEDDR4McZ2FuDf+bg5ReCH5IXvgwBiiyK9ypvDN5ntvILwQdnjNTRJiqUFunESryUgKkodsvmX7qB5ReCV1qgkgY+mIzIQ1GRAvYChwzuCLDHwcsvBD86A/x04InVjzwUFSngPKA8RmUrcNr+l18IfmwGeFVNldIUKeCnHUQ0+ARA9q6ZWwyMzwhfmADNgg41SWUuEGxQsm0JqC1pbN63aegKJF0CyAl3JyVmNYobKmAncNwBKM+/Btyx3fdB0hKGvC9EQFoT0vg648rmr7pwWgd3Z5NCBJR5qE8SVwnQDDVzBXQzGFzpRHIUuQ8kmUTW95UJNduE2n4F2t4H2l5A3Sa0HTjhskelwnmLv5pPe02v+9EgKdwBnAyDCAujSoMf5SUuuP0swF8KdHbfiE9MebXEbqZxn1n1qWk+ENxn5gXJ2v4rcBd4Edew+k6cdVqLrl+tQNEzmrW//8po6zHuWJ0UAAAAAElFTkSuQmCC"
              class="operation-icon"
              title="Click to copy the URL"
              @click="copy(Url)"
            />
          </div>
        </template>

        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px"
          />
        </template>
      </EasyDataTable>
    </div>
  </page-layout>
</template>


<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import PageLayout from "../../components/layout/PageLayout.vue";
import useClipboard from "vue-clipboard3";
export default {
  components: { EasyDataTable: window["vue3-easy-data-table"], PageLayout },
  setup() {
    const { toClipboard } = useClipboard();
    const show = ref(null);
    const nameCriteria = ref("");

    const headers = ref([
      { text: "NAME", value: "Name", width: 100 },
      { text: "CREATED", value: "Created", sortable: true, width: 150 },
      { text: "URL", value: "Url", width: 600 },
      { text: "PREVIEW", value: "Preview", width: 100 },
      { text: "", value: "operation" },
    ]);

    const items = ref([]);
    const error = ref(null);

    const getImages = async () => {
      const allImages = await axios.get("http://localhost:8080/getImages");
      console.log(allImages);
      if (allImages.status !== 200) {
        error.value = "Failed to fetch data. Refresh the page and try again.";
      } else {
        items.value = allImages?.data ?? [];
      }
    };

    var filterOptions = computed(function () {
      var filterOptionsArray = [];
      filterOptionsArray.push({
        field: "Name",
        criteria: nameCriteria.value,
        comparison: function (value, criteria) {
          return (
            value != null &&
            criteria != null &&
            typeof value === "string" &&
            value.includes(criteria)
          );
        },
      });
      return filterOptionsArray;
    });

    const showNameFilter = ref(false);
    onMounted(() => {
      console.log("Fetching data");
      getImages();
    });

    const copy = async (data) => {
      try {
        await toClipboard(data);
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    };

    return {
      headers,
      items,
      error,
      copy,
      show,
      showNameFilter,
      filterOptions,
      nameCriteria,
    };
  },
};
</script>

<style scoped>
.view-container {
  display: grid;
  grid-template-rows: 50px 12px 1fr;
  gap: 1em;
}
a {
  font-weight: 500;
  color: #3eaf7c;
  text-decoration: none;
  overflow-wrap: break-word;
}
a:hover {
  text-decoration: underline;
}
.preview {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  box-shadow: inset 0 2px 4px #0000001a;
}
.operation-wrapper {
  display: flex;
  justify-content: center;
}
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.operation-icon:active {
  background-color: rgb(228, 14, 139);
  transition: background-color 0.2s ease-in-out;
}
.copy-message {
  display: flex;
  justify-content: center;
  font-size: small;
  color: tomato;
}
.filter-column {
    display: flex;
    align-items: center;
    justify-items: center;
    position: relative;
}
.filter-icon {
    cursor: pointer;
    display: inline-block;
    width: 15px!important;
    height: 15px!important;
    margin-right: 4px;
}
.filter-menu {
  padding: 15px 30px;
  z-index: 1;
  position: absolute;
  top: 30px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}
</style>
