var express = require("express") 
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const port = process.env.PORT || 3000;
const DB ='mongodb+srv://admin:admin@3101@cluster1.z0nw9.mongodb.net/Users?retryWrites=true&w=majority'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() =>{
    console.log('connection successful');
}).catch((err) => console.log('no connection'));


var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/post",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;

    var data = {
        "name": name,
        "email": email,
        "comment": comment,
    }
    db.collection('Comments').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Comment Posted Succesfully");
    });
    return res.redirect('posting_success.html')
})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port, () => {


console.log('Listening to PORT no at 3000');
}) 
 
