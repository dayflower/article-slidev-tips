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
  <div class="slidev-layout cover text-center" :style="style">
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
