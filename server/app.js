const express = require('express');

const cors = require('cors');

const ApiError = require("./app/api-error");

const app = express();

const technologyIntroduce = require("./app/routes/introduce.route");

const technologyRecruit = require("./app/routes/recruit.route");

const technologyProduct = require("./app/routes/product.route");

const technologyFeedback = require("./app/routes/feedback.route");

const technologyRecruitment = require("./app/routes/recruitment.route");

const technologySignin = require("./app/routes/signin.route");

const technologyCart = require("./app/routes/cart.route");

const technologyOrder = require("./app/routes/order.route");

// const technologyQuiz = require("./app/routes/quiz.route");


app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to technology store" });
});

app.use("/api/introduce", technologyIntroduce);
app.use("/api/recruit", technologyRecruit);
app.use("/api/product", technologyProduct);
app.use("/api/feedback", technologyFeedback);
app.use("/api/recruitment", technologyRecruitment);
app.use("/api/signin", technologySignin);
app.use("/api/cart", technologyCart);
app.use("/api/order", technologyOrder);
// app.use("/api/quiz", technologyQuiz);
// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;