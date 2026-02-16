<template>
  <div>
    <h1>Create Board</h1>

    <form @submit.prevent="submit">
      <input v-model="owner" placeholder="Owner" />
      <input v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const owner = ref('');
const title = ref('');
const description = ref('');

function submit() {
  console.log({
    owner: owner.value,
    title: title.value,
    description: description.value,
  });
}
</script>
