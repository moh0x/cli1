const mongoose = require('mongoose')

const chanterSchema = new mongoose.Schema(
    {
        reference: {
            type: String,
            required: true,
        },
        details:{
            type:String,
            required:false
        },
        addrese:{
            type:String,
            required:true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        type:{
			type:String,
			required:true,
			enum:['oui','non']
		},
	    sacsOne:{
            type:Object,
            default:[
                {"text":"Gravets","desc":"Beton,gravier,tuile,ceramique,brique,ciment...","count":0},
                {"text":"Terre","desc":"","count":0},
                {"text":"Mélanges","desc":"Déchets mélangés hors déchets alimentaires matières dangereuses membranes bitumineuses ou synthétiques","count":0},
                {"text":"Plåtre","desc":"Carreaux de plåtre,placoplâtre, BA13,...","count":0},
                {"text":"Bois bâtiment","desc":"Charpentes, parquet,menuiseries, plinthes","count":0},
                {"text":"Bois autre","desc":"Meubles, palettes,mélaminé, bois decoffrage, mélange deplusieurs types de bois(bâtiment ou non)","count":0},
                {"text":"Ferraille","desc":"Ferraille, acier, fonte,sac","count":0},
                {"text":"Végétaux","desc":"Feuilles, branche","count":0},

            ]
        }
    },
    { timestamps: true }
);

const Chanter = mongoose.model("Chanter", chanterSchema);
module.exports = {Chanter}
