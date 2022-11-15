/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-10 05:49:08
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-16 00:12:49
 * @FilePath: \voter-canvassing\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// voter canvassing App
// ============================

// The _main.js_ module defines the primary functionality of the app, and serves
// as the cross-component coordinator. Additional functionality is found in
// individual component modules:
// * [map.js]: for behavior related to the map

import { initMap}  from './map.js';
import {csvtojson} from './managedata.js';


let voterMap=initMap();
let votersToShow = document.querySelector('#listNo');
//let search1 = document.querySelector('#button1');

let btn = document.getElementById("search1");
  // add event listener for the button, for action "click"
btn.addEventListener("click", csvtojson(votersToShow, voterMap));


    //Search(voterMap, search1, votersToShow);
window.voterMap=voterMap;
window.votersToShow=votersToShow;
