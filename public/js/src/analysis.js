"use strict";

Promise.all([
    d3.csv("/data/cities.csv", function(d){
        let cityName = d.city.split("");
        cityName[0] = cityName[0].toUpperCase();
        cityName = cityName.join("");
        return {
            city: cityName,
            state: d.state,
            population: +d.population,
            land_area: +d["land area"]
        }
    }),
    d3.tsv("/data/animals.tsv", d=>{
        let animalName = d.name.split("");
        animalName[0] = animalName[0].toUpperCase();
        animalName = animalName.join("");
        return {
            name: animalName,
            type: d.type,
            avg_weight: d.avg_weight
        }
    }),
    d3.dsv("|", "/data/animals_piped.txt", d=>{
        let animalName = d.name.split("");
        animalName[0] = animalName[0].toUpperCase();
        animalName = animalName.join("");
        return {
            name: animalName,
            type: d.type,
            avg_weight: d.avg_weight
        }
    }),
    d3.json("/data/employees.json")
]).then(function(data){
    // Avoid working with the original data, instead create a clone
    // let copy = _.clone(data, true?) true for deep cloning
    // let copy = _.cloneDeep(data)
    data[0].sort((a, b)=>{
        return b.population - a.population;
    })
    data[0].forEach(function(d){
        let tr = document.createElement('tr');
        for (let dt in d){
            let td = document.createElement('td');
            td.textContent = d[dt];
            tr.appendChild(td);
        }
        document.querySelector("#cities").appendChild(tr);
    })
    // d3.ascending and d3.descending are utilities to sort arrays
    data[1].sort((a, b)=>{
        return a.avg_weight - b.avg_weight;
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
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.colSpan = 2;
    td.innerHTML = "<b>Younger employee age</b>: " + d3.min(data[3], function(d){ return d.age; });
    tr.appendChild(td);
    let td2 = document.createElement("td");
    td2.colSpan = 2;
    td2.innerHTML = "<b>Older employee age</b>: " + d3.max(data[3], function(d){ return d.age; });
    tr.appendChild(td2);
    document.querySelector("#employees").appendChild(tr);
});

/* other useful d3 methods:
d3.mean(data, d => return d.field)
d3.median(data, d => return d.field)
d3.deviation(data, d => return d.field)
d3.sum
*/