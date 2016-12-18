

var checkSpawns = {
    run: function() {
        console.log('from mac');
        var levels = [];
        levels = [  [['T'],[3],[0]],
                    [['H'],[4],[0]],
                    [['U'],[4],[0]],
                    [['B'],[1],[0]]
        ];    
        for(var name in Memory.creeps) {
            switch(name.charAt(0)) {
                case 'T':
                    levels[0][2]++;
                    break;
                case 'H':
                    levels[1][2]++;
                    break;
                case 'U':
                    levels[2][2]++;
                    break;
                case 'B':
                    levels[3][2]++;
                    break;

            }
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for (var i = 0; i < 4; i++)
        {
            console.log(levels[i][0] + ': ' +levels[i][2]+'/'+levels[i][1])
            if (levels[i][2] < levels[i][1]) {
                makeName(levels[i][0]);
            }
        }
    }
}
module.exports = checkSpawns;

function makeName(roleLetter) {
    var role = [];
    switch(roleLetter[0]) {
        case 'H':
            role = [['H'],['harvester'],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]];
            break;
        case 'U':
            role = [['U'],['upgrader'],[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE]];
            break;
        case 'T':
            role = [['T'],['transporter'],[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
            break;
        case 'B':
            role = [['B'],['builder'],[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]];
            break;
    }
    var usedName = -3;
    var x=0;
    while (usedName == -3 || x < roleLetter[1]) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!spawn #'+x);
        x++;
        if (x > 2) {
            console.log('Attempting spawn[' + role[1] + '] on Spawn 2');
            usedName = Game.spawns['Spawn2'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
            if (usedName != -4 && usedName != -3)
                console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
        } else {
            console.log('Attempting spawn[' + role[1] + '] on Spawn 1');
            usedName = Game.spawns['Spawn1'].createCreep(role[2], role[0] + '-' + x, {role: role[1]});
            if (usedName != -4 && usedName != -3)
                console.log('Success! Spawning new ' + role[1] + ': ' + usedName);
        }
    }
}

