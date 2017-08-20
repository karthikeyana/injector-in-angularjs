session.factory('redirectInterceptor', ['$injector', '$rootScope', '$timeout', '$q', '$window', function($injector, $rootScope, $timeout, $q, $window) {
    return {
        'request': function(req) {
            req.headers['CustomHeader'] = "Be Creative!";
            return req || $q.when(req);
        },
        'response': function(response) {
            if (response.data.Status === 'Failed...') {
                var AuthenticationService = $injector.get('AuthenticationService');
                AuthenticationService.ClearCredentials();
                $window.location.href = "/#/login";
                $timeout(function() {
                    $rootScope.sessiondata = true;
                }, 5000) return $q.reject(response);
            } else {
                return response;
            }
        }
    }
}])