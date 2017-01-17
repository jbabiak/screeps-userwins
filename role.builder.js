
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if(creep.carry.energy == 0) {
            creep.memory.building = false;
           
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
           
            if (creep.room == Game.flags[creep.name].room) {
                if (creep.name == 'B-31' || creep.name == 'B-41' || creep.name == 'B-11' || creep.name == 'B-21') {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    
                } else {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length > 0) {
                        targets = creep.pos.findClosestByRange(targets);
                        if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets);
        
                        }
                    } 
                }
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_ROAD && object.hits < 4000;
                        }
                    });
                    creep.repair(road);
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
        } else {
            //creep.moveTo(Game.flags[creep.name].pos);
            if (creep.room == Game.flags[creep.name].room) {
                if(!creep.room.storage) {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                } else {
                    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    if (creep.name == 'B-3' || creep.name == 'B-4' || creep.name == 'B-1' || creep.name == 'B-2'){
                        if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_CONTAINER);
                                }
                            });
                            var closestTarget = creep.pos.findClosestByRange(targets);
                            if (closestTarget) {
                                closestTarget.transfer(creep, RESOURCE_ENERGY);
                            }
                            var closestDropped = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY); 
                            if (closestDropped) {
                                creep.pickup(closestDropped);
                            }
                        } else {
                                creep.moveTo(Game.flags[creep.name].pos);
                            }
                    }
                    // if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    //     creep.moveTo(sources);
                    // }
                    
                }
                
            }else {
                
                    creep.moveTo(Game.flags[creep.name].pos);
                

            }
               
                    
                   // if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   //    creep.moveTo(creep.room.storage);
                      
                  //  } 
                
           
        }
    }
};

module.exports = roleBuilder;