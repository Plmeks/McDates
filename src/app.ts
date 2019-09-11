import angular from 'angular';
import 'angular-material';
import 'angular-sanitize';
import 'ng-mask';
import materialConfig from './config';
import { SandboxStart } from './components/sandboxStart/sandboxStart';
import { McDatesComponent } from './components/mcDates/mcDates';

// Mount AngularJs
angular
    .element(document)
    .ready(() => {
        angular
            .module('McDatesSandbox', ['ngMaterial', 'ngMask', 'ngSanitize'])
            .config(materialConfig)
            .component(McDatesComponent.componentName, McDatesComponent.componentConfig)
            .component(SandboxStart.componentName, SandboxStart.componentConfig)
        
        angular
            .bootstrap(document.body, ['McDatesSandbox']);
    });
