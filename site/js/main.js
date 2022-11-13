/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-10 05:49:08
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-13 06:33:11
 * @FilePath: \voter-canvassing\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { basemap,showVotersOnMap } from './map.js';

//convert voters' csv files to json files
fetch('data/voters_lists/3927.csv')
.then(resp=>resp.text())
.then(text=>{
    const voters=Papa.parse(text,{header:true});
    return voters;
});

var voterMap = basemap();
showVotersOnMap(voters, voterMap);

