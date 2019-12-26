"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oAddress, req) {
    //oUser.changedBy = "DebugUser";
    return oAddress;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "SELECT * FROM \"ADDRESS\"";
            oAddress.address = await db.executeUpdate(sSql);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });
    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);

            oAddress.adid = await db.getNextval("adid");


            const sSql = "INSERT INTO \"ADDRESS\" VALUES(?,?,?,?,?,?)";
            const aValues = [ oAddress.adid, oAddress.city, oAddress.strt, oAddress.hnum, oAddress.phone, oAddress.emid ];

            console.log(aValues);
            console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });


    app.delete("/", async(req, res, next)=>{
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
            const sSql = "DELETE FROM \"ADDRESS\" WHERE \"ADID\" = ?";
            const aValues = [ oAddress.adid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:adid", async (req, res, next)=>{
        try {
            const db = new dbClass(req.db);
            const oAddress = _prepareObject(req.body, req);
            const id = req.params.adid;
            const sSql = "DELETE FROM \"ADDRESS\" WHERE \"ADID\" = ?";
            const aValues = [ id ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });


    app.get("/:adid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");

            const id = req.params.adid;
            const sSql = "SELECT * FROM \"ADDRESS\" WHERE \"ADID\" = ?";
            const aValue = [id];
            oAddress.address = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req,res,next)=>{
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "UPDATE \"ADDRESS\" SET \"CITY\" = ?, \"STRT\" = ?, \"HNUM\" = ?, \"PHONE\" = ?, \"EMID\" = ?  WHERE \"ADID\" = ?";
            const aValue = [oAddress.city, oAddress.strt, oAddress.hnum, oAddress.phone, oAddress.emid, oAddress.adid];
            oAddress.address = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });



    return app;
};