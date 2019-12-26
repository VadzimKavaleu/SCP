"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oUser, req) {
    //oUser.changedBy = "DebugUser";
    return oUser;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "SELECT * FROM \"EMPLOYEE\"";
            oUser.employeers = await db.executeUpdate(sSql);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });
    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);

            oUser.emid = await db.getNextval("emid");


            const sSql = "INSERT INTO \"EMPLOYEE\" VALUES(?,?,?,?)";
            const aValues = [ oUser.emid, oUser.name, oUser.surname, oUser.email ];

            console.log(aValues);
            console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });


    app.delete("/", async(req, res, next)=>{
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            const sSql = "DELETE FROM \"EMPLOYEE\" WHERE \"EMID\" = ?";
            const aValues = [ oUser.emid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:emid", async (req, res, next)=>{
        try {
            const db = new dbClass(req.db);
            const oUser = _prepareObject(req.body, req);
            const id = req.params.emid;
            const sSql = "DELETE FROM \"EMPLOYEE\" WHERE \"EMID\" = ?";
            const aValues = [ id ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });


    app.get("/:emid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");

            const id = req.params.emid;
            const sSql = "SELECT * FROM \"EMPLOYEE\" WHERE \"EMID\" = ?";
                const aValue = [id];
            oUser.employeers = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req,res,next)=>{
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "UPDATE \"EMPLOYEE\" SET \"NAME\" = ?, \"SURNAME\" = ?, \"EMAIL\" = ?  WHERE \"EMID\" = ?";
            const aValue = [oUser.name, oUser.surname, oUser.email, oUser.emid];
            oUser.employeers = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });



    return app;
};