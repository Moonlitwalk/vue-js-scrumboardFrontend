<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getBoard } from '../../services/boardService';

const route = useRoute();

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
      <p><strong>Owner:</strong> {{ board.owner }}</p>
      <p>{{ board.description }}</p>
    </div>

    <div v-else>Board nicht gefunden.</div>
  </div>
</template>
