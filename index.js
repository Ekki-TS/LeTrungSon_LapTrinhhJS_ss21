let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

function submitForm() {
    const name = document.getElementById("iName").value.trim();
    const price = Number(document.getElementById("iPrice").value);
    const stock = Number(document.getElementById("iStock").value);

    if (name === "") {
        alert("Tên sản phẩm không được để trống");
        return;
    }
    if (price <= 0 || isNaN(price)) {
        alert("Giá phải > 0");
        return;
    }
    if (stock < 0 || isNaN(stock)) {
        alert("Tồn kho phải >= 0");
        return;
    }

    const status = stock > 0 ? "Còn hàng" : "Hết hàng";

    if (editId === null) {
        const newProduct = {
            id: Date.now(),
            name,
            price,
            stock,
            status
        };

        products.push(newProduct);
        alert("Thêm thành công!");
    }
    else {
        products = products.map(p => {
            if (p.id === editId) {
                return { ...p, name, price, stock, status };
            }
            return p;
        });

        alert("Cập nhật thành công!");
        editId = null;
    }

    saveData();
    render();
    resetForm();

    document.getElementById("formTitle").innerText = "Thêm sản phẩm";
    document.getElementById("btnSubmit").innerText = "Thêm";
}

function render(data = products) {
    const tbody = document.getElementById("tbody");

    tbody.innerHTML = data.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.status}</td>
            <td>
            <div class="td-actions">
                <button onclick="editProduct(${p.id})" class="btn btn-sm btn-edit">Sửa</button>
                <button onclick="deleteProduct(${p.id})" class="btn btn-sm btn-del">Xóa</button>
        </div>
</td>
        </tr>
    `).join("");
}

function deleteProduct(id) {
    if (confirm("Bạn có chắc muốn xóa không?")) {
        products = products.filter(p => p.id !== id);
        saveData();
        render();
        alert("Đã xóa!");
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);

    document.getElementById("iName").value = product.name;
    document.getElementById("iPrice").value = product.price;
    document.getElementById("iStock").value = product.stock;

    editId = id;

    document.getElementById("formTitle").innerText = "Chỉnh sửa sản phẩm";
    document.getElementById("btnSubmit").innerText = "Lưu";
}

function searchProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const result = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    render(result);
}

function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

function resetForm() {
    document.getElementById("iName").value = "";
    document.getElementById("iPrice").value = "";
    document.getElementById("iStock").value = "";
}

render();

