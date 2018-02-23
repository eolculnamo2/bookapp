
 function filter(fil1,fil2,fil3,list1,list2,list3){
   
    var lock = [false,false,false];
    if(fil1.length>0){
        fil1.forEach((x)=>{
            var testArr = []
            list1.forEach((y)=>{
                if(x == y){
                    testArr.push("1")
                }
            })
            if(testArr.length == fil1.length){
                lock[0] = true;
            }
        })
    }
    
    if(fil2.length>0){
        fil2.forEach((x)=>{
            var testArr = []
            list2.forEach((y)=>{
                if(x == y){
                    testArr.push("1")
                }
            })
            if(testArr.length == fil2.length){
                lock[1] = true;
            }
        })
    }

    if(fil3.length>0){
        fil3.forEach((x)=>{
            var testArr = [];
            list3.forEach((y)=>{
                if(x == y){
                    testArr.push("1")
                }
            })
            if(testArr.length == fil3.length){
                lock[2] = true;
            }
        })
    }

    if(fil1.length == 0){
        lock[0] = true;
    }

    if(fil2.length == 0){
        lock[1] = true;
    }

    if(fil3.length == 0){
        lock[2] = true;
    }

    if(lock[0] == true && lock[1] == true && lock[2] == true){
        return true
    }
    return false;
}

