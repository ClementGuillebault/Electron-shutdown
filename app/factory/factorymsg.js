angular
    .module('app')
    .factory('factoryMsg', factoryMsg);

/**
 * @function factoryMsg
 */
function factoryMsg() {

    let objectMsg = {
        success: success,
        error: error,
        cancel: cancel
    };

    return objectMsg;

    /**
     * @function success
     * @param {array} arg 
     */
    function success(arg) {
        let hrs = String("0" + arg[0]).slice(-2);
        let min = String("0" + arg[1]).slice(-2);

        let msg = createMsg(arg[2]);
        msg = msg + hrs + ':' + min;
        return msg;
    }

    /**
     * @function cancel
     */
    function cancel() {
        return 'Opération annulée';
    }

    /**
     * @function error
     */
    function error() {
        return 'Une erreur est survenue';
    }

    /**
     * @function createMsg
     * @param {array} arg
     */
    function createMsg(arg) {
        if (arg == 'off') {
            return 'L\'appareil s\'éteindra dans ';
        }
        // if (arg == 'logoff') {
        //     return 'L\'appareil va fermer la session dans ';
        // }
        if (arg == 'restart') {
            return 'L\'appareil va redémarrer dans ';
        }
    }
}
