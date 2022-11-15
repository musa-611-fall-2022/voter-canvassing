/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-10 05:49:08
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-15 11:17:39
 * @FilePath: \voter-canvassing\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// voter canvassing App
// ============================

// The _main.js_ module defines the primary functionality of the app, and serves
// as the cross-component coordinator. Additional functionality is found in
// individual component modules:
// * [map.js]: for behavior related to the map

import { initMap, showVotersOnMap }  from './map.js';

let voterMap=initMap();
let votersToShow = document.querySelector('#listNo');


//convert csv to json
function csvtojson (voterMap, votersToShow, onFailure){
    fetch(`./data/voters_lists/${votersToShow}.csv`)
    .then(response => {
        if (response.status === 200) {
        const data = response.text();
        return data;
        } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
        }
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
        let v = result.data.slice(1, result.data.length-1);
        return v;
    })
    .then(result => showVotersOnMap(result, voterMap));
    }

    csvtojson (voterMap, votersToShow );
    showVotersOnMap(votersToShow, voterMap);
window.voterMap=voterMap;

