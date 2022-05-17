class ProductModel {
    id: number;
    name: string;
    price: number
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

interface CRUD {
    create(pro: ProductModel): boolean;
    read(): void;
    update(id: number, pro: ProductModel): boolean;
    delete(id: number);
}

class ProductService implements CRUD {

    products: any;

    constructor() {
        // kiểm tra xem localst có hay ko thì lấy ra 

        let data: any = JSON.parse(localStorage.getItem('listProduct')) ? JSON.parse(localStorage.getItem('listProduct')) : [];
        this.products = data;
    }
    create(pro: ProductModel): boolean {
        // thêm mới 
        this.products.push(pro);
        localStorage.setItem('listProduct', JSON.stringify(this.products));
        return true;
    }

    read(): void {
        let _html = '';
        this.products.map((item, key) => {
            _html += `  <tr>
            <td class="tienIch">                
                <div class="row">
                <div class="xoa"  onclick="XoaProduct(${item.id})"><p>Delete</p></div>
                <div class="capNhat" data-toggle="modal" onclick="capNhatProduct(${item.id})" data-target="#modelId"><p>Update</p></div>
                </div>
            </td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        </tr>
        `
        });
        document.getElementById('hung').innerHTML = _html;
    }

    update(id: number, pro: ProductModel): boolean {
        this.products.map(item => {
            if(id == item.id){          
                item.id = pro.id;
                item.name = pro.name;
                item.price = pro.price;
                localStorage.setItem('listProduct', JSON.stringify(this.products));
            }else{};
        })
        return true;
    }
    delete(id: number): boolean {
        this.products.map((item, key) => {
            if (id == item.id) {
                this.products.splice(key, 1);
                localStorage.setItem('listProduct', JSON.stringify(this.products));
            } else { };
        })
        return true;
    }
}
var pro = new ProductService();
pro.read();
function themMoi() {
    // lấy dữ liệu từ input trong form 
    let id = document.getElementById('id') as HTMLInputElement;
    let name = document.getElementById('name') as HTMLInputElement;
    let price = document.getElementById('price') as HTMLInputElement;
    let itemNew = { id:  parseInt(id.value), name: name.value, price: parseInt(price.value) };
    pro.create(itemNew);
}
var XoaProduct = (idDelete) => {
    pro.delete(idDelete);
    pro.read();
}
var modalSaveUpd:any = document.getElementById("modal-footer") as HTMLElement;
var capNhatProduct = (idUpdate) =>{
    modalSaveUpd.innerHTML = `
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary" onclick="AcceptUpdate(${idUpdate})" data-dismiss="modal">Save</button>
    `;
};
var AcceptUpdate = (idUpdate) =>{
    let id = document.getElementById('idUpdate') as HTMLInputElement;
    let name = document.getElementById('nameUpdate') as HTMLInputElement;
    let price = document.getElementById('priceUpdate') as HTMLInputElement;
    let itemUpdate = { id: parseInt(id.value), name: name.value, price: parseInt(price.value) };
    pro.update(idUpdate, itemUpdate);
    pro.read();
}