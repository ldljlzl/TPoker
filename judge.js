let arr=[]

//生成随机的7张牌的牌型
for(let i=0;i<7;i++){
    let num=Math.floor(Math.random()*52)
    arr.push({
        count:num%13,
        suit:parseInt(num/13)
    })
}

let lzl1=judgeSort([0,2,3,3,4,5,6]) 
let lzl=0

//判断是否有四条
function judgeFour(arr){
    
}

//判断是否同花
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
function judgeSort(arr){
    let tempArr=arr
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
    


