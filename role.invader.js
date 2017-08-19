    var roleInvader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.hits == creep.hitsMax) {
            creep.memory.needHealing = false;
        } else if (creep.hits < (creep.hitsMax * 0.95)) {
            creep.memory.needHealing = true;
        }
        if (creep.memory.needHealing == false){


           var targets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
           var creeptargets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);


            if (Game.flags.Defend.room && creep.room.name == Game.flags.Defend.room.name){
               // var targets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                 //var targets = Game.getObjectById('587f71121d79b53aa4301492fa');
            }

             var targets = Game.getObjectById('58962e7afd4840097906fd65');
            if (!targets) {
                var targets = Game.getObjectById('5896b961393eb9b3798130c9');
               // var targets = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);

            }
            if (creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)){
            if (creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)) <= 2) {
                var targets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            }
            }

             if (targets) {

              if (creep.attack(targets) == ERR_NOT_IN_RANGE) {

                        creep.moveTo(targets);

                        creep.rangedAttack(creeptargets);
                        creep.rangedMassAttack();


              }
                creep.rangedAttack(creeptargets);
                creep.rangedMassAttack();
            }else {

                    creep.moveTo(Game.flags.Attack);

            }

        } else {
            if (creep.room != Game.flags.Defend.room) {
                creep.moveTo(Game.flags.Defend);
                creep.rangedAttack(creeptargets);
            } else {

                var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var targets = Game.getObjectById('5876fa360ecacdfb0bcecbd7');
                if (targets) {
                  if (creep.attack(targets) == ERR_NOT_IN_RANGE) {
                            if (creep.pos.x <= 1) {
                                creep.moveTo(Game.flags.Defend);
                            }else {
                                creep.moveTo(Game.flags.Defend);
                            }
                  } else {
                        if (creep.pos.y  >= 49) {
                    creep.moveTo(Game.flags.Defend);
                } else {
                        creep.moveTo(Game.flags.Defend);

                }
                  }
                } else {

                    creep.moveTo(Game.flags.Defend);

                }
            }
        }
    }

}

module.exports = roleInvader;