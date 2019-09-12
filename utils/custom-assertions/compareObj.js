const compareObj = function (obj1, obj2, message = null) {
 
  this.message = message || `Asserting that "${obj1}" is equal to "${obj2}"`
  
  this.expected = obj2
 
  this.pass = function(value) {
    return value === this.expected
  }

  this.value = function(result) {
    return result
  }

  this.command = function(callback) {
    return obj1
  }
}

module.exports.assertion = compareObj;