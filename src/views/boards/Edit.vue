<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getBoard, updateBoard } from '../../services/boardService';

const route = useRoute();
const router = useRouter();

const owner = ref('');
const title = ref('');
const description = ref('');
const loading = ref(true);
const error = ref(false);

async function fetchBoard() {
  try {
    const response = await getBoard(route.params.id);
    owner.value = response.data.owner;
    title.value = response.data.title;
    description.value = response.data.description;
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

async function submit() {
  try {
    await updateBoard(route.params.id, {
      owner: owner.value,
      title: title.value,
      description: description.value,
    });

    router.push(`/boards/${route.params.id}`);
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchBoard);
</script>

<template>
  <div>
    <div v-if="loading">Lade Board...</div>

    <div v-else-if="error">Fehler beim Laden.</div>

    <div v-else>
      <h1>Edit Board</h1>

      <form @submit.prevent="submit">
        <input v-model="owner" placeholder="Owner" />
        <input v-model="title" placeholder="Title" />
        <textarea v-model="description" placeholder="Description"></textarea>

        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>
