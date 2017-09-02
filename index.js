var express =  require('express');
var jwt = require('jsonwebtoken');
const app = express();

app.get('/api' , function(req ,res){
    res.json({text: "text"});
});

app.post('/api/login' ,function(req ,res){

    const user = "admin";
    const token = jwt.sign({user} , 'secret_key');
    res.json({
        token : token
    });
});

app.get('/api/pro', checkToken,   function(req ,res){
    jwt.verify(req.token , 'secret_key' , function(err , data){
      if(err){
         res.sendStatus(403);
      }else{
        res.json({ 
            text :'pro' ,
            data : data
        });
      }
    });
    
})


app.listen(3000 , function(){
console.log("app run");
});


function checkToken(req ,res , next ){
    const header = req.headers["authorization"];
    if (typeof header !== 'undefined') {
      req.token = header;
      next();
    } else {
      res.sendStatus(404);
    }

}