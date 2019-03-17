// @TODO: YOUR CODE HERE!
var d3data;

d3.csv('assets/data/data.csvC:\Users\khanh\Desktop\UCIRV201810DATA4\Homeworks\HW16-D3\Instructions\StarterCode\assets\data\data.csv')
.then(data => {
  d3data = data;
  parseData();

  withD3();
});

var X = 'poverty';
var Y = 'smokes';

var value = d3.select("select").property('value');
console.log(value);



function newchart() {
  X = d3.select('#x').property('value');
  Y = d3.select('#y').property('value');
  withD3();
};




function parseData(){

      d3data.forEach(function(data) {
        data.healthcare = parseFloat(data.healthcare);
        data.poverty = parseFloat(data.poverty);
        });
}



function withD3() {



  var svgArea = d3.select("#scatter").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var Width = window.innerWidth*0.5;
  var Height = window.innerHeight*0.5;

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;


  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var margin = {
    top: 60,
    bottom: 60,
    right: 65,
    left: 65
  };


  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleLinear()
      .domain(d3.extent(d3data, d => d[X]))
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain(d3.extent(d3data, d => d[Y]))
      .range([height, 0]);

    var xAxis = d3.axisBottom(xScale)
                    .text("test");
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${Height})`)
      .text("Test")
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
      .data(d3data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[X]))
      .attr("cy", d => yScale(d[Y]))
      .attr("r", "10")
      .attr("fill", "lightblue")
      .text(function(data) {
        return data.abbr
        });

    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .html(function(d) {
        return (`State: ${d.abbr}<br>${X}: ${d[X]} <br>${Y}: ${d[Y]}`);
      });
    chartGroup.call(toolTip);
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
        .on("mouseout", function(d) {
        toolTip.hide(d);
      });
  
};

makeResponsive();

d3.select(window).on("resize", makeResponsive);


