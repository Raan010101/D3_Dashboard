//D3 always starts with a margin that is basiccally where the svg will be created in
// We can start by setting the "margin" and dimension of the chart
    const margin = {top : 70, right: 30, bottom : 40, left : 80 }
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

 // next we need to scale it to the pixels on the screen as d3 must be taught to use the screen
// we can use built in functions of d3 such as scaleTime  function for time series graphs
const x = d3.scaleTime().range([0, width]);

// and we can use scaleLinear function for the height,  its also good to remember 
//the scale in svg is reverse , as zero begins at the top left of the screen

const y = d3.scaleLinear().range([height,0]);

// Now we begin creating the svg 
// use select method to select and append a value to the svg
const svg = d3.select('#chart-container')
.append('svg')
//next we set the height and width using the attributes method
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top  + margin.bottom)
.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`); 

    // Create a fake dataset

const dataset = [
    { date: new Date("2022-01-01"), value: 200 },
    { date: new Date("2022-02-01"), value: 250 },
    { date: new Date("2022-03-01"), value: 180 },
    { date: new Date("2022-04-01"), value: 300 },
    { date: new Date("2022-05-01"), value: 280 },
    { date: new Date("2022-06-01"), value: 220 },
    { date: new Date("2022-07-01"), value: 300 },
    { date: new Date("2022-08-01"), value: 450 },
    { date: new Date("2022-09-01"), value: 280 },
    { date: new Date("2022-10-01"), value: 600 },
    { date: new Date("2022-11-01"), value: 780 },
    { date: new Date("2022-12-01"), value: 320 }
  ];
//  console.log(dataset)


  //The range is set now we going to set more details into the x and y domain
  // Here is where we set the values on what the vaues are setb in to the x and y axis

  x.domain(d3.extent(dataset, d => d.date)); 
  y.domain([0, d3.max(dataset, d=> d.value)]); 

  // now lets add the x-axis 
  svg.append("g")
  .attr("transform",`translate(0, ${height})`)
  .call(d3.axisBottom(x)
  .ticks(d3.timeMonth.every(1))
  .tickFormat(d3.timeFormat("%b %Y")));
  
  //now lets add the y axis 
  // the values are not changesable 

  svg.append("g")
    .call(d3.axisLeft(y))
    

//   create the line generator
const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));


svg.append("path")
.datum(dataset)
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-width", 1)
.attr("d", line); 



// // Set dimensions and margins for the chart

// const margin = { top: 70, right: 30, bottom: 40, left: 80 };
// const width = 1200 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Set up the x and y scales

// const x = d3.scaleTime()
//   .range([0, width]);

// const y = d3.scaleLinear()
//   .range([height, 0]);

// // Create the SVG element and append it to the chart container

// const svg = d3.select("#chart-container")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// // Create a fake dataset

// const dataset = [
//   { date: new Date("2022-01-01"), value: 200 },
//   { date: new Date("2022-02-01"), value: 250 },
//   { date: new Date("2022-03-01"), value: 180 },
//   { date: new Date("2022-04-01"), value: 300 },
//   { date: new Date("2022-05-01"), value: 280 },
//   { date: new Date("2022-06-01"), value: 220 },
//   { date: new Date("2022-07-01"), value: 300 },
//   { date: new Date("2022-08-01"), value: 450 },
//   { date: new Date("2022-09-01"), value: 280 },
//   { date: new Date("2022-10-01"), value: 600 },
//   { date: new Date("2022-11-01"), value: 780 },
//   { date: new Date("2022-12-01"), value: 320 }
// ];

// // Define the x and y domains

// x.domain(d3.extent(dataset, d => d.date));
// y.domain([0, d3.max(dataset, d => d.value)]);

// // Add the x-axis

// svg.append("g")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(x)
//     .ticks(d3.timeMonth.every(1)) 
//     .tickFormat(d3.timeFormat("%b %Y"))); 


// // Add the y-axis

// svg.append("g")
//   .call(d3.axisLeft(y))

// // Create the line generator

// const line = d3.line()
//   .x(d => x(d.date))
//   .y(d => y(d.value));

// // Add the line path to the SVG element

// svg.append("path")
//   .datum(dataset)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1)
//   .attr("d", line);