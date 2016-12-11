var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }

	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
	        if ((creep.name == 'U-4' || creep.name == 'U-5')  && creep.pos.roomName == 'W37S73') {
                creep.moveTo(Game.flags.Flag2);
                return; 
            }
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if ((creep.name == 'U-4' || creep.name == 'U-5')  && creep.pos.roomName == 'W37S74') {
                creep.moveTo(Game.flags.Flag3);
                return; 
            }
            var targets = Game.getObjectById('584cd148841625f84921cfa9');
            if(targets.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
            }
        }
	}
};

module.exports = roleUpgrader;