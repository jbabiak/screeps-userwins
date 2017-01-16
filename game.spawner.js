

var checkSpawns = {
    run: function() {

        for(var name in Memory.creeps) {

            
            if(!Game.creeps[name]) {
                queueSpawn(name);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
            var creep = Game.creeps[name];
            if (creep){
                if (creep.hits < creep.hitsMax) {
                    if (!Game.creeps['I-1'] || Game.creeps[name].role == 'attacker') {
                        var bads = creep.room.find(FIND_HOSTILE_CREEPS);
                        if (bads.length > 0) {
                          //  console.log('bads: ' + bads[0] + creep.room);   
                            Memory.help = creep.room.name;
                        } else {
                            Memory.help = 'safe';
                        }
                    }
                   // console.log('uh oh' + creep.name);
                }    
            }
        }
        if ( Memory.help != 'safe') {
            role = [];
            if (Memory.help == 'W78N79'){
                role = ['A-2','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W77N79.Queue[0] != role) {
                 //   Memory.Rooms.W77N79.Queue.splice(0, 0, role);
                }                Memory.help = 'safe';
            } else if (Memory.help == 'W76N79'){
                role = ['A-1','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W77N79.Queue[0] != role) {
                 //   Memory.Rooms.W77N79.Queue.splice(0, 0, role);
                }
                Memory.help = 'safe';
            } else if (Memory.help == 'W76N78'){
                role = ['A-3','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W77N78.Queue[0] != role) {
                 //   Memory.Rooms.W77N78.Queue.splice(0, 0, role);
                }
                Memory.help = 'safe';
            } else if (Memory.help == 'W77N77'){
                role = ['A-4','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W77N78.Queue.length < 5) {
                 //   Memory.Rooms.W77N78.Queue.splice(0, 0, role);
                }
                Memory.help = 'safe';
            } else if (Memory.help == 'W78N78'){
                role = ['A-5','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W78N77.Queue.length < 5) {
                 //   Memory.Rooms.W78N77.Queue.splice(0, 0, role);
                }
                Memory.help = 'safe';
            } else if (Memory.help == 'W78N76'){
                role = ['A-6','attacker','[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK]'];
                if (Memory.Rooms.W78N77.Queue.length < 5 && !Game.creeps['A-6']) {
                  //  Memory.Rooms.W78N77.Queue.splice(0, 0, role);
                }
                Memory.help = 'safe';
            }
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


