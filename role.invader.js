    var roleInvader = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        


        
         //var targets = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
         var targets = Game.getObjectById('585e7b9feddeeb6b1b379bc5');
         if (targets) {
          if (creep.attack(targets) == ERR_NOT_IN_RANGE) {

                    creep.moveTo(targets);

          }
        }else {
            creep.moveTo(Game.flags.Attack);
           
        }
    } 

}
    
module.exports = roleInvader;