import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material/angular-material.min.css';
import 'angular-material';

angular
    .element(document)
    .ready(() => {
        angular
            .module('mc-dates-sandbox', ['ngMaterial'])
            .controller('McDatesController', ['$scope', ($scope) => {
                $scope.now = new Date();
            }]);
        
        angular
            .bootstrap(document.body, ['mc-dates-sandbox']);
    });
