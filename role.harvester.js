var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0){
            creep.memory.harvesting = true;
        }
        else if (creep.carry.energy >= (creep.carryCapacity - 10)) {
            creep.memory.harvesting = false;
        }
        if (creep.memory.harvesting == false){


            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
            var closestTarget = creep.pos.findClosestByRange(targets);
            if (closestTarget.structureType == STRUCTURE_LINK && closestTarget.energy >= 800) {

                var otherLink = closestTarget.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK && structure.energy < 800);
                        }
                });

               // closestTarget.transferEnergy(otherLink[0]);
            }
            creep.transfer(closestTarget, RESOURCE_ENERGY);




        } else {

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

        }
	}
};

module.exports = roleHarvester;