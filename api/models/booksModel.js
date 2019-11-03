const mongoose=require('mongoose');

const bookSchema=mongoose.Schema(
    {
        title:{ type : String},
        subTitle:{ type : String},
        author:{ type : String},
        description:{ type : String, default: "No Description"},
        publisher:{ type : String, default: "No Publisher"},
        ISBN:{ type : String, default: "No ISBN"},
        category:{ type : String, default : "No Category"},
        thumbnail:{ type : String, default: "No Thumbnail"},
        status : {type : String, enum:["active", "inactive", "deleted"], default : "active"},
        ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true}
    },
    {   
        timestamps : true
    }
);

const book=mongoose.model('book', bookSchema) 

module.exports=book;