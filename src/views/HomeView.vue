<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref('');
const error = ref(false);
const message = ref('');
</script>
<template>
  <div>
    <h1><strong>I am the one that is on it</strong></h1>

    <div>
      <router-link :to="{ name: 'ticket.index' }" class="edit-button">
        <h2>Browse Tickets</h2>
      </router-link>
      <router-link :to="{ name: 'board.index' }" class="edit-button">
        <h2>Browse Boards</h2>
      </router-link>
    </div>
  </div>
</template>
