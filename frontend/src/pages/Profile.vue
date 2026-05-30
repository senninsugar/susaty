<template>
  <div>

```
<div class="profile">

  <h1>
    {{ username }}
  </h1>

  <p>
    ID: {{ userId }}
  </p>

</div>

<div
  v-for="post in posts"
  :key="post.id"
  class="post"
>

  <div>
    {{ post.content }}
  </div>

</div>
```

  </div>
</template>

<script setup>
import axios from "axios";
import {
  ref,
  onMounted
} from "vue";

import {
  useRoute
} from "vue-router";

const route =
  useRoute();

const posts =
  ref([]);

const username =
  ref("");

const userId =
  ref(route.params.id);

async function loadProfile() {

  const response =
    await axios.get(
      `/api/profile/${route.params.id}`
    );

  posts.value =
    response.data.posts;

  if (
    response.data.posts.length
  ) {

    username.value =
      response.data.posts[0]
        .username;
  }
}

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.profile{
  background:white;
  border-radius:12px;
  padding:20px;
  margin-bottom:20px;
}

.post{
  background:white;
  border-radius:12px;
  padding:16px;
  margin-bottom:16px;
}
</style>
