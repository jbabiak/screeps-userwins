
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
                        var target = Game.getObjectById('5855b94afdd1d5b2443a3bad');//atack tower
                        if (target.energy == 1000) {
                            target = Game.getObjectById('584a347d0813bdcd30365aee'); //repair tower
                            if (target.energy >= 750) {
                                target = Game.getObjectById('585198e5e1e0780006a0227f');//link from
                                if (target.energy == 800){
                                    linkTo = Game.getObjectById('5851aabb1ef90b367bf3e887');
                                    target.transferEnergy(linkTo);
                                    target = Game.getObjectById('584d34d99871a4691e1a8750');//big container
                                }
                            }
                        }
                    }


                     if (creep.name == 'T-2') {
                        var target = Game.getObjectById('5855fce111cbb5821f90bb21');//attack tower
                        if (target.energy == 1000) {
                            target = Game.getObjectById('5850371231030bbf292112bc'); //repair tower
                            if (target.energy >= 750){
                                target = Game.getObjectById('585555320f8ad89a332c0331');//link from
                                if (target.energy == 800){
                                        linkTo = Game.getObjectById('585566e4792310a24fc5bfb9');
                                        target.transferEnergy(linkTo);
                                        target = Game.getObjectById('5852cfca48b624d8485adae9');//big container
                                }
                            }
                        }
                     }


                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                    creep.say(target);
                    return;

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
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] >= 400;
                }
            });
            targets.sort((a,b) => (b.store[RESOURCE_ENERGY]) - (a.store[RESOURCE_ENERGY]));


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