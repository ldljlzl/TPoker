const judgeLevel=require('../judgeLevel')
const expect=require('chai').expect

describe('测试同花顺', function() {
  it('应该level=8，78910J同花顺', function() {
    expect(judgeLevel([{count:5,suit:2},{count:6,suit:2},{count:7,suit:2},{count:8,suit:2},{count:9,suit:2},{count:2,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:8,maxNum:9});
  })
  it('应该level=8，23456同花顺', function() {
    expect(judgeLevel([{count:0,suit:2},{count:1,suit:2},{count:2,suit:2},{count:3,suit:2},{count:4,suit:2},{count:12,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:8,maxNum:13});
  })
})
describe('judgeLevel', function() {
  it('应该level=6，三个12，一对2', function() {
    expect(judgeLevel([{count:1,suit:2},{count:2,suit:0},{count:12,suit:1},{count:12,suit:1},{count:1,suit:3},{count:2,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:6,ThreeNum:12,PairNum:2});
  });
  it('应该level=8，56789同花顺', function() {
    expect(judgeLevel([{count:5,suit:2},{count:6,suit:2},{count:7,suit:2},{count:8,suit:2},{count:9,suit:2},{count:2,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:8,maxNum:9});
  });
});