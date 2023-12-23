fetch('processedData435.json')
    .then(response => response.json())
    .then(data => {
        const { nodes, links } = data;
        console.log("nodes loaded:", nodes)
        console.log("Links loaded:", links)

        const width = window.innerWidth;
        const height = window.innerHeight;
        
        /*var simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(d => calculateDistance(d)))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));*/
        
        //for window wdith
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(d => calculateDistance(d)))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        function calculateDistance(link) {
            // Adjust as needed for your data
            //return Math.log(1 / link.value)*5;
            //return -Math.log(Math.max(link.value, 1e-200)); //for 18 member
            return -Math.log(Math.max(link.value, 1e-200)) * 0.00000001;
        }

        var svg = d3.select("body").append("svg")
            .attr("width", window.innerWidth)
            .attr("height", window.innerHeight);

        var link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", 2)
            //.attr("stroke", d => linkColor(d.subject));
            .attr("stroke", "black")
            .attr("opacity", d => linkOpacity(d.subject));

        function linkColor(subjectNumber) {
            if (subjectNumber === 1) {
                return "black";
            } else if (subjectNumber === 2) {
                return "gray";
            } else {
                return "blue";
            }
        }

        function linkOpacity(subjectNumber) {
            if (subjectNumber === 1) {
                return 0.5;
            } else if (subjectNumber === 2) {
                return 0.3;
            } else {
                return 0.15;
            }
        }

        function nodeColor(id) {
            if (id[0] === 'm' || id[0] === '!') {
                return "#f6c19c";
            } else {
                return "#b7ef7b";
            }
        }

        function nodeRadSize(id) {
            if (id[0] == 'm') {
                return 5; //0.5 of 10
            } else if (id[0] === '!'){
                let startIndex = id.indexOf("!") + 1;
                let endIndex = id.indexOf("m");
                let numberStr = id.substring(startIndex, endIndex);
                let number = parseInt(numberStr);
                return (0.5 + Math.log(number)/10)*10;
            }else{
                return 10;
            }
        }

        var node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", d => nodeRadSize(d.id))
            .attr("fill", d => nodeColor(d.id));

        function nodeLabel(id) {
            if (id[0] === 'm' || id[0] == '!') {
                return false;
            } else {
                return true;
            }
        }

        var labels = svg.selectAll(".label")
            .data(nodes.filter(node => nodeLabel(node.id)))
            //.data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .text(d => d.id);

            simulation.on("tick", () => {
                node
                    .attr("cx", d => Math.max(nodeRadSize(d.id), Math.min(width - nodeRadSize(d.id), d.x)))
                    .attr("cy", d => Math.max(nodeRadSize(d.id), Math.min(height - nodeRadSize(d.id), d.y)));
            
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
            
                labels
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            });
            
    });
