<script setup>
import { onMounted, ref } from 'vue';
import { getTickets } from '../../services/ticketService';

const tickets = ref([]);
const loading = ref(true);

async function fetchTickets(){
    try{
        const response = await getTickets();
        tickets.value = response.data;
    } catch (error) {
        console.error('Fehler beim Laden:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchTickets();
});
</script>
<template>
    <div>
        <h1>Tickets</h1>
        <router-link to="">Create Ticket</router-link>
        <div v-if="loading">Lade Tickets...</div>
        <div v-else-if="tickets.length === 0">Keine Tickets vorhanden.</div>
        <ul v-else>
            <li v-for="ticket in tickets" :key="ticket.id">
                <router-link :to="`/tickets/${ticket.id}`">
                    {{ ticket.title }}
                </router-link>
                {{ ticket.description }}
                {{ ticket.owner }}
            </li>
        </ul>
    </div>
</template>