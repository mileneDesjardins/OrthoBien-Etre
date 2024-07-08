import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({

    codeAdmin:{
        type:String,
        required:true,
        unique:true
    },
    nomAdmin:{
        type:String,
        required : true
    },
    prenomAdmin:{
        type:String,
        required:true,
    },
    courriel:{
        type:String,
        required: true,
        unique: true
    },
    numeroAdmin:{
        type: Number,
        required: true,
        unique: true
    },
    mdp: {
        type:String,
        required:true
    }
});

export default mongoose.model('Administrateurs',adminSchema,'Administrateurs');


