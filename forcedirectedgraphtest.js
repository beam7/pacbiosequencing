document.addEventListener('DOMContentLoaded', function () {
    // Sample data: nodes and links
    var nodes = [
        { id: "node1" },
        { id: "node2" },
        { id: "node3" },
        { id: "node4" }
    ];

    var links = [
        { source: "node1", target: "node2" },
        { source: "node1", target: "node3" },
        { source: "node2", target: "node4" },
        { source: "node3", target: "node4" }
    ];

    // Set up the simulation and add forces
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

    // Create an SVG element in the body to contain the graph
    var svg = d3.select("body").append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    // Add lines for every link in the dataset
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    // Add circles for every node in the dataset
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 10)
        .attr("fill", "red");

    // Add labels to each node
    var labels = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .text(d => d.id)
        .attr("x", d => d.x + 12)
        .attr("y", d => d.y + 4);

    // Define the tick function for the simulation
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels.attr("x", d => d.x + 12)
              .attr("y", d => d.y + 4);
    });

    // Drag functionality
    node.call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

    function dragStarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
