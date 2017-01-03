/**
 * Created by User on 1/2/2017.
 */
var roleOuterharvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy >= 2 && creep.memory.harvesting == false){


            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
        }
        });
            if (targets.length > 0) {
                var closestTarget = creep.pos.findClosestByRange(targets);
                if (closestTarget.hits < 200000) {
                    creep.repair(closestTarget);
                } else {
                    creep.transfer(closestTarget, RESOURCE_ENERGY);
                }
            } else {
                creep.drop(RESOURCE_ENERGY, 100);
            }
        


        }
        else if(creep.carry.energy < creep.carryCapacity) {

            creep.memory.harvesting = true;

            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                if(creep.harvest(sources) != 0) {
                    
                        creep.moveTo(Game.flags[creep.name].pos);
                    
                }
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }

        } else {
            creep.memory.harvesting = false;
        }
    }
};

module.exports = roleOuterharvester;