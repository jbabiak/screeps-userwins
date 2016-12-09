var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');

        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('Repairing');

        }

        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
             filter: object => object.hits < (object.hitsMax*0.9)
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);    
                }
            }  else {
                creep.say('Sleeping');
                creep.moveTo(Game.flags.Flag1);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
    }
module.exports = roleRepairer;