import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const carSchema = new Schema(
    {
        image1: {
            type: String, //cloudinary url
            required: true
        },
        image2: {
            type: String, //cloudinary url
        },
        
        image3: {
            type: String, //cloudinary url
        },
        
        image4: {
            type: String, //cloudinary url
        },
        
        image5: {
            type: String, //cloudinary url
        },
        
        image6: {
            type: String, //cloudinary url
        },
        
        image7: {
            type: String, //cloudinary url
        },
        
        image8: {
            type: String, //cloudinary url
        },
        
        image9: {
            type: String, //cloudinary url
        },
        
        image10: {
            type: String, //cloudinary url
        },
        
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        tags:{
            type: String,
        },
        brand:{
            type: String,
        },
        car_type:{
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

carSchema.plugin(mongooseAggregatePaginate)

export const Car = mongoose.model("Car", carSchema)