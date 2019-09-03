const elementCount = function (selector, count, message = null) {
 
  this.message = message || `Asserting that there are "${count}" visible elements that match "${selector}"`
  
  this.expected = count
 
  this.pass = function(value) {
    return value === this.expected
  }

  this.value = function(result) {
    return result.value.length
  }

  this.command = function(callback) {
    return this.api.elements(this.client.locateStrategy, selector, callback)
  }
}

module.exports.assertion = elementCount;