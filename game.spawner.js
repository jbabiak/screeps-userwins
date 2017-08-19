

var checkSpawns = {
    run: function() {
        //fixQueue();
        for (var roomname in Memory.stats.rooms) {
            var thisroom = Memory.stats.rooms[roomname];
            if (thisroom.reservationTime && thisroom.reservationTime < 3000) {
                fixReserves(thisroom.scout);
            }
            if (thisroom.availableMineral && thisroom.availableMineral > 0) {
                if (Memory.Rooms[roomname] && Memory.Rooms[roomname].Spawns['Resourcers'].Names[0]) {
                var creepname = Memory.Rooms[roomname].Spawns['Resourcers'].Names[0];
                fixResourcer(creepname);
                }
            }
        }
        for(var name in Memory.creeps) {


            if(!Game.creeps[name]) {
                queueSpawn(name);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
            var creep = Game.creeps[name];
            if (creep){
                if (creep.hits < creep.hitsMax) {
                    if (Game.creeps[name].role != 'invader' && Game.creeps[name].role != 'attacker') {
                        var bads = creep.room.find(FIND_HOSTILE_CREEPS);
                        if (bads.length > 0) {
                            Memory.help = creep.room.name;
                        } else {
                            Memory.help = 'safe';
                        }
                    }
                }
            }
        }
        if ( Memory.help != 'safe') {
           spawnSaver();
        }
        for(var thisroom in Memory.Rooms) {
            var actualroom = Memory.Rooms[thisroom];
            if (!actualroom.Queue) {
                actualroom.Queue = new Array();
            }
            if (actualroom.Queue.length > 0) {
                for (y = 0; y < actualroom.Spawners.length; y++) {
                    var spawner = actualroom.Spawners[y];
                    var x = actualroom.Queue.length;
                    if (actualroom.Queue.length > 2) {
                        x = 2;
                    }

                    for (i = 0; i < x; i++) {
                        var newQueue = actualroom.Queue[i];
                        var str = newQueue[2];
                        str = str.replace('[','');
                        str = str.replace(']','');
                        var res = str.split(",");
                        var bodyparts = new Array();
                        for (i = 0; i < res.length; i++) {
                            switch (res[i]) {
                                case 'WORK':
                                    bodyparts[i] = WORK;
                                    break;
                                case 'MOVE':
                                    bodyparts[i] = MOVE;
                                    break;
                                case 'CARRY':
                                    bodyparts[i] = CARRY;
                                    break;
                                case 'ATTACK':
                                    bodyparts[i] = ATTACK;
                                    break;
                                case 'RANGED_ATTACK':
                                    bodyparts[i] = RANGED_ATTACK;
                                    break;
                                case 'HEAL':
                                    bodyparts[i] = HEAL;
                                    break;
                                case 'CLAIM':
                                    bodyparts[i] = CLAIM;
                                    break;
                                case 'TOUGH':
                                    bodyparts[i] = TOUGH;
                                    break;
                            }
                        }
                        var newCreep = Game.spawns[spawner].createCreep(bodyparts, newQueue[0], {role: newQueue[1]});
                        if (newCreep == -3) {
                            actualroom.Queue.splice(0, 1);
                            console.log('Removing from queue' + newQueue[0]);
                        } else if (newCreep == newQueue[0]) {
                            console.log('Spawning ' + newQueue[0]);
                            //actualroom.Queue.splice(i, 1);
                        } else {
                            if (newCreep != -6 && newCreep != -4){
                                console.log('im broken' + newQueue[0] + '  ' + newCreep);
                            }
                        }
                    }
                }
            }
        }
    }
}
module.exports = checkSpawns;

function queueSpawn(creepname) {
    for(var thisroom in Memory.Rooms) {
        var actualroom = Memory.Rooms[thisroom];
        for(var spawntypes in actualroom.Spawns) {
            if (spawntypes != 'Scout' && spawntypes != 'Resourcers') {
                var spawntype = actualroom.Spawns[spawntypes];
                for (i = 0; i < spawntype.Names.length; i++) {
                    var cname = spawntype.Names[i];
                    if (creepname == cname) {
                        //queue it up
                        var newQueue = [];
                        newQueue = [cname,spawntype.role, spawntype.stats];
                        if (creepname.charAt(0) == 'T' || creepname.charAt(0) == 'H') {
                            actualroom.Queue.splice(0, 0, newQueue);
                        } else {
                            actualroom.Queue.push(newQueue);
                        }
                        console.log('Queueing..' + newQueue[0]);
                        return;
                    }
                }
            }
        }
    }
}
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i][0] == obj[0]) {
            return true;
        }
    }

    return false;
}
function fixQueue() {
    for(var thisroom in Memory.Rooms) {
        var actualroom = Memory.Rooms[thisroom];
        for(var spawntypes in actualroom.Spawns) {
            if (spawntypes != 'Scout' && spawntypes != 'Resourcers') {
                var spawntype = actualroom.Spawns[spawntypes];
                for (i = 0; i < spawntype.Names.length; i++) {
                    var cname = spawntype.Names[i];
                    var newQueue = [];
                    newQueue = [cname,spawntype.role, spawntype.stats];
                    if (!containsObject(newQueue, actualroom.Queue) && !Memory.creeps[cname]) {

                        if (cname.charAt(0) == 'T' || cname.charAt(0) == 'H') {
                            actualroom.Queue.splice(0, 0, newQueue);
                            console.log('Adding: ' + JSON.stringify(newQueue));
                        } else {
                            actualroom.Queue.push(newQueue);
                            console.log('Adding: ' + JSON.stringify(newQueue));
                        }
                    }

                }
            }
        }
    }
}

function spawnSaver() {
    role = [];
    if (Memory.help == 'W78N79'){
        role = ['A-2','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W77N79.Queue)) {
            Memory.Rooms.W77N79.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W76N79'){
        role = ['A-1','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W77N79.Queue)) {
            Memory.Rooms.W77N79.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W76N78'){
        role = ['A-3','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W7778.Queue)) {
            Memory.Rooms.W77N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W77N77'){
        role = ['A-4','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W77N78.Queue)) {
            Memory.Rooms.W77N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W78N78'){
        role = ['A-5','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE]'];
        if (!containsObject(role, Memory.Rooms.W78N77.Queue)) {
            Memory.Rooms.W78N77.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W78N76'){
        role = ['A-6','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W78N77.Queue)) {
            Memory.Rooms.W78N77.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W77N76'){
        role = ['A-7','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W77N78.Queue)) {
            Memory.Rooms.W77N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W79N75'){
        role = ['A-8','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W79N76.Queue)) {
            Memory.Rooms.W79N76.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W79N77'){
        role = ['A-9','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W79N76.Queue)) {
            Memory.Rooms.W79N76.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W78N75'){
        role = ['A-10','attacker','[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W78N77.Queue)) {
            Memory.Rooms.W78N77.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W79N79'){
        role = ['A-11','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W77N79.Queue)) {
            Memory.Rooms.W77N79.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    }  else if (Memory.help == 'W83N78'){
        role = ['A-12','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W82N78.Queue)) {
            Memory.Rooms.W82N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W82N79'){
        role = ['A-13','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W82N78.Queue)) {
            Memory.Rooms.W82N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W85N78'){
        role = ['A-14','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W86N78.Queue)) {
            Memory.Rooms.W86N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W86N77'){
        role = ['A-15','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W86N78.Queue)) {
            Memory.Rooms.W86N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W82N77'){
        role = ['A-16','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W82N78.Queue)) {
            Memory.Rooms.W82N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    } else if (Memory.help == 'W87N78'){
        role = ['A-17','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]'];
        if (!containsObject(role, Memory.Rooms.W86N78.Queue)) {
            Memory.Rooms.W86N78.Queue.splice(0, 0, role);
            Memory.help = 'safe';
        }
    }
}

function fixReserves(creepname) {
    for(var thisroom in Memory.Rooms) {
        var actualroom = Memory.Rooms[thisroom];

        var spawntype = actualroom.Spawns['Scout'];
        for (i = 0; i < spawntype.Names.length; i++) {
            var cname = spawntype.Names[i];
            if (creepname == cname) {
                var newQueue = [];
                newQueue = [cname,spawntype.role, spawntype.stats];
                if (!containsObject(newQueue, actualroom.Queue) && !Memory.creeps[creepname]) {
                    actualroom.Queue.push(newQueue);
                    console.log('Fixing Reserver..' + newQueue[0]);
                    return;
                }


            }
        }

    }
}
function fixResourcer(creepname) {
    for(var thisroom in Memory.Rooms) {
        var actualroom = Memory.Rooms[thisroom];

        var spawntype = actualroom.Spawns['Resourcers'];
        for (i = 0; i < spawntype.Names.length; i++) {
            var cname = spawntype.Names[i];
            if (creepname == cname) {
                var newQueue = [];
                newQueue = [cname,spawntype.role, spawntype.stats];
                if (!containsObject(newQueue, actualroom.Queue) && !Memory.creeps[creepname]) {
                    actualroom.Queue.push(newQueue);
                    console.log('Fixing Resourcer..' + newQueue[0]);
                    return;
                }


            }
        }

    }
}