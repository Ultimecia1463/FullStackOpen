const mongoose = require('mongoose')


const url = process.env.MONGO_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type : String,
    minlength: 3,
    required: true
  },
  number: String,
},{collection: 'persons'})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Person', personSchema)