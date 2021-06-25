/* eslint-disable class-methods-use-this */
import http from '../axios';

class TutorialDataService {
  get(id) {
    return http.get(`/model/${id}`);
  }

  create(data) {
    return http.post('/create-model', data);
  }

  deltas(id, data) {
    return http.post(`/model/${id}/deltas`, data);
  }
}

export default new TutorialDataService();
