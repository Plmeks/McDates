import angular from 'angular';
import moment from 'moment';

export default ['$mdDateLocaleProvider', ($mdDateLocaleProvider: angular.material.IDateLocaleProvider) => {
    // Устанавливаем необходимый формат для md-datepicker
    $mdDateLocaleProvider.formatDate = function(date: Date) {
        return date ? moment(date).format('DD.MM.YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString: string) {
        var m = moment(dateString, 'DD.MM.YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
}];
