<template>
  <div>

```
<h1>
  通知
</h1>

<div
  v-for="notification in notifications"
  :key="notification.id"
  class="notification"
>

  <div>
    {{ notification.actor_name }}
  </div>

  <div>
    {{ notification.type }}
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

const notifications =
  ref([]);

async function loadNotifications() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "sasuty_user"
      )
    );

  if (!user) {
    return;
  }

  const response =
    await axios.get(
      `/api/notifications/${user.userId}`
    );

  notifications.value =
    response.data.notifications;
}

onMounted(() => {
  loadNotifications();
});
</script>

<style scoped>
.notification{
  background:white;
  border-radius:12px;
  padding:16px;
  margin-top:12px;
}
</style>
