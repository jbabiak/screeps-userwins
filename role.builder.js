
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if(creep.carry.energy == 0) {
            creep.memory.building = false;
           
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            targets = creep.pos.findClosestByRange(targets);
            if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
                creep.say('buidling');
           
            }
        }
        else {
            
            if (creep.name != 'B-5' && creep.name != 'B-6') {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE);
                        }
                });
                if(targets) {
                    
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(targets[0]);
                      
                    }
                }
            } else {
                var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY,1);
                
                if(creep.pickup(energy[0]) != 0) {
                    var flags = creep.room.find(FIND_FLAGS, {
                            filter: (structure) => {
                                return (structure.name == creep.name);
                            }   
                        });
                         
                    if (flags[0]) {
                        creep.moveTo(flags[0].pos);
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;