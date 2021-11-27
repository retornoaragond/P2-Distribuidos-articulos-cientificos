<!-- BookIndex.vue -->
<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Paginas</th>
            <th>Copyright</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paper in papers">
            <td>{{ paper.title }}</td>
            <td>{{ paper.author }}</td>
            <td>{{ paper.pages }}</td>
            <td>{{ paper.copyright }}</td>
            <td>
              <router-link class="button" :to="'/papers/show/' +paper._id"
                >Show</router-link
              >
              &nbsp;
              <router-link class="button" :to="'/papers/edit/' + paper._id"
                >Edit</router-link
              >
              &nbsp;
              <a class="button" v-on:click="deleteBook(paper._id)">Erase</a>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/paper/create"
        >New</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Paper Index",
  data() {
    return {
      title: "Paper List",
      books: [],
    };
  },
  mounted() {
    this.allBooks();
  },
  methods: {
    allBooks() {
      fetch(this.url + "/.netlify/functions/paperFindAll", {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((items) => {
          this.books = items;
        });
    },
    deleteBook(id) {
      fetch(this.url + "/.netlify/functions/paperDelete/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }).then((items) => {
        this.allBooks();
      });
    },
  },
};
</script>