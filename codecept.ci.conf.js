//require("source-map-support").install();
const startup = require("./dist/Framework/FrameworkUtilities/Startup/Startup").Startup;
const prop = require("./dist/Framework/FrameworkUtilities/config").prop;
const path = require('path')
//const changeIeVesrion = require('./ie_change_bit_version');
//changeIeVesrion();
const customChunks = require('./customChunk');
const coeStartup = require("./dist/COE_AUTOMATION/src/Framework/FrameworkUtilities/Startup/Startup").Startup;
const addTimeStampToReport = require('./src/COE_AUTOMATION/add_timestamp_report');
addTimeStampToReport();
//const customChunks = require('./src/COE_AUTOMATION/customChunk');
require("./dist/COE_AUTOMATION/src/Framework/FrameworkUtilities/FailureAnalyzer/EventListenerFA").eventListener();
require('events').EventEmitter.prototype._maxListeners = 100;
startup.failureAnalyzer = true;
prop.enableInfraDetailsScript = true;
prop.dir = __dirname;



//startup.lang = 'en'
exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {

    WebDriver: {
      //waitForNavigation: "load",
      url: prop.url,
      browser: prop.browser,
      host: 'test:test-password@172.30.225.88',
      port: 4444,
      path: "/wd/hub",
      restart: true,
      keepCookies: false,
      windowSize: prop.windowSize,
      waitForTimeout: 300000,
      smartWait: 5000,
      timeouts: {
        "script": 90000000,
        "page load": 150000
      },
      default_low_wait: prop.DEFAULT_LOW_WAIT,
      default_medium_wait: prop.DEFAULT_MEDIUM_WAIT,
      default_high_wait: prop.DEFAULT_HIGH_WAIT,
      desiredCapabilities: {
        'se:downloadsEnabled': true,
        pageLoadStrategy: 'none',
        chromeOptions: {
          args: ["--disable-gpu", "--no-sandbox", "--ignore-certificate-errors"],
          prefs: {
            download: {
              'prompt_for_download': false,
              'default_directory': '/home/selenium/Downloads'

            }
          }
        },
        selenoidOptions: {
          sessionTimeout: "10000s",
          enableVNC: false,
          enableVideo: false

        }
      }


    },
    REST: { timeout: 900000 },
    ChaiWrapper:
    {
      require: "codeceptjs-chai"
    },
    MyHelper: {
      require: "./dist/Framework/CustomHelper/myHelper.js",
    },
    ApiHelper: {

      require: "./dist/dd_api_automation/src/Framework/ApiHelper.js"

    },
    CoeHelper:
    {
      require: "./dist/COE_AUTOMATION/src/Framework/CustomHelper/CoeHelper.js",
    },
    xpathValidate:
    {
      require: "./src/COE_AUTOMATION/xpathValidation.js",
      enabled: true
    },

  },
  bootstrapAll: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrapAll,
  bootstrap: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").bootstrap,
  teardown: require("./dist/Framework/FrameworkUtilities/Bootstrap/bootstrap.js").teardown,
  teardownAll: require("./src/COE_AUTOMATION/get_all_reports.js"),
  include: {
    I: prop.stepFilePath,
  },
  // multiple: {
  //   parallel: {
  //     "chunks": (files) => {
  //       return customChunks(files, 17 )
  //   }
  // }
  // },

  multiple: {
    parallel: {
      // Splits tests into 22 chunks
      "chunks": (files) => {
        return [
          [
            "./src/iSupplier/features/L0Run/CreateEditSupplierMDM.feature",//0s in L1
            "./src/iSupplier/features/DataIntegrity/IS-13549_DataIntegrityForOutbound.feature",//L1-> 16m45s / 15m48s
            "./src/iSupplier/features/Filters/CompletedRequestsApprovalsPage/filterOperationalCompletedApprovals.feature",// L2 32m
            "./src/iSupplier/features/ManageViewCreation/IS-14113_ManageViewCreation.feature",//0s in L1
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForBulkAPI.feature",//0s in L1
            "./src/iSupplier/features/QuickSource/CreateSupplierWithQuickSource.feature",//L1-> 2m /2m  -------------------> plant to move
            "./src/iSupplier/features/CrossReferenceAddress/IS-13870_CrossReference2.feature",//L1-> 15m32s / 14m
            "./src/iSupplier/features/MyApprovalsPotentialActions/NavigatingtoApprovalsPage.feature",//L1-> 1m30s / 2m ---------------------> 2+m plan to move
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchFilterRepo.feature",//L1-> 35s / 1m ---------------------------->
            "./src/iSupplier/features/MyApprovalsOperationalActions/viewActivityOperationalCompletedRequest.feature",//25s in L1 /32s
            "./src/iSupplier/features/MyApprovalsOperationalActions/viewOperationalOngoingRequest.feature",//19sec in L1
            "./src/iSupplier/features/MyApprovalsPotentialActions/viewPotentialCompletedRequest.feature",//29sec in L1
            "./src/iSupplier/features/AppX/BulkAppCases2.feature",//0 sec in L1 //L2- 8m 10sec
            "./src/iSupplier/features/Filters/AllSuppliers/allSupplierPageFilters3.feature",//0 sec in L1 | L2 6m
            "./src/iSupplier/features/MyRequestPage/viewActivity.feature", //*30s /42s L1
          ], //Chunk1  //L1-> 38m / 36m | L2 46m
          [
            "./src/iSupplier/features/DataIntegrity/IS-13530_dataIntegrityForSaveAsDraft.feature",//L1-> 40m / 39m ---> aus 38m US 42m
            "./src/iSupplier/features/L0Run/CreateEditSupplierRepo.feature",//0s in L1
            "./src/iSupplier/features/ProductCategory/IS-14460_productCategories.feature",//0s in L1
            "./src/iSupplier/features/RoleCreation/IS-14107_RoleCreation.feature",//0s in L1
            "./src/iSupplier/features/WorkFlow/SubWorkFlow.feature",//0s in L1 | L2 37m
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForInboundAPI.feature",//0s in L1
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchFilterRepo2.feature", //L2 2m
            
          ], //Chunk2 //L1-> 40m / 39m | L2 45m
          [
            "./src/iSupplier/features/DataIntegrity/IS-13596_DataIntegrityForSaveAndSubmitAndAuditTrail.feature",//L1-> 17m30s / 24m30s We can split cases
            "./src/iSupplier/features/EditPotentialSupplier/IS-10842_EditPotentialSupplier.feature",//0s in L1 //L2- 25m we can divide
            "./src/iSupplier/features/UserCreation/IS_14108_UserCreationTestCases.feature",//0s in L1
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForMDM.feature",//0s in L1
            "./src/iSupplier/features/AppX/ALcode.feature",//0s in L1
            "./src/iSupplier/features/EmailTesting/IS-14317_EmailTesting3.feature",//L2 15m
            "./src/iSupplier/features/Filters/AllSuppliers/allSupplierPageFilters4.feature",//0 sec in L1 | L2 3m
            "./src/iSupplier/features/VerifyLegalName/VerifyLegalName.feature",//L1-> 6m / 5m50s
            "./src/iSupplier/features/CrossReferenceAddress/IS-13870_CrossReference5.feature"//L1-> 7m
          ], //Chunk3 //L1-> 37m20s | L2 45m
          [
            "./src/iSupplier/features/EditPotentialSupplier/IS-10828_Edit_PotentialSupplier.feature",//L1-> 17m15s / 17m44s  //L2- 41m 30s
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForOutboundIntegration.feature",//0s in L1
            "./src/iSupplier/features/AppX/BulkAppCases.feature",//0s in L1 //L2-4m
            "./src/iSupplier/features/DataIntegrity/dataintegrity_testcases_for_Attachment2.feature",//L1-> 18m30s /17m20s
            "./src/iSupplier/features/JupitarFacilityLevelView/IS-15458_JupitarFacilityLevelView.feature",//L1-> 3m //L2: 1m50s
          ], //Chunk4 //L1-> 35m30s / 38m | L2 45m 30sec
          [
            "./src/iSupplier/features/EditPotentialSupplier/IS-10824_PotentialSupplierTab.feature",//L1-> 16m /15m40s //L2:24m
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForOutboundIntegration2.feature",//0s in L1
            
            "./src/iSupplier/features/L0Run/CreatePotSupplier.feature",//0s in L1
            "./src/iSupplier/features/CrossReferenceAddress/IS-13870_CrossReference4.feature",//L1-> 13m /10m15s**
            "./src/iSupplier/features/Adoc-Reports/AdocReports.feature",//*4m 23s L1 Commented //L2- 5m
            "./src/iSupplier/features/EditPotentialSupplier/IS-10843_Edit_PotentialSupplier2.feature",// L2 18m 30sec
            "./src/iSupplier/features/DataIntegrity/IS-13537_DataIntegrityCasesForStatusTransaction.feature",//L1-> 8m51s / 8m30s
          ], //Chunk5 //L1-> 37m | L2 47m
          [
            "./src/iSupplier/features/ContactRegisrationStatus/IS-13819_ContactRegistrationStatus.feature",//L1-> 4m10s
            "./src/iSupplier/features/EmailTesting/IS-14317_EmailTesting.feature",//L1-> 28m /27m30s //L2- 20m WE can split cases
            "./src/iSupplier/features/EditPotentialSupplier/IS-10843_Edit_PotentialSupplier.feature",//0s in L1 //L2- 15m 
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForOutboundIntegration3.feature",//0s in L1
            "./src/iSupplier/features/iRisk/IS-13874_iRiskAssessment.feature",//0s in L1 | L2 14m
            "./src/iSupplier/features/SoftDelete/SoftDelete.feature",//L2
            "./src/iSupplier/features/ActivityOfMenu/viewActivityOfMenu.feature",//L1-> 1m20s /1m7s |L2 6m
            "./src/iSupplier/features/AdvanceSearch/advanceSearchButton.feature",//L1-> 5m / 3m10s
            "./src/iSupplier/features/EditPotentialSupplier/IS-10824_PotentialSupplierTab2.feature",//L1-> 1m
          ], //Chunk6 //L1-> 37m* | L2 44m
          [
            "./src/iSupplier/features/SupplierCreation/createSupplier.feature",  //L1-> 24m / 25m | L2 15m 30sec
            "./src/iSupplier/features/Filters/ApprovalsPage/filterOperationalSupplierRequests2.feature", // L2 7m
            "./src/iSupplier/features/Filters/ApprovalsPage/filterOperationalSupplierRequests3.feature", // L2 4m
            "./src/iSupplier/features/Ecovadis/IS-10637_External_Service_Providers_Reference_Master_Table.feature",//0 sec in L1
            "./src/iSupplier/features/Ecovadis/IS-10676_AllRequest_RequestTracking.feature",//0 sec in L1
            "./src/iSupplier/features/MyApprovalsOperationalActions/secondaryActionsOfApprovalsPage.feature",//L1-> 8m / 7m | L2: 40sec
            
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForPotentialSupplier.feature",//0 sec in L1
            "./src/iSupplier/features/VerifyOngoingErrorPopup/VerifyOngoingErrorPopup22.feature",//L1-> 3m / 2m55s
            "./src/iSupplier/features/iRisk/IS-13652_Launching_Supplier_RiskAssessment.feature",//0s in L1 | L2 12m 30sec
            "./src/iSupplier/features/Filters/AllSuppliers/allSupplierPageFilters2.feature",//0 sec in L1 | L2 7m
            "./src/iSupplier/features/Filters/SupplierListingPage/filterRepo.feature",//L1-> 30s
            "./src/iSupplier/features/AllSuplierActions/allSupplierViewSupplier_2.feature",// L1 1m30s /1m20s
            // "./src/iSupplier/features/Filters/MyRequestsPage/filterOnGoingRequests.feature",//L1-> 1m15s /1m30s | L2 32sec
          ], //Chunk7  //L1-> 37m* | L2 46m
          [
            "./src/iSupplier/features/Filters/AllSuppliers/allSupplierPageFilters.feature",//L1-> 32s | L2 6m
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchInAllSuppliers.feature",// L2: 1m
            "./src/iSupplier/features/EditSupplier/EditAndSubmit.feature",//L1-> 19m / 18m50s
             "./src/iSupplier/features/AddressContactsInRussian/IS-14251_AddressContactsRussianSupplierSide.feature",//L2: 37m
             "./src/iSupplier/features/EuropeanAddressFormat/IS-15957_EuAddress.feature",//L1-> 20m / 19m30s
            "./src/iSupplier/features/CRMSLastEditedOnDate/IS-9485_LastEditedOnForRepoUser.feature",//0 sec in L1 //L2- 12min test case commented
            "./src/iSupplier/features/AuditLog/auditlog.feature",//1m //commented all cases
            
          ], //Chunk8 //L1-> 37m30s  | L2 45m
          [
            "./src/iSupplier/features/DataIntegrity/IS-13538_PendingApproval.feature",//L1-> 25m47s /21m20s
            "./src/iSupplier/features/AppX/BulkAppCreate2.feature",//0 sec in L1 //L2- 32sec
            "./src/iSupplier/features/DateTypeTestCases/dateTestCases.feature",//L1-> 11m / 10m30s
            "./src/iSupplier/features/EditPotentialSupplier/IS-10811_Edit_PotentialSupplier_1.feature",//0 sec in L1 //L2- 41m  
            "./src/iSupplier/features/Notify/IS-13816_notifySupplier3.feature",//L1 *6m /6m 30s case commented 
            "./src/iSupplier/features/SmartAdminfeature/smartadminReferenceMaster.feature", //L2: 4m  
            "./src/iSupplier/features/DuplicateCheckABNACNCascadingFileds/IS-13868_DuplicateCheckCascadingField_2.feature"//L1-> 8m / 7m20s    
          ], //Chunk9  /L1-> 38m50s*  | L2 45m 32sec
          [
            "./src/iSupplier/features/EditPotentialSupplier/IS-10807_Edit_PotentialSupplier.feature",//L1-> 23m / 22m45s | L2:42m
            "./src/iSupplier/features/AppX/BulkAppCreate3.feature",//0 sec in L1 //L2- 33sec
            "./src/iSupplier/features/CrossReferenceAddress/IS-13870_CrossReference3.feature", //L1-> 11m30s /11m
            "./src/iSupplier/features/DBANAME/dbaNameTestCase.feature",//L1-> 1m
            "./src/iSupplier/features/AppX/BulkAppCreate.feature",//0s in L1 //L2- 32 sec
            "./src/iSupplier/features/TPI/Tpi.feature",//L3 TPI cases
            "./src/iSupplier/features/FacilityDelete/facilitydel.feature",
            "./src/iSupplier/features/Filters/CompletedRequestsApprovalsPage/filterPotentialCompletedApprovals2.feature",// L1-> 3m
            "./src/iSupplier/features/SIMRedisAPI/Plantapi.feature"//New simRedis cases
          ], //Chunk10  /L1-> 37m45s | L2 43m
          [
            "./src/iSupplier/features/DataIntegrity/IS-13599_AuditLogAllreqType.feature",//0 sec in L1 //all cases commented 0m
            "./src/iSupplier/features/Ecovadis/IS-10674_visibiltyOfActionsInMyrequestspage.feature",//0 sec in L1
            "./src/iSupplier/features/DataIntegrity/outboundEditDataIntegrityTestCase.feature",//L1-> 21m /21m22s
            "./src/iSupplier/features/SupplierHierarchy/ParentChild.feature",//L2: 27m
            "./src/iSupplier/features/Reassign/IS-14832_ReassignOlderRequest.feature",//L1-> 16m / 15m11s | L2: 8m
             
            "./src/iSupplier/features/ViewActivityDetailsInReqListing/IS-14688_ViewActivityDetailsVerificationInRequestListing.feature",//L1-> 2m30s | L2: 6m30s
            "./src/iSupplier/features/AdvanceSearch/IS-14756_AllContactTypeFilters.feature",//0s in L1 //L2- 4m 10sec
          ], //Chunk11 /L1-> 39m / 38m50s | L2 45m
          [
            "./src/iSupplier/features/AdvanceSearch/advancedSearchEditSupplier.feature",//0 sec in L1 //comented 0m //L2- 47sec
            "./src/iSupplier/features/DataIntegrity/outboundExtendDataIntegrity.feature",//L1-> 15m10s / 14m
            "./src/iSupplier/features/Filters/AllRequestsPage/filterAllRequest.feature",//L1-> 1m |L2 6m
            "./src/iSupplier/features/EditPotentialSupplier/IS-10824_EditPotentialSupplier_2.feature",//0s in L1 //L2- 41m 
            "./src/iSupplier/features/DataIntegrity/IS-13538_PendingApproval2.feature",//L1-> 18m50s /16m28s
            "./src/iSupplier/features/SorlAndRedisDataIntegrity/IS-14165_SolrAndRedisDataIntegrity.feature",//L1-> 22s
            "./src/iSupplier/features/ViewRepo/viewRepo.feature",//L1-> 1m40s / 2m
            "./src/iSupplier/features/ManualAlert/manualAlert_2.feature"//L1-> 3m / 3m20s |
          ], //Chunk12 /L1-> 35m / 37m | L2 48m
          [
            "./src/iSupplier/features/MyApprovalsOperationalActions/IS-13817_rejectOperationalSupplier3.feature",//L1-> 11m20s /10m52s
            "./src/iSupplier/features/PotentialSupplierListingActions/secondaryActionsPotential.feature",//L1-> 30s
            "./src/iSupplier/features/DeleteRequest/IS-9357_Delete9357.feature",//0s in L1 // L2- 48m 30sec we can divide
            "./src/iSupplier/features/DataIntegrity/IS-13543_Deactivateanactivesupplier.feature",//L1-> 25m40s /25m
            "./src/iSupplier/features/EditSupplier/EditAndSubmit2.feature", //L1-> 1m45s /1m30s
          ], //Chunk13 /L1-> 38m40s / 38m | L2 48m 30sec
          [
            "./src/iSupplier/features/Ecovadis/IS-10675_AuditLogTrailUpdate_RequestTracking.feature",//0s in L1
            "./src/iSupplier/features/DataIntegrity/IS-13549_DataIntegrityForOutbound2.feature",//L1-> 14m15s / 13m50s
            "./src/iSupplier/features/DataIntegrity/dataintegrity_testcases_for_Attachment4.feature",//L1-> 17m / 16m10s
            "./src/iSupplier/features/AddressContactsInRussian/IS-14251_AddressContactsRussianSupplierSide2.feature",// L2 26m 20sec
            "./src/iSupplier/features/CRMS/CRMS6.feature",//0 Sec in L1 //L2- 24m
            "./src/iSupplier/features/RequestListingActions/requestListingAction3.feature"//L1-> 7m / 6m30s
          ], //Chunk14 /L1-> 38m / 36m30s | L2 50m
          [
                  
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierExtend.feature",//0s in L1 //L2- 6m 20sec
            "./src/iSupplier/features/DataIntegrity/dataintegrity_testcases_for_Attachment1.feature",//L1-> 18m  /17m40s     
            "./src/iSupplier/features/MyApprovalsPotentialActions/viewActivityPotentialCompletedRequest.feature",//L2: 40sec
            "./src/iSupplier/features/MyRequestPage/ViewOnGoingRequest.feature",//0s in L1            
            "./src/iSupplier/features/Ecovadis/IS-10671_MyRequest_RequestTracking.feature",//0s in L1
            "./src/iSupplier/features/Ecovadis/IS-10543_VisibilityOfAssesmentInSecondaryActions.feature",//0s in L1
            "./src/iSupplier/features/DataIntegrity/IS-13540_DataIntegrityForApprovedToCompleted.feature",//L1-> 11m40s /10m34s
            "./src/iSupplier/features/Forum/forum.feature",//0s in L1    
            "./src/iSupplier/features/Pagination_AllListing/Pagination.feature",//L1-> 3m30s | L2:3m
            "./src/iSupplier/features/ManualAlert/manualAlert.feature",// L2 7m
            "./src/iSupplier/features/EditPotentialSupplier/IS-10811_AllSuppliersTab1.feature",//L2 26m
            "./src/iSupplier/features/SIMRedisAPI/SupplierContactAPI.feature",// new SimRedis api cases
            "./src/iSupplier/features/Notify/IS-13816_notifySupplier2.feature",//L1-> 7m /6m41s
          ], //Chunk15 //L1-> 36m* / 38m | L2 44m
          [
            "./src/iSupplier/features/MyApprovalsOperationalActions/IS-13817_rejectOperationalSupplier.feature",//L1-> 14m* /13m19s
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierDeleteSupplier.feature",//L1-> 13m15s / 11m36s
            "./src/iSupplier/features/IS-10889_ViewSupplierDuplicateCheck/ViewSupplier_Globalprofile_Duplicatecheck.feature",//0s in L1
            "./src/iSupplier/features/FacilityLevel/facilityLevelOnHold.feature",//0 sec in L1 | L2 16m
            "./src/iSupplier/features/DataIntegrity/IS-13598_ModificationHistory.feature",//L1-> 10m50s / 8m20s
            "./src/iSupplier/features/ZSN/IS-14554_MyRequestAndCompletedRequestPop-Up.feature",//L2 29m
            "./src/iSupplier/features/CRMS/CRMS_CycleTime.feature", //New cases 
            "./src/iSupplier/features/ErrorCard/errorCard.feature",//L1-> 5m
            
          ], //Chunk16 /*L1-> 34m / 38m | L2 45m
          [
            "./src/iSupplier/features/DataIntegrity/IS-13545_Onholdactivesupplier.feature",//L1-> 28m /27m32s
            "./src/iSupplier/features/Filters/ApprovalsPage/FilterHardCodedSupplier.feature",//0s in L1
            "./src/iSupplier/features/DeleteRequest/IS-9354_Delete9354_2.feature",//L1-> 8m20s /9m53s
            
            "./src/iSupplier/features/ManageTranslation/IS-14111_SuppliersFromManageTranslation.feature",//L2: 43m
            "./src/iSupplier/features/AppConfigAndManageView/IS-14451_AppConfig.feature",//0s in L1 //L2- 3m 22sec
          ], //Chunk17 /L1-> 38m / 38m | L2 46m
          [
            "./src/iSupplier/features/Notify/IS-13816_notifySupplier.feature",//L1-> 14m20s / 14m | L2 16m 24sec
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierNotifySupplier.feature",//L1-> 22m /21m25s
            "./src/iSupplier/features/Filters/MyRequestsPage/MyRequestFilters.feature",//0s in L1 | L2 5m 30sec
            "./src/iSupplier/features/MyPreferences/IS-14513_myPrefrences.feature",//0s in L1 | L2 1m
            "./src/iSupplier/features/ZSN/ZSNintegration.feature",
            "./src/iSupplier/features/TestDriveValidationLegalName/IS-14694_TestDriveLegalNameValidation.feature",//0s in L1
            
            "./src/iSupplier/features/AdvanceSearch/IS-14839_AdvanceSarchDateFilter.feature",//0s in L1 //L2- 2m 44sec
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchFilterPotentialSupplier.feature",//L1-> 20s | L2:1m
            "./src/iSupplier/features/MyApprovalsPotentialActions/RejectSupplierRequest.feature",//L2: 13m
            "./src/iSupplier/features/AppX/BulkAppEnhancement.feature",
            "./src/iSupplier/features/PotentialSupplierListingActions/viewPotentialSupplier.feature",//21sec in L1
            "./src/iSupplier/features/OperationalSupplierListingActions/viewSupplierRepo.feature",//17sec in L1
            "./src/iSupplier/features/MyApprovalsOperationalActions/viewActivityOperationalOngoingRequest.feature",//12sec in L1
          ], //Chunk18   //*L1-> 37m30s* /36m30s | L2 44m
          [
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierGlobalLevel.feature",//L1-> 17m* /15m7s
            "./src/iSupplier/features/AdvanceSearch/IS-14757_EmailSearchInAllFormat.feature",//0s in L1 //L2- 4m 
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchFilter.feature",//L1-> 20s  | L2:3m 20sec
            "./src/iSupplier/features/PotentialSupplierListingActions/potentialSupplierCustomizeTableColumns.feature",//0s in L1 //L2- 2m 15sec
            "./src/iSupplier/features/OperationalSupplierListingActions/customiseTableColumns.feature",//0s in L1 //L2- 2m 20sec
            "./src/iSupplier/features/OperationalSupplierListingActions/columnSortingOfOperationalSupplier.feature",//0s in L1 //L2- 1m 40sec
            "./src/iSupplier/features/ManageViewCreation/IS-14837_PotentialSupplierEditLabelCheck.feature",//0s in L1 //L2- 31sec
            "./src/iSupplier/features/PotentialSupplierListingActions/columnSortingOfPotentialSupplier.feature",//0s in L1 //L2- 30sec
            "./src/iSupplier/features/CancelNavigation/CancelNavigationallactions.feature",//0s in L1 //L2- 51sec
            "./src/iSupplier/features/FlexiHelp/advancedSearchHelp.feature",//0s in L1 | L2 1m 45sec
            "./src/iSupplier/features/FlexiHelp/AllRequestsFlexiHelp.feature",//0s in L1 | L2 45sec
            "./src/iSupplier/features/FlexiHelp/createSupplierHelp.feature",//0s in L1
            "./src/iSupplier/features/AdvanceSearch/IS-14840_AttachmentTypeFilter.feature",//0s in L1 //L2- 2m 21sec
            "./src/iSupplier/features/ReferenceMasterCreation/IS-14552_systemFacilityMapping.feature",//L2: 1m
            "./src/iSupplier/features/SupplierCount/SupplierCount.feature",//L2: 1m30s
            "./src/iSupplier/features/FlexiHelp/manualAlertHelp.feature",//0s in L1 | L2 1m
            "./src/iSupplier/features/FlexiHelp/activityHelp.feature",//0s in L1 | L2 1m 7sec
            "./src/iSupplier/features/FlexiHelp/MyRequestFlexiHelp.feature",//0s in L1| L2 1m 10sec
            "./src/iSupplier/features/FlexiHelp/ComapnyDtaExportsHelp.feature",//0s in L1 | L2 1m 10sec
            "./src/iSupplier/features/MyApprovalsOperationalActions/IS-13817_rejectOperationalSupplier2.feature",//L1-> 7m / 8m
            "./src/iSupplier/features/EmailTesting/IS-14317_EmailTesting2.feature",//L2 18m 30sec
            "./src/iSupplier/features/DataIntegrity/dataIntegrityOnboardSaveAsDraft.feature",//L1-> 13m30s /12m20s
            "./src/iSupplier/features/Filters/SupplierListingPage/openSearchInAllSuppliers_2.feature",//L1-> 1m10s
            "./src/iSupplier/features/Filters/MyRequestsPage/filterOnGoingRequests.feature",//L1-> 1m15s /1m30s | L2 32sec
          ], //Chunk19  /L1-> 38m** / 37m20s | L2 48m
          [
            
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierFacilityLevel.feature",//L1-> 32m30s /31m40s -------> 34m
            "./src/iSupplier/features/FlexiHelp/auditHistoryHelp.feature",//0s in L1 //L2- 1m 10sec
            "./src/iSupplier/features/FlexiHelp/autoAlertHelp.feature",//0s in L1 | L2 1m 8sec
            "./src/iSupplier/features/FlexiHelp/preQualificationHelp.feature",//0s in L1| L2 1m10sec
            "./src/iSupplier/features/Ecovadis/IS-10518_VisibilityInPotentialSuppliers.feature",//L2 40sec
            "./src/iSupplier/features/CompareSuppliers/CompareOpSuppliers.feature",//0s in L1 //L2- 1m 40sec
            "./src/iSupplier/features/FlexiHelp/ContactRegistrationHelp.feature",//0s in L1 | L2 1m 10sec
            "./src/iSupplier/features/CompareSuppliers/ComparePotSuppliers.feature",//0s in L1 //L2- 1m 45sec
            "./src/iSupplier/features/MyApprovalsPotentialActions/customizeTableColumnOperationalApproval.feature",//0s in L1 //L2- 2m 10sec
            "./src/iSupplier/features/MyRequestPage/customizeTableColumnMyRequest.feature",//0s in L1 | L2 2m 30sec
            "./src/iSupplier/features/VisibilityOfModulesInContactDetails/S-14229_VisibilityOfModulesInContactDetails.feature",//0s in L1 //L2- 2m 25sec
            "./src/iSupplier/features/FlexiHelp/ApprovalFlexiHelp.feature",//0s in L1 | L2 1m 30sec
            "./src/iSupplier/features/AllSuplierActions/allSupplierColumnSorting.feature",//0s in L1 //L2- 1m 40sec
            "./src/iSupplier/features/MyApprovalsPotentialActions/customizeTableColumnPotentialApprovals.feature",//0s in L1 //L2- 2m 15sec
            "./src/iSupplier/features/AppX/EditAppxValidations.feature",//0s in L1 //L2- 30sec
            "./src/iSupplier/features/MyRequestPage/ModificationHistory.feature",//0s in L1 | L2 5m
            "./src/iSupplier/features/CRMS/CRMS4.feature",//0s in L1 //L2- 7m 16sec
            "./src/iSupplier/features/ContactRegisrationStatus/IS-13819_ContactRegistrationStatus2.feature",//L2 6m
            "./src/iSupplier/features/AdvanceSearch/advancedSearchExtendSupplier.feature",//L1-> 8m /7m40s ---------> 8m41s
          ], //Chunk20 /L1-> 39m / 39m20s | L2 44m
          [
            "./src/iSupplier/features/OnboardPotentialSupplier/onboardPotentialSupplier.feature",//L1-> 23m* / 22m30s | L2 27m
            "./src/iSupplier/features/SupplierViaZSN/createSupplierZSN.feature",//L2: 14m
            "./src/iSupplier/features/Pre-PackagedReport/Reports.feature",//L1:*5m all cases commented
            "./src/iSupplier/features/AllSuplierActions/allSupplierCustomiseTblColumns.feature",//0s in L1 //L2- 2m 10 sec
            "./src/iSupplier/features/CompareSuppliers/compareAllSupplier.feature",//0s in L1 //L2- 1m 40sec
            "./src/iSupplier/features/PreQualification/EditPreQualification.feature",//L1-> 4m40s / 5m
            "./src/iSupplier/features/Quick Links/quickLinks.feature",//L1-> 15s | L2: 2m
            "./src/iSupplier/features/RequestListingActions/requestListingAction4.feature"//L1-> 10m
            
          ], //Chunk21 /L1-> 38m / 37m | L2 45m
          [
            
            "./src/iSupplier/features/CRMS/CRMS.feature",//0s in L1 //L2-13m
            "./src/iSupplier/features/AppConfigAndManageView/IS-14451_ManageView.feature",//0s in L1 //L2- 16m - we can divide
            
            "./src/iSupplier/features/EditPotentialSupplier/IS-14109_Edit_PotentialSupplier_WithoutEditAccess.feature",//L1-> 12m35s /12m
            "./src/iSupplier/features/Navigations/Navigations.feature",//L1-> 4m45s / 3m | L2 2m 20sec
            
            "./src/iSupplier/features/Filters/ApprovalsPage/filterPotentialSupplierRequests.feature",//L1-> 28s | L2 6m 30sec
            "./src/iSupplier/features/DeleteRequest1/DeleteRequest.feature",//0s in L1 //L2- 4m
            "./src/iSupplier/features/AllRequest/customizeTableCloumnAllRequest.feature",//0s in L1 //L2- 3m
            "./src/iSupplier/features/TaxId/TaxId.feature",//L1 *6m case commented
            "./src/iSupplier/features/OperationalSupplier/Operational_supplier.feature",//L1-> 25s
            "./src/iSupplier/features/CrossReferenceAddress/IS-13870_CrossReference.feature",//L1-> 19m / 20m45s
            "./src/iSupplier/features/VerifyOngoingErrorPopup/VerifyOngoingErrorPopup44.feature"//L1 -> 3m
          ], //Chunk22 /L1-> 37m / 39m  | L2 45m
          [
            "./src/iSupplier/features/AllSuplierActions/allSupplierViewSupplier.feature",// L2:1m
            "./src/iSupplier/features/DataIntegrity/dataIntegrityEndToEndTestCases2.feature",//L1-> 26m /23m40s
            "./src/iSupplier/features/ContactRegistrationPage/ContactRegistrationPage.feature",//0s in L1 | L2 5m
            "./src/iSupplier/features/BiDi/IS-15221_BiDi.feature",//0s in L1 //L2- 23m 
            "./src/iSupplier/features/V2Api/V2API.feature",//L2: 3m
            "./src/iSupplier/features/CRMS/CRMS2.feature",//0s in L1 //L2- 12m 10sec
            "./src/iSupplier/features/RequestListingActions/requestListingAction2.feature"//L1-> 23m /14m 
          ], //Chunk23 /L1-> 40m / 37m | L2 44m 33sec
          [   
            
            "./src/iSupplier/features/GlobalLevel/globalLevelOnHold.feature",//L1-> 19m / 17m51s
            "./src/iSupplier/features/ShowFacilitiesinAllLocations/IS-14550_Show_FacilitiesIn_AllLocations.feature",//0s in L1
            "./src/iSupplier/features/Filters/ApprovalsPage/filterPotentialSupplierRequests2.feature",// L2 5m
            "./src/iSupplier/features/IntegrationTestCase/IS-15050_IntegrationTestCase.feature",//0s in L1 //L2- 24m 22sec
            "./src/iSupplier/features/SupplierCreation/IS-15197_W8W9TaxId.feature",//L2: 1m40s
            "./src/iSupplier/features/CRMS/CRMS3.feature",//0s in L1 //L2- 6m 47sec
            "./src/iSupplier/features/ExtendSupplier/extendSupplier.feature",//L1-> 12m / 11m40s we can split --------------->
            "./src/iSupplier/features/CompanyDataExport/comapanyDataExport.feature",//45s in L1 56s //L2-5m

            "./src/iSupplier/features/RequestListingActions/requestListingAction5.feature"//L1-> 8m
          ], //Chunk24 /L1-> 38m / 38m | L2 43m
          [
            "./src/iSupplier/features/Admin/DownLoads.feature",//0s in L1 //L2 3m
            "./src/iSupplier/features/AppConfigAndManageView/CrmsReportingCheckBox.feature",//0s in L1 //L2 3m 
            "./src/iSupplier/features/EditSupplier/editSupplierWithAddNewAddress.feature",//L1-> 19m /18m50s //L2- 13m we can split 1m case
            "./src/iSupplier/features/RequestListingActions/RequestListingActionEditCancel.feature",//L1-> 10m / 9m we can split if required
            "./src/iSupplier/features/DeleteRequest/IS-9354_Delete9354_3.feature",//L1-> 12m40s / 11m50s
            "./src/iSupplier/features/AppX/PositiveUpdateTestcases.feature",//0s in L1 //L2- 13m 30sec
            "./src/iSupplier/features/HomeBreadCrumb/BreadCrumb.feature",//0s in L1 | L2 6m
            "./src/iSupplier/features/DeleteRequest/IS-9356_Delete9356.feature",//0s in L1 //L2-6m 
          ], //Chunk25 /L1-> 40m / 39m40s | L2 45m
          [
            "./src/iSupplier/features/VerifyOngoingErrorPopup/VerifyOngoingErrorPopup.feature",//L1-> 11m / 7m //L2- 13m ----> split
            "./src/iSupplier/features/MyDesk/myDesk.feature",//L1-> 3m |L2 4m 30sec
            "./src/iSupplier/features/MyApprovalsOperationalActions/viewOperationalCompletedRequest.feature",//L1 1m case commented
            "./src/iSupplier/features/AuditHistroy/AuditHistory.feature",//41s in L1 | L2 5m 30sec
            "./src/iSupplier/features/EditSupplier/EditAndSubmit3.feature",//L2 15m 50sec
            "./src/iSupplier/features/Pre-PackagedReport/Reports1.feature",//L2 4m
            "./src/iSupplier/features/DataIntegrity/IS-13595_DataIntegrityForEnteredDataInSubview.feature",//L1-> 12m / 10m
            "./src/iSupplier/features/DataIntegrity/IS-13597_MultilingualDataInputCases.feature",//L1-> 10m30s /9m50s
            "./src/iSupplier/features/ErrorCard/errorCard_2.feature",//L1-> 4m /4m23s
            "./src/iSupplier/features/VerifyLegalName/VerifyLegalName4.feature",//L1-> 2m10s
            "./src/iSupplier/features/DeleteRequest/IS-9358_Delete9358_2.feature",//L1 *3m /3m31s
          ], //Chunk26 /L1-> 39m / 36m10s | L2 43m
          [
            "./src/iSupplier/features/FacilityLevel/facilityLevelDeactivate.feature",//L1-> 16m30s /16m41s
            "./src/iSupplier/features/EditPotentialSupplier/IS-14109_Edit_PotentialSupplier_MandatoryCheck.feature",//L1-> 10m30s /8m27s
            "./src/iSupplier/features/OlderRequestEditSubmitApprove/IS-14553_OlderReqSubmitApprove.feature",//L1-> 9m /10m
            "./src/iSupplier/features/WorkFlow/Case2_EditSupplierSubWorkflow.feature",//0s in L1 | L2 21m
            "./src/iSupplier/features/MyApprovalsPotentialActions/viewPotentialOngoingRequest.feature",//23s in L1
            "./src/iSupplier/features/CRMS/CRMS5.feature",//0s in L1 //L2- 9m 35sec
            "./src/iSupplier/features/Filters/CompletedRequestsApprovalsPage/filterOperationalCompletedApprovals2.feature",// L2 18m 30sec
            "./src/iSupplier/features/Admin/adminSettings.feature",//L1-> 3m30s
          ], //Chunk27  /L1-> 35m30s / 38m30s | L2 48m
          [
            "./src/iSupplier/features/RequestListingActions/requestListingAction.feature",//L1-> 29m /23m
            "./src/iSupplier/features/WorkFlow/EditSupplierParallelWorkflow.feature",//0s in L1 | L2 22m
            "./src/iSupplier/features/AllSupplierPrimaryActions/allSupplierAdvanceSearch.feature",//L1-> 9m40s / 9m
            // "./src/iSupplier/features/AllSuplierActions/allSupplierSecondaryActions.feature",//L1-> 1m50s | L2: 1m
            "./src/iSupplier/features/Filters/SupplierListingPage/filterPotentialSupplier.feature",//L1-> 38s | L2 7m
            "./src/iSupplier/features/DeleteRequest/IS-9360_Delete9360.feature",//0s in L1 //L2- 6m 30sec
            "./src/iSupplier/features/MyApprovalsPotentialActions/ApproveOperationalRequest.feature",//0s in L1 //L2- 4m 41sec
            "./src/iSupplier/features/Referance_Master_UpdateandAdd/IS-14918_ReferanceMasterUpdate.feature",//L2: 1m
            "./src/iSupplier/features/DataIntegrity/IS-14319_FacilityValidation.feature",//0s in L1 //L2- 6m
            "./src/iSupplier/features/JupitarGlobalLevelView/IS-15459_JupitarGlobalLevelView2.feature"//L1-> 3m10s
          ], //Chunk28 /L1-> 39m / 36m | L2 42m
          [
            "./src/iSupplier/features/WorkFlow/Case1_EditSupplierSubWorkflow.feature",//0s in L1 | L2 20m
            "./src/iSupplier/features/DuplicateCheckABNACNCascadingFileds/IS-13868_DuplicateCheckCascadingField.feature",//L1-> 26m30s / 27m50s we can split 
            "./src/iSupplier/features/DataIntegrity/IS-13818_Reassignrequet2.feature",//L1-> 12m30s /10m30s
            "./src/iSupplier/features/AllSuplierActions/allSupplierNavigation.feature",//L1-> 25s
            "./src/iSupplier/features/SupplierActsOnManualAlert/IS-13897_ManualAlertEndToEnd.feature",//L2: 15m
            "./src/iSupplier/features/DiversityApitest/DiversityAPITesting2.feature",//L2 11m
            "./src/iSupplier/features/ResetRequest/IS-21580_ResetRequest.feature" //Reset request new cases
          ], //Chunk29 /L1-> 39m / 38m45s | L2 46m
          [
           
            "./src/iSupplier/features/DataIntegrity/dataintegrity_testcases_for_Attachment.feature",//L1-> 20m / 19m20s
            "./src/iSupplier/features/OutboundTestCases/OutboundStatusChange.feature",//L2: 57m 45sec
            "./src/iSupplier/features/GlobalLevel/globalLevelDeactivate.feature",//L1-> 15m30s / 14m38s
            "./src/iSupplier/features/PreQualification/PreQualification_Status.feature",//L1-> 2m
          ], //Chunk30 /L1-> 42m / 36m  | L2 57m 45sec
          [
            
            "./src/iSupplier/features/EditPotentialSupplier/IS-10811_AllSuppliersTab.feature",//L1-> 18m /19m //L2- 29m 
            "./src/iSupplier/features/AdvanceSearch/advancedSearchExport.feature",//L1-> 12m /11m //L2- 1m 53sec
            "./src/iSupplier/features/ReferenceMasterCreation/IS-14110_ReferenceMasterCreation.feature",//L2: 12m
            
            "./src/iSupplier/features/JupitarFacilityLevelView/Supplier Listing - Supplier Facility View_2.feature"//L1-> 6m / 6m13s
          ],//Chunk31 /L1-> 39m / 39m30s | L2 44m
          [
            "./src/iSupplier/features/BulkTestCases/bulkRelatedTestCases.feature",//L1-> 36m /37m30s
            
            "./src/iSupplier/features/Filters/CompletedRequestsApprovalsPage/filterPotentialCompletedApprovals.feature",// L2 17m
            "./src/iSupplier/features/DeleteRequest/IS-9358_Delete9358.feature",  //L2- 26m we can divide
          ],//Chunk32 //L1-> 39m /37m30s | L2 44m 
          [
            "./src/iSupplier/features/DataIntegrity/IS-13543_Deactivateanactivesupplier2.feature",//L1-> 24m50s /22m45s
            
            "./src/iSupplier/features/SupplierViaZSN/createSupplierZSN1.feature",//L2 43m
            "./src/iSupplier/features/ResetRequest/IS-21580_ResetRequest_2.feature",// L2 new case
            "./src/iSupplier/features/RepoUser/repoUser_1.feature",//L1-> 9m10s /9m20s
            "./src/iSupplier/features/DataIntegrity/IS-13596_DataIntegrityForSaveAndSubmitAndAuditTrail2.feature",//L1-> 7m /6m12s
          ],//Chunk33 /L1-> 41m / 38m | L2 43m
          [
            "./src/iSupplier/features/DataIntegrity/DataIntegrityAuditTrail.feature", //L1-> 32m /34m
            "./src/iSupplier/features/RepoUser/repoUser.feature",// | L2 11m 30sec
            "./src/iSupplier/features/WorkFlow/ParllelWorkflow.feature",//L2 20m
            "./src/iSupplier/features/RequestDashBoardSearch/RequestDashBoardSearch.feature",//L2: 5m
            "./src/iSupplier/features/MyApprovalsPage/ApproveOperationalRequest.feature",//0s in L1 //L2- 4m 30sec
          ],//Chunk34  //L1-> 40m / 34m | L2 47m
          [
            "./src/iSupplier/features/InboundCreateSupplier/IS-15327_InboundCreateSupplier.feature",//L1-> 32m / 32m30s | L2 4m
            "./src/iSupplier/features/DiversityApitest/DiversityAPITesting.feature" ,//L2: 13m
            "./src/iSupplier/features/OperationalSupplierListingActions/secondaryActions.feature",//L1-> 25s
            "./src/iSupplier/features/AutoAlert/autoAlert.feature",//L1-> 5m50s //L2- 4m 50sec
            "./src/iSupplier/features/MyRequestPage/viewCompletedRequest.feature",//21s in L1
            "./src/iSupplier/features/CustomSearch/LegalStructureCheck.feature",//L2 47s
            "./src/iSupplier/features/EditPotentialSupplier/IS-10842_EditPotentialSupplier1.feature"//L2 24m
          ],//Chunk35 /L1-> 39m / 38m20s| L2 46m
          [
            
            "./src/iSupplier/features/DeleteRequest/IS-9354_Delete9354_4.feature",//L1-> 7m50s / 8m20s //L2- 30sec
            "./src/iSupplier/features/VerifyOngoingErrorPopup/VerifyOngoingErrorPopup33.feature",// L2 *8m /7m27s
            "./src/iSupplier/features/InboundCreateSupplier/IS-15327_InboundCreateSupplier2.feature",//L1-> 9m40s /9m35s we can plan for split
            "./src/iSupplier/features/DataIntegrity/IS-13530_dataIntegrityForSaveAsDraft2.feature",//L1-> 9m30s /7m
            "./src/iSupplier/features/Filters/ApprovalsPage/filterOperationalSupplierRequests.feature", //L1-> 2m | L2 4m
            "./src/iSupplier/features/EditPotentialSupplier/IS-10842_Edit_PotentialSupplier.feature",//0s in L1 //L2- 38m - we can divide
            "./src/iSupplier/features/FlexiHelp/SupplierFlexiHelp.feature",//0s in L1 | L2 3m
            "./src/iSupplier/features/DataIntegrity/IS-13536_View&Export.feature",//L1-> 1m17s | L2: 6m
            "./src/iSupplier/features/AllSuplierActions/allSupplierSecondaryActions.feature",//L1-> 1m50s | L2: 1m
          ],//Chunk36 /L1-> 37m* / 36m | L2 46m
          [
             "./src/iSupplier/features/DeleteRequest/IS-9354_Delete9354.feature",//L1-> 10m15s / 9m23s | L2 1m
             "./src/iSupplier/features/EditPotentialSupplier/IS-10844_Edit_PotentialSupplier.feature",//L1-> 16m / 16m12s | L2: 42m
             "./src/iSupplier/features/VerifyLegalName/VerifyLegalName3.feature",//L1-> 8m /8m40s
             "./src/iSupplier/features/DeleteSupplier/deleteSupplier.feature", //L1-> 5m /5m
          ],//Chunk37 /L1-> 39m* /39m15s | L2 43m
          [
            "./src/iSupplier/features/SystemFacilitySearchBar/IS-12271_Systemfacility_Search.feature",//L1-> 6m /5m40s | L2: 45m
            "./src/iSupplier/features/ViewSupplier/viewSupplier.feature",//L1-> 10m* /10m
            "./src/iSupplier/features/DataIntegrity/IS-13818_Reassignrequet.feature",//L1-> 15m /13m32s
            "./src/iSupplier/features/SupplierCreation/createSupplier2.feature",//L1-> 8m /9m
          ],//Chunk38 /L1-> 39m / 38m10s | L2 45m
          [
          "./src/iSupplier/features/VerifyLegalName/VerifyLegalName2.feature",//L1-> 20m /17m20s
          "./src/iSupplier/features/DataIntegrity/dataIntegrityEndToEndTestCases.feature",//L1-> 21m /22m9s
          "./src/iSupplier/features/SupplierViaZSN/createSupplierZSN2.feature",//L2 22m 30sec
          "./src/iSupplier/features/CRMS/CRMS1.feature",//0s in L1 //L2- 18m
          "./src/iSupplier/features/NotificationManager/IS-14569_NotificationManagerAutomation.feature",//0s in L1 | L2 4m
          ],//Chunk39 /L1-> 39m / 39m L2 45m
          [
            "./src/iSupplier/features/OnboardPotentialSupplier/onboardPotentialSupplier2.feature",//L1-> 14m30s / 14m
            "./src/iSupplier/features/DataIntegrity/IS-13545_Onholdactivesupplier2.feature",//L1-> 16m / 14m50s
            "./src/iSupplier/features/JupitarGlobalLevelView/IS-15459_JupitarGlobalLevelView.feature", //L1-> 5m20s /3m
            "./src/iSupplier/features/Filters/SupplierListingPage/filterOperationalSupplier.feature",//0s in L1 | L2 11m
            "./src/iSupplier/features/DeleteRequest/IS-9358_Delete9358_1.feature",//L2 28m40sec
            "./src/iSupplier/features/AdvanceSearchCriteriaForDBAPresent/IS-14687_AdvsearchDBAPresentCriteria.feature",//L2: 3m
            "./src/iSupplier/features/InboundCreateSupplier/InboundStatusChangeEdit1.feature",//L2 14m new test case Pine
            "./src/iSupplier/features/EditPotentialSupplier/IS-10807_Edit_PotentialSupplier2.feature",//L1-> 7m /5m34s
          ],//Chunk40 /L1-> 38m / 37m40s | L2 45m
      
        ]
      },
    }
  },
  gherkin: {
    features: "./src/iSupplier/features/**/*.feature",
    //steps: "./dist/iSupplier/implementation/**/*.js",
    steps: "./dist/**/implementation/**/**/*.js"
  },
  name: prop.projectName,
  plugins: {
    //     stepByStepReport: {
    // "enabled": true,
    // "deleteSuccessful": false,
    // "animateSlides": true,
    // "fullPageScreenshots": true,
    // "screenshotsForAllureReport": true
    // },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true,
      maxTimeout: 15000,
      minTimeout: 1000,
      retries: 7,
    },

    screenshotOnFail: {
      enabled: true
    },
    // wdio: {
    //   enabled: true,
    //   services: ["selenium-standalone"]
    // },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    }
  }
};