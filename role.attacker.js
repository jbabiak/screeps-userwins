    var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {



       var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

         if(targets) {
            if (creep.attack(targets) == ERR_NOT_IN_RANGE) {
                    creep.rangedAttack(targets);
                    creep.moveTo(targets);

            } else {
                creep.rangedAttack(targets);
            }
        }else {
            creep.moveTo(Game.flags[creep.name].pos);

        }
    }
}

module.exports = roleAttacker;