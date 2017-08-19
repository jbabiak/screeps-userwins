var roleLaber = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.ticksToLive <= 40) {
            if (_.sum(creep.carry) > 0) {
                 for (var eachMineral in creep.carry){
                    if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                        creep.say('s' + eachMineral);
                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    } else if (eachMineral.length == 1) {
                        creep.say('t' + eachMineral);
                        if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                    }

                }
                return;
            } else {
                creep.suicide();
                return;
            }
            return;
        }
        var found = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            if(found.length > 0 && found.resourceType != RESOURCE_ENERGY) {
                    creep.pickup(found[0]);

            }
        var found = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (structure) => {
                            return (structure.resourceType != RESOURCE_ENERGY);
                        }
                });
        if(found.length > 0 && _.sum(creep.carry) < creep.carryCapacity) {
            var closestFound = creep.pos.findClosestByRange(found);
           if (creep.pickup(closestFound) == ERR_NOT_IN_RANGE) {
               creep.moveTo(closestFound);
           }
           return;
        }
        var nuker = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_NUKER && structure.ghodium < structure.ghodiumCapacity);
                        }
                });
        if (nuker.length > 0 && Memory.Rooms[creep.room.name].Market.Totals[RESOURCE_GHODIUM] && (Memory.Rooms[creep.room.name].Market.Totals[RESOURCE_GHODIUM] > 5000 || Memory.Rooms[creep.room.name].Market.Totals[RESOURCE_GHODIUM] + creep.carry[RESOURCE_GHODIUM] > 5000)) {
            if (_.sum(creep.carry) == 0) {
                if (creep.room.terminal.store[RESOURCE_GHODIUM]){
                    if(creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                        }
                        return;
                } else {
                    var result = creep.withdraw(creep.room.storage, RESOURCE_GHODIUM);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                    return;
                }
            } else {
                if(creep.transfer(nuker[0], RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nuker[0]);

                }
                return;
            }
        }
        /**
        for (var eachMineral in creep.room.terminal.store){
             if (eachMineral != RESOURCE_ENERGY && eachMineral.length > 1 && _.sum(creep.carry) < creep.carryCapacity) {
                if(creep.withdraw(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                    return;
                }
             }
        }
        for (var eachMineral in creep.carry){

            if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
                return;
            }
             
        }**/
        var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) > 650 && structure.store[RESOURCE_ENERGY] < _.sum(structure.store));
                    }
            });

        if (containers.length > 0 ) {
            if (_.sum(creep.carry) == creep.carryCapacity){
                creep.memory.extracting = false;
            }
            else if(_.sum(creep.carry) == 0) {
                creep.memory.extracting = true;
    	    }


    	    if(creep.memory.extracting) {


                var targets = creep.room.find(FIND_MINERALS);
                if (containers.length > 0) {
                    if (creep.withdraw(containers[0], targets[0].mineralType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);

                    }
                }

            } else {
                for (var eachMineral in creep.carry){
                    if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                        return;
                    }
                }
            }
             return;
        } else {
            if (creep.room.terminal){
            if (creep.room.terminal.store.energy >= 42000) {
                creep.memory.job = 'removeEnergy';
            } else if(creep.room.terminal.store[RESOURCE_ENERGY] < 40000) {
                creep.memory.job = 'refillEnergy';
            } else if (creep.room.terminal.store[RESOURCE_ENERGY] >= 40000) {
                creep.memory.job = 'stockLabs';
            }
            if (creep.memory.job == 'removeEnergy') {
                 if (_.sum(creep.carry) == creep.carryCapacity) {
                    for (var eachMineral in creep.carry){
                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    }
                } else {
                    if(creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                }
            } else if (creep.memory.job == 'overflowEnergy') {
                 if (_.sum(creep.carry) == creep.carryCapacity) {

                    for (var eachMineral in creep.carry){
                        if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                         } else if (eachMineral.length == 1) {
                             if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                         }
                    }
                } else {
                    if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                }
            } else if (creep.memory.job == 'refillEnergy') {
                if (_.sum(creep.carry) == creep.carryCapacity) {
                    for (var eachMineral in creep.carry){
                        if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                    }
                } else {
                    if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                }
            } else if (creep.memory.job == 'stockLabs') {

                    //remove excess if from other task has carry
                    if (_.sum(creep.carry) > 0 && (creep.carry[Memory.Rooms[creep.room.name].Labratory.Create] < _.sum(creep.carry) && creep.carry[Memory.Rooms[creep.room.name].Labratory.Item1] < _.sum(creep.carry) && creep.carry[Memory.Rooms[creep.room.name].Labratory.Item2]< _.sum(creep.carry))) {
                        for (var eachMineral in creep.carry){

                           if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                                if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                    return;
                                }
                            } else if (eachMineral.length == 1) {

                              if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.terminal);
                                return;
                            }
                            }
                        }
                    }
                    var lab1 = Game.getObjectById(Memory.Rooms[creep.room.name].Labratory.lab1);
                    var lab2 = Game.getObjectById(Memory.Rooms[creep.room.name].Labratory.lab2);

                    if (lab1 && lab2) {

                        if (lab1.mineralType != null && lab1.mineralType != Memory.Rooms[creep.room.name].Labratory.Item1) {

                            if (_.sum(creep.carry) <= 0) {
                                if(creep.withdraw(lab1, lab1.mineralType) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(lab1);
                                    return;
                                }
                            } else {
                                for (var eachMineral in creep.carry){
                                    if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {

                                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.storage);
                                            return;
                                        }
                                    } else if (eachMineral.length == 1) {
                                        if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.terminal);
                                            return;
                                        }

                                    }
                                }
                            }
                        } else if (lab2.mineralType != null && lab2.mineralType != Memory.Rooms[creep.room.name].Labratory.Item2) {

                            if (_.sum(creep.carry) <= 0) {
                                if(creep.withdraw(lab2, lab2.mineralType) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(lab2);
                                    return;
                                }
                            } else {
                                for (var eachMineral in creep.carry){
                                    if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.storage);
                                            return;
                                        }
                                    } else if (eachMineral.length == 1) {
                                        if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.terminal);
                                            return;
                                        }
                                    }
                                }
                            }
                        }

                        //surrond with if to check if other labs have the completed mix

                        if (creep.memory.labTask != 'returnMixed') {
                            if (lab1.mineralAmount > 50 && lab2.mineralAmount > 50) {
                                creep.memory.labTask = 'returnMixed';
                            } else if (!lab2.mineralAmount || lab2.mineralAmount < 1000 && lab2.mineralAmount <= lab1.mineralAmount) {
                                creep.memory.labTask = 'stockLab2';
                            } else if (!lab1.mineralAmount || lab1.mineralAmount < 1000 && lab1.mineralAmount <= lab2.mineralAmount) {
                                creep.memory.labTask = 'stockLab1';
                            }

                            if ( creep.memory.labTask == 'stockLab1') {
                                var objectPickUp = Memory.Rooms[creep.room.name].Labratory.Item1;
                                var objectDeliverTo = lab1;
                            } else  if ( creep.memory.labTask == 'stockLab2') {
                                var objectPickUp = Memory.Rooms[creep.room.name].Labratory.Item2;
                                var objectDeliverTo = lab2;
                            }
                            if (creep.carry[objectPickUp]) {

                                    if(creep.transfer(objectDeliverTo, objectPickUp) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(objectDeliverTo);
                                        return;
                                    }
                            } else if (_.sum(creep.carry) == 0) {
                                creep.say(objectPickUp);
                                if (creep.room.terminal.store[objectPickUp]){
                                    if(creep.withdraw(creep.room.terminal, objectPickUp) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.terminal);
                                        }
                                } else {
                                    var result = creep.withdraw(creep.room.storage, objectPickUp);
                                    if(result == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(creep.room.storage);
                                    } else if (result == ERR_NOT_ENOUGH_RESOURCES) {
                                        //creep.memory.labTask = 'returnMixed';
                                    }
                                }
                            } else {
                                for (var eachMineral in creep.carry){
                                    if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                                        creep.say('s' + eachMineral);
                                        if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.storage);
                                            return;
                                        }
                                    } else if (eachMineral.length == 1) {
                                        creep.say('t' + eachMineral);
                                        if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.terminal);
                                            return;
                                        }
                                    }

                                }
                            }

                        } else {

                            //return mixed
                            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                                        filter: (structure) => {
                                        return (structure.structureType == STRUCTURE_LAB) && structure.id != Memory.Rooms[creep.room.name].Labratory.lab1 && structure.id != Memory.Rooms[creep.room.name].Labratory.lab2 && structure.mineralAmount > 0;
                                }
                            });
                            if (targets.length > 0) {

                                var closestTarget = creep.pos.findClosestByPath(targets);
                                //this needs to be fixed with memory
                                if (_.sum(creep.carry) >= 200) {

                                    for (var eachMineral in creep.carry){
                                       if ((eachMineral == RESOURCE_ENERGY &&  creep.carry.energy > 0)  || (eachMineral.length > 1 && eachMineral != RESOURCE_ENERGY)) {
                                            if(creep.transfer(creep.room.storage, eachMineral) == ERR_NOT_IN_RANGE) {
                                                creep.moveTo(creep.room.storage);

                                            }
                                        }  else if (eachMineral.length == 1) {
                                            if(creep.transfer(creep.room.terminal, eachMineral) == ERR_NOT_IN_RANGE) {
                                                creep.moveTo(creep.room.terminal);

                                            }
                                        }
                                    }
                                } else {
                                    if(creep.withdraw(closestTarget, closestTarget.mineralType) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(closestTarget);
                                        return;
                                    }
                                }
                            } else {
                                creep.memory.labTask = 'stockLab1';
                            }

                        }
                    }


            }
            }
            //be a laber
        }
	}
};

module.exports = roleLaber;

function Search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i] === nameKey) {
            return myArray[i];
        }
    }
}