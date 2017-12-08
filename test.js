let flushCount=[]
suitResult.FlushArr.forEach(function(index){
    flushCount.push(arr[index].count)
})
flushCount.sort()
return{
    Level:5,
    FlushCount:flushCount
}