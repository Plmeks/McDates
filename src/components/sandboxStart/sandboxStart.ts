// import angular from 'angular';
// import moment from 'moment';

export class SandboxStart {
    static componentName: string = "sandboxStart";

    static componentConfig: ng.IComponentOptions = {
        bindings: {},
        controller: SandboxStart,
        template: require('./sandboxStart.html')
    };

    private wow: Date = new Date();
}
