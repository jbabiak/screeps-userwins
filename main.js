var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
//var roleScout = require('role.scout');
var roleTransporter = require('role.transporter');
var checkSpawns = require('game.spawner');

module.exports.loop = function () {
    //var myMemory = JSON.parse(RawMemory.get("creeps"));
    //console.log(JSON.stringify(myMemory));
    checkSpawns.run();
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
       
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
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
            else if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
                
           // case 'repairer':
           //     roleRepairer.run(creep);
          //  case 'scout':
          //      roleScout.run(creep);
            
             
            
        
    }

       var tower = Game.getObjectById('5855b94afdd1d5b2443a3bad');        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            room.controller.activateSafeMode();
        }
        var tower = Game.getObjectById('5855fce111cbb5821f90bb21');        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            room.controller.activateSafeMode();
        }
       
       
       
        var tower = Game.getObjectById('584a347d0813bdcd30365aee');
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            room.controller.activateSafeMode();

        }
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) && object.structureType == STRUCTURE_CONTAINER
        });
        if (targets.length == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                 filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL
            });
        }
        targets.sort((a,b) => a.hits - b.hits);
        if(targets.length > 0) {
            tower.repair(targets[0]);
        }
        
       
        
        
        var tower = Game.getObjectById('5850371231030bbf292112bc');        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            room.controller.activateSafeMode();
        }
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) && object.structureType == STRUCTURE_CONTAINER
        });
        if (targets.length == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                 filter: object => object.pos.roomName == tower.pos.roomName && object.hits < (object.hitsMax * 0.9) 
            });
        }
        targets.sort((a,b) => a.hits - b.hits);

        if(targets.length > 0) {
            tower.repair(targets[0]);
        }
        

    }
