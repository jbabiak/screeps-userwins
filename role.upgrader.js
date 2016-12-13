var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.name == 'U-3' && creep.pos.roomName == 'W37S74') {
            creep.moveTo(Game.flags.Flag3);
            return; 
        }
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }

	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.name == 'U-3'){
                var targets = Game.getObjectById('584cb54e9300feab70921b67');
            } else {
                var targets = Game.getObjectById('584dd3818c955c9e2f778664');
            }    
            if(targets.transfer(creep, RESOURCE_ENERGY) != 0) {
                    creep.moveTo(targets);
            }
            
        }
	}
};

module.exports = roleUpgrader;