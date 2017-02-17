let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/ng-book');
//定义模型骨架
let BookSchema = new mongoose.Schema({
    name:String,
    price:Number,
    src:String
});
//定义并导出模型
exports.Book = mongoose.model('Book',BookSchema);
