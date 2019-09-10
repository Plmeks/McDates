import angular from 'angular';
import moment from 'moment';

export default ['$mdDateLocaleProvider', ($mdDateLocaleProvider: angular.material.IDateLocaleProvider) => {
    // Формат дат при выборе из календаря
    $mdDateLocaleProvider.formatDate = function(date: Date) {
        return date ? moment(date).format('DD.MM.YYYY') : '';
    };

    // Формат дат при вводе вручную
    $mdDateLocaleProvider.parseDate = function(dateString: string) {
        var m = moment(dateString, 'DD.MM.YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
}];
