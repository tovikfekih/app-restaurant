export default {
  get(parent, id) {},
  list(parent, filters = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get("/restaurants")
        .then(r => {
          console.log(r);
        })
        .catch(err);
    });
  },
  create(parent, restaurant = {}) {},
  update(parent, id, restaurant = {}) {},
  delete(parent, id) {}
};
