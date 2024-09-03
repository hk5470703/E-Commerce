const port = 4000;
import express from "express"
const app = express()
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import multer from "multer";
import path from "path"
import cors from "cors"
import { type } from "os";
import bodyParser from "body-parser";
import fs from "fs";


app.use(express.json())
app.use(cors())



//connect mongoose and mongodb
mongoose.connect('mongodb+srv://hk5470703:hk5470703@cluster0.uzodw.mongodb.net/e-commerce')

//API creation
app.get("/", (req, res) => {
    res.send("Exress app is running")
})

//multer image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use("/images", express.static('upload/images'))

app.post("/upload", upload.single("product"), (req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


//schema for creating product
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    availble: {
        type: Boolean,
        default: true,
    }
})

//adding product in db
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    else{
        id = 1
    }

    const product = new Product({
        id:  id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })

    console.log(product);
    await product.save()
    console.log('saved');
    res.json({
        success: true,
        name: req.body.name,
        message: "Added in the database" 
    })
    
    
})

//deleting the product from db
app.post('/removeproduct', async(req, res) => {
    try {
        
        const product = await Product.findById(req.body.id)
        
        const imagePath = product.image;

        const fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);

        fs.unlink(`./upload/images/${fileName}`, (err)=>{
            if (err) {
                console.error("Error deleting image:", err);
                // Handle the error appropriately (e.g., send error message to frontend)
                return res.json({ success: false, message: "Error deleting image" });
              }
        })
       
        await Product.findByIdAndDelete(req.body.id)
        res.json({success: true,  message: "product removed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "product not removed"})
    }

})
//creating an API that gives all products
app.get("/allproducts", async(req, res)=> {
    try {
      const products =   await Product.find({});
        res.json({success: true, data: products})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message : "data not found"})
    }
})

//schema creating for User model
const Users = mongoose.model('Users', {
name : {
    type: String,
},
email: {
    type: String,
    unique: true,
},
password: {
    type: String,
},
CartData: {
    type: Object,
},
date: {
    type: Date,
    default: Date.now,
}

})

//creating Endpoints for registering user
app.post('/signup', async(req, res) => {
    let check = await Users.findOne({email: req.body.email})
    if (check) {
        return res.status(400).json({success: false, errors: "existing  user found with same email id" })
    }
    let cart ={}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        CartData: cart,
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success: true, token})
})

//creating end point for user login
app.post('/login' , async(req, res) => {
    let user = await Users.findOne({email: req.body.email})
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }

        const token = jwt.sign(data, 'secret_ecom')
        res.json({success: true, token})    
        }
        else{
            res.json({success: false, errors: "wrong password"})
        }
    }
    else{
            res.json({success: false, erros: "wrong email id"})
    }
})

//creating endpoint for new collection data
app.get('/newcollections', async(req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log('New Collections Fetched');
    res.send(newcollection)
    
})

//creating endpoint in women section
app.get('/popularinwomen', async(req, res) => {
    let products = await Product.find({category: 'Women'})
    let newcollection = products.slice(0,4)
    console.log('Popular in Women fetched');
    res.send(newcollection)
    
})

//creating middleware to fetch user
const fetchUser = async (req, res, next) =>{
    const token = req.header('auth-token');
    console.log(token);
    
    if (!token) {
        res.status(401).send({errors: "please authenticate using a valid token"})
    }else{
       try {
        const data = jwt.verify(token, "secret_ecom")
        
         console.log('Decoded data:', data);
        req.user = data.user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({errors: "please authenticate a valid token"})
    } 
    }

    
}

//creating end point for adding data in cart also changes in shopcontext
app.post('/addtocart' ,fetchUser ,  async(req, res)=>{
    try {
        let userData = await Users.findOne({_id : req.user.id})
       
        if (!userData.CartData[req.body.itemId]) {
            userData.CartData[req.body.itemId] = 1
        }
        else{
            userData.CartData[req.body.itemId] += 1
        }
       
        
        await Users.findByIdAndUpdate(req.user.id, {CartData: userData.CartData})
        res.json({success: true, message: "Added to cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message : "Error"})
        
    }
})

//creating end point for removing data in cart also changes in shopcontext
app.post('/removefromcart' ,fetchUser ,  async(req, res)=>{
    console.log('removed', req.body.itemId);
    
    try {
        let userData = await Users.findById(req.user.id)
        if (userData.CartData[req.body.itemId] > 0) {
            userData.CartData[req.body.itemId] -= 1;
        }
        await Users.findByIdAndUpdate(req.user.id, {CartData : userData.CartData})
        res.json({success : true, message : "Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success : false, message : "Error" })
        
    }
})

//creating end point to get cart data when user login
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log('get cart');
    
    try {
        let userData = await Users.findById(req.user.id)
        res.json(userData.CartData)
    } catch (error) {
        console.log(error);
        res.json({success : false, message : "Error"})
    }
})

app.listen(port, (error)=> {
    if (!error) {
        console.log("Server Running on port " + port);
        
    }
    else{
        console.log("Error: " + error);
        
    }
})