let exp = "";
let button_numbers_list = document.querySelectorAll(".button-number");
let button_operations_list = document.querySelectorAll(".button-operation");
let button_equal = document.getElementById("button-equal");
let button_del = document.getElementById("button-del");
let button_dot = document.getElementById("button-dot");
let clear_buton = document.getElementById("clear-button");

for (let i = 0; i < button_numbers_list.length; i++){
    button_numbers_list[i].addEventListener("click" , function() {
        if (i != 9){
            exp += i + 1;
            document.getElementById('result').innerHTML = String(compute(exp));
            document.getElementById('input').innerHTML = exp;
        } else {
            if (exp.length != 0 && exp[exp.length - 1] != '/'){
                exp += 0;
                document.getElementById('result').innerHTML = String(compute(exp));
                document.getElementById('input').innerHTML = exp;
            }
        }
    });
}

op = ['+' , '-' , '*' , '/'];
for (let i = 0; i < button_operations_list.length; i++){
    button_operations_list[i].addEventListener("click" , function() {
        var last = exp.length - 1;
        if (exp.length == 0){
            if (i == 1){
                exp += op[i];
            }
        }
        else if (exp[last] != '-' && exp[last] != '+' && exp[last] != '*' && exp[last] != '/' && exp[last] != '.'){
            exp += op[i];
            console.log(exp);
        }
        document.getElementById('input').innerHTML = exp;
    });
}


button_equal.addEventListener("click" , function() {
    document.getElementById('input').innerHTML = document.getElementById('result').innerHTML;
    exp = String(document.getElementById('result').innerHTML);
});

button_del.addEventListener("click" , function() {
    if (exp.length != 0){
        exp = exp.slice(0 , -1);
        if (exp.length == 0){
            document.getElementById('result').innerHTML = "";
            document.getElementById('input').innerHTML = "";
        } else {
            document.getElementById('input').innerHTML = exp;
            document.getElementById('result').innerHTML = String(compute(exp));
        }
    }
});

button_dot.addEventListener("click" , function() {
        var last = exp.length - 1;
        if (exp.length != 0 && exp[last] != '-' && exp[last] != '+' && exp[last] != '*' && exp[last] != '/' && exp[last] != '.'){
            exp += '.';
            document.getElementById('input').innerHTML = exp;
        }
});

function reverse(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function multidiv(exp) {
    if (exp.length == 0){
        return 0;
    }

    if (exp[exp.length - 1] == '*' || exp[exp.length - 1] == '/' || exp[exp.length - 1] == '+' || exp[exp.length - 1] == '-' || exp[exp.length - 1] == '.'){
        exp = exp.slice(0 , -1);
    }

    var nums = [];
    var ops = [];
    
    var cur = "";
    for (var i = 0; i < exp.length; i++){
        if (exp[i] == '/' || exp[i] == '*'){
            ops.push(exp[i]);
            nums.push(Number(cur));
            cur = "";
        } else {
            cur += exp[i];
        }
    }

    if (cur != ""){
        nums.push(Number(cur));
    }

    var res = nums[0];
    for (var i = 1; i < nums.length; i++){
        if (ops[i - 1] == '*'){
            res *= nums[i];
        } else {
            res /= nums[i];
        }
    }

    return Number(res);
}


function compute(exp){
    if (exp.length == 0){
            return 0;
    }

    var sub_exp = "";
    var ans = 0;
    for (let i = exp.length - 1; i >= 0; i--){
        switch (exp[i]){
            case '+':
                ans += multidiv(reverse(sub_exp));
                sub_exp = "";
                break;
            case '-':
                ans -= multidiv(reverse(sub_exp));
                sub_exp = "";
                break;
            default:
                sub_exp += exp[i];
        }
    }

    if (sub_exp.length != 0){
        ans += multidiv(reverse(sub_exp));
    }

    return ans;
}

