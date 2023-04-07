const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://127.0.0.1:27017/ShopFuture", { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

async function connectToDatabase() {
    try {
        const db = await connectAsync();
        console.log("We're connected to " + db.name + " database on MongoDB");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();