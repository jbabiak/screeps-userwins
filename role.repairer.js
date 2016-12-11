var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.name == 'R-2' && creep.pos.roomName == 'W37S74') {
            creep.moveTo(Game.flags.Flag3);
            return;
        }

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');

        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
           var towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(towers.length > 0) {
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                    creep.say('towers');
                }
                return;
            }
            
            creep.memory.repairing = true;
            creep.say('Repairing');

        }

        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
             filter: object => object.hits < (object.hitsMax) && object.structureType != STRUCTURE_RAMPART
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);    
                }
            }  else {
                creep.say('Sleeping');
                creep.moveTo(Game.flags.Flag3);
            }
        } else {
            if(creep.name == 'R-2') {
                 var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                 else {
                var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
            }
        }
    }
module.exports = roleRepairer;