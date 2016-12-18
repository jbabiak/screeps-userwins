
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var tower =Game.getObjectById('585620c8ad9feca47f8101c3');
        if (creep.repair(tower) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
        }
        return;
        if (creep.name == "B-1" && creep.pos.roomName == "W37S74"){
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
           // var targets = Game.getObjectById('584cb54e9300feab70921b67');
            var targets = Game.getObjectById('5852cfca48b624d8485adae9');    

            
                 if(targets.transfer(creep, RESOURCE_ENERGY) != 0) {
                     creep.moveTo(targets);
                 }
            
        }
    }
};

module.exports = roleBuilder;