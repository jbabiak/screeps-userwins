var roleMedic = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.ticksToLive <= 200) {
            if (_.sum(creep.carry) > 0) {
                if(creep.room.name == Game.flags.Home.pos.roomName) {
                    for (var eachMineral in creep.carry){

                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    }
                    return;
                } else {
                    creep.moveTo(Game.flags.Home);
                    return;
                }

            } else {
                creep.suicide();
                return;
            }
            return;
        }
        var terminal = Game.getObjectById('586a894d7ecb838718c034c3');
        if(creep.room.name == Game.flags.Harvest.pos.roomName && _.sum(creep.carry) < 100) {
            for (var eachMineral in terminal.store){
                if (eachMineral != RESOURCE_ENERGY && _.sum(creep.carry) < creep.carryCapacity) {
                    if(creep.withdraw(terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                        return;
                    }
                }
            }
        } else if  (creep.room.name != Game.flags.Harvest.pos.roomName && _.sum(creep.carry) < 100){
            creep.moveTo(Game.flags.Harvest);
            return;
        }
        if(creep.room.name == Game.flags.Home.pos.roomName) {
            for (var eachMineral in creep.carry){

                if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                    return;
                }
            }
        } else {
            creep.moveTo(Game.flags.Home);
        }


        /**    var targets = creep.room.find(FIND_MY_CREEPS, {
                        filter: (healcreep) => {
                        return (healcreep.hits < healcreep.hitsMax);
                }
            });
         if (targets.length > 0) {
             var closestTarget = creep.pos.findClosestByRange(targets);
             if (closestTarget == creep) {
                 creep.moveTo(Game.flags.Defend);
             }
          if (creep.heal(closestTarget) == ERR_NOT_IN_RANGE) {
                    if (creep.pos.x <= 2) {
                    creep.moveTo(Game.flags.Defend);
                } else {
                    creep.moveTo(closestTarget);
                }
                creep.rangedHeal(closestTarget);
          }
       
         
            //  creep.moveTo(Game.flags.Defend);
          

        }else {
           
           
            creep.moveTo(Game.flags.Defend);
                    
        }**/
    }

}

module.exports = roleMedic;
