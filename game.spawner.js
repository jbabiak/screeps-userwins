

var checkSpawns = {
    run: function() {
        var levels = [];
        levels = [  [['A'],[0],[0]],
                    [['S'],[5],[0]],
                    [['U'],[6],[0]],
                    [['B'],[0],[0]],
                    [['T'],[6],[0]],
                    [['H'],[6],[0]],
                    [['O'],[6],[0]],
                    [['F'],[6],[0]]
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
             

            }
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for (var i = 0; i < 8; i++)
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
    
    var usedName = -3;
    var x=1;
    while (usedName == -3 && x <= number) {
        console.log(number);
        if (x > 4 || roleLetter[0] == 'B') {
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
                    role = [['B'],['builder'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
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
            }
        } else  if (x > 2 || roleLetter[0] == 'A'){
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
            }
        }
        if (x > 4) {
            console.log('Attempting spawn[' + role[1] + '] on Spawn 3');
            usedName = Game.spawns['Spawn3'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
            if (usedName == 0){
                console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
            }
        } else if (x > 2) {
            console.log('Attempting spawn[' + role[1] + '] on Spawn 2');
            usedName = Game.spawns['Spawn2'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
            if (usedName == 0){
                console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
            }
            if (usedName == -4){
                usedName = -3;
                console.log('reseting usenamed' + usedName);
            }
        } else {
            console.log('Attempting spawn[' + role[1] + '] on Spawn 1');
            usedName = Game.spawns['Spawn1'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
            if (usedName == 0){
                console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
            }
            if (usedName == -4){
                usedName = -3;
                console.log('reseting usenamed' + usedName);
            }
        }
        x++;

    }
}

