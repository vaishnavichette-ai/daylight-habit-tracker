import mongoose from 'mongoose';
const completionSchema = new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},habit:{type:mongoose.Schema.Types.ObjectId,ref:'Habit',required:true,index:true},date:{type:String,required:true},count:{type:Number,default:0,min:0}},{timestamps:true});
completionSchema.index({habit:1,date:1},{unique:true});
export default mongoose.model('Completion',completionSchema);
