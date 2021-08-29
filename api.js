var valid = require('./validation');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
 })
 
 router.route('/validation').get((request,response)=>{
 
     dboperations.getdetails().then(result => {
        response.json(result[0]);
     })
 
 })
 router.route('/validation/:id').get((request,response)=>{

    dboperations.getdetail(request.params.id).then(result => {
       response.json(result[0]);
    })

})
router.route('/validation').post((request,response)=>{

    let addord = {...request.body}

    dboperations.adddetails(addord).then(result => {
       response.status(201).json(result);
    })

})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);

dboperations.getdetails().then(result =>
    {
        console.log(result)
    })