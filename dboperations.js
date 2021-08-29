var config = require('./dbconfig');
const sql =require('mssql');
const validation = require('./validation');


async function getdetails(){
    try{
        let pool =await sql.connect(config);
        let getval = pool.request().query("select  * from validation")
        return getval.recordsets;
    }
    catch(error){
        console.log(error);
       
    }
}
async function getdetail(detailsId) {
    try {
        let pool = await sql.connect(config);
        let getvalue = await pool.request()
            .input('input_parameter', sql.Int, detailsId)
            .query("SELECT * from validation where Id = @input_parameter");
        return getvalue.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function adddetails(adddetail) {

    try {
        let pool = await sql.connect(config);
        let insertdetails = await pool.request()
            .input('id', sql.Int, adddetail.id)
            .input('firstname', sql.VarChar, adddetail.firstname)
            .input('lastname', sql.VarChar, adddetail.lastname)
            .input('middlename', sql.VarChar, adddetail.middlename)
            .input('email', sql.VarChar, adddetail.email)
            .input('phonenumber', sql.Int, adddetail.phonenumber)
            .input('height', sql.Decimal, adddetail.height)
            .input('height', sql.Decimal, adddetail.weight)
            .execute('Insertdet');
        return insertdetails.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}
async function deletedetail(deleteId) {
    try {
        let pool = await sql.connect(config);
        let delval = await pool.request()
            .input('input_parameter', sql.Int, deleteId)
            .query("DELETE * from validation where Id = @input_parameter");
        return delval.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


module.exports={
    getdetails:getdetails,
    getdetail: getdetail,
    adddetails:adddetails,
    deletedetail:deletedetail
}