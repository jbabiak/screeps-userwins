var checkMarkets = {
    run: function() {
        marketPrices();
        for(var thisroom in Memory.Rooms) {
            var actualroom = Memory.Rooms[thisroom];
            var mystructs = Game.rooms[thisroom].find(FIND_MY_SPAWNS);
            if (Game.rooms[thisroom].terminal && mystructs.length > 0) {
            if (!actualroom.Market) {
                actualroom.Market = {};
                actualroom.Market.Totals = {};
            } else {
                delete actualroom.Market.Terminal;
                delete actualroom.Market.Storage;
                actualroom.Market.Totals =  MergeRecursive(Game.rooms[thisroom].storage.store, Game.rooms[thisroom].terminal.store);
                displayVisuals(thisroom, actualroom.Market.Totals);
                var labs = Game.rooms[thisroom].find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LAB && structure.mineralAmount > 0);
                        }
                });
                for (var i = 0; i < labs.length; i++) {

                    if (actualroom.Market.Totals[labs[i].mineralType]){
                        actualroom.Market.Totals[labs[i].mineralType] = actualroom.Market.Totals[labs[i].mineralType] + labs[i].mineralAmount;
                    } else {
                        actualroom.Market.Totals[labs[i].mineralType] = labs[i].mineralAmount;
                    }
                }
            }

            shuffleResources(thisroom, actualroom);
            for (var mineralName in Memory.Rooms[thisroom].Market.Totals) {
                var minAmount = Game.rooms[thisroom].terminal.store[mineralName];
                if (minAmount > 40000 && mineralName != 'energy'){
                    var sellAmount = minAmount - 35000;
                    var dontOrder = _.find(Game.market.orders, function(o) {
                            return (o.resourceType == mineralName && o.type == ORDER_SELL && o.roomName == thisroom);
                    });

                    if (!dontOrder){
                        console.log(Game.market.createOrder(ORDER_SELL, mineralName, Memory.stats.marketPrices[mineralName].lowestSellPrice, sellAmount, thisroom));
                    }
                }
            }
            var resourcesToBuy = [];
            resourcesToBuy = [RESOURCE_LEMERGIUM, RESOURCE_KEANIUM];
            for (var i = 0; i < resourcesToBuy.length; i++) {
                if (!Memory.Rooms[thisroom].Market.Totals[resourcesToBuy[i]] || Memory.Rooms[thisroom].Market.Totals[resourcesToBuy[i]] < 10000) {

                    var dontOrder = _.find(Game.market.orders, function(o) {
                            return (o.resourceType == resourcesToBuy[i] && o.type == ORDER_BUY && o.roomName == thisroom);
                    });
                    if (!dontOrder){
                        console.log('Room:' + thisroom + ' Needs: ' + resourcesToBuy[i]);
                        console.log(Game.market.createOrder(ORDER_BUY, resourcesToBuy[i], Memory.stats.marketPrices[resourcesToBuy[i]].lowestSellPrice, 10000, thisroom));
                    }
                }
            }


            }
        }
        for(var id in Game.market.orders) {
            if (Game.market.orders[id].active == false && Game.market.orders[id].remainingAmount <= 0) {
                if (Game.market.cancelOrder(id) == 0) {
                    console.log('CANCELING ORDER: ' + JSON.stringify(Game.market.orders[id]));
                }

            }
        }

    }
}
module.exports = checkMarkets;
function marketPrices(){
   // Memory.stats.marketTicker = 0;
    var marketTick = Memory.stats.marketTicker;
    var allOrders = Game.market.getAllOrders({resourceType: RESOURCES_ALL[marketTick]});
    for (var i = 0; i < allOrders.length; i++) {
        var thisOrder = allOrders[i];
        //Memory.stats.marketPrices[RESOURCES_ALL[i]] = {};
        if (thisOrder.type == 'buy') {
            if (thisOrder.price >  Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].highestBuyPrice) {
                Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].highestSellPrice = thisOrder.price
            } else if (thisOrder.price <  Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].highestBuyPrice) {
                Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].lowestSellPrice = thisOrder.price
            }
        } else {
            if (thisOrder.price >  Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].highestSellPrice) {
                Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].highestSellPrice = thisOrder.price
            } else if (thisOrder.price <  Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].lowestSellPrice) {
                Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].lowestSellPrice = thisOrder.price
            }
        }
    }

    Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].mySellPrice = 0;
    Memory.stats.marketPrices[RESOURCES_ALL[marketTick]].myBuyPrice = 0;

    if ((marketTick + 1) >= 43) {
        Memory.stats.marketTicker = 0;
    } else {
        Memory.stats.marketTicker++;
    }
}
function shuffleResources(thisroom, actualroom) {
    var homeMineral = Game.rooms[thisroom].find(FIND_MINERALS);
        var actualResource = homeMineral[0].mineralType;

        if (actualroom.Market.Totals[actualResource] >= 30000 && Game.rooms[thisroom].terminal && Game.rooms[thisroom].terminal.store[actualResource] > 10000) {
            //console.log(JSON.stringify(eachResource) + JSON.stringify(actualResource));
            for (var checkRoom in Memory.Rooms) {
                if (Game.rooms[checkRoom].terminal && checkRoom != thisroom) {
                    var actualCheckRoom = Memory.Rooms[checkRoom];
                    if (actualCheckRoom.Market.Totals[actualResource]) {

                        if (actualCheckRoom.Market && actualCheckRoom.Market.Totals[actualResource] <= 15000) {
                           console.log('Transfering from ' + thisroom + ' room, 10,000 of resourcetype: ' + actualResource + ' to room: ' + checkRoom);
                            console.log(Game.rooms[thisroom].terminal.send(actualResource, 10000, checkRoom, 'np'));
                            return;
                        }

                    } else {
                        console.log('(target room had none) Transfering from ' + thisroom + ' room, 10,000 of resourcetype: ' + actualResource + ' to room: ' + checkRoom);

                        console.log(Game.rooms[thisroom].terminal.send(actualResource, 10000, checkRoom, 'np'));
                        return;
                    }

                }
            }
        }

}
function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

      } else {
          if ( obj1[p]) {
            obj1[p] = obj2[p] +  obj1[p];
          } else {
             obj1[p] = obj2[p];
          }

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}

function displayVisuals(thisroom, Totals) {
    var i = 0;
    for (var mineralName in Totals) {
        i++;
        new RoomVisual(thisroom).text((mineralName + ' : ' + Totals[mineralName]), 5, i, {color: 'green', font: 0.8});
    }
}