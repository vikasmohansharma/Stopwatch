import React from 'react';
import Header from "./Header";

function App() {

  var intervalID = 0;
  var h = 0;
  var i = 0;
  var j = 0;
  var k = 0;
  var counter = 1;
  var is_split, is_lap;
  
  
  function incrementkaro() {
    i = Number(i);
    j = Number(j);
    k = Number(k);
    h = Number(h);
    h += 1;
    if (h === 100) {
      //used because of performance issue
      i += 1;
      if (i === 60) {
        j += 1;
        if (j === 60) {
          k += 1;
          j = 0;
        }
        i = 0;
      }
      h = 0;
    }
    display();
  }
  
  
  function formatter(count) {
    count = count.toString().padStart(2, '0');
    return count;
  }
  
  function display() {
    i =  formatter(i);
    j =  formatter(j);
    k =  formatter(k);
    h =  formatter(h);
    document.getElementById("demo").innerHTML =
      k + "h :" + j + "m :" + i + "s :" + h + "ms";
  }
  
  function startstopkaro() {
    if (intervalID === 0) {
      document.getElementById("startbutton").innerHTML = "STOP";
      intervalID = setInterval(incrementkaro, 10); //used because of performance issue
    } else {
      document.getElementById("startbutton").innerHTML = "RESUME";
      clearInterval(intervalID);
      intervalID = 0;
    }
  }
  
  function resetkaro() {
    document.getElementById("startbutton").innerHTML = "START";
    clearInterval(intervalID);
    intervalID = 0;
    h = 0;
    i = 0;
    j = 0;
    k = 0;
    counter = 1;
    display();
    document.getElementById("demo2").innerHTML = "";
  }
  
  function splitkaro() {
    if (intervalID === 0) {
      counter = 1;
      return;
    } else {
      if (is_lap === true) {
        document.getElementById("demo2").innerHTML = "";
        counter = 1;
      }
      is_split = true;
      is_lap = false;
      document.getElementById("demo2").innerHTML +=
        "<li> SPLIT " +
        counter +
        ": " +
        k +
        "h :" +
        j +
        "m :" +
        i +
        "s :" +
        h +
        "ms" +
        "</li></br>";
      counter++;
    }
  }
  
  function lapkaro() {
    if (intervalID === 0) {
      counter = 1;
      return;
    } else {
      if (is_split === true) {
        document.getElementById("demo2").innerHTML = "";
        counter = 1;
      }

      is_split = false;
      is_lap = true;
      document.getElementById("demo2").innerHTML +=
        "<li> LAP " +
        counter +
        ": " +
        k +
        "h :" +
        j +
        "m :" +
        i +
        "s :" +
        h +
        "ms" +
        "</li></br>";
      clearInterval(intervalID);
      intervalID = 0;
      h = 0;
      i = 0;
      j = 0;
      k = 0;
      display();
      startstopkaro();
      counter++;
    }
  }
  



  return <><Header /><div className="flex-container">
  <p className="flex-item" id="demo">00h :00m :00s :00ms   </p>
  <button id="startbutton" className="flex-item" style={{ alignSelf: 'flex-start' }} onClick={startstopkaro}>START</button>
  <button id="splitbutton" className="flex-item" style={{ alignSelf: 'flex-start' }} onClick={splitkaro}>SPLIT TIMER</button>
  <button id="lapbutton" className="flex-item" style={{ alignSelf: 'flex-start' }} onClick={lapkaro}>LAP TIMER</button>
  <button id="stopbutton" className="flex-item" style={{ alignSelf: 'flex-start' }} onClick={resetkaro}>RESET</button>
  <ul className="flex-item" id="demo2">
  </ul>
</div></>
}
export default App;
