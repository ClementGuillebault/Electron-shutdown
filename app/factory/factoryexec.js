angular
    .module('app')
    .factory('factoryExec', factoryExec);

/**
 * @function factoryExec 
 */
function factoryExec($q) {

    let execute = {
        shutdown: shutdown,
        abord: abord
    };

    return execute;

    /**
     * @function shutdown
     * @param {array} arg
     */
    function shutdown(arg) {

        let resp = $q.defer();
        let time = maketime(arg);
        let chx  = makechoix(arg[2]);

        let mask = chx + (arg[3] === true ? '-f ' + time : time);

        exec(mask, (error, stdout, stderr) => {
            if (error) {
                resp.resolve(error);
            }
            resp.resolve(false);
        });

        return resp.promise;
    }

    /**
     * @function abord
     */
    function abord() {

        let resp = $q.defer();

        exec('shutdown -a', (error, stdout, stderr) => {
            if (error) {
                resp.resolve(error);
            }
            resp.resolve(false);
        });

        return resp.promise;
    }

    /**
     * @function maketime
     * @param {array} arg 
     */
    function maketime(arg) {

        let hours = arg[0] ? parseInt(arg[0]) * 3600: 0;
        let mins  = arg[1] ? parseInt(arg[1]) * 60: 0;
        let time  = '-t ' + (hours+mins);

        return time;
    }

    /**
     * @function makechoix
     * @param {array} arg 
     */
    function makechoix(arg) {
        if (arg == 'off') {
            return 'shutdown -s ';
        }
        // else if (arg == 'logoff') {
        //     return 'shutdown -l ';
        // }
        // else if (arg == 'sleep') {
        //     return 'sleep';
        // }
        else if (arg == 'restart') {
            return 'shutdown -r ';
        }
    }
}