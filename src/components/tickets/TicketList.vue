<script setup>
defineProps({
  tickets: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div>
    <h2>Tickets</h2>

    <div v-if="tickets.length === 0">Keine Tickets vorhanden!</div>

    <ul v-else>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.title }}
      </li>
    </ul>
  </div>
</template>
