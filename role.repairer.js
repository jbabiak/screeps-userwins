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
                 filter: object => object.hits < (object.hitsMax * 0.9) && object.structureType != STRUCTURE_WALL
                });
            
              
            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);    
                }
            }  else {
                creep.say('error');
            }
        } else {
            creep.memory.repairing = false;
            if(creep.name == 'R-2') {
                var targets = Game.getObjectById('584cb54e9300feab70921b67');
                     if(targets.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(targets);
                     }
                }
                 else {
                var targets = Game.getObjectById('584d34d99871a4691e1a8750');
                     if(targets.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(targets);
                     }
                }
            }
        }
    }
module.exports = roleRepairer;