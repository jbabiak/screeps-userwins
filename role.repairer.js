var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
            if (creep.pos.roomName == 'W38S74'){
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    return;
                }
            }    
        
        
            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: { owner: { username: 'bSelect' } }
            });
            //targets = Game.getObjectById('5849240981f198bb426337da');
            console.log(targets);
            if(targets) {
                if (creep.rangedAttack(targets) == ERR_NOT_IN_RANGE) {
                    if (creep.pos.y >= 5) {
                        creep.moveTo(targets);
                    }
                }
            }
            
            
            if (!targets) {
                creep.moveTo(Game.flags.Flag4);
            }
            } else {
                creep.moveTo(Game.flags.Flag4);
            }
        
    }
}
    
module.exports = roleRepairer;