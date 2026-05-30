<template>
  <div class="page">

```
<div class="card">

  <h1>
    ログイン
  </h1>

  <input
    v-model="username"
    placeholder="ユーザー名"
  >

  <input
    v-model="password"
    type="password"
    placeholder="パスワード"
  >

  <button
    @click="submit"
  >
    ログイン
  </button>

  <p>
    {{ message }}
  </p>

</div>
```

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter }
from "vue-router";
import {
  useAuthStore
}
from "../stores/auth";

const auth =
  useAuthStore();

const router =
  useRouter();

const username =
  ref("");

const password =
  ref("");

const message =
  ref("");

async function submit() {

  const result =
    await auth.login(
      username.value,
      password.value
    );

  if (result.success) {

    router.push("/");

  } else {

    message.value =
      result.message;

  }
}
</script>

<style scoped>
.page{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:80vh;
}

.card{
  width:400px;
  background:white;
  padding:20px;
  border-radius:12px;
  display:flex;
  flex-direction:column;
  gap:12px;
}

input{
  padding:12px;
}

button{
  padding:12px;
}
</style>
