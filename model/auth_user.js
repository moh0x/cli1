const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		token:{
			type:String,
			default:null
		},
        role:{
            type:String,
			enum:['user','company']
        },
		phoneNumber:{
			type:String,
			required:true
		},
		addrese:{
			type:String,
			required:true
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
        },
        sacsTwo:{
            type:Object,
            default:[
                {"text":"Mélangés","desc":"Déchets mélangés hors déchets alimentaires matières dangereusesmembranes bitumineuses oU synthétiques","count":0},
                {"text":"Plåtre","desc":"Carreaux de plåtre,placoplâtre, BA13,...","count":0},              
                {"text":"Bois bâtiment","desc":"Charpentes, parquet,menuiseries, plinthes","count":0},
                {"text":"Ferraille","desc":"Ferraille, acier, fonte,sac","count":0},
                {"text":"Végétaux","desc":"Feuilles, branche","count":0},
                {"text":"Bois autre","desc":"Meubles, palettes,mélaminé, bois decoffrage, mélange deplusieurs types de bois(bâtiment ou non)","count":0},
                {"text":"Emballages","desc":"Carton, plastique,polystyrène,","count":0},
                {"text":"Tuiles / Ardoises","desc":"ManutentionnableTuiles non casséesardoises, briques,parpaings,","count":0},
            ]
        },
        sacsThree:{
            type:Object,
            default:[
                {"text":"Encombrantslourds ou volumineux","desc":"Baignoire, armoire, ..(entre 25 et 50kg maximum)","count":0},
                {"text":"Encombrants","desc":"WC, bac à douche, hotte,bidet, porte, ... (pas plus de 25kg)","count":0},              
            ]
        },
 isFinished:false,
        type:{
            type:String,
			enum:['Mélanges','Gravets/Terre']
        },
        numberOfBigBags:{
            typeBags:Number,
			default:0
        },
		
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {User}
