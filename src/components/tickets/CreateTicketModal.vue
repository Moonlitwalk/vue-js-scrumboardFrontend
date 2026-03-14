<script setup>
import { ref } from 'vue';

const props = defineProps({
  boardId: Number,
});

const emit = defineEmits(['close']);
const title = ref('');
const description = ref('');
const owner = ref('');
const type = ref('');

function submitTicket() {
  console.log('Createing ticket for board', props.boardId);
  //api call
  emit('close');
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
