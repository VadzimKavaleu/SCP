"use strict";

module.exports = (app, server) => {
    //app.use("/user", require("./routes/user")());
    app.use("/dest", require("./routes/dest")());
    app.use("/employee", require("./routes/employee")());
    app.use("/laptop", require("./routes/laptop")());
    app.use("/address", require("./routes/address")());

};
