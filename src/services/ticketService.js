import api from './axios';

export function storeTicket(boardId, data){
    return api.post(`/boards/${boardId}/tickets/new`, data);
}

export function getTickets(){
    return api.get('/tickets');
}

export function getTicket(id){
    return api.get(`/tickets/${id}`);
}

export function updateTicket(id, data){
    return api.put(`/tickets/${id}`,data);
}

export function deleteTicket(id){
    return api.delete(`/ticekts/${id}`);
}