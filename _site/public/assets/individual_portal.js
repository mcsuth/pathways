/**
 * @author Sunil Desu, Felix Cheng
 */
var indPortalApp = angular.module('indPortalApp', ['ngRoute', 'ui.mask', 'ngResource', 'angularFileUpload']);
var hhdetails ="";
var mmdetails ="";
var addDetails ="";
var oComments="";

indPortalApp.config(['$routeProvider', '$locationProvider',
                    function($routeProvider, $locationProvider) {
                      $routeProvider.
                      when('/', {
                          templateUrl: 'portalHome',
                          controller: 'indPortalAppCtrl'
                        }).
                        when('/applications', {
                            templateUrl: 'myApplications',
                            controller: 'indPortalAppCtrl'
                          }).
                        when('/contactus', {
                              templateUrl: 'contactUs',
                              controller: 'indPortalAppCtrl'
                            }).                          
                         when('/eligibilityresults', {
                                templateUrl: 'eligibilityResults',
                                controller: 'indPortalAppCtrl'
                            }).                           
                         when('/additionalinfo', {
                                templateUrl: 'additionalinfo',
                                controller: 'indPortalAppCtrl'
                            }).   
                         when('/plansummary', {
                                templateUrl: 'plansummary',
                                controller: 'indPortalAppCtrl'
                            }).   
                        when('/submitappeal', {
                            templateUrl: 'appeals',
                            controller: 'indPortalAppCtrl'
                        }).
                        when('/overridehistory', {
                            templateUrl: 'overridehistory',
                            controller: 'indPortalAppCtrl'
                        }).
                        when('/appeals', {
                            templateUrl: 'appeals',
                            controller: 'indPortalAppCtrl'
                        }).
                        otherwise({
                          redirectTo: '/'
                        });
                    }]);


indPortalApp.controller('indPortalAppCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.csractions = function() {
		$scope.csroverride = true;
		$('#csrMenu').slideToggle();
	};
		  
		  
	$scope.modalForm = {};
	$scope.cancelApplicationAlert = function(params) {
		$scope.caseNumber = params;
		$scope.modalForm.openDialog = true;
	};
	
	$scope.reportaChange = function() {
		$scope.openDialoglce = true;
	};	
	
	$scope.disenrollAlert = function() {
		$scope.disenrollDialog = true;
	};	
	
	$scope.disenrollmentReason = function() {
		$scope.disenrollDialog = false;
		$scope.areYourSureDialog = true;
	};
	
	$scope.submitDisenrollment = function() {
		$scope.areYourSureDialog = false;
		$scope.submitDisenrollmentDialog = true;
	};
	
	$scope.goTo = function(dest){
		$location.path(dest);
	};

	$scope.modelattrs = 
	                 {'aptc': $('#aptc').val(),
	                  'csr': $('#csr').val(),
	                  'sCode':$('#sCode').val(),
	                  'caseNumber':$('#enrollCaseNumber').val()}
	               ;
	$scope.showEligibilityDetailsFromHome= function(event){
		$scope.showEligibilityResults(event.target.id);
	};
	
	$scope.preEnroll= function(event){
		var postData = 'caseNumber=' + event.target.id;
		var params = {
				"csrftoken": $('#tokid').val()
		};
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			params:params
		};
		var response = $http.post('indportal/getApplicantsForAddInfo', postData, config);
		response.success(function(data, status, headers, config) {
			addDetails = data["details"];
			$location.path('/additionalinfo');
		});
		response.error(function() { 
			$scope.openInitFail = true;
		});		
	};
	
	$scope.showApplicantDetails = function(){
		$scope.additionalDetails = addDetails;	
	};
	
	$scope.enrollAfterTobacoo = function (){
		var postdata = angular.toJson($scope.additionalDetails);
		var params = {
				"csrftoken": $('#tokid').val()
		};
		var config = {
			headers: { 'Content-Type': 'application/json; charset=UTF-8'},
			params:params
		};
		$http.post('indportal/saveAdditionalInfo', postdata)
			.success(function(data, status, headers, config){
				if(data ==="failure"){
					$scope.modalForm.techIssue = 'true';
				}else{
					location.href='./private/setHousehold/'+data;
				}
			}).error(function(data, status, headers, config){
				$scope.modalForm.techIssue = 'true';
			});
	};
		
	$scope.enroll= function(event){
		var postData = 'caseNumber=' + event.target.id;
		var params = {
				"csrftoken": $('#tokid').val()
		};
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			params:params
		};
		var response = $http.post('indportal/enroll', postData, config);
		response.success(function(data, status, headers, config) {
			location.href='./private/setHousehold/'+data;
		});
		response.error(function() { 
			$scope.openInitFail = true;
		});
	};
	$scope.initPortal = function(){
		var response = $http.get('indportal/init');
		response.success(function(data, status, headers, config) {
			$scope.portalHome = data;
		});
	};
	$scope.init = function(){
		
		var response = $http.get('indportal/getApplications');
		response.success(function(data, status, headers, config) {
			$scope.currentApplications = data["currentApplications"];
			$scope.pastApplications = data["pastApplications"];
		});
		response.error(function() { 
			$scope.openInitFail = true;
		});
};

$scope.showVerificationResults = function(caseNumber){
	window.location= 'ssap/verificationResultDashboard?caseNumber='+caseNumber;
};

$scope.showEligibilityDetails = function(){
	if(hhdetails=="" || mmdetails==""){
		$location.path('/applications');
	}
	$scope.householdEligibilityDetails = hhdetails;
	$scope.memberEligibilityDetails = mmdetails;
};

$scope.showEligibilityResults = function(caseNumber){
	var postData = 'caseNumber=' + caseNumber;
	var params = {
			"csrftoken": $('#tokid').val()
		};	
	var config = {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		params:params
	};
	var response = $http.post('indportal/geteligibilitydetails', postData, config);
	response.success(function(data, status, headers, config){
		hhdetails = data["householdEligibilityDetails"];
		mmdetails = data["membersEligibilityDetails"];
		$scope.cancelCsrAction();
		$location.path('/eligibilityresults');
	});
	
};

$scope.showOverrideComments = function(){
	if(oComments==""){
		$location.path('/applications');
	}
	$scope.overrideComments = oComments;
};
$scope.getComments = function(caseNumber){
	var postData = 'caseNumber=' + caseNumber;
	var params = {
			"csrftoken": $('#tokid').val()
		};	
	var config = {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		params:params
	};
	var response = $http.post('indportal/getOverrideComments', postData, config);
	response.success(function(data, status, headers, config){
		$scope.modalForm.oComments = data["comments"];
		$scope.modalForm.ORHist = true;
	});
	
};

$scope.showApplication = function(caseNumber){
	window.location= 'indportal/gotossap?caseNumber='+caseNumber;
};
$scope.editApplication = function(caseNumber){
	window.location= 'indportal/editapplication?caseNumber='+caseNumber;
};
$scope.enrollApplication= function(caseNumber){
	var postData = 'caseNumber=' + caseNumber;
	var params = {
			"csrftoken": $('#tokid').val()
	};
	var config = {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		params:params
	};
	var response = $http.post('indportal/enroll', postData, config);
	response.success(function(data, status, headers, config) {
		location.href='./private/setHousehold/'+data;
	});
	response.error(function() { 
		$scope.openInitFail = true;
	});
};

$scope.reportChange = function(caseNumber){
		location.href='./iex/lce/reportyourchange';
};

$scope.cancelApplication= function(caseNumber){
	var postData = 'caseNumber=' + caseNumber;
	var params = {
			"csrftoken": $('#tokid').val()
	};
	var config = {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		params:params
	};
	var response = $http.post('indportal/cancel', postData, config);
	response.success(function(data, status, headers, config) {
		$scope.currentApplications = data["currentApplications"];
		$scope.pastApplications = data["pastApplications"];
		$scope.modalForm.openDialog = false;
	});
	response.error(function() { 
		$scope.openInitFail = true;
	});
};
$scope.startApplication = function(){
	location.href='./ssap';
};


$scope.financialHelpPath = function(){
	window.open('https://idalink.idaho.gov/');
};

$scope.goToSsap = function(){
	location.href='./ssap';
};

//
	$scope.getSubsq = function(){
		var url = 'indportal/' + $scope.currentCsr.route;
		var data;
		var config;
		if ($scope.currentCsr.title === 'Cancel or Terminate Plan'){
			data = {'caseNumber': $scope.csrModalCaseNum, 'terminationDate': $scope.modalForm.cancelDate, 'reasonCode':'14'};
			config = {
				headers: { 'Content-Type': 'application/json; charset=UTF-8'}
			};
		} else {
			data = 'caseNumber=' + $scope.csrModalCaseNum;
			var params = {
					"csrftoken": $('#tokid').val()
			};
			config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				params:params
			};
		}
		var response = $http.post(url, data, config);
		response.then(function(responseData, status, headers, config){
			if(responseData.data=="success"){
				$scope.modalForm.subResult = 'success';
			}else{
				$scope.modalForm.subResult = 'failure';
			}
		}, function(responseData, status, headers, config){
			$scope.modalForm.subResult = 'failure';
		});
	};

	$scope.csrContainer = {
		edit:{title: 'Edit Application', route: '', func: $scope.editApplication},
		initiate:{title: 'Initiate Verifications', route: 'initVerifications', func: $scope.initVerifications},
		rerun:{title: 'Re-run Eligibility', route: 'rerunEligibility', func: $scope.rerunEligibility},
		cancelTerm:{title: 'Cancel or Terminate Plan', route: 'terminatePlan', func: $scope.terminatePlan},
		update:{title: 'Update Carrier', route: 'updateCarrier', func: $scope.updateCarrier},
		view:{title: 'View Override History', route: 'getOverideHistory', func: $scope.getOverideHistory}
	};

	$scope.openCSR = function(caseNum, type){
		$scope.modalForm.csr = true;
		$scope.csrModalCaseNum = caseNum; 
		$scope.currentCsr = $scope.csrContainer[type]; 
	};
	
	$scope.csrConInput=function(){
		$scope.csrInputOverride = true;
		$scope.modalForm.overrideComment = "";
	};
	
	//The max # of characters allowed in the override reason textarea
	$scope.maxLength = 4000;
	
	$scope.cancelCsrAction = function(){
		$scope.modalForm.overrideComment = "";
		$scope.csrInputTermDate = false;
		$scope.csrInputOverride = false;
		$scope.termDate = null;
		$scope.modalForm.subResult = null;
		$scope.modalForm.csr = false; 
	};
	
	$scope.submitOverrideComment = function(info){
		
		var postData = {'caseNumber': $scope.csrModalCaseNum, 'overrideComment': info};
		var params = {
				"csrftoken": $('#tokid').val()
		};
		var config = {
			headers: {  'Content-Type': 'application/json; charset=UTF-8' },
			params:params
		};
		var url = 'indportal/addOverrideComment';
		
		var response = $http.post(url, postData, config); 
		response.then(function(aresponse){
		if(aresponse.data=="success"){	
			if ($scope.currentCsr.title === "Cancel or Terminate Plan"){
				$scope.csrInputTermDate = true;
			} else if ($scope.currentCsr.title === 'Edit Application'){
				$scope.editApplication($scope.csrModalCaseNum);
			} else {
				$scope.getSubsq();
			}
		}else{
			$scope.openInitFail = true;
		}
		}, function(){
			$scope.openInitFail = true;
		});
	};
	
}]);

indPortalApp.controller('contactUsCtrl', ['$scope', '$http', '$upload', '$q', '$timeout', function($scope, $http, $upload, $q, $timeout){
  $scope.filesSelected = [];
  $scope.filesUploaded = [];
  var counter = 1;

  $scope.formData = {};
  $scope.appealForm = {};


  $scope.selectAppealFile =  function($files){
	  $scope.appealfileSelected= $files[0];
  };
  
  $scope.cancelAppealfile =  function(){
	  $scope.appealfileSelected= null;
  };

  $scope.onFileSelect= function($files, index){
      index = index || 0; 
      $scope.filesSelected[index] = $files[0];
    };

  $scope.addFile = function(){
    $scope.filesSelected.push(counter);
    counter++;
  };

  $scope.cancelFile = function(index){
    var toDel = $scope.filesSelected[index];

    for (var i = 0; i < $scope.filesUploaded.length; i++) {
      if ($scope.filesUploaded[i].name === toDel.name){
        $scope.filesUploaded.splice(i, 1);
      }
    };
    $scope.filesSelected.splice(index, 1);
      };

  $scope.uploadFile = function(index){
    var target = $scope.filesSelected[index];
    if ($scope.filesUploaded.length === 0){
    	return $scope.uploadOneFile(index);
    } else {
      for (var i = 0; i < $scope.filesUploaded.length; i++) {
        if ($scope.filesUploaded[i].name === target.name){
        	return $scope.uploadOneFile(index);
        }
      };
    }  
   	return $scope.uploadOneFile(index);
    };
    

  var uploadURL = "/hix/indportal/upload";
  var submitURL = "/hix/indportal/submitcontactus";
  var uploadAppealURL = "/hix/indportal/upload";
  
//fileToUpload {file:}
  $scope.uploadOneFile = function(index, type){
	  var file;
	  var url;
	if (type === "appeal"){
		file = $scope.appealfileSelected;
		url = uploadAppealURL;
	} else {
		file = $scope.filesSelected[index];
		url = uploadURL;
	}

	var fileName = 'fileToUpload'; 
	var params = {
			"csrftoken": $('#tokid').val()
	};
    var fd = new FormData();
    var deferred = $q.defer();
    fd.append(fileName, file);
    
   $http.post(url,fd, {
	   transformRequest: angular.identity,
	   headers: {'Content-Type':undefined},
	   params:params
    }).success(function(data){
    	if (data == 'failure'){
    		$scope.openDialog = true;
    		deferred.reject();
    	} else {
    		var temp = {};
    		temp.file = data;
    		temp.name = file.name;
    		if ($scope.filesUploaded != false){
        		$scope.filesUploaded.push(temp);    			
    		} else {
    			$scope.appealFileUploaded = temp;
    		}
   			file.uploaded = true;
        	deferred.resolve();
    	}
    }). error(function(){
    	$scope.showDialog='true';
    	deferred.reject();
    });
    return deferred.promise;
};

$scope.openD= function(){
	$scope.openDialog = true;
	return true;
};

  $scope.stopLoader = function(postResult, starting){
	  if (postResult === "success"){
		  postResult = "postsuccess"
	  } else {
		 postResult = 'postfailure';
	  }
	  var ending = new Date();
      var uploadSpan = ending - starting;
      if (uploadSpan >= 1000) {
    	  $scope.loader = false; 
    	  return postResult;
      } else {
    	  $timeout(function(){
    		  $scope.loader = false;  
    		  return postResult;
    	  }, uploadSpan);
      };
  }
//need to add function to check the filesSelected
  $scope.submitForm = function(){    
	  $scope.loader = true; 
	  var starting = new Date();
	  var sendToServer = function (){
  
    	$scope.formData.fileList = [];
    	angular.forEach($scope.filesUploaded, function(val, key){
    		$scope.formData.fileList.push(val.file);
    	})

    	$scope.postResult='';
    	var params = {
    			"csrftoken": $('#tokid').val()
    	};
          $http({
	      method: 'POST',
	      url: submitURL,
	      data: JSON.stringify($scope.formData),
	      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	      params: params
		
	    }).success(function(data){
	    	$scope.postResult = $scope.stopLoader(data, starting);  
	    }).error(function(data){
	    	$scope.postResult = $scope.stopLoader(data, starting);
	    });
	  };
	  
    if ($scope.filesSelected.length !== $scope.filesUploaded.length){
      var promiseList = [];
      for (var i = 0; i < $scope.filesSelected.length; i++) {
    	var deferred = $q.defer();
    	promiseList.push(deferred.promise);
    	(function(){
    		var data = $scope.uploadFile(i);
    		deferred.resolve(data);
    	}());
      };
      var promiseAll = $q.all(promiseList);
      
       promiseAll.then(function(){
    	   sendToServer();
       });
       
    } else {
    	sendToServer();
    }
   
  };
  
  $scope.submitAppeal= function(){    
  var appealUrl = "/hix/indportal/submitappeal";
  var params = {
			"csrftoken": $('#tokid').val()
	};
  
  $scope.loader = true; 
  var starting = new Date();
  
  $scope.appealPostResult='';
	  var sendToServer = function (){
		  if ( $scope.appealFileUploaded){
	   		$scope.appealForm.fileId = $scope.appealFileUploaded.file;
		};
    	$scope.postResult='';
          $http({
	      method: 'POST',
	      url: appealUrl,
	      data: JSON.stringify($scope.appealForm),
	      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	      params:params
	    }).success(function(data){
	      $scope.appealPostResult = $scope.stopLoader(data, starting);
	    }).error(function(data){
	    	$scope.appealPostResult = $scope.stopLoader(data, starting);
	    });
	  };
	  
	  if ($scope.appealfileSelected) {
		  var promise = $scope.uploadOneFile(0, 'appeal');
		  promise.then(function(){
			  sendToServer();
		   });		  
	  } else {
			  sendToServer();
	  }
  };
}]);

indPortalApp.directive('triggerAddFile', function(){
return {
  link: function(scope, element, attrs){
    element.bind('click', function(){
    	var inputBtn = element.parent().find('input');
        inputBtn.click();

      });
    }
  };
}); 

indPortalApp.directive("modalShow", function ($parse) {
return {
    restrict: "A",
    link: function (scope, element, attrs) {

        //Hide or show the modal
        scope.showModal = function (visible, elem) {
            if (!elem)
                elem = element;

            if (visible)
                $(elem).modal("show");                     
            else
                $(elem).modal("hide");
        };

        //Watch for changes to the modal-visible attribute
        scope.$watch(attrs.modalShow, function (newValue, oldValue) {
          scope.showModal(newValue, attrs.$$element);
        }, true);

        //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
        $(element).bind("hide.bs.modal", function () {
          $parse(attrs.modalShow).assign(scope, false);
          if (!scope.$$phase && !scope.$root.$$phase)
              scope.$apply();
        });
    }

};
});
//Plan Summary Accordian: End
indPortalApp.directive("btstAccordion", function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {},
        templateUrl:"accordionTemplate2.html",
        link: function (scope, element, attrs) {

            // give this element a unique id
            var id = element.attr("id");
            if (!id) {
                id = "btst-acc" + scope.$id;
                element.attr("id", id);
            }

            // set data-parent on accordion-toggle elements
            var arr = element.find(".accordion-toggle");
            for (var i = 0; i < arr.length; i++) {
                $(arr[i]).attr("data-parent", "#" + id);
                $(arr[i]).attr("href", "#" + id + "collapse" + i);
            }
            arr = element.find(".accordion-body");
            $(arr[0]).addClass("in"); // expand first pane
            for (var i = 0; i < arr.length; i++) {
                $(arr[i]).attr("id", id + "collapse" + i);
            }
        },
        controller: function () {}
    };
});
indPortalApp.directive('btstPane', function () {
    return {
        require: "^btstAccordion",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            ngtitle: "@",
            category: "=",
            order: "="
        },
        templateUrl:
            "accordionTemplate.html",
        link: function (scope, element, attrs) {
            scope.$watch("title", function () {
                // NOTE: this requires jQuery (jQLite won't do html)
                var hdr = element.find(".accordion-toggle");
                hdr.html(scope.ngtitle);
            });
        }
    };
});
// Plan Summary Accordian: End