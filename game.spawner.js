
var creepHarvester = [];
creepHarvester = [['H'],['harvester'],[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]];
var creepBuilder = [];
creepBuilder = [['B'],['builder'],[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]];
var creepRepairer = [];
creepRepairer = [['R'],['repairer'],[WORK,WORK,WORK,CARRY,MOVE,MOVE]];
var creepUpgrader = []; 
creepUpgrader = [['U'],['upgrader'],[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]];

var checkSpawns = {
    run: function() {
            
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
            
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 3 && Game.spawns['Spawn1'].canCreateCreep(creepHarvester[2], undefined) == OK) {
            makeName(creepHarvester);
        }
        //this is incase i ever completely run outta harvesters
        if (harvesters.length == 0) {
            harvesterName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], 'Hrv-' + x, {role: 'harvester'});
        }
        
        //incase harvesters get low, make them priority
        if (harvesters.length > 1) {
             
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            console.log('Upgraders: ' + upgraders.length);
            if(upgraders.length < 3 && Game.spawns['Spawn1'].canCreateCreep(creepUpgrader[2], undefined) == OK) {
                makeName(creepUpgrader);
            }
        
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            console.log('Builders: ' + builders.length);
            if(builders.length < 2 && Game.spawns['Spawn1'].canCreateCreep(creepBuilder[2], undefined) == OK) {
                makeName(creepBuilder);
            }
            
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            console.log('Repairers: ' + repairers.length);
            if(repairers.length < 1 && Game.spawns['Spawn1'].canCreateCreep(creepRepairer[2], undefined) == OK) {
                makeName(creepRepairer);
            }
        }
    }
}
module.exports = checkSpawns;

function makeName(role) {
    var usedName = -3;
    var x=0;
    while (usedName == -3) {
        x++;
        usedName = Game.spawns['Spawn1'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
    } 
    console.log('Spawning new ' + role[1] + ': ' + usedName);
}
