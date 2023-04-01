// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class CartService {
    constructor(client) {
        // Colection contacs in mongodb
        this.cart = client.db().collection('cart');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection carts
        const cart = {
            userName: payload.userName,
            product: payload.product,
            totalProduct: payload.totalProduct,
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(cart).forEach((key) => {
                cart[key] === undefined && delete cart[key];
            } 
        );

        return cart;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const cart = this.extractConactData(payload);
        
        const result = await this.cart.findOneAndUpdate(
            cart,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.cart.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
     // Tìm kiếm theo id và tiến hành cập nhật liên hệ 
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }
}
module.exports = CartService;

// * Lời gọi cartService.create() lưu thông tin đối tượng cart xuống CSDL. Phương thức create()
// * được định nghĩa trong lớp introduceService (app/services/introduce.service.js) như sau:
