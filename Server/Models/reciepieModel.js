import mongoose from 'mongoose';
const reciepischema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type:String,
    required:true
  },
  Incredients : [{type:String,required:true}],
  timetoCook :{type:Number,required:true},
  img : {type:String , required:true},
  OwnerId: { type: mongoose.Schema.Types.ObjectId , ref:"users",required:true}
});
const reciepieModel = mongoose.model('recipie', reciepischema);

export default reciepieModel;
