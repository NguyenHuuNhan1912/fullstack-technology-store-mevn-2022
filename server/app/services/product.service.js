// * Định nghĩa lớp dịch vụ technologyService 
// *(trong tập tin app/services/technology.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class ProductService {
    constructor(client) {
        // Colection contacs in mongodb
        this.product = client.db().collection('product');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection introduces
        const product = {
            type: payload.type,
            trademark: payload.trademark,
            name: payload.name,
            price: payload.price,
            img: payload.img,
            cpu: payload.cpu,
            screen: payload.screen,
            ram: payload.ram,
            graphics: payload.graphics,
            storage: payload.storage,
            os: payload.os,
            pin: payload.pin,
            mass: payload.mass,
            chip: payload.chip,
            cameraAfter: payload.cameraAfter,
            cameraBefore: payload.cameraBefore,
            connect: payload.connect,
            led: payload.led,
            keyboardType: payload.keyboardType,
            keyboardSwitch: payload.keyboardSwitch,
            face: payload.face,
            feature: payload.feature
        };
        // Xóa các trường có giá trị là undefined
        Object.keys(product).forEach((key) => {
                product[key] === undefined && delete product[key];
            } 
        );
        return product;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const product = this.extractConactData(payload);
        
        const result = await this.product.findOneAndUpdate(
            product,
            { $set: {  } },
            // Tra ve document sau khi cap nhat
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.product.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // Tim mot san pham
    async findById(id) {
        // console.log(ObjectId.isValid(id));
        return await this.product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    // Tìm kiếm theo id và tiến hành cập nhật liên hệ 
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }
    // Xoa 1 san pham
    async delete(id) {
        const result = await this.product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.product.deleteMany({});
        return result.deletedCount;
    }
    async filter(type, trademark) {
        const result = await this.product.find({type, trademark})
        return await result.toArray();
    }
}
module.exports = ProductService;

// * Lời gọi introduceService.create() lưu thông tin đối tượng introduce xuống CSDL. Phương thức create()
// * được định nghĩa trong lớp introduceService (app/services/introduce.service.js) như sau:
