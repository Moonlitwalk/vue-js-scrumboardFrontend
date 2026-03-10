<script setup>
import { ref } from 'vue';
import { createBoard } from '../../services/boardService';
const owner = ref('');
const title = ref('');
const description = ref('');

const errors = ref(false);
const message = ref('');

async function submit() {
  try {
    const response = await createBoard({
      owner: owner.value,
      title: title.value,
      description: description.value,
    });
    message.value = 'Board ' + title.value + ' erfolgreich erstellt';
  } catch (error) {
    if (error?.response?.status === 422) {
      errors.value = error.response.data.errors ?? {};
      message.value = 'Bitte Eingaben prüfen!';
      return;
    }
    message.value = 'Erstellung fehlgeschlagen.';
    console.error(error);
  }
}
</script>

<template>
  <div>
    <h1>Create Board</h1>
    <div v-if="message">{{ message }}</div>
    <form @submit.prevent="submit">
      <input v-model="owner" placeholder="Owner" />
      <input v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>

      <button type="submit">Create</button>
    </form>

    <router-link :to="{ name: 'board.index' }" class="back-button">
      Back to Board-List
    </router-link>
  </div>
</template>
