sap.ui.define([
    "employee/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/table/library"

], function (BaseController, JSONModel, Sorter, library,) {
    "use strict";
    var SortOrder1 = library.SortOrder;

    return BaseController.extend("employee.controller.Main", {
        onInit: function () {

            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Master").attachMatched(this._onRouteMatched, this);
            this.host = "http://localhost:3000";
            this.oDataModel = new JSONModel({});
            this.getView().setModel(this.oDataModel, "person");
            this.getView().getModel("person").setProperty("/descending", true);
            var dId;

            //For local development. Start your NodeJS server.
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            //this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://p2001017289trial-trial-dev-lev-srv.cfapps.eu10.hana.ondemand.com";

        },

        _onRouteMatched: function (oEvent) {

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/employee", true);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    this.getView().getModel("person").setData(JSON.parse(data));

                }

            }.bind(this);

        },

        onSave: function () {
            var oData = this.oDataModel.getData();
            var formData = {

                "emid": "",
                "name": this.getView().byId("input0").getValue(),
                "surname": this.getView().byId("input1").getValue(),
                "email": this.getView().byId("input2").getValue()
            };

            if (formData.name == "" && formData.surname == "" && formData.email == "") {
                sap.m.MessageBox.error("pass data");
            } else {

                this.getApp().setBusy(true);
                jQuery.ajax({
                    type: "POST",
                    url: this.host + "/employee",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(formData),
                    success: function (data) {
                        sap.m.MessageBox.success("Employee Created");
                        this.oDataModel.setData(data);
                        this.getApp().setBusy(false);
                        this._onRouteMatched();
                    }.bind(this),
                    error: function (oError) {
                        this.getApp().setBusy(false);
                        jQuery.sap.log.error(oError);
                        sap.m.MessageBox.error("Creating failed");
                    }.bind(this)

                });


            }


        },


        onSettings: function () {


            var btn = this.getView().byId("btn-delete");
            if(btn.getVisible()){
                this.getView().byId("btn-update").setVisible(false);
                this.getView().byId("btn-delete").setVisible(false);
            }


            var t = this.getView().byId("form0");
            if (t.getVisible()) {
                t.setVisible(false);
            } else {
                t.setVisible(true);
            }

        },

        onClick: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oSelect = oEvent.getSource().getBindingContext("person").getProperty("EMID");
            var t = oEvent.getSource().getBindingContext("person").getPath();
            oRouter.navTo("Detail", {
                id: oSelect
            });

        },

        onSelectionChange: function (oEvent) {

            var eId;
            var path1;


            this.eId = oEvent.getParameter("listItem").getBindingContext("person").getProperty("EMID");
            this.getView().byId("btn-update").setVisible(true);
            this.getView().byId("btn-delete").setVisible(true);
            this.path1 = oEvent.getParameter("listItem").getBindingContext("person").getPath();

            this.oDataModel1 = new JSONModel({});
            this.getView().setModel(this.oDataModel1, "empl1");

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/employee/" + this.eId);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    this.getView().getModel("empl1").setData(JSON.parse(data));
                    console.log(data);

                }

            }.bind(this)

        },

        onDelete: function (oEvent) {
            this.dId = oEvent.getSource().getBindingContext("person").getProperty("EMID");

            var path = oEvent.getSource().getBindingContext("person").getPath();
            if (!this.dialog1) {

                this.dialog1 = sap.ui.xmlfragment("employee.view.deletedialog", this);

            }
            this.getView().addDependent(this.dialog1);
            this.dialog1.bindElement({
                path: path,
                model: "person"
            });
            this.dialog1.open();

        },

        deleteDialog: function () {
            console.log(this.dId);
            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "DELETE",
                url: this.host + "/employee/" + this.dId,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    sap.m.MessageBox.success("Employee Deleted");
                    //this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                    this._onRouteMatched();
                    this.dialog1.close();
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Creating failed");
                }.bind(this)
            })

        },

        delcloseDialog: function () {
            this._onRouteMatched();
            this.dialog1.close();
        },

        updateDialog: function () {
            console.log(sap.ui.getCore().byId("input2").getValue());
            var formData = {

                "emid": sap.ui.getCore().byId("input").getText(),
                "name": sap.ui.getCore().byId("input0").getValue(),
                "surname": sap.ui.getCore().byId("input1").getValue(),
                "email": sap.ui.getCore().byId("input2").getValue()
            };

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "PUT",
                url: this.host + "/employee",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (data) {
                    sap.m.MessageBox.success("Employee Updated");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Updating failed");
                }.bind(this)

            });
        },

        onUpdate: function (oEvent) {

            var path = oEvent.getSource().getBindingContext("person").getPath();
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment("employee.view.inputdialog", this);
            }
            this.getView().addDependent(this.dialog);
            this.dialog.bindElement({
                path: path,
                model: "person"
            });
            this.dialog.open();

        },

        closeDialog: function () {
            this._onRouteMatched();
            this.dialog.close();

        },

        handleSearch: function (oEvent) {
            var filters = [];
            var query = oEvent.getParameter("query");

            var filter1 = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
            var filter2 = new sap.ui.model.Filter("SURNAME", sap.ui.model.FilterOperator.Contains, query);
            var filter3 = new sap.ui.model.Filter("EMAIL", sap.ui.model.FilterOperator.Contains, query);
            filters.push(filter1);
            filters.push(filter2);
            filters.push(filter3);

            var table = this.getView().byId("List");
            var binding = table.getBinding("items");
            binding.filter(new sap.ui.model.Filter(filters, false));

        },

        sortName: function (oEvent) {

            var oSorter1 = new sap.ui.model.Sorter({
                path: "NAME",
                descending: true,
                group: false
            });
            var oSorter2 = new sap.ui.model.Sorter({
                path: "NAME",
                ascending: true,
                group: false
            });

            var table = this.getView().byId("List");
            var sort = this.getView().getModel("person").getProperty("/descending");
            this.getView().getModel("person").setProperty("/descending", !sort);
            if (!sort) {
                table.getBinding("items").sort(oSorter2);
            } else {
                table.getBinding("items").sort(oSorter1);
            }

        },

        clearAllSortings: function (oEvent) {
            var oTable = this.getView().byId("List");
            this.getView().byId("List").getBinding("items").sort(new sap.ui.model.Sorter("EMID", undefined));

        },


    });
});
