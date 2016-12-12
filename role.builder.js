
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.name == "B-2" && creep.pos.roomName == "W37S74"){
            creep.moveTo(Game.flags.Flag3)
            return;
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    creep.say('buidling');
                }
            }
        }
        else {
           if(creep.name == 'B-2') {
            var targets = Game.getObjectById('584ccb5165f6394415df6636');
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
};

module.exports = roleBuilder;