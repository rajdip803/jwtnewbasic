
const express = require('express');
const jwt= require('jsonwebtoken');
const app = express();
app.use(express.json());


app.get('/api', (req,res)=>{
    res.json({
        message: 'Welcome to the API'
    })
});
app.post('/api/post', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created',
                authData
            })
        }
    });

    });
app.post('/api/login', (req,res)=>{
    const user ={
        id:1,
        username: 'Rajdip',
        mobile: '1111'
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    });
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    console.log(req.headers);
    console.log(bearerHeader);
    if(typeof bearerHeader !==undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));