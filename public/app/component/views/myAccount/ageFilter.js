angular.module("musApp").filter('ageFilter', function() {
     function calculateAge(birthday) { // birthday is a date
        var try1 = moment().diff(birthday);
        var try2 = moment(birthday, "YYYY").fromNow();
        console.log(try1);
        console.log(try2);
        var birthdayDate = new Date(birthday);
         var ageDifMs = new Date() - birthdayDate;
         var ageDate = new Date(ageDifMs); // miliseconds from epoch
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }

     return function(birthdate) {


           var age = calculateAge(birthdate);
           if (age === 0) {
             return moment(birthdate, "YYYY").fromNow().split(' ').shift() + " months old";
           }
           else if(age == 1) return age + ' year old';
           else return age + ' years old';

     };
});
