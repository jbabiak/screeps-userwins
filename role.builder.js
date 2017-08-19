
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var found = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            if(found.length > 0 && found[0].resourceType == RESOURCE_ENERGY) {
               creep.pickup(found[0]);
            }

        if(creep.carry.energy == 0) {
            creep.memory.building = false;

        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {

            //if (creep.room == Game.flags[creep.name].room) {


            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                targets = creep.pos.findClosestByRange(targets);

                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);

                }
            } else {
                if (!creep.memory.repairTarget) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < (object.hitsMax * 0.60) && ( object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_CONTAINER)
                    });
                    if (targets.length <= 0) {
                        if (creep.room.controller.level >= 8){
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: object => object.hits < 2900000 && ( object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                            });
                        } else {
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: object => object.hits < 180000 && ( object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                            });
                        }
                    }
                    if (targets.length > 0) {
                        targets = creep.room.storage.pos.findClosestByRange(targets);
                        creep.memory.repairTarget = targets.id;
                    }
                }
                if (creep.memory.repairTarget) {
                    var repairThis = Game.getObjectById(creep.memory.repairTarget);
                    if (repairThis.structureType == STRUCTURE_ROAD || repairThis.structureType == STRUCTURE_CONTAINER) {
                        if (repairThis.hits > (repairThis.hitsMax * 0.95)) {
                            delete creep.memory.repairTarget;
                            return;
                        }
                    } else {
                        if (creep.room.controller.level >= 8){
                            if (repairThis.hits > 3000000) {
                                delete creep.memory.repairTarget;
                                return;
                            }
                        } else {
                            if (repairThis.hits > 200000) {
                                delete creep.memory.repairTarget;
                                return;
                            }
                        }
                    }
                    if(creep.repair(repairThis) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairThis);
                    }
                }

            }





           // } else {
           //     creep.moveTo(Game.flags[creep.name].pos);
          //  }
        } else {

                if (creep.room.name == Game.flags[creep.name].room.name){

                       if  (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                           creep.moveTo(creep.room.storage);
                       }



                } else {
                    creep.moveTo(Game.flags[creep.name].pos);
                }
        }
    }
};

module.exports = roleBuilder;