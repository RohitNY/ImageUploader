<template>
  <section id="login-page">
    <header>
      <font-awesome-icon id="header-img" icon="fa-solid fa-photo-film" />
      <span>Image Uploader</span>
      <sub></sub>
    </header>
    <main>
       
      <section id="container">
        <span>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-user" />
          </span>
          <input type="text" id="txt-user-name" placeholder="Username" v-model="email"/>
        </span>
        <span>
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-lock" />
          </span>
          <input type="text" id="txt-password" placeholder="Password" v-model="password"/>
        </span>

        <button @click="submitRequest">Login</button>
         <div class="error-msg" v-show="!isFormValid">Please enter a valid email and password.</div>
      </section>
    </main>
    <footer></footer>
  </section>
</template>

<script>
export default {
    data(){
        return {
            email:'',
            password:'',
            isFormValid: true
        }
    },
    methods: {
        submitRequest() {
            if(this.email.trim()==="" || !this.email.includes("@" || this.password.trim()==="")) {
                this.isFormValid = false;
                return;
            }
        }
    }
}
</script>

<style scoped>
#login-page {
  display: grid;
  width: 100vw;
  height: 100vh;
  background-color: #877eff;
  grid-template-rows: 1fr 6fr 1fr;
}
#login-page header {
  padding: 3em;
  display: grid;
  justify-content: center;
  grid-gap: 0.5em;
}
#login-page header span,
sub,
#header-img {
  width: 50vw;
  display: flex;
  justify-content: center;
}
#login-page header sub {
  font-size: 1.5em;
  color: #c7b6b6;
  font-family: Poppins;
}

#header-img {
  color: coral;
  font-size: 4em;
}
#login-page header span {
  font-family: "Lobster";
  font-size: 3em;
}

main {
  display: grid;
  justify-content: center;
    
}
main #container {
  width: 40vw;
  background-color: #e6e6fe;
  border-radius: 2em;
  min-width: 300px;
  display: grid;
  padding: 2em;
  gap: 1em;
  grid-template-rows: 1fr 1fr 1fr 10px;
}
main #container > span {
  display: grid;
  grid-template-columns: 1fr 7fr;
  align-items: center;
}
input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: background-color 0.3s;
  border-radius: 0.25rem;
  border-radius: 0.25rem;
  padding: 1rem;
}
button {
  background-color: #0d00d4;
  color: #fff;
  font-size: 1em;
  border-radius: 2em;
  height: 50px;
  border: none;
  cursor: pointer;
}
.icon {
  display: flex;
  justify-content: center;
}
.error-msg {
  display: flex;
    justify-content: center;
    color: #df22bf
}
</style>