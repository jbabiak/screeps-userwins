/**
 * Created by User on 1/2/2017.
 */
var roleOuterharvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0){
            creep.memory.harvesting = true;
        }
        else if (creep.carry.energy >= (creep.carryCapacity - 10)) {
            creep.memory.harvesting = false;
        }
        if (creep.memory.harvesting == false){
            var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (constructions.length > 0) {
               var closestTarget = creep.pos.findClosestByRange(constructions);
               if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget);
                    }
            } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
        }
        });
            if (targets.length > 0) {
                var closestTarget = creep.pos.findClosestByRange(targets);
                if (creep.pos.getRangeTo(closestTarget) <= 1) {
                    if (closestTarget.hits < 240000) {
                        creep.repair(closestTarget);
                    } else {
                        creep.transfer(closestTarget, RESOURCE_ENERGY);
                    }
                } else {
                    creep.drop(RESOURCE_ENERGY);
                }
            } else {
                creep.drop(RESOURCE_ENERGY, 100);
            }


            }
        } else {


            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                if(creep.harvest(sources) != 0) {

                        creep.moveTo(Game.flags[creep.name].pos);

                }
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
        }


    }
};

module.exports = roleOuterharvester;