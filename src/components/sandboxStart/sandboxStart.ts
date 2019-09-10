import moment from 'moment';

export class SandboxStart {
    static componentName: string = "sandboxStart";

    static componentConfig: ng.IComponentOptions = {
        controller: SandboxStart,
        template: require('./sandboxStart.html')
    };

    private _dateFrom: string;
    get dateFrom(): string {
        return this._dateFrom;
    }
    set dateFrom(newDate: string) {
        this._dateFrom = this.formatDate(newDate);
    }

    private _dateTo: string;
    get dateTo() {
        return this._dateTo;
    }
    set dateTo(newDate: string) {
        this._dateTo = this.formatDate(newDate);
    }

    private formatString: string = 'YYYY-MM-DD';

    constructor() {
        this._dateFrom = this._dateTo = moment().format(this.formatString);
    }

    showNewDates(newDateFrom: string, newDateTo: string) {
        // setTimeout(_ => {
        //     alert(`
        //         New date from: ${this.formatDate(newDateFrom)}.
        //         New date to: ${this.formatDate(newDateTo)}.`
        //     );
        // }, 200);
    }

    formatDate(dateString?: string) {
        return dateString ? moment(dateString).format(this.formatString):
            '';
    }
}
