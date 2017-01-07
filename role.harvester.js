var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy >= 2 && creep.memory.harvesting == false){
         
            if (creep.name == 'H-6') {
                creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                return;
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
            var closestTarget = creep.pos.findClosestByRange(targets);
            if (closestTarget.structureType == STRUCTURE_LINK && closestTarget.energy >= 800) {
               
                var otherLink = closestTarget.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK);
                        }
                });
               
        
                closestTarget.transferEnergy(otherLink[1]);
            }
            creep.transfer(closestTarget, RESOURCE_ENERGY);
              
            
            
            
        } 
        else if(creep.carry.energy < creep.carryCapacity) {

            creep.memory.harvesting = true;
           
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                if(creep.harvest(sources) != 0) {
                    if (Game.flags[creep.name]) {
                        creep.moveTo(Game.flags[creep.name].pos);
                    }
                }
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
            
        } else {
            creep.memory.harvesting = false;
        }
	}
};

module.exports = roleHarvester;