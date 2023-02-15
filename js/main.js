// establish some constants for frame, margins, etc
const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 1000;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// add svg frame
const FRAME1 =
d3.select("#ic-vis")
    .append("svg")
        .attr("height", FRAME_HEIGHT)
        .attr("width", FRAME_WIDTH)
        .attr("class", "frame");

// creating data
const DATA = [55000, 48000, 27000, 66000, 90000];

// set vis height
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// obtain max value
const MAX_VALUE = d3.max(DATA, (d) => {return d;});

// scale function
const SCALE = d3.scaleLinear()
                    .domain([0, MAX_VALUE + 20000])
                    .range([0, VIS_WIDTH]);

// plot points with circles and scaled data
FRAME1.selectAll("points")
        .data(DATA)
        .enter()
        .append("circle")
            .attr("cx", (d) => {
                return (SCALE(d) + MARGINS.left);
            })
            .attr("cy", MARGINS.top)
            .attr("r", 20)
            .attr("class", "point");

// add an axis
FRAME1.append("g")
        .attr("transform", 
            "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
        .call(d3.axisBottom(SCALE).ticks(4))
            .attr("font-size", "20px");