// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class FeedbackService {
    constructor(client) {
        // Colection contacs in mongodb
        this.feedback = client.db().collection('feedback');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection feedbacks
        const feedback = {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            content: payload.content,
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(feedback).forEach((key) => {
                feedback[key] === undefined && delete feedback[key];
            } 
        );

        return feedback;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const feedback = this.extractConactData(payload);
        
        const result = await this.feedback.findOneAndUpdate(
            feedback,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.feedback.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
}
module.exports = FeedbackService;

// * Lời gọi feedbackService.create() lưu thông tin đối tượng feedback xuống CSDL. Phương thức create()
// * được định nghĩa trong lớp introduceService (app/services/introduce.service.js) như sau:
