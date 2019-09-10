import angular from 'angular';
import 'angular-material';

import {SandboxStart} from './components/sandboxStart/sandboxStart';
import {McDatesComponent} from './components/mcDates/mcDates';

// Mount AngularJs
angular
    .element(document)
    .ready(() => {
        angular
            .module('McDatesSandbox', ['ngMaterial'])
            .component(McDatesComponent.componentName, McDatesComponent.componentConfig)
            .component(SandboxStart.componentName, SandboxStart.componentConfig)
        
        angular
            .bootstrap(document.body, ['McDatesSandbox']);
    });
    
// angular
//     .element(document)
//     .ready(() => {
//         angular
//             .module('mc-dates-sandbox', ['ngMaterial'])
//             .config(['$mdDateLocaleProvider', ($mdDateLocaleProvider: any) => {
//                 // Формат дат при выборе из календаря
//                 $mdDateLocaleProvider.formatDate = function(date: Date) {
//                     return date ? moment(date).format('DD.MM.YYYY') : '';
//                 };

//                 // Формат дат при вводе вручную
//                 $mdDateLocaleProvider.parseDate = function(dateString: string) {
//                     var m = moment(dateString, 'DD.MM.YYYY', true);
//                     return m.isValid() ? m.toDate() : new Date(NaN);
//                 };
//             }])
//             .controller('McDatesController', function() {
//                 // @ts-ignore
//                 this.now = moment().add(1, 'days');
//             })
//             .component(McDatesComponent.componentName, McDatesComponent.componentConfig);

//         angular
//             .bootstrap(document.getElementById("app") as Element, ['mc-dates-sandbox']);
//     });
