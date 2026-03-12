<script setup>
import { onMounted, ref } from 'vue';
import { getTicket, deleteTicket } from '../../services/ticketService';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const ticket = ref(null);
const loading = ref(true);
const error = ref(false);
const message = ref('');

async function fetchTicket(){
    try{
        const response = await getTicket(route.params.id);
        ticket.value = response.data;
    } catch(error){
       console.error(err);
       error.value = true; 
    } finally {
        loading.value = false;
    }
}

async function handleDelete(){
    const confirmed = confirm('Ticket wirklich löschen?');

    if(!confirmed) return;

    try{
        await deleteTicket(ticket.value.id);
        router.push('/tickets');
    } catch(error){
        console.error(error)
    }
}

onMounted(() => {
    if (route.query.updated){
        message.value = 'Ticket erfolgreich gespeichert';
    }
    fetchTicket();
})
</script>
<template>
    <div>
        <div v-if="loading">Lade Tickets...</div>
        <div v-else-if="error">Fehler beim Laden!</div>
    
        <div v-else-if="ticket">
        <div v-if="message">{{ message }}</div>
            <h1> {{ ticket.title }}</h1>

            <router-link
            :to="{ name: 'ticket.edit', params: { id: ticket.id } }"
            class="edit-button"> Edit Ticket
            </router-link>

            <button type ="button" @click="handleDelete" class="delete-button">
            Delete Ticket
            </button>

            <router-link 
            :to="{ name: 'ticket.index' }" class=" back-button">
            back to Ticketlist
            </router-link>

            <p><strong>Title: </strong>{{ ticket.title }}</p>
            <p><strong>Description: </strong>{{ ticket.description }}</p>
            <p><strong>Owner: </strong>{{ ticket.owner }}</p>
        </div>
        <div v-else> Ticket nicht gefunden</div>
    </div>
</template>