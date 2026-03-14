<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getBoard, deleteBoard } from '../../services/boardService';
import { useRouter } from 'vue-router';
import TicketList from '../../components/tickets/TicketList.vue';

const route = useRoute();
const router = useRouter();
const board = ref(null);
const loading = ref(true);
const error = ref(false);
const message = ref('');

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
  if (route.query.updated) {
    message.value = 'Board erfolgreich gespeichert';
  }
  fetchBoard();
});
</script>
<template>
  <div>
    <div v-if="loading">Lade Board...</div>

    <div v-else-if="error">Fehler beim Laden.</div>

    <div v-else-if="board">
      <div v-if="message">{{ message }}</div>
      <h1>{{ board.title }}</h1>

      <router-link
        :to="{ name: 'board.edit', params: { id: board.id } }"
        class="edit-button"
      >
        Edit Board
      </router-link>
      <button type="button" @click="handleDelete" class="delete-button">
        Delete
      </button>
      <router-link :to="{ name: 'board.index' }" class="back-button">
        back to Boardlist
      </router-link>
      <p><strong>Owner:</strong> {{ board.owner }}</p>
      <p>{{ board.description }}</p>
      <ticket-list :tickets="board.tickets" />
    </div>

    <div v-else>Board nicht gefunden.</div>
  </div>
</template>
