
var roleStarter = {

    /** @param {Creep} creep **/
    run: function(creep) {


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
            targets = creep.pos.findClosestByRange(targets);
            if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
                creep.say('buidling');
           
            }
            
            /**    var targets = creep.room.find(FIND_STRUCTURES, {
                  filter: object => (object.structureType == STRUCTURE_RAMPART)
                  });
             
             targets.sort((a,b) => a.hits - b.hits);
             if (targets.length > 0){
                 if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(targets[0]);
                 }
             }
             **/
        }
        else {
            if (creep.name == 'B-1') {
                var target = Game.getObjectById('585bb267c23700b0646b5009');
                if(target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                               creep.moveTo(target);
                }
                return;
            } else {
            var target = Game.getObjectById('585ef5cd598244df48cc7f88');
                if(target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                               creep.moveTo(target);
                }
                return;
    
            }   
        }
    }
};

module.exports = roleStarter;