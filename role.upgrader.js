var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgrading == 'undefined'){
            creep.memory.upgrading = false;
        }
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }

	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
          /**  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    targets = creep.pos.findClosestByRange(targets);
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }   
            } else { 
            **/


                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }

            //}

        }
        else {

                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }




        }
	}
};

module.exports = roleUpgrader;