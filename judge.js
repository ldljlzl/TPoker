let arr=[]

//生成随机的7张牌的牌型
for(let i=0;i<7;i++){
    let num=Math.floor(Math.random()*52)
    arr.push({
        count:num%13,
        suit:parseInt(num/13)
    })
}

let lzl1=judgeThree([{count:7,suit:2},{count:7,suit:0},{count:7,suit:1},{count:11,suit:1},{count:11,suit:3},{count:11,suit:2},{count:13,suit:0}]) 
let lzl=0


//判断是否有三条
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
//有四条返回{Four:true,count:点数-1}；没有四条返回{Four:false}
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
//有同花返回{Flush:true,FlushSuit:花色（0-3）,FlushArr:同花的牌的位置构成的数组}；没有同花返回{Flush:false}
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
            FlushSuit:FlushSuit,
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
    


