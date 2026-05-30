<template>
  <div>

```
<input
  v-model="query"
  placeholder="検索"
>

<button
  @click="search"
>
  検索
</button>

<div
  v-for="post in results"
  :key="post.id"
  class="post"
>

  <b>
    @{{ post.username }}
  </b>

  <p>
    {{ post.content }}
  </p>

</div>
```

  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const query =
  ref("");

const results =
  ref([]);

async function search() {

  const response =
    await axios.get(
      `/api/search?q=${encodeURIComponent(
        query.value
      )}`
    );

  results.value =
    response.data.results;
}
</script>

<style scoped>
input{
  width:100%;
  padding:12px;
}

button{
  margin-top:10px;
  padding:10px;
}

.post{
  margin-top:16px;
  background:white;
  border-radius:12px;
  padding:16px;
}
</style>
