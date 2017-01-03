    var roleAttacker = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        

    
       var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: { owner: { username: 'vongoo' } }
        });
        var building = Game.getObjectById('58653b9dc04c074e4f19448c');
        if (building){
            console.log('<h1 style="color:red; background:white;">ATTACKING BUILDING');
        }else{
            console.log('<h2 style="color:red;">' + targets + '</h1>');   
            
        }


        if (building) {
            if (creep.attack(building) == ERR_NOT_IN_RANGE) {
               // if (creep.pos.x > 31) {
                    creep.moveTo(building);
               // }
            }
        }
        else if(targets) {
            if (creep.attack(targets) == ERR_NOT_IN_RANGE) {
               // if (creep.pos.x > 31) {
                    creep.moveTo(targets);
               // }
            }
        }else {
            creep.moveTo(Game.flags.Attack);
           
        }
    } 
}
    
module.exports = roleAttacker;