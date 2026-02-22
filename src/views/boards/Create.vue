<script setup>
import { ref } from 'vue';
import { createBoard } from '../../services/boardService';
const owner = ref('');
const title = ref('');
const description = ref('');

async function submit() {
  try {
    const response = await createBoard({
      owner: owner.value,
      title: title.value,
      description: description.value,
    });
    console.log('Erfolg:', response.data);
  } catch (error) {
    console.error('Fehler:', error);
  }
}
</script>

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
