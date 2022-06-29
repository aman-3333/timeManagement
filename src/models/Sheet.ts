import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    
  
    code: { type: Number },
   
        note: { type: String },
        hours: { type: Number },
        date: { type: Date },
    

   

    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface ISheet extends Document {

    code: Number,
 
    note: String,
        hours: Number,
    date:  Date ,



    isDeleted: Boolean
  
}

export default model<ISheet>("sheet", schema);