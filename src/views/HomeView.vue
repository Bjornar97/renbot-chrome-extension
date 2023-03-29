<script setup lang="ts">
import { ref, onMounted } from "vue";
import browser from "webextension-polyfill";

const rawToken = await browser.storage.local.get("token");

const token = ref<string | null>(rawToken?.token);
const tokenValid = ref(null as boolean | null);

browser.storage.local.onChanged.addListener((changes: any) => {
  token.value = changes.token.newValue;
});

const checkToken = async () => {
  if (!token.value) {
    tokenValid.value = false;
  }

  console.log({ token: token.value });

  try {
    const response = await fetch("https://renbot.net/api/is-authenticated", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.status !== 200) {
      tokenValid.value = false;
      return;
    }

    const json = await response.json();
    console.log(json);

    tokenValid.value = json;
  } catch (error) {
    console.error(error);
    tokenValid.value = false;
  }
};

const logout = () => {
  browser.storage.local.remove("token");
  token.value = null;
  tokenValid.value = false;
};

const login = () => {
  window.open(
    "https://renbot.net/moderators/token?from-extension=true",
    "_blank"
  );
};

onMounted(() => {
  checkToken();
});
</script>

<template>
  <main class="info">
    <p class="logged-in" v-if="tokenValid">Logged in</p>
    <p class="not-logged-in" v-else-if="tokenValid === false">Not logged in</p>

    <div class="links">
      <a href="https://renbot.net" target="_blank">Go to renbot.net</a>
      <a href="https://www.twitch.tv/rendogtv" target="_blank">RendogTV</a>
      <a href="https://www.twitch.tv/moderator/rendogtv" target="_blank"
        >Modview</a
      >
    </div>

    <div>
      <button
        class="btn btn-error"
        type="button"
        v-if="tokenValid"
        @click="logout"
      >
        Logout
      </button>

      <button
        class="btn btn-success"
        type="button"
        v-else-if="tokenValid === false"
        @click="login"
      >
        Login
      </button>
    </div>
  </main>
</template>

<style scoped>
.info {
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 1rem;
}
.btn {
  cursor: pointer;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-error {
  background-color: #dc3545;
  color: #fff;
}

.logged-in {
  font-size: 1.2em;
  margin-bottom: 1rem;
  color: #28a745;
}

.not-logged-in {
  font-size: 1.2em;
  margin-bottom: 1rem;
  color: #dc3545;
}

.links {
  grid-column: 2/3;
  grid-row: 1/3;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.links a {
  padding: 0.3rem;
}
</style>
