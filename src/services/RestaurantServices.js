import _ from "lodash";
export default {
  get(parent, id = null) {
    return new Promise((resolve, reject) => {
      if (id == null) reject(new Error("Id not provided"));
      axios
        .get("/restaurants/" + id)
        .then(r => {
          resolve(r.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  list(
    parent,
    filters = {
      nom: ""
    },
    pagination = {
      page: 1,
      itemsPerPage: 5
    }
  ) {
    return new Promise((resolve, reject) => {
      let params = `?name=${filters.nom}&page=${pagination.page - 1}&pagesize=${
        pagination.itemsPerPage
      }`;
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
