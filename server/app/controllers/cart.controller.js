const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Xử lý chức năng thêm một san pham moi
exports.create = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, 'Name can not be empty'));
    // }
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the technology'));
        // An error occurred while creating the technology
        // Đã xảy ra lỗi khi tạo liên hệ
    }
}
// Khi người dùng tạo liên hệ mới thì hàm productService.create() sẽ 
// được gọi để lưu thông tin liên hệ vào cơ sở dữ liệu MongoDB
// Phương thức create() được định nghĩa trong lớp productService
// Nếu có lỗi xảy ra sẽ chuyển cho middleware xử lý lỗi đã định nghĩa trong app.js (thông qua lời gọi
// next(error)).


// Xử lý chức năng tìm tất cả liên hệ 
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const cartService = new CartService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await cartService.findByName(name);
        } else {
            documents = await cartService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving technologys'));
    }
    return res.send(documents);
}

// Cap nhat san pham
exports.update = async (req, res, next) => {
    // res.send({message: "update handler"});
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "cart not found"));
        }
        return res.send({message: "cart was updated successfully"});
    } catch (error) {
        return next(new ApiError(500, `Error updating cart with id = ${req.params.id}`));
    }
}