// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class RecruitmentService {
    constructor(client) {
        // Colection contacs in mongodb
        this.recruitment = client.db().collection('recruitment');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection introduces
        const recruitment = {
            name: payload.name,
            sex: payload.sex,
            birthDate: payload.birthDate,
            phone: payload.phone,
            address: payload.address,
            academicLevel: payload.academicLevel,
            facebookLink: payload.facebookLink,
            exper: payload.exper,
            position: payload.position,
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(recruitment).forEach((key) => {
                recruitment[key] === undefined && delete recruitment[key];
            } 
        );
        return recruitment;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const recruitment = this.extractConactData(payload);
        
        const result = await this.recruitment.findOneAndUpdate(
            recruitment,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.recruitment.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
}
module.exports = RecruitmentService;

// * Lời gọi introduceService.create() lưu thông tin đối tượng introduce xuống CSDL. Phương thức create()
// * được định nghĩa trong lớp introduceService (app/services/introduce.service.js) như sau:
