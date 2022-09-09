var servies = new Services();

function getListProduct() {
  servies
    .fetchData()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="${product.img}" width="50px" />
            </td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${
                  product.id
                })">Sửa</button>
                <button class="btn btn-danger" onclick="xoa(${
                  product.id
                })">Xoá</button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

/**
 * Sua
 */
function sua(id) {
  //Sửa lại tiêu đề modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sua san pham";

  //add vô button CapNhat dưới footer của modal
  var footer = `<button class="btn btn-warning" onclick="capNhat(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  //goi toi phuong thuc services de lay product tu server
  servies
    .getProductById(id)
    .then(function (result) {
      var product = result.data;
      //dom tới các thẻ input show value ra
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("HinhSP").value = product.img;
      getEle("MoTa").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Cap nhat
 */
function capNhat(id) {
  //Dom toi cac the input lay value
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var hinhAnh = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;

  //tao doi tuong product tu lop doi tuong Product
  var product = new Product(id, tenSP, giaSP, hinhAnh, moTa);

  //goi toi phuong thuc services de gui product len server
  servies
    .updateProduct(product)
    .then(function () {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * xoa
 */
function xoa(id) {
  servies
    .deleteProduct(id)
    .then(function () {
      //xoá thành công => fetch lại data mới
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").addEventListener("click", function () {
  //Sửa lại tiêu đề modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";

  //add vô button Them dưới footer của modal
  var footer = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Add
 */
function addProduct() {
  //Dom toi cac the input lay value
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var hinhAnh = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;

  //tao doi tuong product tu lop doi tuong Product
  var product = new Product("", tenSP, giaSP, hinhAnh, moTa);

  //goi toi phuong thuc services de gui product len server
  servies
    .addProductApi(product)
    .then(function () {
      //them thành công => fetch lại data mới
      getListProduct();

      //Tat modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getEle(id) {
  return document.getElementById(id);
}
