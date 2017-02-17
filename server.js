let express = require('express');
let path = require('path');
let Book = require('./model').Book;
let bodyParser = require('body-parser');
let app = express();
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
app.use(bodyParser.json());
app.get('/',function (req,res) {
    res.sendFile('./app/index.html',{root:__dirname})
});
//当客户端以get方法访问/books路径的时候
app.route('/books').get(function (req,res) {
    Book.find({},function (err,books) {
        res.send(books);
    })
}).post(function (req,res) {
    let book = req.body;
    Book.create(book,function (err,doc) {
        res.send(doc);
    })
});
app.route('/books/:_id').get(function (req,res) {
    let _id = req.params._id;
    Book.findById(_id,function (err,book) {
        res.send(book);
    })
}).delete(function (req,res){
    Book.remove({_id:req.params._id},function (err,result) {
        if(err){
            res.send({code:1,data:err});
        }else{
            res.send({code:0,data:result});
        }
    })
}).put(function (req,res) {
    Book.update({_id:req.params._id},req.body,function(err,result){
        Book.findById(req.params._id,function (err,book){
            res.send(book);
        })
    })
});
app.listen(8080);