var httpmsgs = require("../core/httpMsgs");
var db = require("../core/db");
var express = require('express');
var util = require('util');

exports.getList = function(req, resp){
    db.executeSql("select * from admin", function(data, err){
        if(err){
            httpmsgs.show500(req, resp, err);
        }
        else{
            httpmsgs.sendJSON(req, resp, data);    
         }
    });
};

exports.get = function(req, resp, id){
    db.executeSql("select * from admin where id = " + id, function(data, err){
        if(err){
            httpmsgs.show500(req, resp, err);
        }
        else{
            httpmsgs.sendJSON(req, resp, data);    
            }
    }); 
};

exports.add = function(req, resp, reqBody){
    try {
        if(!reqBody) throw new Error("Input not valid.");
        var data = JSON.parse(reqBody);
        if(data){
            var sql = "INSERT INTO admin(id,user, pass) VALUES";
            sql += util.format("('%d','%s', '%s')", data.id, data.user, data.pass);
            db.executeSql(sql, function(data, err){
                if(err){
                    httpmsgs.show500(req, resp, err);
                }
                else{
                    httpmsgs.send200(req, resp);    
                    }
            }); 

            
        }
        else{
            throw new Error("Input not valid.");
        }
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

exports.update = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid.");
        var data = JSON.parse(reqBody);
        if(data){

            if(!data.id) throw new Error("Id Not provided");

            var sql = "UPDATE admin SET ";
            var isDataProvided = false;
            if(data.user){
                sql += "user = '" + data.user + "',";
                isDataProvided = true;
            }

            if(data.pass){
                sql += "pass = '" + data.pass + "' ";
                isDataProvided = true;
            }
            //sql = sql.slice(0, -1); // removes the last comma.
            sql += " where id = '" + data.id + "'";
            console.log(sql);

            db.executeSql(sql, function(data, err){
                if(err){
                    httpmsgs.show500(req, resp, err);
                }
                else{
                    httpmsgs.send200(req, resp);    
                    }
            });        
        }
        else{
            throw new Error("Input not valid.");
        }
    } 
    catch (ex) {
        httpmsgs.show500(req, resp, ex);
    }
};

exports.delete = function(req, resp, reqBody){
    try {
        if(!reqBody) throw new Error("Input not valid.");
        var data = JSON.parse(reqBody);
        if(data){

            if(!data.id) throw new Error("Id Not provided");

            var sql = "DELETE FROM admin  ";
            sql += " where id = " + data.id;

            db.executeSql(sql, function(data, err){
                if(err){
                    httpmsgs.show500(req, resp, err);
                }
                else{
                    httpmsgs.send200(req, resp);    
                    }
            });        
        }
        else{
            throw new Error("Input not valid.");
        }
    } catch (ex) {
        httpmsgs.show500(req, resp, ex);
    }
};