
//to prevent auto scroll from top
$("#calDForm").submit(function(e) {
    e.preventDefault();
});
$("#calMForm").submit(function(e) {
    e.preventDefault();
});
//reset all forms 
$(document).ready(function () {
    resetForms();
});

function resetForms() {
    document.forms['calDForm'].reset();
    document.forms['calMForm'].reset();
}
// Purpose - To validate the values, calculate the value, display the result
function dcalFunction(){

    var c1c1 = document.getElementById("dc1c1").value;//visitors-control
    var c2c1 = document.getElementById("dc2c1").value;//visitors-variation
    var c1c2 = document.getElementById("dc1c2").value;//conversion-control
    var c2c2 = document.getElementById("dc2c2").value;//conversion-variation
    document.getElementById("mc1c1").value=c1c1
    document.getElementById("mc2c1").value=c2c1
    document.getElementById("mc1c2").value=c1c2
    document.getElementById("mc2c2").value=c2c2
    console.log(c1c1,c2c1,c1c2,c2c2);
    if (c1c1==null || c1c1=="" || typeof c1c1 ==='number', c1c2==null ||c1c2=="" || typeof c1c2 ==='number',
     c2c1==null || c2c1==""|| typeof c2c1 ==='number', c2c2==null ||c2c2 ==""|| typeof c2c2 ==='number'){
        alert("Please enter numbers in all control and variation fields.");
        return;
    }
    else if (c1c1<15 || c1c2<15 ||c2c1<15 || c2c2<15){
        alert("There must be at least 15 control trials for this tool to produce any results.");
        return;
    }
    else{
        $.ajax({
        url: "calculateSignify/",
        data : { 'c1c1':c1c1,'c1c2':c1c2,'c2c1':c2c1,'c2c2':c2c2},
        success : function(result) {
            if( p_value ==='NaN'){
                var p_value = 'NaN';
                //console.log(result.p_value.toFixed(3), result.signify);
            }
            else{
                 
                var p_value = parseFloat(result.p_value).toFixed(3);
            }

            var signify = result.signify
            console.log('here');
           
            document.getElementById('dpvalue').innerHTML=p_value;
            document.getElementById('dsignify').innerHTML=signify;
            document.getElementById('mpvalue').innerHTML=p_value;
            document.getElementById('msignify').innerHTML=signify;
            console.log("requested access complete");
        }
    })
    }
    document.getElementById('resultDiv').style.display="block";
}
function mcalFunction(){

    var c1c1 = document.getElementById("mc1c1").value;//visitors-control
    var c2c1 = document.getElementById("mc2c1").value;//visitors-variation
    var c1c2 = document.getElementById("mc1c2").value;//conversion-control
    var c2c2 = document.getElementById("mc2c2").value;//conversion-variation
    document.getElementById('dc1c1').value=c1c1
    document.getElementById('dc2c1').value=c2c1
    document.getElementById('dc1c2').value=c1c2
    document.getElementById('dc2c2').value=c2c2
    console.log(c1c1,c2c1,c1c2,c2c2);
    if (c1c1==null || c1c1=="" || typeof c1c1 ==='number', c1c2==null ||c1c2=="" || typeof c1c2 ==='number',
     c2c1==null || c2c1==""|| typeof c2c1 ==='number', c2c2==null ||c2c2 ==""|| typeof c2c2 ==='number'){
        alert("Please enter numbers in all control and variation fields.");
        return;
    }
    else if (c1c1<15 || c1c2<15 ||c2c1<15 || c2c2<15){
        alert("There must be at least 15 control trials for this tool to produce any results.");
        return;
    }
    else{
        $.ajax({
        url: "calculateSignify/",
        data : { 'c1c1':c1c1,'c1c2':c1c2,'c2c1':c2c1,'c2c2':c2c2},
        success : function(result) {
            if( p_value ==='NaN'){
                var p_value = 'NaN';
                //console.log(result.p_value.toFixed(3), result.signify);
            }
            else{
                 
                var p_value = parseFloat(result.p_value).toFixed(3);
            }

            var signify = result.signify
            console.log('here');
            document.getElementById('mpvalue').innerHTML=p_value;
            document.getElementById('msignify').innerHTML=signify;
            document.getElementById('dpvalue').innerHTML=p_value;
            document.getElementById('dsignify').innerHTML=signify;
            console.log("requested access complete");

        }
    })
    }
      document.getElementById('resultDiv').style.display="block";
}