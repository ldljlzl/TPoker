
//判断牌型
function judgeLevel(arr){

    //有同花返回{Flush:true,FlushArr:同花的牌的位置构成的数组}；没有同花返回{Flush:false}
    let suitResult=judgeSuit(arr)

    //判断是否顺子
    //有顺子，返回{Straight:true,maxNum:顺子最高点数}；没有顺子返回{Straight:false}
    let sortResult=judgeSort(arr)

    //判断是否有四条
    //有四条返回{Four:true,count:点数}；没有四条返回{Four:false}
    let fourResult=judgeFour(arr)

    //判断是否有三条
    //有三条，返回{Three:true,count:index（哪个点数的三条）} ；没三条 {Three:false}
    let threeResult=judgeThree(arr)

    //判断是否有两条
    //有两条，返回数组{Pair:true,pairArr:[](数组长度1到3,从小到大)} ；没有两条，返回{Pair:false}
    let pairResult=judgePair(arr)

    if(suitResult.Flush&&(!fourResult.Four)){
        if(sortResult.Straight){
            return{
                Level:8,
                maxNum:sortResult.maxNum
            }
        }else{
            if(!(threeResult.Three&&pairResult.Pair)){
                let flushCount=[]
                suitResult.FlushArr.forEach(function(index){
                    flushCount.push(arr[index].count)
                })
                flushCount.sort(function(a,b){return a-b})
                return{
                    Level:5,
                    FlushCount:flushCount[flushCount.length-1]
                }
            }   
        }
    }else{
        if(fourResult.Four){
            let singleCountArr=[]
            arr.forEach(function(obj){
                if(obj.count!==fourResult.count){
                    singleCountArr.push(obj.count)
                }
            })
            singleCountArr.sort(function(a,b){return a-b})
            return{
                Level:7,
                FourNum:fourResult.count,
                SingleNum:singleCountArr[singleCountArr.length-1]
            }
        }else{ 
            if(threeResult.Three&&(!sortResult.Straight)){
                if(pairResult.Pair){
                    let pairCountArr=[]
                    pairResult.pairArr.forEach(function(obj){
                        pairCountArr.push(obj.count)
                    })
                    pairCountArr.sort(function(a,b){return a-b})
                    return{
                        Level:6,
                        ThreeNum:threeResult.count,
                        PairNum:pairCountArr[pairCountArr.length-1]
                    }
                }else{
                    let singleCountArr=[]
                    arr.forEach(function(obj){
                        if(obj.count!==threeResult.count){
                            singleCountArr.push(obj.count)
                        }
                    })
                    singleCountArr.sort(function(a,b){return a-b})
                    return{
                        Level:3,
                        ThreeNum:threeResult.count,
                        SingleNum:[singleCountArr[singleCountArr.length-1],singleCountArr[singleCountArr.length-2]]
                    }     
                }
            }else{
                if(sortResult.Straight){
                    return{
                        Level:4,
                        maxNum:sortResult.maxNum
                    }
                }else{
                    if(pairResult.Pair){
                        if(pairResult.pairArr.length>=2){
                            let singleCountArr=[]
                            let PairNum1=pairResult.pairArr[pairResult.pairArr.length-1]
                            let PairNum2=pairResult.pairArr[pairResult.pairArr.length-2]
                            arr.forEach(function(obj){
                                if((obj.count!==PairNum1)&&(obj.count!==PairNum2)){
                                    singleCountArr.push(obj.count)
                                }
                            })
                            singleCountArr.sort(function(a,b){return a-b})
                            return{
                                Level:2,
                                PairNum1:PairNum1,
                                PairNum2:PairNum2,
                                SingleNum:singleCountArr[singleCountArr.length-1]
                            }
                        }else{
                            let singleCountArr=[]
                            let PairNum=pairResult.pairArr[pairResult.pairArr.length-1]
                            arr.forEach(function(obj){
                                if(obj.count!==PairNum){
                                    singleCountArr.push(obj.count)
                                }
                            })
                            singleCountArr.sort(function(a,b){return a-b})
                            return{
                                Level:1,
                                PairNum:PairNum,
                                SingleNum1:singleCountArr[singleCountArr.length-1],
                                SingleNum2:singleCountArr[singleCountArr.length-2],
                                SingleNum3:singleCountArr[singleCountArr.length-3]
                            }
                        }
                    }else{
                        let singleCountArr=[]
                        arr.forEach(function(obj){
                            singleCountArr.push(obj.count)
                        })
                        singleCountArr.sort(function(a,b){return a-b})
                        return{
                            Level:0,
                            SingleNum1:singleCountArr[singleCountArr.length-1],
                            SingleNum2:singleCountArr[singleCountArr.length-2],
                            SingleNum3:singleCountArr[singleCountArr.length-3],
                            SingleNum4:singleCountArr[singleCountArr.length-4],
                            SingleNum5:singleCountArr[singleCountArr.length-5],
                        }
                    }
                }
                    
            }
        }
    }
}

module.exports=judgeLevel