<script lang="ts" setup>
  import { browser } from "wxt/browser";
  const input = ref<string>();

  function copyCurrentUrl() {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab.url;
      if (url) {
        console.log(url);
        navigator.clipboard.writeText(btoa(url));
      }
    });
  }

  function open() {
    if (input.value) {
      try {
        const url = new URL(atob(input.value));

        browser.tabs.create({
          url: url.href,
          active: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

<template>
  <div class="flex">
    <div
      class="flex flex-auto"
      style="gap: 0"
    >
      <input
        class="flex-auto"
        style="padding: 0.25rem 0.5rem"
        type="text"
        placeholder="Enter atob() resault"
        v-model="input"
      />
      <button
        v-if="input"
        @click="input = undefined"
      >
        x
      </button>
    </div>

    <button
      v-if="input"
      @click="open"
    >
      open
    </button>
  </div>

  <div class="flex center">
    <button @click="copyCurrentUrl">Copy Current Url</button>
  </div>
</template>
