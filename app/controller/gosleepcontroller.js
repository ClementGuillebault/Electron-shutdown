const ipc  = require('electron').ipcRenderer;
const exec = require('child_process').exec;

angular
    .module('app')
    .controller('GoSleep', GoSleep);

/**
 * @function GoSleep
 * @param {*} factoryExec 
 * @param {*} factoryMsg  
 */
function GoSleep(factoryExec, factoryMsg, $timeout) {

    let vm     = this;

    vm.start   = start;
    vm.stop    = stop;

    vm.form    = {};

    /**
     * @function start
     */
    function start() {
        let arg = [vm.hours, vm.minutes, vm.choix];

        if (vm.force) {
            arg[3] = vm.force;
        }

        factoryExec.shutdown(arg).then((error) => {
            if (!error) {
                vm.msgSuccess = true;
                vm.msg = factoryMsg.success(arg);
                delMsg();
            }
            else {
                vm.msgSuccess = false;
                vm.msg = factoryMsg.error();
            }
        });
    }

    /**
     * @function stop
     */
    function stop() {
        factoryExec.abord().then((error) => {
            if (!error) {
                vm.msgSuccess = true;
                vm.msg = factoryMsg.cancel();
                delMsg();
            }
        });
    }

    /**
     * @function delMsg
     * @param {int} time
     */
    function delMsg(time=3000) {
        $timeout(() => {
            vm.msg = false;
        }, time);
    }
}