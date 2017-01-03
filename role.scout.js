
var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
            creep.reserveController(creep.room.controller)
        } else {
            creep.moveTo(Game.flags[creep.name].pos);
        }
 
    }    
};

module.exports = roleScout;