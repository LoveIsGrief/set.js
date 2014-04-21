/* The MIT License (MIT)

Copyright (c) 2011-2012 George "Gary" Katsevman

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE S
OFTWARE.
*/

var Set = function () {

var Set = function(array){
  this._array = []

  for (i in array || []) {
    this.add(array[i])
  }
}

Set.prototype.contains = function(prop){
  return this._array.some(function(element) {
            return prop == element
          });
}

Set.prototype.empty = function(){
  return this._array.length == 0
}

Set.prototype.size = function(){
  return this._array.length
}

Set.prototype.get = function(){
  return this._array
}

Set.prototype.add = function(prop){
  if (!this.contains(prop)) {
    this._array.push(prop)
  }
}

Set.prototype.remove = function(prop){
  delete this._array.splice(this._array.indexOf(prop), 1)
}

Set.prototype.union = function(iset){
  return new Set(this.get().concat(iset.get()))
}


Set.prototype.intersect = function(iset){
  var items = iset.get()
    , i = 0
    , l = items.length
    , oset = new Set()
    , prop

  for(; i < l; i++){
    prop = items[i]
    if(this.contains(prop)){
      oset.add(prop)
    }
  }

  items = this.get()

  for(i = 0, l = items.length; i < l; i++){
    prop = items[i]
    if(iset.contains(prop)){
      oset.add(prop)
    }
  }

  return oset
}

Set.prototype.difference = function(iset){
  var items = iset.get()
    , i = 0
    , l = items.length
    , oset = this.union(iset)
    , prop

  for(; i < l; i++){
    prop = items[i]
    if(this.contains(prop)){
      oset.remove(prop)
    }
  }

  return oset
}

Set.prototype.subset = function(iset){
  var items = iset.get()
    , subset = false
    , i = 0
    , l = items.length

  for(; i < l; i++){
    prop = items[i]
    if(this.contains(prop)){
      subset = true
    }
    else{
      subset = false
      break
    }
  }

  return subset
}

Set.prototype.find = function(pred){
  return this.get().filter(pred)
}

Set.prototype.clear = function(){
  this._array.length = 0
}

/**
 * Doesn't modify the given array and returns a unique version thereof.
 *
 * @param {Array} array - Array to make unique
 * @param {Function} comparator - @see Set
 * @returns {Array} Unique array from given array
 */
Set.unique = function(array){
  return new Set(array).get()
}

return Set

}()

if(typeof module === 'object' && module.hasOwnProperty('exports')){
  module.exports = Set;
}
