
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if(creep.carry.energy == 0) {
            creep.memory.building = false;
           
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {

            if (creep.room == Game.flags[creep.name].room) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    targets = creep.pos.findClosestByRange(targets);
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
    
                    }
                } 
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
        } else {
            //creep.moveTo(Game.flags[creep.name].pos);
            if (creep.room == Game.flags[creep.name].room) {
          
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.flags[creep.name].pos);
                        
                    } 
                } else {
                    creep.moveTo(Game.flags[creep.name].pos);

                }
                
            }else {
                
                    creep.moveTo(Game.flags[creep.name].pos);
                

            }
               
                    
                   // if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   //    creep.moveTo(creep.room.storage);
                      
                  //  } 
                
           
        }
    }
};

module.exports = roleBuilder;