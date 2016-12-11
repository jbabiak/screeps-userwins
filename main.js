var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleScout = require('role.scout');
var roleTransporter = require('role.transporter');
var checkSpawns = require('game.spawner');

module.exports.loop = function () {

    checkSpawns.run();
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'scout') {
            roleScout.run(creep);
        }
          if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
    }
    var tower = Game.getObjectById('584a347d0813bdcd30365aee');
    if(tower) {
             var targets = creep.room.find(FIND_STRUCTURES, {
                 filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) && object.structureType == STRUCTURE_CONTAINER
                });
                if (targets.length == 0) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                         filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) && object.structureType != STRUCTURE_WALL
                    });
                }
                targets.sort((a,b) => a.hits - b.hits);
    
                if(targets.length > 0) {
                    tower.repair(targets[0]);
                }
            }
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            room.controller.activateSafeMode();
        }
    }
