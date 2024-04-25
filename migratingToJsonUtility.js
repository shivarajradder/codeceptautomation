const util = require("util");
const exec = util.promisify(require("child_process").exec);
const parser = require("mssql-connection-string");
const prop = require("./dist/Framework/FrameworkUtilities/config").prop;
const { createConnection, Connection, MysqlError } = require("mysql");
const fs = require("fs");

const setupObjects = {
    "setups": [
        {
            "branchName": "Mercury_Release",
            "tableName": "iSupplier_PARTNER_UI_Elements",
            "productName": "iSupplier"
        },
        
    ]
};

async function executeGitCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}

async function migrateTestDataToJson(setupTenantMap, productName) {
    const connectionString = "Data Source=tcp:" + prop.DBhost + ",3306;Initial Catalog=" + prop.DBdatabase + ";User Id=" + prop.DBuser + ";Password=" + prop.DBpassword + ";";
    console.log("connectionString  : " + connectionString);
    const connectionObj = parser(connectionString);
    await new Promise((resolve, reject) => {
        console.log("Creating sql connection");
        let connection = createConnection(connectionObj);
        console.log("Checking sql connection");
        connection.connect(async function (error) {
            if (!!error) {
                throw new Error("Error in connection");
            }
            else {
                console.log("Connected");
                console.log("Triggering sql query");
                let dataRespositoryPath = `./src/${productName}/DataRepository`;
                if(!fs.existsSync(dataRespositoryPath)) {
                    fs.mkdirSync(dataRespositoryPath);
                    console.log(`Directory created --> ${dataRespositoryPath}`);
                }
                for (const [setup, columnNameArray] of setupTenantMap) {
                    let testDataFilePath = `${dataRespositoryPath}/${setup}_TestData_${productName}.json`;
                    console.log(`testDataFilePath --> ${testDataFilePath}`);
                    fs.writeFileSync(testDataFilePath, JSON.stringify({}));
                    for (const column of columnNameArray) {
                        let jsonObject = {};
                        const query =` SELECT FIELD_NAME, ${column} FROM ${prop.testdataTable}`;
                        console.log(`Query --> ${query}`);
                        let tenant = column.split(setup)[1].substring(1);
                        console.log(`TENANT --> ${tenant}`);
                        await new Promise((resolve, reject) => {
                            connection.query(query, function (error, rows, fields) {
                                if (!!error) {
                                    throw new Error("Error in the query");
                                }
                                else {
                                    console.log("SUCCESS!");
                                    for (let i = 0; i < rows.length; i++) {
                                        let key = rows[i]["FIELD_NAME"];
                                        if (key) key = key.trim();
                                        else console.log(`FIELD_NAME is empty / null --> ${key}`);
                                        let value = rows[i][`${column}`];
                                        if (value) value = value.trim();
                                        else console.log(`Value for FIELD_NAME "${key}" is empty / null`);
                                        jsonObject[key] = value;
                                    }
                                    resolve();
                                }
                            });
                        }).catch((error) => {
                            throw error;
                        });
                        let defaultJson = JSON.parse(fs.readFileSync(testDataFilePath, "utf-8"));
                        defaultJson[column] = jsonObject;
                        fs.writeFileSync(testDataFilePath, JSON.stringify(defaultJson, null, "\t"));
                    }
                }
                connection.destroy();                           
                resolve();
            }
        });
    }).catch((error) => {
        throw error;
    });
    console.log("TestData migration completed.");
}

async function migrateUiElementsToJson(tableName, productName) {   
    const connectionString = "Data Source=tcp:" + prop.DBhost + ",3306;Initial Catalog=" + prop.DBdatabase + ";User Id=" + prop.DBuser + ";Password=" + prop.DBpassword + ";";
    console.log("connectionString  : " + connectionString);
    const connectionObj = parser(connectionString);
    
    const query = `SELECT * FROM ${tableName}`;
    console.log("---=-==-=-=-=-=-=-=>" + query);
    return new Promise((resolve, reject) => {
        console.log("Creating sql connection");
        let connection = createConnection(connectionObj);
        console.log("Checking sql connection");
        connection.connect(function (error) {
            if (!!error) {
                console.log("Error2");
            }
            else {
                console.log("Connected");
                console.log("Triggering sql query");
                connection.query(query, async function (error, rows, fields) {
                    if (!!error) {
                        console.log("Error in the query");
                    }
                    else {
                        console.log("SUCCESS!");
                        let dataRespositoryPath = `./src/${productName}/ObjectRepository`;

                        if(!fs.existsSync(dataRespositoryPath)) {
                            fs.mkdirSync(dataRespositoryPath);
                        }
                        let fileName = `${dataRespositoryPath}/UI_Elements.json`;;
                        let jsonObject = {};
                        let map = new Map();
                        for (let i = 0; i < rows.length; i++) {
                            let jsonkey = `${rows[i]["PAGE_NAME"]}/${rows[i]["ELEMENT_NAME"]}`;
                         //   console.log(jsonkey);
                            let object = {};
                            object["PRODUCT_NAME"] = rows[i]["PRODUCT_NAME"];
                            object["MODULE_NAME"] = rows[i]["MODULE_NAME"];
                            object["PAGE_NAME"] = rows[i]["PAGE_NAME"];
                            object["ELEMENT_NAME"] = rows[i]["ELEMENT_NAME"];
                            object["ID"] = rows[i]["ID"];
                            object["CLASS_NAME"] = rows[i]["CLASS_NAME"];
                            object["XPATH"] = rows[i]["XPATH"];
                            object["CSS_SELECTOR"] = rows[i]["CSS_SELECTOR"];
                            object["LABEL"] = rows[i]["LABEL"];
                            object["COMMENTS"] = rows[i]["COMMENTS"];
                            object["PRIMARY_LOCATOR"] = null;
                            object["ABSOLUTE_XPATH"] = null;
                            object["RETRY_COUNT"] = null;

                            jsonObject[jsonkey] = object;
                            map.set(jsonkey, "hi");
                        }
                        fs.writeFileSync(fileName, JSON.stringify(jsonObject, null, "\t"));
                        console.log(`UiElement json file created --> ${fileName}`);                            
                        console.log(`UiElement size --> ${map.size}`);                            
                        connection.destroy();                           
                        resolve();
                       
                    }
                });
            }
        });
    });
}


async function migrateLMTDetailsToJson() {
    
    const connectionString = "Data Source=tcp:" + prop.DBhost + ",3306;Initial Catalog=" + prop.DBdatabase + ";User Id=" + prop.DBuser + ";Password=" + prop.DBpassword + ";";
    console.log("connectionString  : " + connectionString);
    const connectionObj = parser(connectionString);
    const query = "SELECT * FROM LMT";
    let LMTMap = new Map();
    let directoryPath = `./src/${setupObjects.setups[0].productName}/LmtRepository`;

    await new Promise((resolve, reject) => {
        console.log("Creating sql connection");
        let connection = createConnection(connectionObj);
        console.log("Checking sql connection");
        connection.connect(async function (error) {
            if (!!error) {
                throw new Error("Error");
            }
            else {
                console.log("Connected");
                console.log("Triggering sql query");
                connection.query(query, function (error, rows, fields) {
                    if (!!error) {
                        throw new Error("Error in the query");
                    }
                    else {
                        console.log("SUCCESS!");
                        if(!fs.existsSync(directoryPath)) {
                            fs.mkdirSync(directoryPath);
                        }
                        for (let i = 0; i < rows.length; i++) {
                            let mapKey = "";
                            let LMTValueMap = new Map();
                            for (let [key, value] of Object.entries(rows[i])) {
                                if (key === "Key") {
                                    mapKey = value;
                                } else {
                                    LMTValueMap.set(key, value);
                                }
                            }
                            LMTMap.set(mapKey, LMTValueMap);
                        }
                        connection.destroy();
                        console.log(`LMT map size --> ${LMTMap.size}`);
                        resolve(LMTMap);
                    }
                });
            }
        });
    });
    let lmtJsonFilePath = `${directoryPath}/Lmt.json`;
    let jsonObject = {};
    for (const [key, value] of LMTMap) {
        let obj = {};
        for (const [key1, value1] of value) {
            if (value1) obj[key1] = value1.trim();
            else obj[key1] = value1;
        }
        jsonObject[key] = obj;
    }
    fs.writeFileSync(lmtJsonFilePath, JSON.stringify(jsonObject, null, "\t"));
    console.log("Lmt migration completed.");
}


async function migrateCredentialsToJson(setupTenantMap, productName) {
    const connectionString = "Data Source=tcp:" + prop.DBhost + ",3306;Initial Catalog=" + prop.DBdatabase + ";User Id=" + prop.DBuser + ";Password=" + prop.DBpassword + ";";
    const connectionObj = parser(connectionString);
    await new Promise((resolve, reject) => {
        console.log("Creating sql connection");
        let connection = createConnection(connectionObj);
        console.log("Checking sql connection");
        connection.connect(async function (error) {
            if (!!error) {
                throw new Error("Error in connection");
            }
            else {
                console.log("Connected");
                console.log("Triggering sql query");
                let dataRespositoryPath = `./src/${productName}/DataRepository`;
                for (const [setup, columnNameArray] of setupTenantMap) {
                    let testDataFilePath = `${dataRespositoryPath}/${setup}_TestData_${productName}.json`;
                    console.log(`testDataFilePath --> ${testDataFilePath}`);
                    console.log(" >>>>>>>>>>>>>>> "+columnNameArray);
                    for (const column of columnNameArray) {
                        let jsonObject = {CREDENTIALS: new Array()};
                        let setupp = column.split(setup)[0] + setup;
                        let tenant = column.split(setup)[1].substring(1);
                        console.log(`TENANT --> ${tenant}`);
                        const query = `SELECT * FROM ${prop.UserTable} WHERE SETUP_NAME = '${setupp}' AND TENANT_NAME = '${tenant}'`;
                        console.log(`Query --> ${query}`);
                        await new Promise((resolve, reject) => {
                            connection.query(query, function (error, rows, fields) {
                                if (!!error) {
                                    throw new Error("Error in the query");
                                }
                                else {
                                    console.log("SUCCESS!");
                                    for (let i = 0; i < rows.length; i++) {
                                        let obj = {};
                                        obj["SETUP_NAME"] = rows[i]["SETUP_NAME"];
                                        obj["TENANT_NAME"] = rows[i]["TENANT_NAME"];
                                        obj["USERNAME"] = rows[i]["USERNAME"];
                                        obj["PASSWORD"] = rows[i]["PASSWORD"];
                                        obj["REPOUSERNAME"] = rows[i]["REPOUSERNAME"];
                                        obj["REPOPASSWORD"] = rows[i]["REPOPASSWORD"];
                                        obj["VIEWREPOUSERNAME"] = rows[i]["VIEWREPOUSERNAME"];
                                        obj["VIEWREPOPASSWORD"] = rows[i]["VIEWREPOPASSWORD"];
                                        obj["LDMUSERNAME"] = rows[i]["LDMUSERNAME"];
                                        obj["LDMPASSWORD"] = rows[i]["LDMPASSWORD"];
                                        obj["ZSN_USERNAME"] = rows[i]["ZSN_USERNAME"];
                                        obj["ZSN_PASSWORD"] = rows[i]["ZSN_PASSWORD"];
                                        obj["FLAG"] = rows[i]["FLAG"];
                                        obj["PRODUCT"] = rows[i]["PRODUCT"];
                                        if (Object.keys(rows[i]).includes("DISPLAY_NAME")) obj["DISPLAY_NAME"] = rows[i]["DISPLAY_NAME"];
                                        if (Object.keys(rows[i]).includes("SCOPE")) obj["SCOPE"] = rows[i]["SCOPE"];
                                        if (Object.keys(rows[i]).includes("SCOPEEEEE")) obj["SCOPEEEEE"] = rows[i]["SCOPEEEE"];
                                        
                                        jsonObject.CREDENTIALS.push(obj);
                                    }
                                    resolve();
                                }
                            });
                        });
                        let defaultJson = JSON.parse(fs.readFileSync(testDataFilePath, "utf-8"));
                        Object.assign(defaultJson[column], jsonObject);
                        fs.writeFileSync(testDataFilePath, JSON.stringify(defaultJson, null, "\t"));
                    }
                }
                connection.destroy();
                resolve();
            }
        });
    }).catch((error) => {
        throw error;
    });
    console.log("Credentials migration completed.");
}

async function getSetupArray()
{    
    const connectionString = "Data Source=tcp:" + prop.DBhost + ",3306;Initial Catalog=" + prop.DBdatabase + ";User Id=" + prop.DBuser + ";Password=" + prop.DBpassword + ";";
    console.log("connectionString  : " + connectionString);
    const connectionObj = parser(connectionString);
 
    const query = `SHOW COLUMNS FROM ${prop.testdataTable}`;

    console.log("getTestData query : " + query);
    return new Promise((resolve, reject) => {
        console.log("Creating sql connection");
        let connection = createConnection(connectionObj);
        console.log("Checking sql connection");
        connection.connect(function (error) {
            if (!!error) {
                console.log("Error2");
            }
            else {
                console.log("Connected");
                console.log("Triggering sql query");
                connection.query(query, async function (error, rows, fields) {
                    if (!!error) {
                        console.log("Error in the query");
                    }
                    else {
                        console.log("SUCCESS!");
                       
                        let partnerName = new Array();
                        let stagingName = new Array();
                        let sgProdName = new Array();
                        let usProdName = new Array();
                        let qcvmName = new Array();
                        let ukProdName = new Array();
                        let ausProdName = new Array();
                        let rm = new Array();
                        let dsso = new Array();
                        let ausStaging = new Array();
                        let simAll = new Array();
                        let setupNameMap = new Map();                    

                        for (let i = 0; i <rows.length; i++)
                        {   
                            if(rows[i]["Field"].includes("PARTNER"))
                            {    
                                partnerName.push(rows[i]["Field"])                               
                            }  

                            else if(rows[i]["Field"].includes("AUSUAT"))
                            {
                               ausStaging.push((rows[i]["Field"]));
                            }

                            else if(rows[i]["Field"].includes("SGPROD"))
                            {
                                sgProdName.push((rows[i]["Field"]));
                            } 
                            
                            else if(rows[i]["Field"].includes("QCVM"))
                            {
                                qcvmName.push((rows[i]["Field"]));
                            } 
                            else if(rows[i]["Field"].includes("UKPROD"))
                            {
                                ukProdName.push((rows[i]["Field"]));
                            } 
                            else if(rows[i]["Field"].includes("AUSPROD"))
                            {
                                ausProdName.push((rows[i]["Field"]));
                            } 
                                         
                            else if(rows[i]["Field"].includes("RM"))
                            {
                                rm.push((rows[i]["Field"]));
                            } 
                            else if(rows[i]["Field"].includes("DSSO"))
                            {
                                dsso.push((rows[i]["Field"]));
                            }  
                            else if(rows[i]["Field"].includes("STAGING"))
                            {
                               stagingName.push((rows[i]["Field"]));
                            }
                            else if(rows[i]["Field"].includes("USPROD"))
                            {
                                usProdName.push((rows[i]["Field"]));
                            }  
                            else if(rows[i]["Field"].includes("SimForAll"))
                            {
                                simAll.push((rows[i]["Field"]));
                            }  
                                
                        }

                        setupNameMap.set("PARTNER", partnerName);
                        setupNameMap.set("STAGING", stagingName);
                        setupNameMap.set("SGPROD", sgProdName);
                        setupNameMap.set("UKPROD", ukProdName);
                        setupNameMap.set("AUSPROD", ausProdName);
                        setupNameMap.set("QCVM", qcvmName);
                        setupNameMap.set("RM", rm);
                        setupNameMap.set("DSSO", dsso);
                        setupNameMap.set("USPROD", usProdName);
                        setupNameMap.set("AUSUAT", ausStaging);    
                        setupNameMap.set("SimForAll", simAll);  
                        console.log(`May Size --> ${setupNameMap.size}`); 
                        console.log("May Value --- "+setupNameMap);                       
                        connection.destroy();                           
                        resolve(setupNameMap);
                      
                    }
                });
            }
        });
    });
}

new Promise(async (resolve, reject) => {
    console.log("Database migration to JSON");
    for(let i=0; i< setupObjects.setups.length; i++)
    {
        let object = setupObjects.setups[i];
        //await executeGitCommand(`git checkout ${object.branchName}`);   
        console.log(`git checkout ${object.branchName}`);    
        let setupNameArray =  await getSetupArray();
        await migrateTestDataToJson(setupNameArray, `${object.productName}`);
        await migrateCredentialsToJson(setupNameArray, `${object.productName}`);   
        await migrateUiElementsToJson(`${object.tableName}`, `${object.productName}`);
        await migrateLMTDetailsToJson();
        
        // await executeGitCommand("git status");
        // console.log(`git status`);

        // await executeGitCommand("git add -A");
        // console.log(`git add -A`);

        // await executeGitCommand(`git commit -m "adding json files"`);
        // console.log(`git commit -m "adding json files"`);

        // await executeGitCommand(`git push origin ${object.branchName}`);
        // console.log(`git push origin ${object.branchName}`);
        
    }
    resolve();
    
});