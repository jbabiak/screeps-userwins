var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleOuterharvester = require('role.outerharvester');
var roleFarcarrier = require('role.farcarrier');
var roleAttacker = require('role.attacker');
var roleScout = require('role.scout');
var roleTransporter = require('role.transporter');
var roleInvader = require('role.invader');
var roleMedic = require('role.medic');
var roleLaber = require('role.laber');
var roleStarter = require('role.starter');
var roleResourcer = require('role.resourcer');
var checkSpawns = require('game.spawner');
var checkMarkets = require('game.market');
var checkLabs = require('game.lab');
/** CHECKLIST

 * 4. Laber unit helper functions cleanup
 * 5. Laber unit WARTIME state
 * 6. Room WARTIME state check within lab to set the labs and minerals that should go in them make this a new object and only set once prolly
 * 7. Cleanup invader code
 * 8. Cleanup Medic Code
 * 9. Add booster lab code for under 8 rcl xgh20 i think
 **/

module.exports.loop = function () {
    checkMarkets.run();
    checkLabs.run();
    if (Game.cpu.bucket < 10000) {
        console.log("Bucket: " + Game.cpu.bucket);
    }
    //var myMemory = JSON.parse(RawMemory.get("creeps"));
    //console.log(JSON.stringify(myMemory));
   // var firstcpu = Game.cpu.getUsed();
    checkSpawns.run();
   // var total = Game.cpu.getUsed() - firstcpu;
   // console.log('checkspawns did :' + total + 'cpus');
   /**var flags = creep.room.find(FIND_FLAGS, {
                            filter: (structure) => {
                                return (structure.name == creep.name);
                            }
                        });**/

    for(var name in Game.rooms) {
       if (!Memory.stats.rooms[name]) {
           if (Game.rooms[name].controller && Game.rooms[name].controller.my || (Game.rooms[name].controller && Game.rooms[name].controller.reservation && Game.rooms[name].controller.reservation.username == 'userwins')) {
            Memory.stats.rooms[name] = {};
           }
       } else {

            if (Game.rooms[name].controller && Game.rooms[name].controller.reservation) {
                Memory.stats.rooms[name].reservationTime = Game.rooms[name].controller.reservation.ticksToEnd;
               /** for (var scoutflag in Game.flags) {
                    if (Game.flags[scoutflag].room.name == name && scoutflag.charAt(0) == 'S') {
                         Memory.stats.rooms[name].scout = scoutflag;
                    }
                }**/
            } else {
                if (Game.rooms[name].storage) {
                var mystructs = Game.rooms[name].find(FIND_MY_SPAWNS);
                if(mystructs.length > 0) {
                Memory.stats.rooms[name].availableEnergy = Game.rooms[name].energyAvailable;
                var mineral = Game.rooms[name].find(FIND_MINERALS);
                if (mineral.length > 0 && mineral[0] != 'undefined') {
                    Memory.stats.rooms[name].resourceType = mineral[0].mineralType;
                    Memory.stats.rooms[name].availableMineral = mineral[0].mineralAmount;
                }
                Memory.stats.rooms[name].storageStore = Game.rooms[name].storage.store;
                Memory.stats.rooms[name].controllerDifference = (Game.rooms[name].controller.progress - Memory.stats.rooms[name].controllerProgress);
                Memory.stats.rooms[name].controllerProgress = Game.rooms[name].controller.progress;

                }
                    if (Game.rooms[name].terminal) {
                        if (Memory.Rooms[name].Market.Totals.energy > 200000 && Game.rooms[name].controller.level == 8) {
                            if (Memory.Rooms['W76N77'].Market.Totals.energy < 200000 && _.sum(Game.rooms['W76N77'].terminal.store) < 240000) {
                                 console.log('Sending from: ' + name + ' to: W76N77');
                                console.log(Game.rooms[name].terminal.send(RESOURCE_ENERGY, 20000, 'W76N77', 'boost'));
                            } else if (Memory.Rooms['W86N78'].Market.Totals.energy < 200000 && _.sum(Game.rooms['W86N78'].terminal.store) < 240000) {
                                 console.log('Sending from: ' + name + ' to: W86N78');
                                console.log(Game.rooms[name].terminal.send(RESOURCE_ENERGY, 20000, 'W86N78', 'boost'));
                            }
                            //find target to send excess

                        }
                    }
                }
                //linktranspo!
                if (Memory.Rooms[name] && Memory.Rooms[name].depositLink) {
                    var transpoLinks = Game.rooms[name].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK && structure.energy >=700 && structure.id != Game.rooms[name].depositLink);
                            }
                    });
                    var depositLink = Game.getObjectById(Memory.Rooms[name].depositLink);
                    var remaining = (800 - depositLink.energy);
                    for (i = 0; i < transpoLinks.length; i++) {
                            if (remaining > 0) {
                                transpoLinks[i].transferEnergy(depositLink);
                                remaining = remaining - transpoLinks[i].energy;
                            }


                        //console.log('transsfering from : ' + transpoLinks[i] + ' to : ' + depositLink);
                    }
                }
            }

        }
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: object => object.structureType == STRUCTURE_TOWER
                });



        for (var i = 0; i < towers.length; i++) {
            var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[i].attack(closestHostile);
               // Game.notify('Room: '+name+' has been attacked by '+closestHostile+'!');
                console.log('NOTIFY: Room: '+name+' has been attacked by '+closestHostile+'!');
            } else {
                var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: object => object.hits < (object.hitsMax * 0.40) && object.structureType == STRUCTURE_CONTAINER
                });
                if (targets.length == 0) {
                    var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                         filter: object => object.hits < (object.hitsMax * 0.3) && object.structureType == STRUCTURE_ROAD
                    });
                }
                if (targets.length == 0) {
                    var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                         filter: object => object.hits < 100000 && ( object.structureType == STRUCTURE_RAMPART)
                    });
                }
                targets.sort((a,b) => a.hits - b.hits);
                if(targets.length > 0) {
                    if (towers[i].energy > 500) {
                        towers[i].repair(targets[0]);
                    }
                }
                var healcreeps = Game.rooms[name].find(FIND_CREEPS, {
                         filter: object => object.hits < object.hitsMax
                    });
                if (healcreeps.length>0) {
                    towers[i].heal(healcreeps[0]);
                }
            }
        }

    }

    for(var name in Game.creeps) {

        var creep = Game.creeps[name];
            var firstcpu = Game.cpu.getUsed();
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
           else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
           }
           else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
           }
           else if (creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            else if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            else if (creep.memory.role == 'scout') {
                roleScout.run(creep);
            }
            else if (creep.memory.role == 'outerharvester') {
                roleOuterharvester.run(creep);
            }
            else if (creep.memory.role == 'farcarrier') {
                roleFarcarrier.run(creep);
            }
            else if (creep.memory.role == 'invader') {
                roleInvader.run(creep);
            }
            else if (creep.memory.role == 'medic') {
                roleMedic.run(creep);
            }
            else if (creep.memory.role == 'laber') {
                roleLaber.run(creep);
            }
            else if (creep.memory.role == 'resourcer') {
                roleResourcer.run(creep);
            }else if (creep.memory.role == 'starter') {
                roleStarter.run(creep);
            }
             var memCreep = Memory.creeps[name];
             if (memCreep._move) {

                 if (creep.room.name == memCreep._move.dest.room) {
                // var path = creep.room.findPath(creep.pos, memCreep._move.dest, {maxOps: 10});
                  //   creep.room.visual.poly(memCreep._move.path, {stroke: '#fff', strokeWidth: .15, opacity: .2, lineStyle: 'dashed'});
                    //creep.room.visual.line(memCreep._move.path,{color: 'red', lineStyle: 'dashed'});
                    //var path = Game.rooms[creep.room.name].findPath(creep.pos, memCreep._move.dest);
                    //new RoomVisual(creep.room.name).poly(creep.memory.path, {stroke: '#fff', strokeWidth: .15, opacity: .2, lineStyle: 'dashed'});
                 }
             }
            var total = (Game.cpu.getUsed() - firstcpu).toFixed(2);
            if (total < 1){
                new RoomVisual(creep.room.name).text(total, creep.pos.x + 2, creep.pos.y, {color: 'green', size: 0.8});
            } else if (total < 2) {
                creep.room.visual.rect(creep.pos.x + 1, creep.pos.y - 1 , 2, 1.3,
                {fill: 'black', stroke: 'black', opacity: 0.8});
                new RoomVisual(creep.room.name).text(total, creep.pos.x + 2, creep.pos.y, {color: 'orange', size: 0.8});
            } else {
                creep.room.visual.rect(creep.pos.x + 1, creep.pos.y - 1 , 2, 1.3,
                {fill: 'black', stroke: 'black', opacity: 0.8});
                new RoomVisual(creep.room.name).text(total, creep.pos.x + 2, creep.pos.y, {color: 'red', size: 0.8});
            }



    }








    }
