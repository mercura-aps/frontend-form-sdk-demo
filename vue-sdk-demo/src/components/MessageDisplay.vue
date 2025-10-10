<script setup lang="ts">
import type { Message } from '@mercura-aps/frontend-form-sdk';

defineProps<{ message: Message }>();

</script>
<template>
  <div class="bg-white text-black p-2 rounded-md">
    {{ message.message }}
  </div>
</template>