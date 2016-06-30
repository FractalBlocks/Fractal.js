let {expect} = require('chai')
let R = require('../../lib/utils/ramdaMori')
let mori = R.mori


describe("Ramda-Mori tests", function () {

  var state = R.objToMori({a1: {a11: 11, a12: 12, a13: {a131: 131}}, a2: 2})

  describe("objToMori", function () {

    it("Should create properties", function () {
      expect(mori.get(state, 'a2')).to.be.equal(2)
    })

    it("Should create nested hashMaps", function () {
      expect(mori.isMap(mori.get(state, 'a1'))).to.be.equal(true)
    })

    it("Should create nested properties", function () {
      expect(mori.getIn(state, ['a1', 'a11'])).to.be.equal(11)
    })

    it("Should create deep nested properties", function () {
      expect(mori.getIn(state, ['a1', 'a13', 'a131'])).to.be.equal(131)
    })

  })


  describe("evolve", function () {
    var newState

    it("Should return a hashMap", function () {
      newState = R.evolve({a1: R.evolve({a11: R.always(555)})})(state)
      expect(mori.isMap(newState)).to.be.equal(true)
    })

    it("Should evolve properties", function () {
      expect(mori.getIn(newState, ['a1', 'a11'])).to.be.equal(555)
    })

  })

  describe("map", function () {
    var mapedState = R.map(x => x, state)

    it("Should map properties", function () {
      expect(mori.getIn(mapedState, ['a1', 'a11'])).to.be.equal(11)
    })

  })

})
