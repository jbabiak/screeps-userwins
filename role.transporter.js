var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.transporting == true && creep.carry.energy >= 50){
            if ((creep.name == 'T-2' || creep.name == 'T-4')  && creep.pos.roomName == 'W37S73') {
                creep.moveTo(Game.flags.Flag2);
                return; 
            }
            
            if (creep.name == 'T-3') {
                var target = Game.getObjectById('584dd3818c955c9e2f778664');
                     if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(target);
                     }
                
                creep.say('D 2 U');
                return;
            }
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN && structure.id != '584dd3818c955c9e2f778664' ) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if (targets.length == 0) {
                    if (creep.name == 'T-1') {
                        var tower = Game.getObjectById('584a347d0813bdcd30365aee');
                        if (tower.energy <= 750) {
                            if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(tower);
                                creep.say('towers');
                            }
                            return;
                        }
                    }
                        
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    });
                } 
            var closestTarget = creep.pos.findClosestByRange(targets);    
            if(targets.length > 0) {
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                    creep.say('Transporting');
                }
            }
        } 
        if(creep.carry.energy < 50) {
            creep.say('under50');
             creep.memory.transporting = false;
             if ((creep.name == 'T-2' || creep.name == 'T-4')  && creep.pos.roomName == 'W37S74') {
                creep.moveTo(Game.flags.Flag3);
                return;
                 
             }
             if (creep.name == 'T-3') {
                var target = Game.getObjectById('584d34d99871a4691e1a8750');
                     if(target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(target);
                         return;
                     }
                } 
             
                    

            targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] >= 50;
                }
            });
            if (targets) {
                if(targets.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                if (targets == Game.getObjectById('584dd3818c955c9e2f778664')) {
                    creep.say('forcestop');
                    return;
                }
                creep.moveTo(targets);
                creep.say('Grabbing');
                }
            }                    
        } else {
            creep.memory.transporting = true;
        }
	}
};

module.exports = roleTransporter;