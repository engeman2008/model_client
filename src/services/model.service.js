/* eslint-disable class-methods-use-this */
import http from '../axios';

class TutorialDataService {
  get(id) {
    return http.get(`/model/${id}`);
  }

  create(data) {
    return http.post('/create-model', data);
  }

  update(id, data) {
    return http.put(`/model/${id}/deltas`, data);
  }
}

export default new TutorialDataService();
