<template>
  <nav>
    <ul :class="`pagination justify-content-${align} mb-0`">
      <li
        :class="[
          'page-item',
          link.url == null ? 'disabled' : '',
          link.active ? 'active' : '',
        ]"
        v-for="(link, index) in links"
        :key="index"
      >
        <!-- <a
          :href="link.url"
          :class="`page-link ${link.active ? 'bg-primary text-white' : ''}`"
        >
          {{ link.label }}
        </a> -->
        <a
          v-on:click="goToPage(link.url)"
          :class="`page-link ${link.active ? 'bg-primary text-white' : ''}`"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
//import axios
import axios from "axios";
export default {
  name: "PaginationComponent",
  props: {
    links: Array,
    align: String,
  },

  setup() {
    const goToPage = (url) => {
      axios.get(`${url}`).then((response) => {
        console.log(response.data.data.data);
      });

      // watch
    };
    return {
      goToPage,
    };
  },
};
</script>

