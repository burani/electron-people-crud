import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const peopleAPI = {
  getPeople(page = 0, pageSize = 25) {
    return instance.get(`/people?_page=${page}&_limit=${pageSize}`);
  },
  getPerson(id: number) {
    return instance.get(`/people?id=${id}`);
  },
  addPerson(personData: {}) {
    return instance.post('/people', personData);
  },
  updatePerson(id: number, personData: {}) {
    return instance.put(`/people/${id}`, personData);
  },
  deletePerson(id: number) {
    return instance.delete(`/people/${id}`);
  },
};

// totalPeople: await instance.get('/people').length
