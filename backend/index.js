let express = require('express');
const cors = require('cors');

let app = express();
app.use(cors()); // Add this line to enable CORS
app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Welcome to AdPro API");
});
app.use("/authentication",require("./routes/authenticationRoute"));
app.use("/agencies",require("./routes/agenciesRoute"));
app.use("/roles",require("./routes/rolesRoute"));
app.use("/modules",require("./routes/modulesRoute"));
app.use("/states",require("./routes/statesRoute"));
app.use("/menus",require("./routes/menusRoute"));
app.use("/modulemenus",require("./routes/moduleMenusRoute"));
app.use("/rolemodules",require("./routes/roleModulesRoute"));
app.use("/users",require("./routes/usersRoute"));
app.use("/clients",require("./routes/clientsRoute"));
app.use("/pmedias",require("./routes/pMediasRoute"));
app.use("/emedias",require("./routes/eMediasRoute"));
app.use("/financialyears",require("./routes/financialYearsRoute"));
app.use("/gsts",require("./routes/gstsRoute"));
app.use("/holidays",require("./routes/holidaysRoute"));
app.use("/adschedules",require("./routes/adSchedulesRoute"));
app.use("/workschedules",require("./routes/workSchedulesRoute"));
app.use("/designprintinvoices",require("./routes/designPrintInvoicesRoute"));
app.use("/invoicedetails",require("./routes/invoiceDetailsRoute"));
app.use("/pmediaros",require("./routes/pMediaRosRoute"));
app.use("/emediaros",require("./routes/eMediaRosRoute"));


app.listen(8081,()=>{
    console.log("server is running on port http://localhost:8081");
});