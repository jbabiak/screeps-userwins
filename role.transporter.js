
var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.transporting == true && creep.carry.energy >= 50){
            
           
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
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
                     if (creep.name == 'T-3') {
                        var target = Game.getObjectById('584f65a2beef4a6365d5c069');
                        if (target.store[RESOURCE_ENERGY] >= (target.storeCapacity*0.7)){
                            target = Game.getObjectById('5850371231030bbf292112bc');
                                if (target.energy >= (target.storeCapacity*0.7)){
                                    target = Game.getObjectById('5852cfca48b624d8485adae9');
                                }
                        }
                        
                             if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                 creep.moveTo(target);
                             }
                        
                        creep.say('D 2 U');
                        return;
                    }
                    if (creep.name == 'T-2') {
                        var target = Game.getObjectById('584dd3818c955c9e2f778664');
                             if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                 creep.moveTo(target);
                             }
                        
                        creep.say('D 2 22U');
                        return;
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


                    

            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.id != '584dd3818c955c9e2f778664' && structure.id != '584f65a2beef4a6365d5c069') &&
                            structure.store[RESOURCE_ENERGY] >= 50;
                }
            });
            targets.sort((a,b) => (b.store[RESOURCE_ENERGY]) - (a.store[RESOURCE_ENERGY]));

            
            if (creep.name == 'T-2') {
                targets[0] = Game.getObjectById('584d34d99871a4691e1a8750');
            }
            if (targets[0]) {
                if(targets[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('Grabbing');
                }
            }                    
        } else {
            creep.memory.transporting = true;
        }
	}
};

module.exports = roleTransporter;