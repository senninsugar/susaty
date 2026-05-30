<template>
  <div class="app">
    <aside class="sidebar">
      <div class="logo">
        Sasuty
      </div>

```
  <router-link to="/">
    ホーム
  </router-link>

  <router-link to="/search">
    検索
  </router-link>

  <router-link to="/notifications">
    通知
  </router-link>

  <router-link
    v-if="user"
    :to="`/profile/${user.userId}`"
  >
    プロフィール
  </router-link>
</aside>

<main class="content">
  <router-view />
</main>
```

  </div>
</template>

<script setup>
import { computed } from "vue";

const user = computed(() => {
  const raw =
    localStorage.getItem(
      "sasuty_user"
    );

  if (!raw) return null;

  return JSON.parse(raw);
});
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:sans-serif;
  background:#f5f7fb;
}

.app{
  display:flex;
  min-height:100vh;
}

.sidebar{
  width:250px;
  background:#ffffff;
  border-right:1px solid #e5e7eb;
  display:flex;
  flex-direction:column;
}

.logo{
  font-size:28px;
  font-weight:700;
  padding:20px;
}

.sidebar a{
  padding:15px 20px;
  text-decoration:none;
  color:#111827;
}

.sidebar a:hover{
  background:#f3f4f6;
}

.content{
  flex:1;
  padding:20px;
}
</style>
