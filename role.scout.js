
var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.controller && creep.room.controller.id == '5836b65d8b8b9619519ee959' ) {
        //creep.say(creep.attackController(creep.room.controller));
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            creep.say('M to S1');
            creep.moveTo(Game.flags.S1);
        }
 
    }    
};

module.exports = roleScout;