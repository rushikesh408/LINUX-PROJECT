
 

function save_File(){
 let regWeak = /[a-z]/;
 let regMedium = /\d+/;
 let regStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

    var pass=document.getElementById("pass").value;

  var data = [];
  
    data.push(pass);
    var data_string= JSON.stringify(data);
    var file = new Blob([data_string],{type:"text"});
    var anchor= document.createElement("a");
    anchor.href=URL.createObjectURL(file);
    anchor.download="save.txt";
    anchor.click();

    if(input.value.length <= 3 && (input.value.match(regWeak) || input.value.match(regMedium) || input.value.match(regStrong)))no=1;
             if(input.value.length >= 6 && ((input.value.match(regWeak) && input.value.match(regMedium)) || (input.value.match(regMedium) && input.value.match(regStrong)) || (input.value.match(regWeak) && input.value.match(regStrong))))no=2;
             if(input.value.length >= 6 && input.value.match(regWeak) && input.value.match(regMedium) && input.value.match(regStrong))no=3;
             if(no==3){
                alert("password is secure")
                VerifyPassword();
              }
              else{
                alert("password is not secure")
              }
}
function VerifyPassword() {
  
  var pass=document.getElementById("pass").value;
 
  // load 10 million passwords from file and check if the password is in the file using binary search algorithm 

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "10-million-password-list-top-1000000.txt", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // WARNING! Might be evaluating an evil script!
     
      var pass_list = xhr.responseText;
      
      var pass_list = pass_list.split("\n");
      var pass_list = pass_list.sort();
      var pass_list = pass_list.filter(function (el) {
        return el != "";
      });
      var pass_list = pass_list.filter(function (el) {
        return el != " ";
      }
      );
      var pass_list = pass_list.filter(function (el) {
        return el != "  ";
      }
      );
     
      var result = binarySearch(pass_list, pass, 0, pass_list.length - 1);
      if(result == -1){
        alert("password is not in the list");
      }else{
        alert("password is in the list");
      }
    }
  }
  xhr.send(null);
  
}
const binarySearch = (arr, x, start, end) => {
// Base Condition
if (start > end) return -1;

// Find the middle index
let mid=Math.floor((start + end)/2);

// Compare mid with given key x
if (arr[mid]===x) return mid;

// If element at mid is greater than x,
// search in the left half of mid
if(arr[mid] > x)
return binarySearch(arr, x, start, mid-1);
else

// If element at mid is smaller than x,
// search in the right half of mid
return binarySearch(arr, x, mid+1, end);
}
        