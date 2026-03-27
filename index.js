let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

function submitForm() {
    let status = false;

    const inputName = document.getElementById("iName");
    const inputPrice = document.getElementById("iPrice");
    const inputStock = document.getElementById("iStock");

    const name = inputName.value.trim();
    const price = inputPrice.value.trim();
    const stock = inputStock.value.trim();

    if (name === "") {
        alert(`Vui lòng nhập tên sản phẩm.`);
        return;
    }
    if (price < 0) {
        alert(`Giá phải là số dương lớn hơn 0`);
        return;
    }
    if (stock <= 0) {
        status = "hết hàng";
        alert(`Tồn kho phải là số nguyên lớn hơn 0.`);
        return;
    } else if (stock > 0) {
        status = "còn hàng";
    }

    if (editId === null) {
        const newProducts = {
            id: Math.floor(Math.random() * 100),
            name: name,
            price: price,
            stock: stock,
            status: status,
        }
        products.push(newProducts);
        alert(`Thêm sản phẩm thành công.`); 


        editId = null;
        document.getElementById("formTitle").innerText = " Thêm sản phẩm mới";
        document.getElementById("btnSubmit").innerText = "Thêm sản phẩm";


        render();
        saveData();
        resetForm();
    }
}



function render(data = products) {
    const list = document.getElementById("tbody");

    list.innerHTML = data.map((product) => `
                        <tr id="row-SPJ806NEC">
                            <td>${product.id}</td>
                            <td class="td-id">${product.name}</td>
                            <td class="td-name">${product.price}</td>
                            <td class="td-price">${product.stock}</td>    
                            <td class="td-statust">${product.status}</td>
                            <td>
                                <div class="td-actions">
                                    <button onclick="editProducts(${product.id})" class="btn btn-sm btn-edit">✏ Sửa</button>
                                    <button onclick="deleteProducts(${product.id})"class="btn btn-sm btn-del">✕ Xóa</button>
                                </div>
                            </td>
                        </tr>
    `).join("");
}

function btnConfirm() {
    let isConfirm = false;
    const deleteId = document.getElementById("")

    alert(`Bạn có chắc muốn xóa sản phẩm không`);
    if (isConfirm = true) {
        products = products.id((p) => p.id !== id)
        alert(`Xóa sản phẩm thành công!`);
    }

    render();
    saveData();
}

function deleteProducts(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm không?`)) {
        prouduct = product.id((p) => p.id !== id)
        alert(`Đã xóa sản phẩm thành công`)
        saveData();
        render();
    }
}

function editProducts(id) {
    const product = products.find(s => s.id === id);

    const editName = document.getElementById("iName");
    const editPrice = document.getElementById("iPrice");
    const editStock = document.getElementById("iStock");

    const name = editName.value.trim();
    const price = editPrice.value.trim();
    const stock = editStock.value.trim();

    document.getElementById("formTitle").innerText = "Chỉnh sửa sản phẩm";
    document.getElementById("btnSubmit").innerText = "Lưu thay đổi";

    render();
    saveData();
    focus();
}

function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

function resetForm() {
    const inputName = document.getElementById("iName").value = "";
    const inputPrice = document.getElementById("iPrice").value = "";
    const inputStock = document.getElementById("iStock").value = "";
}

function searchProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const result = products.filter((p) =>
        products.name.toLowerCase().includes(keyword)
    );
    render(result);
}

render();
