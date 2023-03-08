var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath:'https://media-fmplus.cdn.vccloud.vn/uploads/tin-tuc/bai-tin-tuc/Th%E1%BB%9Di%20trang%20%E1%BA%A3o%20xu%20h%C6%B0%E1%BB%9Bng%20th%E1%BB%9Di%20trang%20trong%20th%E1%BB%9Di%20%C4%91%E1%BA%A1i%20k%E1%BB%B9%20thu%E1%BA%ADt%20s%E1%BB%91/thoi-trang-ao-xu-huong-thoi-trang-trong-thoi-dai-ky-thuat-so-h4.webp',
        title:'Thumbnail label',
        description:'mat hang moi ',
        price: 100
    })
];

var done = 0;
for( var i=0; i<produst.length; i++){
    produst[i].save(function(err,result){
        done ++;
        if(done === produst.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
