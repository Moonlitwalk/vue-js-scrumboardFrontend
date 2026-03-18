<script setup>
import { ref } from 'vue';
import { storeTicket } from '../../services/ticketService';
const props = defineProps({
  boardId: Number,
});

const emit = defineEmits(['close']);
const title = ref('');
const description = ref('');
const owner = ref('');
const type = ref('');
const message = ref('');
const error = ref(false);

async function submitTicket() {
  try {
    const response = await storeTicket(props.boardId,{
      title: title.value,
      description: description.value,
      owner: owner.value,
      type: type.value,
    });
    message.value = title.value + ' erfolgreich erstellt! ';
  } catch (error) {
    //“Check if error.response.status equals 422 — but only if error and error.response exist.” safely accesses nested properties
    if (error?.response?.status === 422) {
      error.value = error.response.data.erros ?? {};
      message.value = 'Bitte Eingaben prüfen!';
      return;
    }
    message.value = 'Erstellung des Tickets fehlgeschlagen';
    console.error(error);
    emit('close');
  }
}
</script>
<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>Create Ticket</h2>
      <form @submit.prevent="submitTicket">
        <input v-model="title" placeholder="Title" />
        <input v-model="owner" placeholder="Owner" />
        <input v-model="description" placeholder="Description" />
        <input v-model="type" placeholder="Issue Type" />

        <div class="modal-actions">
          <button type="submit">Create</button>
          <button type="button" @click="$emit('close')">Cancle</button>
        </div>
      </form>
    </div>
  </div>
</template>
