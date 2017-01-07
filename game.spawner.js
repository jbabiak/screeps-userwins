

var checkSpawns = {
    run: function() {
        var levels = [];
        levels = [  [['A'],[0],[0]],
                    [['S'],[0],[0]],
                    [['U'],[4],[0]],
                    [['B'],[4],[0]],
                    [['T'],[4],[0]],
                    [['H'],[4],[0]],
                    [['O'],[2],[0]],
                    [['F'],[2],[0]],
                    [['I'],[0],[0]]
        ];    
        for(var name in Memory.creeps) {
            switch(name.charAt(0)) {
                case 'T':
                    levels[4][2]++;
                    break;
                case 'H':
                    levels[5][2]++;
                    break;
                case 'U':
                    levels[2][2]++;
                    break;
                case 'B':
                    levels[3][2]++;
                    break;
                case 'A':
                    levels[0][2]++;
                    break;
                case 'S':
                    levels[1][2]++;
                    break;
                case 'O':
                    levels[6][2]++;
                    break;
                case 'F':
                    levels[7][2]++;
                    break;
                case 'I':
                    levels[8][2]++;
                    break;
             

            }
            
            if(!Game.creeps[name]) {
                //if (Memory.creeps[name]._move){
                //    var roomname = Memory.creeps[name]._move.room;
                //    var room = Room.roomname;
                //    var closestHostile = Room[room].find(FIND_HOSTILE_CREEPS);
                //    if(closestHostile) {
                //        console.log('<h1 style="color:red;">' + closestHostile[0] + ' killed ' + name + ' in room:' + room);
                //    }
               // }
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
            var creep = Game.creeps[name];
            if (creep){
                if (creep.hits < creep.hitsMax) {
                    if (!Game.creeps['A-1']) {
                        var bads = creep.room.find(FIND_HOSTILE_CREEPS);
                        if (bads.length > 0) {
                            console.log('bads: ' + bads[0] + creep.room);   
                            Memory.help = creep.room.name;
                        } else {
                            Memory.help = 'safe';
                        }
                    }
                    console.log('uh oh' + creep.name);
                }    
            }
        }
        for (var i = 0; i < 9; i++)
        {
            console.log(levels[i][0] + ': ' +levels[i][2]+'/'+levels[i][1])
            if (levels[i][2] < levels[i][1]) {
                makeName(levels[i][0], levels[i][1]);
            }
        }
    }
}
module.exports = checkSpawns;

function makeName(roleLetter, number) {
    var role = [];
                    Memory.help = 'safe';

    if ( Memory.help != 'safe') {
        if (Memory.help == 'W78N79'){
            console.log('trying to save!!');
            role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
            var usedName = Game.spawns['Spawn1'].createCreep(role[2], 'A-2', {role: role[1]}); 
            if (usedName == -3) {
                Memory.help = 'safe';
            }
        } else if (Memory.help == 'W76N79'){
            console.log('trying to save!!');
            role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
            var usedName = Game.spawns['Spawn1'].createCreep(role[2], 'A-1', {role: role[1]}); 
            if (usedName == -3) {
                Memory.help = 'safe';
            }
        } else if (Memory.help == 'W76N78'){
            console.log('trying to save!!');
            role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
            var usedName = Game.spawns['Spawn2'].createCreep(role[2], 'A-3', {role: role[1]}); 
            if (usedName == -3) {
                Memory.help = 'safe';
            }
        } else if (Memory.help == 'W77N77'){
            console.log('trying to save!!');
            role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
            var usedName = Game.spawns['Spawn2'].createCreep(role[2], 'A-4', {role: role[1]}); 
            if (usedName == -3) {
                Memory.help = 'safe';
            }
        } else if (Memory.help == 'W78N78'){
            console.log('trying to save!!');
            role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
            var usedName = Game.spawns['Spawn3'].createCreep(role[2], 'A-5', {role: role[1]}); 
            if (usedName == -3) {
                Memory.help = 'safe';
            }
        }
        
    } else {
    
        var usedName = -3;
        var x=1;
        while (usedName == -3 && x <= number) {
            
            if (x > 4 || roleLetter[0] == 'i' ) {
                switch(roleLetter[0]) {
                    case 'H':
                        role = [['H'],['harvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'U':
                        role = [['U'],['upgrader'],[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]];
                        break;
                    case 'T':
                        role = [['T'],['transporter'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'B':
                        role = [['2'],['builder'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'A':
                        role = [['A'],['attacker'],[TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK]];
                        break;
                    case 'S':
                        role = [['S'],['scout'],[CLAIM,CLAIM,MOVE,MOVE]];
                        break;
                    case 'O':
                        role = [['O'],['outerharvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'F':
                        role = [['F'],['farcarrier'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'I':
                        role = [['I'],['invader'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
                        break;
                }
            } else  if (x > 2 || roleLetter[0] == 'B'){
                switch(roleLetter[0]) {
                    case 'H':
                        role = [['H'],['harvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'U':
                        role = [['U'],['upgrader'],[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]];
                        break;
                    case 'T':
                        role = [['T'],['transporter'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                       //role = [['T'],['transporter'],[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'B':
                        role = [['B'],['builder'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'A':
                        //role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK]];
                        role = [['A'],['attacker'],[TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK]];
            
                        break;
                    case 'S':
                        role = [['S'],['scout'],[CLAIM,CLAIM,MOVE,MOVE]];
                        break;
                    case 'O':
                        role = [['O'],['outerharvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'F':
                        role = [['F'],['farcarrier'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'I':
                        role = [['I'],['invader'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
                        break;
                }
            } else {
                switch(roleLetter[0]) {
                    case 'H':
                       role = [['H'],['harvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'U':
                        role = [['U'],['upgrader'],[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]];
                        break;
                    case 'T':
                        role = [['T'],['transporter'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                       //role = [['T'],['transporter'],[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'B':
                        role = [['B'],['builder'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'A':
                        //role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK]];
                        role = [['A'],['attacker'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]];
            
                        break;
                    case 'S':
                        role = [['S'],['scout'],[CLAIM,CLAIM,MOVE,MOVE]];
                        break;
                    case 'O':
                        role = [['O'],['outerharvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'F':
                        role = [['F'],['farcarrier'],[WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]];
                        break;
                    case 'I':
                        role = [['I'],['invader'],[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]];
                        break;
                }
            }
            if (x > 4 || roleLetter[0] == 'i') {
                console.log('Attempting spawn[' + role[1] + '] on Spawn 3');
                usedName = Game.spawns['Spawn3'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
                if (usedName == 0){
                    console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
                }
            } else if (x > 2) {
              //  console.log('Attempting spawn[' + role[1] + '] on Spawn 2');
                usedName = Game.spawns['Spawn2'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
                if (usedName == 0){
                    console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
                }
                if (usedName == -4){
                    usedName = -3;
                //    console.log('reseting usenamed' + usedName);
                }
            } else {
              //  console.log('Attempting spawn[' + role[1] + '] on Spawn 1');
                usedName = Game.spawns['Spawn1'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
                if (usedName == 0){
                    console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
                }
                if (usedName == -4){
                    usedName = -3;
                //    console.log('reseting usenamed' + usedName);
                }
            }
            x++;
    
        }
    }
}

