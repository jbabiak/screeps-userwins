
var roleStarter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != Game.flags[creep.name].room.name) {
            if (creep.room.name == Game.flags.Checkpoint1.pos.roomName) {
                creep.memory.checkpoint = 1;
            }
            if (creep.room.name == Game.flags.Checkpoint2.pos.roomName) {
                creep.memory.checkpoint = 2;
            }
            if (creep.memory.checkpoint == null) {
                creep.moveTo(Game.flags.Checkpoint1)
                return;
            }
            if (creep.memory.checkpoint == 1) {
                creep.moveTo(Game.flags.Checkpoint2)
                return;
            }
            if (creep.memory.checkpoint == 2) {
                creep.moveTo(Game.flags[creep.name]);
                return;
            }
            return;
        }

        if(creep.carry.energy == 0) {
            creep.memory.building = false;

        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        if (creep.memory.building) {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                targets = creep.pos.findClosestByRange(targets);

                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);


                }
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_ROAD && object.hits < (object.hitsMax * 0.9);
                    }
                });
                creep.repair(road);
            } else {
                var towers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER && structure.energy < 550) || ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity);
                    }
                });
                if (towers.length > 0) {
                    var target = creep.pos.findClosestByPath(towers);

                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_ROAD && object.hits < (object.hitsMax * 0.9);
                    }
                });
                creep.repair(road);
            }
        } else {
            if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sources) != 0) {
                    if (Game.flags[creep.name]) {
                        creep.moveTo(Game.flags[creep.name].pos);
                    }
                }
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
        }

    }
};

module.exports = roleStarter;