var roleResourcer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var found = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(found.length > 0) {
            if (found[0].resourceType != RESOURCE_ENERGY) {
                creep.pickup(found[0]);
            }
        }
        if (_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.extracting = false;
        }
        else if(_.sum(creep.carry) == 0) {
            creep.memory.extracting = true;
        }

        if(creep.memory.extracting) {
            var targets = creep.room.find(FIND_MINERALS);
            if (targets.length > 0) {
                if(creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } else {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(targets[0]);
            }

        }
        else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER);
        }
        });
            var closestContainer = creep.pos.findClosestByRange(containers);
            var targets = creep.room.find(FIND_MINERALS);
            creep.transfer(closestContainer, targets[0].mineralType);

        }
    }
};

module.exports = roleResourcer;