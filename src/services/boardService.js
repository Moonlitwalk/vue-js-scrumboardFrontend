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
