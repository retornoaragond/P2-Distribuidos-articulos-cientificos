<!-- BookIndex.vue -->
<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <button class="accordion">Section 1</button>
      <div class="panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <button class="accordion">Section 2</button>
      <div class="panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <button class="accordion">Section 3</button>
      <div class="panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
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
              <router-link class="button" :to="'/paper/show/' + paper._id"
                >Ver</router-link
              >
              &nbsp;
              <router-link class="button" :to="'/paper/edit/' + paper._id"
                >Editar</router-link
              >
              &nbsp;
              <a class="button" v-on:click="deletePaper(paper._id)"
                >Eliminar
              </a>
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
      papers: [],
    };
  },
  mounted() {
    this.allPapers();
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  },
  methods: {
    allPapers() {
      fetch(this.url + "/.netlify/functions/paperFindAll", {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((items) => {
          this.papers = items;
        });
    },
    deletePaper(id) {
      fetch(this.url + "/.netlify/functions/paperDeleteBatch/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }).then((items) => {
        this.allPapers();
      });
    },
  },
};
</script>