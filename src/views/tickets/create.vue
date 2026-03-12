<script setup>
import { ref } from 'vue';
import { createTicket } from '../../services/ticketService'

const scrumboardId = ref('');
const title = ref('');
const description = ref('');
const owner = ref('');
const type = ref('');

const message = ref ('');
const error = ref(false);
</script>
<template></template>