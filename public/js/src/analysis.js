"use strict";

Promise.all([
    d3.csv("/data/cities.csv"),
    d3.tsv("/data/animals.tsv"),
    d3.dsv("|", "/data/animals_piped.txt"),
    d3.json("/data/employees.json")
]).then(function(data){
    data[0].forEach(function(d){
        let tr = document.createElement('tr');
        for (let dt in d){
            let td = document.createElement('td');
            td.textContent = d[dt];
            tr.appendChild(td);
        }
        document.querySelector("#cities").appendChild(tr);
    })
    data[1].forEach(function(d){
        let tr = document.createElement('tr');
        for (let dt in d){
            let td = document.createElement('td');
            td.textContent = d[dt];
            tr.appendChild(td);
        }
        document.querySelector("#animals").appendChild(tr);
    })
    data[3].forEach(function(d){
        let tr = document.createElement('tr');
        for (let dt in d){
            let td = document.createElement('td');
            td.textContent = d[dt];
            tr.appendChild(td);
        }
        document.querySelector("#employees").appendChild(tr);
    })
});