<script lang="ts" setup>
  import { browser } from "wxt/browser";
  const inputAb = ref<string>();
  const inputBa = ref<string>();

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
    if (inputAb.value) {
      try {
        const url = new URL(atob(inputAb.value));

        browser.tabs.create({
          url: url.href,
          active: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function copyUrl() {
    if (inputBa.value) {
      navigator.clipboard.writeText(btoa(inputBa.value)).then(() => {
        inputBa.value = undefined;
      });
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
        type="text"
        placeholder="Enter URL to open"
        v-model="inputAb"
      />
      <button
        v-if="inputAb"
        @click="inputAb = undefined"
      >
        x
      </button>
    </div>

    <button
      v-if="inputAb"
      @click="open"
    >
      Open
    </button>
  </div>

  <div class="flex">
    <div
      class="flex flex-auto"
      style="gap: 0"
    >
      <input
        class="flex-auto"
        type="text"
        placeholder="Enter URL to copy"
        v-model="inputBa"
      />
      <button
        v-if="inputBa"
        @click="inputBa = undefined"
      >
        x
      </button>
    </div>

    <button
      v-if="inputBa"
      @click="copyUrl"
    >
      Copy
    </button>
  </div>

  <div class="flex center">
    <button @click="copyCurrentUrl">Copy Current Url</button>
  </div>
</template>
