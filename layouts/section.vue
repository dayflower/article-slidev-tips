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
  <div
    class="slidev-layout section w-full h-full grid bg-teal-500 text-white"
    :style="style"
  >
    <div class="my-auto text-center">
      <slot />
    </div>
  </div>
</template>
