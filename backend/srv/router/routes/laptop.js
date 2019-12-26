"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oLaptop, req) {
    //oUser.changedBy = "DebugUser";
    return oLaptop;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "SELECT * FROM \"LAPTOP\"";
            oLaptop.laptops = await db.executeUpdate(sSql);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });
    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);

            oLaptop.lpid = await db.getNextval("lpid");


            const sSql = "INSERT INTO \"LAPTOP\" VALUES(?,?,?)";
            const aValues = [ oLaptop.lpid, oLaptop.brand, oLaptop.emid ];

            console.log(aValues);
            console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });


    app.delete("/", async(req, res, next)=>{
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            const sSql = "DELETE FROM \"LAPTOP\" WHERE \"LPID\" = ?";
            const aValues = [ oLaptop.lpid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:lpid", async (req, res, next)=>{
        try {
            const db = new dbClass(req.db);
            const oLaptop = _prepareObject(req.body, req);
            const id = req.params.lpid;
            const sSql = "DELETE FROM \"LAPTOP\" WHERE \"LPID\" = ?";
            const aValues = [ id ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });


    app.get("/:lpid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");

            const id = req.params.lpid;
            const sSql = "SELECT * FROM \"LAPTOP\" WHERE \"LPID\" = ?";
            const aValue = [id];
            oLaptop.laptops = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req,res,next)=>{
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            //oUser.usid = await db.getNextval("usid");


            const sSql = "UPDATE \"LAPTOP\" SET \"BRAND\" = ?, \"EMID\" = ?  WHERE \"LPID\" = ?";
            const aValue = [oLaptop.brand, oLaptop.emid, oLaptop.lpid];
            oLaptop.laptops = await db.executeUpdate(sSql, aValue);



            //console.log(oUser);

            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });



    return app;
};