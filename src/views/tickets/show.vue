<script setup>
import { onMounted, ref } from 'vue';
import {
  getTicket,
  deleteTicket,
  updateTicket,
} from '../../services/ticketService';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const ticket = ref(null);
const loading = ref(true);
const error = ref(false);
const message = ref('');

const isStatusMenuOpen = ref(false);
const statusOptions = [
  { label: 'To Do', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

async function fetchTicket() {
  try {
    const response = await getTicket(route.params.id);
    ticket.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

async function handleDelete() {
  const confirmed = confirm('Ticket wirklich löschen?');

  if (!confirmed) return;

  try {
    await deleteTicket(ticket.value.id);
    router.push('/tickets');
  } catch (error) {
    console.error(error);
  }
}

function toggleStatusMenu() {
  isStatusMenuOpen.value = !isStatusMenuOpen.value;
}

function getStatusLabel(status) {
  const found = statusOptions.find((option) => option.value === status);
  return found ? found.label : status;
}
async function selectStatus(newStatus) {
  if (!ticket.value || ticket.value.status === newStatus) {
    isStatusMenuOpen.value = false;
    return;
  }
  try {
    const payload = {
      title: ticket.value.title,
      description: ticket.value.description,
      owner: ticket.value.owner,
      status: newStatus,
    };
    const response = await updateTicket(route.params.id, payload);
    ticket.value = response.data.data;
    isStatusMenuOpen.value = false;
    message.value = 'Status erfolgreich gespeichert';
  } catch (err) {
    console.error(err);
    error.value = true;
  }
}

onMounted(() => {
  if (route.query.updated) {
    message.value = 'Ticket erfolgreich gespeichert';
  }
  fetchTicket();
});
</script>
<template>
  <div>
    <div v-if="loading">Lade Tickets...</div>
    <div v-else-if="error">Fehler beim Laden!</div>

    <div v-else-if="ticket">
      <div v-if="message">{{ message }}</div>
      <h1>{{ ticket.title }}</h1>

      <router-link
        :to="{ name: 'ticket.edit', params: { id: ticket.id } }"
        class="edit-button"
      >
        Edit Ticket
      </router-link>

      <button type="button" @click="handleDelete" class="delete-button">
        Delete Ticket
      </button>

      <router-link :to="{ name: 'ticket.index' }" class="back-button">
        back to Ticketlist
      </router-link>

      <div class="ticket-meta">
        <div class="status-dropdown">
          <button
            type="button"
            class="status-trigger"
            :class="`status-trigger--${ticket.status}`"
            @click="toggleStatusMenu"
          >
            {{ getStatusLabel(ticket.status) }}
            <span class="status-trigger__arrow">▾</span>
          </button>

          <div v-if="isStatusMenuOpen" class="status-menu">
            <button
              v-for="option in statusOptions"
              :key="option.value"
              type="button"
              class="status-menu__item"
              @click="selectStatus(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="ticket-details">
        <p><strong>Title:</strong> {{ ticket.title }}</p>
        <p><strong>Description:</strong> {{ ticket.description }}</p>
        <p><strong>Owner:</strong> {{ ticket.owner }}</p>
      </div>
    </div>
    <div v-else>Ticket nicht gefunden</div>
  </div>
</template>
