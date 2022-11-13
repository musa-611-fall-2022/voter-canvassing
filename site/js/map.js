/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-11 03:00:55
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-13 08:44:27
 * @FilePath: \voter-canvassing\site\js\map.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function basemap () {
    let voterMap = L.map('map').setView([39.99893891432174, -75.13162463991333], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(voterMap);
    return voterMap;
}

//Use this function to get csv files' number
function getListNo(voters)
{

}

//Use the function to display the voters' location on the map.
function showVotersOnMap(votersToShow, voterMap) {
    if (voterMap.voterLayer !== undefined){
        voterMap.removeLayer(voterMap.voterLayer);
    }

//Use this function to display voter list
function showvoterlist(votersToShow, voters){

}

export {
    getListNo,
    showVotersOnMap,
    showvoterlist
};