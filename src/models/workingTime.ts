import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({


    name: { type: String },
    PreferredWorkingHourPerDay: { type: Number },
    code:{type:Number,required:true},


    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IWorkingHour extends Document {

    name: String,
    PreferredWorkingHourPerDay: Number,
   
    isDeleted: Boolean

}

export default model<IWorkingHour>("workinghour", schema);