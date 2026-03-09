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
const loadError = ref(false);

const errors = ref({});
const message = ref('');
const isSaving = ref(false);

async function fetchBoard() {
  try {
    const response = await getBoard(route.params.id);
    owner.value = response.data.owner ?? '';
    title.value = response.data.title ?? '';
    description.value = response.data.description ?? '';
  } catch (err) {
    loadError.value = true;
    message.value = 'Fehler beim Laden.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function submit() {
  message.value = '';
  errors.value = {};
  isSaving.value = true;

  try {
    await updateBoard(route.params.id, {
      owner: owner.value,
      title: title.value,
      description: description.value,
    });
    message.value = 'Gespeichert!';
    //router.push(`/boards/${route.params.id}`);
  } catch (err) {
    if (err?.response?.status === 422) {
      errors.value = err.response.data.errors ?? {};
      message.value = 'Bitte Eingaben prüfen!';
      return;
    }
    message.value = 'Speichern fehlgeschlagen.';
    console.error(err);
  } finally {
    isSaving.value = false;
  }
}

onMounted(fetchBoard);
</script>

<template>
  <div>
    <div v-if="loading">Lade Board...</div>

    <div v-else-if="loadError">Fehler beim Laden.</div>

    <div v-else>
      <h1>Edit Board</h1>
      <div v-if="message">{{ message }}</div>
      <form @submit.prevent="submit">
        <div>
          <input v-model="owner" placeholder="Owner" />
          <p v-if="errors.owner">{{ errors.owner[0] }}</p>
        </div>
        <div>
          <input v-model="title" placeholder="Title" />
          <p v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
        <div>
          <textarea v-model="description" placeholder="Description"></textarea>
          <p v-if="errors.description">{{ errors.description[0] }}</p>
        </div>

        <button type="submit" :disabled="isSaving">
          {{ isSaving ? 'Saving...' : 'Update' }}
        </button>
        <router-link
          :to="{ name: 'board.show', params: { id: route.params.id } }"
          class="back-button"
        >
          back to Board
        </router-link>
      </form>
    </div>
  </div>
</template>
<!--TODO: succesfull edit message handlingo-->
