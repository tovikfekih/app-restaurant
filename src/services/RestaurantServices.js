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
  create(parent, restaurant = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post("/restaurants", restaurant)
        .then(r => {
          parent.$message({
            message: "Votre restaurant a bien été créé.",
            type: "success",
            showClose: true
          });
          resolve(r.data);
        })
        .catch(err => {
          parent.$message({
            message: "Votre restaurant n'a pas été créé.",
            type: "error",
            showClose: true
          });
          reject(err);
        });
    });
  },
  update(parent, id, restaurant = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put("/restaurants/" + id, restaurant)
        .then(r => {
          parent.$message({
            message: "La mise a jour du restaurant a bien été effectué.",
            type: "success",
            showClose: true
          });
          resolve(r.data);
        })
        .catch(err => {
          parent.$message({
            message: "Echec de la mise a jour du restaurant",
            type: "error",
            showClose: true
          });
          reject(err);
        });
    });
  },
  delete(parent, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/restaurants/" + id)
        .then(r => {
          parent.$message({
            message: "Votre restaurant a bien été supprimé.",
            type: "success",
            showClose: true
          });
          resolve(r.data);
        })
        .catch(err => {
          parent.$message({
            message: "Votre restaurant n'a pas été supprimé.",
            type: "error",
            showClose: true
          });
          reject(err);
        });
    });
  }
};
