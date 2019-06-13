'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INNER_GAP = 20;
var BAR_GAP = 50;
var FONT_SIZE = 16;
var FONT_GAP = 5;
var BAR_WIDTH = 40;
var NOTE_HEIGHT = FONT_SIZE * 2 + FONT_GAP;
var MAX_BAR_HEIGHT = 150;
var PLAYER_NAME_Y = CLOUD_Y + INNER_GAP + NOTE_HEIGHT + FONT_GAP + FONT_SIZE + MAX_BAR_HEIGHT + FONT_GAP + FONT_SIZE;

var renderNote = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP + FONT_SIZE + FONT_GAP);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderColorfulRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderColorfulText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

// var getRandomBlueColor = function () {
//   var randomSaturation = Math.floor(Math.random() * 100);
//   return 'hsl(230, ' + randomSaturation + '%, 50%)';
// };

var getPlayerColor = function (playerName) {
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    // return getRandomBlueColor();
    var randomSaturation = Math.floor(Math.random() * 100);
    return 'hsl(230, ' + randomSaturation + '%, 50%)';
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  // console.log(names, times);

  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var playerTime = Math.floor(times[i]);

    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barY = CLOUD_Y + INNER_GAP + NOTE_HEIGHT + FONT_GAP + FONT_SIZE + (MAX_BAR_HEIGHT - barHeight);

    var timeY = barY - FONT_GAP;

    var barColor = getPlayerColor(playerName);

    renderColorfulText(ctx, playerTime, barX, timeY, 'black');
    renderColorfulRect(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
    renderColorfulText(ctx, playerName, barX, PLAYER_NAME_Y, 'black');
  }

  renderNote(ctx);
};
