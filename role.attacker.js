    var roleAttacker = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        
        //if (creep.pos.roomName == 'W38S74'){
        /**var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return;
            }
        }  **/  
    
      //  var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
       //     filter: { owner: { username: 'jaybot' } }
       // });
        
        if (targets){
            console.log('unite');
        }else{
           var targets = Game.getObjectById('585bb038912669c842bc6717');
        }

        //console.log('<h2 style="color:red;">' + targets + '</h1>');
        if(targets) {
            if (creep.attack(targets) == ERR_NOT_IN_RANGE) {
               // if (creep.pos.x > 31) {
                    creep.moveTo(targets);
               // }
            }
        }else {
            if (creep.name == 'A-1' || creep.name == 'A-2' || creep.name == 'A-3' || creep.name == 'A-4' || creep.name == 'A-5' || creep.name == 'A-6'){
            creep.moveTo(Game.flags.Attack);
            } else {
                creep.moveTo(Game.flags.Attack2);
            }
        }
    } 
}
    
module.exports = roleAttacker;