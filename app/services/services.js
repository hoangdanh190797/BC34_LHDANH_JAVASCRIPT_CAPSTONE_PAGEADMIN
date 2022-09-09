function Services() {
  this.fetchData = function () {
    return axios({
      url: "https://6255692652d8738c69217244.mockapi.io/api/productsBC34",
      method: "GET",
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      url: `https://6255692652d8738c69217244.mockapi.io/api/productsBC34/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://6255692652d8738c69217244.mockapi.io/api/productsBC34",
      method: "POST",
      data: product,
    });
  };

  this.getProductById = function (id) {
    return axios({
      url: `https://6255692652d8738c69217244.mockapi.io/api/productsBC34/${id}`,
      method: "GET",
    });
  };

  this.updateProduct = function (product) {
    return axios({
      url: `https://6255692652d8738c69217244.mockapi.io/api/productsBC34/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
