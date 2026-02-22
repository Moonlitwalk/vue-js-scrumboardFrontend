import api from './axios';

export function createBoard(data) {
  return api.post('/create', data);
}

export function getBoards() {
  return api.get('/boards');
}

export function getBoard(id) {
  return api.get(`/boards/${id}`);
}

export function updateBoard(id, data) {
  return api.put(`/boards/${id}`, data);
}

export function deleteBoard(id) {
  return api.delete(`/boards/${id}`);
}
