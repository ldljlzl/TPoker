const judgeLevel=require('../judgeLevel')
const expect=require('chai').expect

describe('测试同花顺,Level=8', function() {
  it('78910J同花顺', function() {
    expect(judgeLevel([{count:5,suit:2},{count:6,suit:2},{count:7,suit:2},{count:8,suit:2},{count:9,suit:2},{count:2,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:8,maxNum:9});
  })
  it('23456同花顺', function() {
    expect(judgeLevel([{count:0,suit:2},{count:1,suit:2},{count:2,suit:2},{count:3,suit:2},{count:4,suit:2}])).to.be.deep.equal({Level:8,maxNum:13});
  })
})
describe('测试四条,Level=7', function() {
  it('4个A，一个5', function() {
    expect(judgeLevel([{count:12,suit:2},{count:12,suit:1},{count:12,suit:3},{count:12,suit:0},{count:3,suit:2},{count:2,suit:2},{count:3,suit:0}])).to.be.deep.equal({Level:7,FourNum:12,SingleNum:3});
  })
  it('4个K，一个3', function() {
    expect(judgeLevel([{count:11,suit:2},{count:11,suit:1},{count:11,suit:3},{count:11,suit:0},{count:5,suit:2}])).to.be.deep.equal({Level:7,FourNum:11,SingleNum:5});
  })
  it('4个3，一个6', function() {
    expect(judgeLevel([{count:1,suit:2},{count:1,suit:1},{count:4,suit:3},{count:2,suit:3},{count:1,suit:0},{count:1,suit:3}])).to.be.deep.equal({Level:7,FourNum:1,SingleNum:4});
  })
})
describe('三带二，Level=6', function() {
  it('三个A，一对4', function() {
    expect(judgeLevel([{count:1,suit:2},{count:2,suit:0},{count:12,suit:1},{count:12,suit:1},{count:1,suit:3},{count:2,suit:2},{count:12,suit:0}])).to.be.deep.equal({Level:6,ThreeNum:12,PairNum:2});
  });
  it('应该level=8，3个6，一对A', function() {
    expect(judgeLevel([{count:4,suit:0},{count:4,suit:1},{count:4,suit:2},{count:12,suit:2},{count:12,suit:2}])).to.be.deep.equal({Level:6,ThreeNum:4,PairNum:12});
  });
});
describe('同花，Level=5', function() {
  it('0同花/三条', function() {
    expect(judgeLevel([{count:1,suit:0},{count:2,suit:0},{count:3,suit:0},{count:7,suit:1},{count:7,suit:3},{count:7,suit:0},{count:5,suit:0}])).to.be.deep.equal({Level:5,maxNum:7});
  });
  it('0同花/顺子', function() {
    expect(judgeLevel([{count:1,suit:0},{count:2,suit:0},{count:3,suit:0},{count:4,suit:1},{count:11,suit:3},{count:7,suit:0},{count:5,suit:0}])).to.be.deep.equal({Level:5,maxNum:7});
  });
});
describe('三条，Level=3', function() {
  //asdsadsad
});
describe('两对，Level=2', function() {
  
});
describe('一对，Level=1', function() {
  
});
describe('单牌，Level=0', function() {
  
});
