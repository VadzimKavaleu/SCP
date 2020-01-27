sap.ui.define([
    "employee/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function (BaseController, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("employee.controller.Main", {
        onInit: function () {

            this.oDataModel = new JSONModel({});
            this.getView().setModel(this.oDataModel, "addr");
            this.oDataModel1 = new JSONModel({});
            this.getView().setModel(this.oDataModel1, "laptop");


            var oArgs;
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Detail").attachMatched(this._onRouteMatched, this);
            this.host = "https://localhost:3000";

        },

        _onRouteMatched: function (oEvent) {

            console.log(this.getView().getModel("addr"));
            console.log(this.getView().getModel("addr"));
            this.oArgs = oEvent.getParameter("arguments");
            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/odata/Employee('" + this.oArgs.id + "')/toAddress", true);
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    this.getView().getModel("addr").setData(JSON.parse(data));
                    console.log(XHR.response);

                }

            }.bind(this)

            this.onLoad(this.oArgs.id);


        },

        onLoad: function (oArgs) {

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/odata/Employee('" + oArgs + "')/toLaptop", true);
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    this.getView().getModel("laptop").setData(JSON.parse(data));

                }

            }.bind(this);

        },

        onClick: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Master");

        }






    });
});
