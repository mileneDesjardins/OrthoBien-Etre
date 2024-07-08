import mongoose from 'mongoose';



const panierSchema = new mongoose.Schema({

    client:{
        enregistrer:{
            type:Boolean,
           default:false
        }
    },

    infosClient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients'
    },

    prenomClient:{
        type: String,
        required: true,
        default:"Guest"
        },
    
    articles: [
        {
            produits:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Produits'
            },

            codeProduit:{
                type:Number,
                required:true
            },

            nomProduit:{
                type:String,
                required:true
            },

            prix:{
                type: Number,
                required:true
            },

            qtt:{
                type: Number,
                required: true,
                default:1
            },

            images:{
                type: Array,
                required: true
            }


        }
    ],

    nombreArticles: {
        type: Number,
        default: 0,
        required: true
    },

    montantAvantTaxes: {
        type: Number,
        required: true,
        default: 0
    }
   
});



export default mongoose.model('Panier', panierSchema,'Panier');

