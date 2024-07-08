import mongoose from 'mongoose';

const connexionSchema = new mongoose.Schema({
    courriel: {
        type: String,
        unique: true,
        required :true
    },

    mdp:{
        type:String,
        required:true
    }
});
export default mongoose.model('Connexion',connexionSchema,'Connexion');
