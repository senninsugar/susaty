import { defineStore } from "pinia";

const GAS_URL =
"https://script.google.com/macros/s/AKfycbwYsl3issVM1SgFyeuRVCITmIfex6kc7lmuiRXVpxbD195ctM0aAsyUxBV_NZxVz9UH/exec";

export const useAuthStore =
defineStore("auth", {
state: () => ({
user: JSON.parse(
localStorage.getItem(
"sasuty_user"
) || "null"
)
}),

actions: {
async login(
username,
password
) {

```
  const form =
    new URLSearchParams();

  form.append(
    "action",
    "login"
  );

  form.append(
    "username",
    username
  );

  form.append(
    "password",
    password
  );

  const response =
    await fetch(
      GAS_URL,
      {
        method: "POST",
        body: form
      }
    );

  const data =
    await response.json();

  if (data.success) {

    localStorage.setItem(
      "sasuty_user",
      JSON.stringify(data)
    );

    this.user = data;
  }

  return data;
},

async register(
  username,
  password
) {

  const form =
    new URLSearchParams();

  form.append(
    "action",
    "register"
  );

  form.append(
    "username",
    username
  );

  form.append(
    "password",
    password
  );

  const response =
    await fetch(
      GAS_URL,
      {
        method: "POST",
        body: form
      }
    );

  const data =
    await response.json();

  if (data.success) {

    localStorage.setItem(
      "sasuty_user",
      JSON.stringify(data)
    );

    this.user = data;
  }

  return data;
},

logout() {

  localStorage.removeItem(
    "sasuty_user"
  );

  this.user = null;
}
```

}
});
