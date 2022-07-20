const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    fullname:{
        type: String,
        required:[true,'Please add Fullname']
    },
    email:{
        type: String,
        required:[true,'Please add Email'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'Please add Password'],
        minlength:6
    },
    image: {
        type: String,
        required:[true,'Please add an Image'],
      },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    savings:[{
        type: mongoose.Types.ObjectId,
        ref:"Saving",
        required:true
    }]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
