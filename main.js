var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleOuterharvester = require('role.outerharvester');
var roleFarcarrier = require('role.farcarrier');
var roleAttacker = require('role.attacker');
var roleScout = require('role.scout');
var roleTransporter = require('role.transporter');
var roleInvader = require('role.invader');
//var roleStarter = require('role.starter');
var checkSpawns = require('game.spawner');

module.exports.loop = function () {
    //W75N61

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
       // console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        Memory.stats.rooms[name].availableEnergy = Game.rooms[name].energyAvailable;
      
        var towers = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: object => object.structureType == STRUCTURE_TOWER
                });
            
                

        for (var i = 0; i < towers.length; i++) {
            var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[i].attack(closestHostile);
                Game.notify('Room: '+name+' has been attacked by '+closestHostile+'!');
                console.log('NOTIFY: Room: '+name+' has been attacked by '+closestHostile+'!');
            } else {
                var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: object => object.hits < (object.hitsMax * 0.75) && object.structureType == STRUCTURE_CONTAINER
                });
                if (targets.length == 0) {
                    var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                         filter: object => object.hits < (object.hitsMax * 0.75) && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL
                    });
                }
                if (targets.length == 0) {
                    var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                         filter: object => object.hits < 100000 && object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART
                    });
                }
                targets.sort((a,b) => a.hits - b.hits);
                if(targets.length > 0) {
                    if (towers[i].energy > 500) {
                        towers[i].repair(targets[0]);
                    }
                }
            }
        }
       
    }
    
    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        
            if (creep.memory.role == 'harvester') {
                firstcpu = Game.cpu.getUsed();
                roleHarvester.run(creep);
                total = Game.cpu.getUsed() - firstcpu;
                // console.log(creep.name + ' did :' + total + 'cpus');
            }
           else if (creep.memory.role == 'upgrader') {
                firstcpu = Game.cpu.getUsed();
                roleUpgrader.run(creep);
                total = Game.cpu.getUsed() - firstcpu;
              //  console.log(creep.name + ' did :' + total + 'cpus')
           }
           else if (creep.memory.role == 'builder') {
                firstcpu = Game.cpu.getUsed();
                roleBuilder.run(creep);
                total = Game.cpu.getUsed() - firstcpu;
               // console.log(creep.name + ' did :' + total + 'cpus')
           }
           else if (creep.memory.role == 'transporter') {
               firstcpu = Game.cpu.getUsed();
                roleTransporter.run(creep);
                total = Game.cpu.getUsed() - firstcpu;
               // console.log(creep.name + ' did :' + total + 'cpus')
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
           // case 'repairer':
           //     roleRepairer.run(creep);
          //  case 'scout':
          //      roleScout.run(creep);
            
             
            
        
    }

       
       
   
        
        
       
       
    }
