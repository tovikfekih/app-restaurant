import _ from "lodash";
export default {
  get(parent, id) {},
  list(
    parent,
    filters = {},
    pagination = {
      page: 1,
      itemsPerPage: 5
    }
  ) {
    return new Promise((resolve, reject) => {
      let params = `?page=${pagination.page}&pagesize=${pagination.itemsPerPage}`;
      axios
        .get("/restaurants" + params)
        .then(r => {
          resolve(r.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  create(parent, restaurant = {}) {},
  update(parent, id, restaurant = {}) {},
  delete(parent, id) {}
};
