var checkLabs = {
    run: function() {

        for(var thisroom in Memory.Rooms) {
            var actualroom = Memory.Rooms[thisroom];
            if (!actualroom.Labs) {
                actualroom.Labs = {};
            } else {
                //delete Memory.Rooms[thisroom].Labratory.Create;

                var labs = Game.rooms[thisroom].find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_LAB }
                });
                if (labs.length > 2) {

                    if (!actualroom.Labratory) {
                        actualroom.Labratory = {};
                    }

                    if (!actualroom.Labratory.Create || actualroom.Market.Totals[actualroom.Labratory.Create] >= 10000 || actualroom.Market.Totals[actualroom.Labratory.Item1] < 100 || actualroom.Market.Totals[actualroom.Labratory.Item2] < 100) {
                        if (actualroom.Market.Totals[actualroom.Labratory.Create] && actualroom.Market.Totals[actualroom.Labratory.Create] > 10000 || actualroom.Market.Totals[actualroom.Labratory.Item1] < 5 || actualroom.Market.Totals[actualroom.Labratory.Item2] < 5) {
                            delete actualroom.Labratory.Create;
                            delete actualroom.Labratory.Item2;
                            delete actualroom.Labratory.Item1;
                            actualroom.Labratory.LabWait = 0;
                        }

                        if (actualroom.Labratory.LabWait == 0) {
                            var experimentReady = false;
                            for (var reaction in Memory.reactions) {
                                for (var reacResources in Memory.reactions[reaction]) {
                                    var finishedResource = Memory.reactions[reaction][reacResources];
                                    var startingResource = reaction;
                                    var mixingResource = reacResources;
                                    if (!actualroom.Market.Totals[finishedResource] || actualroom.Market.Totals[finishedResource] < 10000) {

                                        if (actualroom.Market.Totals[startingResource] && actualroom.Market.Totals[startingResource] >= 10000 && actualroom.Market.Totals[mixingResource] && actualroom.Market.Totals[mixingResource] >= 10000) {
                                            actualroom.Labratory.Create = finishedResource;
                                            actualroom.Labratory.Item1 = startingResource;
                                            actualroom.Labratory.Item2 = mixingResource;
                                            if (!actualroom.Market.Totals[finishedResource]) {
                                                actualroom.Labratory.CreateAmount = 10000;
                                            } else {
                                                actualroom.Labratory.CreateAmount = 10000 - actualroom.Market.Totals[finishedResource];
                                            }
                                            var labs = Game.rooms[thisroom].find(FIND_MY_STRUCTURES, {
                                                filter: {structureType: STRUCTURE_LAB}
                                            });
                                            var mainLabs = [];
                                            for (var lab in labs) {
                                                var labsInRange = labs[lab].pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: {structureType: STRUCTURE_LAB}});
                                                if (Game.rooms[thisroom].controller.level == 8) {
                                                    if (labsInRange.length >= 10) {
                                                        mainLabs.splice(0, 0, labs[lab]);
                                                    }
                                                } else if (Game.rooms[thisroom].controller.level == 7) {
                                                    if (labsInRange.length >= 6) {
                                                        mainLabs.splice(0, 0, labs[lab]);
                                                    }
                                                } else {
                                                    if (labsInRange.length >= 3) {
                                                        mainLabs.splice(0, 0, labs[lab]);
                                                    }
                                                }
                                            }
                                            actualroom.Labratory.lab1 = mainLabs[0].id;
                                            actualroom.Labratory.lab2 = mainLabs[1].id;
                                            experimentReady = true;
                                        }
                                    }
                                }
                            }
                            if (experimentReady == false) {
                                actualroom.Labratory.LabWait = 200;
                            }
                        } else {
                            actualroom.Labratory.LabWait = actualroom.Labratory.LabWait - 1;
                        }
                    }

                    var lab1 = Game.getObjectById(Memory.Rooms[thisroom].Labratory.lab1);
                    var lab2 = Game.getObjectById(Memory.Rooms[thisroom].Labratory.lab2);

                    if (lab1 && lab2 && lab1.mineralAmount >= 5 && lab2.mineralAmount >= 5) {
                        var otherLabs = Game.rooms[thisroom].find(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LAB && structure.id != lab1.id && structure.id != lab2.id && structure.mineralAmount < structure.mineralCapacity - 50);
                            }
                        });
                        if (otherLabs.length > 0) {
                            for (var x = 0; x < otherLabs.length; x++) {
                                if (otherLabs[x].cooldown <= 0){
                                    otherLabs[x].runReaction(lab1, lab2);
                                }
                            }
                        }
                    }





                    for (var i = 0; i < labs.length; i++) {
                        if (!actualroom.Labs[labs[i].id]) {
                            actualroom.Labs[labs[i].id] = {};
                        } else {
                            //console.log(labs[i].mineralType);
                        }
                    }
                }
            }
        }

    }
}
module.exports = checkLabs;