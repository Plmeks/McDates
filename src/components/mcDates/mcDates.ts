import moment from 'moment';

enum DateTypes {
    From = 'dateFrom',
    To = 'dateTo'
}

enum PredefinedTypes {
    Yesterday = 'yesterday',
    Today = 'today',
    TwoWeeks = 'twoWeeks',
    Month = 'month',
    All = 'all'
}

/**
 * @ngInject
 */
export class McDatesComponent {
    static componentName: string = 'mcDates';

    static componentConfig: ng.IComponentOptions = {
        bindings: {
            dateFrom: '=',
            dateTo: '=',
            mcChange: '&'
        },
        template: require('./mcDates.html'),
        controller: McDatesComponent
    };

    private pickerDateFrom: Date | string;
    private pickerDateTo: Date | string;
    private minFromToDate: Date;

    private _dateFrom: string | null;
    get dateFrom() {
        return this._dateFrom;
    }
    set dateFrom(newDate: string | null) {
        const dateForPicker = this.handleDateForPicker(newDate);
        if (!newDate) {
            this.pickerDateFrom = '';
        } else if (dateForPicker) {
            this.pickerDateFrom = dateForPicker
        }

        this._dateFrom = newDate;
    }

    private _dateTo: string | null;
    get dateTo() {
        return this._dateTo;
    }
    set dateTo(newDate: string | null) {
        const dateForPicker = this.handleDateForPicker(newDate);
        
        if (!newDate) {
            this.pickerDateTo = '';
        } else if (dateForPicker) {
            this.pickerDateTo = dateForPicker
        }

        this._dateTo = newDate;
    }
    
    private $timeout: angular.ITimeoutService;

    constructor($timeout: angular.ITimeoutService) {
        this.$timeout = $timeout;
        this._dateFrom = this._dateTo = '';
        this.pickerDateFrom = this.pickerDateTo = this.minFromToDate = moment().toDate();
    }

    handleDateForPicker(incomingDate: string | null): Date | null {
        const momentDate = moment(incomingDate || '', 'YYYY-MM-DD');

        if (momentDate.isValid()) {
            return momentDate.toDate();
        }
    
        return null;
    }

    // Binding метод
    mcChange() {}

    onDateChange(dateType?: DateTypes) {
        const dateFormat = 'YYYY-MM-DD';

        if (dateType == DateTypes.From || !dateType) {
            this.minFromToDate = moment(this.pickerDateFrom).toDate();
            if (moment(this.pickerDateFrom) > moment(this.pickerDateTo)) {
                this.dateTo = moment(this.pickerDateFrom).format(dateFormat);
            }
            this.dateFrom = this.pickerDateFrom ? moment(this.pickerDateFrom).format(dateFormat) : '';
        }

        if (dateType == DateTypes.To || !dateType) {
            this.dateTo = this.pickerDateTo ? moment(this.pickerDateTo).format(dateFormat) : '';
        }
        
        // Когда запускется ng-change, есть задержка при обновлении модели.
        this.$timeout(() => {
            this.mcChange();
        });
    }

    predefinedDates(type: PredefinedTypes) {
        switch (type) {
            case PredefinedTypes.Yesterday:
                this.pickerDateFrom = this.pickerDateTo = moment().subtract(1, 'days').format();
                break;
            case PredefinedTypes.Today:
                this.pickerDateFrom = this.pickerDateTo = moment().format();
                break;
            case PredefinedTypes.TwoWeeks:
                this.pickerDateFrom = moment().subtract(14, 'days').format();
                this.pickerDateTo = moment().format();
                break;
            case PredefinedTypes.Month:
                this.pickerDateFrom = moment().subtract(1, 'month').format();
                this.pickerDateTo = moment().format();
                break;
            case PredefinedTypes.All:
                this.pickerDateFrom = this.pickerDateTo = '';
                break;
            default:
        }
        this.onDateChange();
    }
}
