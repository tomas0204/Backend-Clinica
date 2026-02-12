import mongoose from "mongoose"

try {
    mongoose.connect(process.env.DB).then(() => {
        console.info("BD Conectada")
    })
} catch (error){
    console.error(error);   
}

export default mongoose;