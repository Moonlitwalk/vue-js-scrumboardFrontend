<script setup>
import { ref, onMounted } from 'vue';
import { getBoards } from '../../services/boardService';

const boards = ref([]);
const loading = ref(true);

async function fetchBoards() {
  try {
    const response = await getBoards();
    boards.value = response.data;
  } catch (error) {
    console.error('Fehler beim Laden:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchBoards();
});
</script>
<template>
  <div>
    <h1>Boards</h1>
    <router-link :to="{ name: 'board.create' }" class="edit-button">Create Board</router-link>
    <router-link :to="{ name: 'home.view' }" class="edit-button">back to Home</router-link>
    <div v-if="loading">Lade Boards...</div>


    <div v-else-if="boards.length === 0">Keine Boards vorhanden.</div>

    <ul v-else>
      <li v-for="board in boards" :key="board.id">
        <router-link :to="`/boards/${board.id}`">
          {{ board.title }}
        </router-link>
        {{ board.owner }}
      </li>
    </ul>
  </div>
</template>
