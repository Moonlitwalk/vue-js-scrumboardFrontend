<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getBoard, deleteBoard } from '../../services/boardService';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const board = ref(null);
const loading = ref(true);
const error = ref(false);

async function fetchBoard() {
  try {
    const response = await getBoard(route.params.id);
    board.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

async function handleDelete() {
  const confirmed = confirm('Board wirklich löschen?');

  if (!confirmed) return;

  try {
    await deleteBoard(board.value.id);
    router.push('/boards');
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  fetchBoard();
});
</script>
<template>
  <div>
    <div v-if="loading">Lade Board...</div>

    <div v-else-if="error">Fehler beim Laden.</div>

    <div v-else-if="board">
      <h1>{{ board.title }}</h1>
      <router-link
        :to="{ name: 'boards.edit', params: { id: board.id } }"
        class="edit-button"
      >
        Edit
      </router-link>
      <button type="button" @click="handleDelete" class="delete-button">
        Delete
      </button>
      <p><strong>Owner:</strong> {{ board.owner }}</p>
      <p>{{ board.description }}</p>
    </div>

    <div v-else>Board nicht gefunden.</div>
  </div>
</template>
