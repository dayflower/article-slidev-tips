<script setup lang="ts">
import { handleBackground } from "@slidev/client/layoutHelper.ts";
import { computed } from "vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background, true));
</script>

<template>
  <div class="slidev-layout statement" :style="style">
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
