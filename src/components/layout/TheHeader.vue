<template>
  <header>
    <nav>
      <h1 class="title">
        <font-awesome-icon id="header-img" icon="fa-solid fa-photo-film" />
        <router-link to="/">Image Uploader</router-link>
      </h1>
      <ul>
        <li><router-link to="/upload">Upload Images</router-link></li>
        <li><router-link to="/view">View Data</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #877eff;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f2cdec;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border-bottom: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  /* color: #e6e6fe; */
  color: #f6f6f6;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
.title {
  font-family: "Lobster";
  font-size: 1.5em;
  color:#f6f6f6;
}
#header-img {
  color: coral;
}
</style>