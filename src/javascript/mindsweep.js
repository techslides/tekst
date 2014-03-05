/* src/javascript/mindsweep.js */

/*
 * Written by Kyle Dinh, 2013. 
 * https://github.com/kyledinh/toolkit/tree/master/mindsweep
 * Use d8 or node.js to run this mine sweeper game
 * d8 --shell console.js mindsweep.js
 * var g = new Game(8,9);
 * g.start();
 * g.click(2,3);
 * g.show();
 * g.cheat();      // to see where the bombs are
 * 
 */

/*jslint devel: true, white: true, indent: 3, node: true */
//http://www.javascriptlint.com/online_lint.php
'use strict';

// Tile
// status: UNKNOWN | CHECKED | CLICKED | BOMB
function Tile(status, touch, x, y) {
    this.status = status || "UNKNOWN";
    this.touch = touch || 0;
    this.x = x;
    this.y = y;
}

Tile.prototype.print = function () {
    console.log(this.x + ", " + this.y + " " + this.status);
};

Tile.prototype.cheat = function () {
    var out = this.touch || "=";
    if (this.touch !== "undefined") { out = this.touch; }
    if (this.status === "BOMB") { out = "*"; }
    return out; 
};

Tile.prototype.show = function () {
    var out = "=";
    if ((this.status === "CHECKED") && (this.touch > 0)) { out = this.touch; }
    if ((this.status === "CHECKED") && (this.touch === 0)) { out = String.fromCharCode(160); }
    //if ((this.status === "CLICKED")) { out = "."; }
    if ((this.status === "CLICKED")) { out = this.touch; }
    return out; 
};

Tile.prototype.updateTouch = function(cnt) {
    if (this.status !== "BOMB") {
        this.touch = cnt;
    } 
};

// Grid

function Grid(x, y) {
    this.x = x;
    this.y = y;
    this.tiles = null;
}

Grid.prototype.setup = function () {
    var i, j, arr = [this.x];
    for (i=0; i < this.x; i++) {
         arr[i] = [this.y]; 
    }
    this.tiles = arr;
    for (i=0; i < this.x; i++) {
        for (j=0; j < this.y; j++) {
            this.tiles[i][j] = new Tile("UNKNOWN", 0, i, j);
        }
    }
};

//Console log the state of the Grid 
Grid.prototype.cheat = function () {
    var i, j; 
    var out = []; 
    var header = "          ";
    if (this.y > 10) { header = header + " "; }
    for (i=0; i < this.x; i++) {
        header = header + i + "  ";
        if (i < 10) { header += " "; }
    }
    console.log(header);
    for (j=0; j < this.y; j++) {
        var log = (j < 10) ? "row  " + j + " :" : "row " + j + " :"; 
        for (i=0; i < this.x; i++) {
            log = log + "[" + this.tiles[i][j].cheat() + "] "; 
            if (this.tiles[i][j].status === "BOMB") {
                out.push({x: i, y: j, show: this.tiles[i][j].cheat()});
            }
        } 
        console.log(log);
    }
    return out;
};

//Console log the state of the Grid
Grid.prototype.show = function () {
    var i, j; 
    var out = [];
    var header = "          ";
    if (this.y > 10) { header += " "; } 
    for (i=0; i < this.x; i++) {
        header = header + i + "  ";
        if (i < 10) { header += " "; }
    }
    console.log(header);
    for (j=0; j < this.y; j++) {
        var row = [];
        var log = (j < 10) ? "row  " + j + "  " : "row " + j + "  "; 
        for (i=0; i < this.x; i++) {
            log = log + "[" + this.tiles[i][j].show() + "] "; 
            row.push({x: i, y: j, show: this.tiles[i][j].show()});
        }
        out.push(row); 
        console.log(log);
    }
    return out;
};

//Switch some Tiles to Bomb tiles 
Grid.prototype.layBombs = function (numBombs) {
    var i; 
    var bombArr = [];
    var size = this.x * this.y; 
    for (i=0; i < size; i++) {
         bombArr.push(i);
    }
    bombArr = shuffleArray(bombArr);
    for (i=0; i < numBombs; i++) {
        var bomb = bombArr.pop();
        var row = Math.floor(bomb / this.x);    
        var mod = bomb % this.x;
        this.tiles[mod][row].status = "BOMB";
    }
};

Grid.prototype.isInBounds = function (x, y) {
    //console.log("checking InBound " + x + ", " + y);
    if ((x < 0) || (x >= this.x)) { return false; }
    if ((y < 0) || (y >= this.y)) { return false; }
    return true;
};

// Updates the tile's touch field with # of bombs that are adjacent
Grid.prototype.updateTiles = function () {
    var i, j;
    for (j=0; j < this.y; j++) {     // row
        for (i=0; i < this.x; i++) { // col
            var cnt = 0;
            if (this.isInBounds(i -1,j -1)) { if (this.tiles[i -1][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i    ,j -1)) { if (this.tiles[i    ][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j -1)) { if (this.tiles[i +1][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i -1,j    )) { if (this.tiles[i -1][j    ].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j    )) { if (this.tiles[i +1][j    ].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i -1,j +1)) { if (this.tiles[i -1][j +1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i    ,j +1)) { if (this.tiles[i    ][j +1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j +1)) { if (this.tiles[i +1][j +1].status === "BOMB") {cnt++;} }
            console.log("updatingTouch " + i + ", " + j + " with " + cnt);
            this.tiles[i][j].updateTouch(cnt);
        }
    }
};

Grid.prototype.stringifyTiles = function () {
    var i, j, arr = [];
    for (j=0; j < this.y; j++) {     // row
        for (i=0; i < this.x; i++) { // col
            arr.push(this.tiles[i][j]);
        }
    }
    return JSON.stringify(arr);
}

Grid.prototype.parseTiles = function (str) {
    var arr = JSON.parse(str);
    var i, n = arr.length;
    for (i=0; i < n; i++) {
        this.tiles[arr[i].x][arr[i].y] = new Tile(arr[i].status, arr[i].touch, arr[i].x, arr[i].y);
    }
}

/*
 * Game object
 */

function Game(x, y) {
    this.grid = new Grid(x, y);
    this.moves = 0;
    this.numBombs;
    this.state;
    this.name;
    this.id;
    this.action;
}

function checkZeroAndPush(t, arr) {
    if ((t.touch === 0) && (t.status !== "CHECKED") && (t.status !== "CLICKED") && (t.status !== "BOMB")) {
        t.status = "CHECKED";
        arr.push(t);
        console.log("pushing to checkArr: " + t.x + ", " + t.y);
    }
    if ((t.touch > 0) && (t.status !== "BOMB") && (t.status !== "CLICKED")) {
        t.status = "CHECKED";
        console.log("marked adjacent : " + t.x + ", " + t.y);
    }
}

Game.prototype.click = function (x, y) {
    if (this.grid.isInBounds(x,y) === false) {
        console.log("Invalid click: It's off the grid, please select again!");
        return "INVALID";
    } 
    this.moves = this.moves +1;
    if ( this.grid.tiles[x][y].status === "BOMB") {
        console.log("YOU HIT A BOMB!!!");
        return "BOMB";
    }
    
    //passed invalid or bomb; process click
    this.grid.tiles[x][y].status = "CLICKED";

    var tile, checkArr = [];
    if (this.grid.tiles[x][y].touch === 0) {
        checkArr.push(this.grid.tiles[x][y]);
    }
    //while ((tile = checkArr.pop()) !== undefined) {
    while (checkArr.length > 0) {
        tile = checkArr.pop();
        var i = tile.x;
        var j = tile.y;
        tile.status = "CHECKED";
        //2D Array, looping through neighbors
        if (this.grid.isInBounds(i -1,j -1)) { checkZeroAndPush(this.grid.tiles[i -1][j -1], checkArr); }
        if (this.grid.isInBounds(i   ,j -1)) { checkZeroAndPush(this.grid.tiles[i   ][j -1], checkArr); }
        if (this.grid.isInBounds(i +1,j -1)) { checkZeroAndPush(this.grid.tiles[i +1][j -1], checkArr); }
        if (this.grid.isInBounds(i -1,j   )) { checkZeroAndPush(this.grid.tiles[i -1][j   ], checkArr); }
        if (this.grid.isInBounds(i +1,j   )) { checkZeroAndPush(this.grid.tiles[i +1][j   ], checkArr); }
        if (this.grid.isInBounds(i -1,j +1)) { checkZeroAndPush(this.grid.tiles[i -1][j +1], checkArr); }
        if (this.grid.isInBounds(i   ,j +1)) { checkZeroAndPush(this.grid.tiles[i   ][j +1], checkArr); }
        if (this.grid.isInBounds(i +1,j +1)) { checkZeroAndPush(this.grid.tiles[i +1][j +1], checkArr); }
    }
    return "OK"; 
};

Game.prototype.start = function (numBombs) {
    this.numBombs = numBombs || 8;
    this.grid.setup();
    this.grid.layBombs(this.numBombs);
    this.grid.updateTiles();
};

Game.prototype.show = function () {
    console.log("show:");
    return this.grid.show();
};

Game.prototype.cheat = function () {
    console.log("cheat view:");
    return this.grid.cheat();
};

Game.prototype.stringify = function () {
    var obj = new Game(this.grid.x, this.grid.y);
    obj.grid = this.grid.stringifyTiles();
    obj.moves = this.moves;
    obj.numBombs = this.numBombs;
    obj.name = this.name;
    obj.state = this.state;
    obj.id = this.id;
    obj.action = this.action;
    return JSON.stringify(obj);
}

// LIBRARY

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

