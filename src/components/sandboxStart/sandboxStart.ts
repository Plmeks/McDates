import moment from 'moment';

/**
 * @ngInject
 */
export class SandboxStart {
    static componentName: string = 'sandboxStart';

    static componentConfig: ng.IComponentOptions = {
        controller: SandboxStart,
        template: require('./sandboxStart.html')
    };

    private dateFrom: string | null
    private dateTo: string | null;

    private isAlertEnabled: boolean = true;
    private isMaskEnabled: boolean = true;

    private $mdDialog:angular.material.IDialogService;

    constructor($mdDialog:angular.material.IDialogService) {
        this.$mdDialog = $mdDialog;
        this.dateFrom = this.dateTo = moment().format('YYYY-MM-DD');
    }

    changeDates() {
        if (this.isAlertEnabled) {
            const alertDateFormat = 'DD.MM.YYYY';
            const content = `
                Дата начала: ${this.dateFrom ? moment(this.dateFrom).format(alertDateFormat) : 'Не указана'}. <br>
                Дата окончания: ${this.dateTo ? moment(this.dateTo).format(alertDateFormat) : 'Не указана'}.
            `;

            this.openAlertDialog(content);
        }
    }

    openAlertDialog(message: string) {
        this.$mdDialog.show(
            this.$mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Новые данные по дате')
              .htmlContent(message)
              .ok('Ок')
          );
    }
}
