<template>
  <div class="mt-4">
    <h3>Giriş yap ve başlayalım!</h3>
    <form class="detail-box my-5">
      <div class="form-group my-3">
        <label for="username">E-mail</label>
        <input
          type="text"
          v-model="email"
          class="form-control mb-4"
          placeholder="birisi@example.com"
        />
        <label for="password">Şifre</label>
        <input
          type="password"
          v-model="password"
          class="form-control mb-4"
          autocomplete="on"
          placeholder="*******"
          v-on:keyup.enter="login"
        />
        <router-link :to="{ path: 'signup' }">
          <h6 class="mb-3" style="font-weight: 600">Hesap oluştur</h6>
        </router-link>

        <button
          type="button"
          v-on:click="login"
          class="btn btn-primary"
          style="font-weight: 600"
        >
          Giriş Yap
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import firebase from "../services/firebase";
import Vue from "vue";
export default {
  app: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth = firebase.auth();
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          console.log(res);
          if (res.user) {
            // here we will look if the user that logs in, if his
            // uid matches with the id's in the db
            // As while signing up we have stored his uid as id in db
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                // console.log("query", querySnapshot);
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.name);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("password", userData.password);
                  localStorage.setItem("photoURL", userData.URL);
                  localStorage.setItem("description", userData.description);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              });
            this.$router.push("/chat");
          }
        })
        .catch((err) => {
          var errorCode = err.code;
          var errormessage = err.message;
          Vue.toasted.show(errorCode).goAway(1500);
          Vue.toasted.show(errormessage).goAway(1500);
        });
    },
  },
  created() {
    if (localStorage.getItem("id")) this.$router.push("/chat");
  },
};
</script>


<style scoped>
input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
  border: 1px solid lightgrey;
}
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h3 {
  padding: 55px;
  color: rgb(66, 7, 7);
}
form {
  height: 400px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 10px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
.detail-box {
  padding: 5px;
  border: 1px solid lightgrey;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
  background-color: rgb(104, 71, 71);
}
h6 {
  padding-top: 30px;
}
label {
  display: block;
  margin-top: 30px;
  margin-left: 0px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
  width: 80%;
  background-color: #ffffff;
  color: #080710;
  padding: 10px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  color: #001f3f;
  background-color: rgb(66, 7, 7);
  color: white;
}
</style>
        