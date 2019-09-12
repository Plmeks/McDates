import moment from 'moment';

enum DateTypes {
    From,
    To
}

enum PredefinedDates {
    Yesterday,
    Today,
    TwoWeeks,
    Month,
    All
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
    private minDateTo: Date;
    private dateFormat: string = 'YYYY-MM-DD';

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

    get dateTypes() {
        return DateTypes;
    }

    get predefinedDates() {
        return PredefinedDates;
    }

    constructor($timeout: angular.ITimeoutService) {
        this.$timeout = $timeout;
        this._dateFrom = this._dateTo = '';
        this.pickerDateFrom = this.pickerDateTo = this.minDateTo = moment().toDate();
    }

    handleDateForPicker(incomingDate: string | null): Date | null {
        const momentDate = moment(incomingDate || '', this.dateFormat);

        if (momentDate.isValid()) {
            return momentDate.toDate();
        }
    
        return null;
    }

    // Binding метод
    mcChange() {}

    onDateChange(dateType?: DateTypes) {
        if (dateType == DateTypes.From || !dateType) {
            this.changeMinDate();
            this.dateFrom = this.pickerDateFrom ? moment(this.pickerDateFrom).format(this.dateFormat) : '';
        }

        if (dateType == DateTypes.To || !dateType) {
            this.dateTo = this.pickerDateTo ? moment(this.pickerDateTo).format(this.dateFormat) : '';
        }
        
        // Когда запускется ng-change, есть задержка при обновлении модели.
        this.$timeout(() => {
            this.mcChange();
        });
    }

    changeMinDate() {
        this.minDateTo = moment(this.pickerDateFrom).toDate();

        if (moment(this.pickerDateFrom) > moment(this.pickerDateTo)) {
            this.dateTo = moment(this.pickerDateFrom).format(this.dateFormat);
        }
    }

    selectPredefined(type: PredefinedDates) {
        switch (type) {
            case PredefinedDates.Yesterday:
                this.pickerDateFrom = this.pickerDateTo = moment().subtract(1, 'days').format();
                break;
            case PredefinedDates.Today:
                this.pickerDateFrom = this.pickerDateTo = moment().format();
                break;
            case PredefinedDates.TwoWeeks:
                this.pickerDateFrom = moment().subtract(14, 'days').format();
                this.pickerDateTo = moment().format();
                break;
            case PredefinedDates.Month:
                this.pickerDateFrom = moment().subtract(1, 'month').format();
                this.pickerDateTo = moment().format();
                break;
            case PredefinedDates.All:
                this.pickerDateFrom = this.pickerDateTo = '';
                break;
            default:
        }
        this.onDateChange();
    }
}
