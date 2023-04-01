const RecruitmentService = require("../services/recruitment.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Xử lý chức năng thêm một liên hệ mới
exports.create = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, 'Name can not be empty'));
    // }
    try {
        const recruitmentService = new RecruitmentService(MongoDB.client);
        const document = await recruitmentService.create(req.body);

        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the technology'));
        // An error occurred while creating the technology
        // Đã xảy ra lỗi khi tạo liên hệ
    }
}
// Khi người dùng tạo liên hệ mới thì hàm recruitService.create() sẽ 
// được gọi để lưu thông tin liên hệ vào cơ sở dữ liệu MongoDB
// Phương thức create() được định nghĩa trong lớp recruitService
// Nếu có lỗi xảy ra sẽ chuyển cho middleware xử lý lỗi đã định nghĩa trong app.js (thông qua lời gọi
// next(error)).


// Xử lý chức năng tìm tất cả liên hệ 
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const recruitmentService = new RecruitmentService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await recruitmentService.findByName(name);
        } else {
            documents = await recruitmentService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving technologys'));
    }
    return res.send(documents);
}
