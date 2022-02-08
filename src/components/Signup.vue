<template>
  <div class="mt-4">
    <h3>Kayıt ol ve başlayalım!</h3>
    <form class="detail-box my-5">
      <div class="form-group my-3">
        <label for="password">İsim-Soyisim</label>
        <input
          type="text"
          v-model="name"
          class="form-control mb-4"
          placeholder="Adınızı giriniz."
          autocomplete="on"
        />
        <label for="password">E-mail</label>

        <input
          type="text"
          v-model="email"
          class="form-control mb-4"
          placeholder="birisi@example.com"
          autocomplete="on"
        />
        <label for="password">Şifre</label>

        <input
          type="password"
          v-model="password"
          class="form-control mb-4"
          placeholder="*******"
          autocomplete="off"
        />
        <router-link :to="{ path: '/' }">
          <h6 class="mb-3" style="font-weight: 600">Zaten hesabın var mı?</h6>
        </router-link>
        <button
          style="font-weight: 600"
          type="button"
          v-on:click="signup"
          class="btn btn-primary"
        >
          Kayıt Ol
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "../services/firebase";
import Vue from "vue";

export default {
  app: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      const auth = firebase.auth();
      const name = this.name;
      const email = this.email;
      const password = this.password;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log("res", res);
          // once we get the res from db then only we will save data to ls so that our local and db are in sync
          await firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: res.user.uid,
              email,
              password,
              URL: "",
              description: "",
            })
            .then((ref) => {
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("password", password);
              localStorage.setItem("photoURL", "");
              localStorage.setItem("description", "");
              localStorage.setItem("FirebaseDocumentId", ref.id);
              this.name = "";
              this.email = "";
              this.password = "";
              this.$router.push("/chat");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          var errorCode = err.code;
          var errormessage = err.message;
          Vue.toasted.show(errorCode).goAway(1500);
          Vue.toasted.show(errormessage).goAway(1500);
        });
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
  border: 1px solid lightgrey;
}
h3 {
  padding: 30px;
  color: rgb(66, 7, 7);
}
form {
  height: 470px;
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
  margin-top: 20px;
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