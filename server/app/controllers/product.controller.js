const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Xử lý chức năng thêm một san pham moi
exports.create = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, 'Name can not be empty'));
    // }
    req.body.img  = new Buffer(req.body.img, 'base64');
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
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
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving technologys'));
    }
    return res.send(documents);
}

// Xử lý chức năng tìm một liên hệ trong csdl liên hệ
exports.findOne = async (req, res, next) => {
    // res.send({message: "findOne handler"});
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        return document
            ? res.send(document)
            : next(new ApiError(404, 'product not found'));
    } catch (error) {
        return next(new ApiError(500, 'Error retrieving product'));
    }
}

// Cap nhat san pham
exports.update = async (req, res, next) => {
    // res.send({message: "update handler"});
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send({message: "product was updated successfully"});
    } catch (error) {
        return next(new ApiError(500, `Error updating product with id = ${req.params.id}`));
    }
}

// Xoa 1 san pham
// Chức năng xóa một liên hệ
exports.delete = async (req, res, next) => {
    // res.send({message: "delete handler"});
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send({message: "product was delete successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete product with id = ${req.params.id}`));
    }
}

// Chức năng xóa tất cả liên hệ
exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({message: `${deletedCount} products was deleted successfully`})
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
}

// Filter
exports.filter = async (req, res, next) => {
    // console.log(req.query);
    const type = req.query.type;
    const trademark = req.query.name;
    try {
        const productService = new ProductService(MongoDB.client);
        const fill = await productService.filter(type, trademark);
        return res.send(fill)
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
}