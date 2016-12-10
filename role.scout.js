
var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.room.controller && creep.room.controller.id != '5836b7698b8b9619519f0553' ) {
        creep.say(creep.reserveController(creep.room.controller));
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            creep.say('M to F3');
            creep.moveTo(Game.flags.Flag3);
        }
 
    }    
};

module.exports = roleScout;