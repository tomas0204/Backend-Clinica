import mongoose from "mongoose"

try {
    console.log(process.env.DB);
    mongoose.connect(process.env.DB).then(() => {
        console.info("BD Conectada correctamente")
    })
} catch (error){
    console.error(error);   
}

export default mongoose;