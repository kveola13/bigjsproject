import _ from 'lodash'

import {calculateMax, calculateMean, calculateMin, computeSum} from "./mathFunc.js";

function initMath() {
    const arr = [4,5,3,6,8,8,4,4,1];

    const sum = computeSum(arr);
    const mean = calculateMean(arr);
    const max = calculateMax(arr);
    const min = calculateMin(arr);

    document.getElementById("arrayStringId").innerHTML = "[" + _.join(arr, ", ") + "]";
    document.getElementById("sumId").innerHTML = sum;
    document.getElementById("meanId").innerHTML = mean;
    document.getElementById("maxId").innerHTML = max;
    document.getElementById("minId").innerHTML = min;
}

initMath();