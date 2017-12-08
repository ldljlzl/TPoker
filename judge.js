// import judgeLevel from 'judgeLevel'
// const judgeLevel=require('./judgeLevel')
let arr=[]

//生成随机的7张牌的牌型
for(let i=0;i<7;i++){
    let num=Math.floor(Math.random()*52)
    arr.push({
        count:num%13,
        suit:parseInt(num/13)
    })
}

let lzl1=judgeLevel([{count:1,suit:2},{count:2,suit:0},{count:12,suit:1},{count:12,suit:1},{count:1,suit:3},{count:2,suit:2},{count:12,suit:0}]) 
let lzl=0



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
                    pairResult.pairArr.forEach(function(num){
                        if(num!==threeResult.count){
                            pairCountArr.push(num)
                        }  
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


//判断是否有两条
//有两条，返回数组{Pair:true,pairArr:[](数组长度1到3,从小到大)} ；没有两条，返回{Pair:false}
function judgePair(arr){

    //牌的点数数组
    let cardCount=arr.map(function(elem){
        return elem.count
    })

    //各个点数的数量
    //各个点数的数量
    let countNum=[0,0,0,0,0,0,0,0,0,0,0,0,0]//13种点数
    cardCount.forEach(function(n){
        countNum[n]+=1
    })
    let result=countNum.map(function(num,index){
        if(num>=2){
            return {
                Pair:true,  //是否有三条
                count:index //哪个点数的三条
            }
        }else{
            return{
                Pair:false
            }
        }
    }).filter(function(elem){
        return (elem.Pair)
    })
    if(result.length>0){
        let pairArr=[]
        result.forEach(function(obj){
            pairArr.push(obj.count)
        })
        pairArr.sort(function(a,b){return a-b})
        return {
            Pair:true,
            pairArr:pairArr        
        }
    }else{
        return {
            Pair:false
        }
    }
}

//判断是否有三条
//有三条，返回{Three:true,count:index（哪个点数的三条）} ；没三条 {Three:false}
function judgeThree(arr){

    //牌的点数数组
    let cardCount=arr.map(function(elem){
        return elem.count
    })

    //各个点数的数量
    //各个点数的数量
    let countNum=[0,0,0,0,0,0,0,0,0,0,0,0,0]//13种点数
    cardCount.forEach(function(n){
        countNum[n]+=1
    })
    let result=countNum.map(function(num,index){
        if(num>=3){
            return {
                Three:true,  //是否有三条
                count:index //哪个点数的三条
            }
        }else{
            return{
                Three:false
            }
        }
    }).filter(function(elem){
        return (elem.Three)
    })
    if(result.length===1){
        return result[0]
    }else if(result.length===2){
        return result[0].count>result[1].count?result[0]:result[1]
    }else{
        return {
            Three:false
        }
    }
}

//判断是否有四条
//有四条返回{Four:true,count:点数}；没有四条返回{Four:false}
function judgeFour(arr){

    //牌的点数数组
    let cardCount=arr.map(function(elem){
        return elem.count
    })

    //各个点数的数量
    let countNum=[0,0,0,0,0,0,0,0,0,0,0,0,0]//13种点数
    cardCount.forEach(function(n){
        countNum[n]+=1
    })
    let result=countNum.map(function(num,index){
        if(num>=4){
            return {
                Four:true,  //是否有四条
                count:index //哪个点数的四条
            }
        }else{
            return{
                Four:false
            }
        }
    }).filter(function(elem){
        return (elem.Four)
    })


    if(result.length>0){
        return result[0]
    }else{
        return {
            Four:false
        }
    }
}

//判断是否同花
//有同花返回{Flush:true,FlushArr:同花的牌的位置构成的数组}；没有同花返回{Flush:false}
function judgeSuit(arr){
    
    // 7张牌的花色数组
    let cardSuit=arr.map(function(elem){
        return elem.suit
    })

    //7张牌中4种花色的数量
    let suitNum=[0,0,0,0]
    cardSuit.forEach(function(n){
        suitNum[n]+=1
    })


    let Flush //是否有同花
    let FlushSuit //同花的花色
    let FlushArr=[] //同花的牌的位置
    suitNum.forEach(function(elem,index){
        if(elem>=5){
            Flush=true
            FlushSuit=index
        }
    })
    if(Flush){
        cardSuit.forEach(function(elem,index){
            if(elem===FlushSuit){
                FlushArr.push(index)
            }
        })
        return {
            Flush:Flush,
            FlushArr:FlushArr
        }
    }else{
        return{
            Flush:false
        }
    }     
}

//判断是否顺子
//有顺子，返回{Straight:true,maxNum:顺子最高点数}；没有顺子返回{Straight:false}
function judgeSort(arr){
    let cardCount=arr.map(function(elem){
        return elem.count
    })
    let tempArr=cardCount
    tempArr.sort()
    let num=0 //连续数字的数量
    let maxNum
    let preNum,nextNum
    for(let i=0;i<arr.length-1;i++){
        preNum=tempArr[i]
        nextNum=tempArr[i+1]
        if((preNum===(nextNum-1))||(preNum===nextNum)){
            num+=1
            maxNum=nextNum
        }else{
            num=0
        }
    }
    if(num>=4){
        return{
            Straight:true,
            maxNum:maxNum
        }
    }else{
        return{
            Straight:false
        }
    }
}
    


