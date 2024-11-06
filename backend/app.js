require("dotenv").config()
require("./config/database").connect()
const User=require('./model/user')
const Product=require('./model/product')
const cors = require('cors'); // Import cors

const express = require('express')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser=require('cookie-parser')
// custom middleware
const auth = require("./middleware/auth")
const app = express()
// to allow json format data
app.use(cors());
app.use(express.json());
app.use(express.json())
// to get data from forms
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Jolt Market</h1> ")
})

app.use("/user", require("./Routes/user.routes"))
app.use("/product", require("./Routes/product.routes"))




  module.exports=app