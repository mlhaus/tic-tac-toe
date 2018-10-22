'use strict';

var thisNode, thisSpot;
var spots = [];
var totalClicks = 0;

var Spot = function(num){
  this.icon = num; //A temporary number so that all icon values are different
  this.marked = false;
  this.winner = false;
};

function isGameOver(thisSpot){
  return  spots[0].icon === spots[1].icon && spots[1].icon === spots[2].icon || 
          spots[3].icon === spots[4].icon && spots[4].icon === spots[5].icon || 
          spots[6].icon === spots[7].icon && spots[7].icon === spots[8].icon || 
          spots[0].icon === spots[4].icon && spots[4].icon === spots[8].icon || 
          spots[2].icon === spots[4].icon && spots[4].icon === spots[6].icon;
}

function spotClick(event){
  if(event.target.nodeName === 'LI'){
    thisNode = event.target;
    thisSpot = thisNode.spotObject;
    if(!thisSpot.marked){
      totalClicks++;
      var icon = document.createElement('span');
      if(totalClicks % 2 === 1){
        icon.classList.add('icon-cross');
        thisSpot.icon = "X";
      }
      else {
        icon.classList.add('icon-radio-unchecked');
        thisSpot.icon = "O";
      }
      thisNode.appendChild(icon);
      thisNode.classList.add('mark');
      thisSpot.marked = true;
      console.log(isGameOver());
    }
  }
};


window.addEventListener('load', function() {
  var board = this.document.querySelector('.board');
  board.innerHTML = '';
  for(var i = 0; i < 9; i++) {
    var spot = new Spot(i);
    spots.push(spot);
    var listItem = document.createElement('li');
    listItem.classList.add('spot');
    listItem.spotObject = spot;
    board.appendChild(listItem);
  }

  board.addEventListener('click', spotClick);
});