import moment, { Moment } from 'moment';

export class McDatesComponent {
    static componentName: string = "mcDates";

    static componentConfig: ng.IComponentOptions = {
        bindings: {
            dateFrom: '=',
            dateTo: '=',
            mcChange: '&'
        },
        template: require('./mcDates.html'),
        controller: McDatesComponent
    };

    private _dateFrom: string | null = null;
    get dateFrom(): string | null {
        return this._dateFrom;
    }
    set dateFrom(newDate: string | null) {
        newDate = newDate || '';

        this.minDate = moment(newDate).toDate();
        if (moment(newDate) > moment(this.dateTo || '')) {
            this.dateTo = newDate;
        }
        this._dateFrom = newDate;
        console.log(newDate);
    }

    private dateTo: string | null = null;

    private minDate: Date = moment().toDate();

    onDateChange() {
        // runs from parent
        // @ts-ignore
        this.mcChange({newDateFrom: this.dateFrom, newDateTo: this.dateTo});
    }

    predefinedDates(type: string) {
        switch(type) {
            case 'yesterday':
                this.dateFrom = this.dateTo = moment().subtract(1, 'days').format();
                break;
            case 'today':
                this.dateFrom = this.dateTo = moment().format();
                break;
            case 'twoWeeks':
                this.dateFrom = moment().subtract(14, 'days').format();
                this.dateTo = moment().format();
                break;
            case 'month':
                this.dateFrom = moment().subtract(1, 'month').format();
                this.dateTo = moment().format();
                break;
            case 'all':
                this.dateFrom = this.dateTo = '';
                break;
            default:
        }
        this.onDateChange();
    }
}
