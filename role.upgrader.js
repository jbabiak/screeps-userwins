var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgrading == 'undefined'){
            creep.memory.upgrading = false;
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
            if (creep.name == 'U-3' || creep.name == 'U-4'){
                var targets = Game.getObjectById('585bcbbec76ed5ef3372bf43');
            } else  if (creep.name == 'U-1' || creep.name == 'U-2') {
                var targets = Game.getObjectById('585a0bf5f44db59b723333f1');
            }   else {
                var targets = Game.getObjectById('586030a99ac77cb52126205a');
            }
                           

            if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               // console.log(targets.transferEnergy(creep, RESOURCE_ENERGY));
                        creep.moveTo(targets);
                    }
            
            
        }
	}
};

module.exports = roleUpgrader;