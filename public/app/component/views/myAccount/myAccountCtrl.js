angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope, $state) {


  $scope.getCurrentUser = function() {
      myAccountServ.getCurrentUser().then(function(response, $rootScope) {
          $scope.parent = response;
      });
  }();


    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    }();

//This adds scope to the models in the register tab
    $scope.addClassToScope = function(course){
      $scope.course = course;
    };



$scope.addChildToCourse = function(course, child, parent) {
    var amount_due = 0;
    var childAge = new Date(child.birthdate);
    var age = moment(childAge).fromNow().split(' ');
    if(age[1] === 'year' || age[1] === 'years'){
      age[0] = 12;
    }
    else if(age[0] >= 9){
      age[0] = 9;
    }
    else age[0] = 8;
    child.month_age = age[0];

//THIS FUNCTION WILL CALCULATE COST
    cost(parent.children, parent.new_user); //calling cost function
    function cost(childArr, returning) {
      var regFee = 15;
      var totalCost = 145;

        childArr = childArr.sort(function(a, b) {
            return b.month_age - a.month_age;
        });


        for (var i = 1; i < childArr.length; i++) {
            if (childArr[i].schedule_id)
                if (childArr[i].month_age > 8) totalCost += 70;
        }

        if (returning) amount_due = totalCost;
        else amount_due = totalCost + regFee;
    }

//PASSING THIS DATA TO THE BACK END
    var data = {
        course: course,
        child: child.c_id,
        month_age: child.month_age,
        amount_due: amount_due,
        parent_id: child.parent_id
    };

    //ADDING COST INTO THE EQUALTION
    myAccountServ.addChildToCourse(data).then(function(response) {

        $rootScope.amount_due = response.amount_due;
        swal(
          'Awesome!',
          'your total is now '+ response.amount_due,
          'success'
        );

    });

};

$scope.logout = function() {
myAccountServ.logout().then(function(response) {
    $rootScope.currentUserSignedIn = false;
    $state.go('home');
});
};


//this takes is on the editAccount
    $scope.addChild = function() {
        $scope.customerObj.children.push({name: '', birthdate: ''});
    };

    $scope.remove = function(array, index){
        array.splice(index, 1);
    }

//

    //TEST STUFF TO SEE IF I CAN GET THIS TO WORK



    $scope.itemsToAdd = [{
        childName: '',
        birthdate: ''
      }];

      $scope.removeItemToAdd = function(itemToAdd, index) {
        console.log(itemToAdd, index);
        var index = $scope.itemsToAdd.indexOf(itemToAdd);
        $scope.itemsToAdd.splice(index, 1);
      }

      $scope.addNew = function() {
        $scope.itemsToAdd.push({
          childName: '',
          birthdate: ''
        })
      }



    $scope.editAccount = function(user, itemsToAdd){
      var newKids = [];
      for(var i = 0; i < itemsToAdd.length; i ++){
        if(itemsToAdd[i].childName != "")newKids.push(itemsToAdd[i]);
      }
      // console.log(user, newKids);
      myAccountServ.updateUser(user, newKids).then(function(response,$rootScope){
        swal(
          'Awesome!',
          'Your account has been updated',
          'success'
        );
      });
      myAccountServ.logout().then(function(response) {
          $rootScope.currentUserSignedIn = false;
          $state.go('home');
      });
    }









});
