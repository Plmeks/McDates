// import angular from 'angular';

/**
 *
 * @ngInject
 */
export class McDatesComponent {
    static componentName: string = "mcDates";

    static componentConfig: ng.IComponentOptions = {
        bindings: {
            now: '='
        },
        template: require('./mcDates.html'),
        controller: McDatesComponent
    };
}
