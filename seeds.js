const db_category = require('./models/db_category');

const dt_category = [{
        catg_name: "Children",
        catg_pic: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"
    },{
        catg_name: "Hospital",
        catg_pic: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },{
        catg_name: "Animal",
        catg_pic: "https://images.unsplash.com/photo-1469830961493-a4a308b082b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },{
        catg_name: "Nature",
        catg_pic: "https://jooinn.com/images/nature-1.jpg"
    }
]

function seedDB(){
    console.log("REMOVE: DB_Category");
    db_category.remove({}, function(err){
        if (err) console.log("ERROR: Have some problem while remove.");
        else console.log("SUCCESS: [REMOVE] complete.");
        console.log("ADD: Category Element.");
        dt_category.forEach(function(category){
            db_category.create(category, function(err, complete){
                if(err) console.log("ERROR: Can't create category.");
                else console.log("SUCCESS: Category created.");
            })
        });
    });
}

module.exports = seedDB;