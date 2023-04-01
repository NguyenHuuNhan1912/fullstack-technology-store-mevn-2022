// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class OrderService {
    constructor(client) {
        // Colection contacs in mongodb
        this.order = client.db().collection('order');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection introduces
        const order = {
            userName: payload.userName,
            address: payload.address,
            totalProduct: payload.totalProduct,
            product: payload.product,
            phone: payload.phone,
            time: payload.time
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(order).forEach((key) => {
                order[key] === undefined && delete order[key];
            } 
        );

        return order;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const order = this.extractConactData(payload);
        
        const result = await this.order.findOneAndUpdate(
            order,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.order.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
}
module.exports = OrderService;
