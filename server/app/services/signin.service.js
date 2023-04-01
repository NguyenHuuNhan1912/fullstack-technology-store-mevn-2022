// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class SigninService {
    constructor(client) {
        // Colection contacs in mongodb
        this.signin = client.db().collection('signin');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection introduces
        const signin = {
            username: payload.username,
            password: payload.password,
            numberphone: payload.numberphone,
            role: payload.role,
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(signin).forEach((key) => {
                signin[key] === undefined && delete signin[key];
            } 
        );

        return signin;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const signin = this.extractConactData(payload);
        
        const result = await this.signin.findOneAndUpdate(
            signin,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.signin.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
}
module.exports = SigninService;
