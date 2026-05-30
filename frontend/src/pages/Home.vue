<template>
  <div class="home">

```
<div class="composer">

  <textarea
    v-model="content"
    placeholder="いま何してる？"
  />

  <button
    @click="createPost"
  >
    投稿
  </button>

</div>

<div
  v-for="post in posts"
  :key="post.id"
  class="post"
>

  <div class="header">

    <span class="username">
      @{{ post.username }}
    </span>

  </div>

  <div class="body">
    {{ post.content }}
  </div>

  <div class="footer">
    {{ post.created_at }}
  </div>

</div>
```

  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const posts = ref([]);
const content = ref("");

async function loadPosts() {

  const response =
    await axios.get(
      "/api/posts"
    );

  posts.value =
    response.data.posts;
}

async function createPost() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "sasuty_user"
      )
    );

  if (!user) {
    return;
  }

  if (!content.value.trim()) {
    return;
  }

  await axios.post(
    "/api/posts",
    {
      userId:
        user.userId,
      username:
        user.username,
      content:
        content.value
    }
  );

  content.value = "";

  await loadPosts();
}

onMounted(() => {
  loadPosts();
});
</script>

<style scoped>
.home{
  max-width:700px;
  margin:auto;
}

.composer{
  background:white;
  border-radius:12px;
  padding:16px;
  margin-bottom:20px;
}

textarea{
  width:100%;
  min-height:120px;
  resize:none;
  padding:12px;
}

button{
  margin-top:10px;
  padding:10px 18px;
}

.post{
  background:white;
  border-radius:12px;
  padding:16px;
  margin-bottom:16px;
}

.username{
  font-weight:bold;
}

.body{
  margin-top:10px;
  white-space:pre-wrap;
}

.footer{
  margin-top:12px;
  color:#666;
  font-size:12px;
}
</style>
