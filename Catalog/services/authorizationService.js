const { response } = require('express');
var jwt = require('jsonwebtoken');

const authorizationService = {
    
    AdminAuthorization: async (req) => {
        let token = req.headers["authorization"]
        console.log(token)
        let response = {
            status: 200,
          message: "Ok"
        }
        jwt.verify(token,"secret",function(err, decoded){
            if(err){
                response = {
                    status: 500,
                    message: "error"
                }
            }else{
                if(decoded["rol"] === "Admin"){
                    console.log("rol")
                    console.log(decoded["rol"])
                    response = {
                        status: 200,
                      message: "Ok"
                    }
                }else{
                    response = {
                        status: 403,
                        message: "unauthorized"
                    }
                }
            }
            

        })
        return response
    },
}
module.exports = authorizationService
