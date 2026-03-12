<script setup>
import { ref } from 'vue';
import { createTicket } from '../../services/ticketService'

const scrumboardId = ref('');
const title = ref('');
const description = ref('');
const owner = ref('');
const type = ref('');

const message = ref ('');
const errors = ref(false);

async function submit() {
    try{
       const response = await createTicket({
            scrumboard_Id :scrumboardId.value,
            title: title.value,
            description: description.value,
            owner: owner.value,
            type: type.value
        });
        message.value = title.value + ' erfolgreich erstellt! ';
    } catch(error){
        //“Check if error.response.status equals 422 — but only if error and error.response exist.” safely accesses nested properties
        if(error?.response?.status === 422){
            errors.value = error.response.data.erros ?? {};
            message.value = "Bitte Eingaben prüfen!";
        }
        message.value = "Erstellung des Tickets fehlgeschlagen";
        console.error(error);
    }
    
}
</script>
<template>
    <div>
        <h1>Create Ticket</h1>
        <div v-if="message">{{ message }}</div>
        <form @submit.prevent="submit">
            <input v-model="scrumboardId" placeholder="scrumboardId"/>
            <input v-model="title" placeholder="title"/>
            <textarea v-model="description" placeholder="description"></textarea>
            <input v-model="owner" placeholder="owner"/>
            <input v-model="type" placeholder="type"/>
            <button type="submit">create</button>
        </form>

        <router-link
        :to="{ name: 'ticket.index' }" class="back-button">
        Back to Ticket-List
    </router-link>
    </div>
</template>