sap.ui.define([
    "employee/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function (BaseController, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("employee.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Test").attachMatched(this._onRouteMatched, this);

            var oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel, "person");

            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            //this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://p2001017289trial-trial-dev-lev-srv.cfapps.eu10.hana.ondemand.com";

        },


        _onRouteMatched: function (oEvent) {

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/employee");
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    //console.log(data);
                    this.getView().getModel("person").setData(JSON.parse(data));

                }

            }.bind(this);

        },
        onUpdate: function(oEvent){


            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment("employee.view.inputdialog", this);
            }
            this.getView().addDependent(this.dialog);
            this.dialog.bindElement({
                path: this.path1,
                model: "person"
            });
            this.dialog.open();


        },
        updateDialog: function(){
        var person = {
            name: "",
            description: ""
        };
    person.name = sap.ui.getCore().byId("input1").getValue();
    person.description = sap.ui.getCore().byId("input2").getValue();
    console.log(person);
},


        onSelectionChange: function (oEvent) {

            var eId;
            var path1;


            this.eId = oEvent.getParameter("listItem").getBindingContext("person").getProperty("EMID");


            this.path1 = oEvent.getParameter("listItem").getBindingContext("person").getPath();
            console.log(this.path1);



            this.oDataModel1 = new JSONModel({});
            this.getView().setModel(this.oDataModel1, "person1");

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/employee/"+this.eId);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    this.getView().getModel("person1").setData(JSON.parse(data));
                    console.log(data);

                }


            }.bind(this)





        },

    });
});
