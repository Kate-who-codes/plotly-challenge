function Info(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);

        // Filtering demoInfo data by id
        var filterResult = metadata.filter(info => info.id.toString() === id) [0];

        var panelBody = d3.select("#sample-metadata");

        //
        panelBody.html("");

        Object.entries(filterResult).forEach((key) =>{
            panelBody.append("p").text(key[0] + ":" + key [1]);    
        });
    });
};

//Function for entire plots
function plots(id) {
    //Get data from json.file
    d3.json("samples.json").then((data) => {
        // console.log(data)

        // Filtering wfreq value by id
        var wfreq = data.metadata.filter(f => f.id.toString() === id) [0];
        wreq = wfreq.wfreq;
        console.log("Washing Frequency: " + wfreq);

        // Filtering samples values by id
        var samples = data.samples.filter(s => s.id.toString() === id) [0];

        // console.log("Samples: " + samples);
        
        //Top 10 labels
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        console.log("Top 10 sample: " + samplevalues);

        // Only top 10 otu ids for the plot OTU and reversing it. 
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU.map(d => "OTU " + d)
  
        console.log("OTU IDS: " + OTU_id);
  
  
        // get the top 10 labels for the plot and reversing it.
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        // Trace for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'},
            type: 'bar',
            orientation: 'h'    
            };

        // Data variable
        var data = [trace];
        
        // Bar plot
        Plotly.newPlot("bar", data);

        //Bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text:samples.otu_labels,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: "black"
            }
            //text:samples.otu_labels
        };
         
         //Layout for the buble plot
         var layout_b = {
             margin: {t:0},
             xaxis: {title: "OTU ID"},
             margin: {t: 30}
            
         };

         // Data variable
         //var data = tarce1;

         // Bubble plot
         Plotly.newPlot("bubble", trace1, layout_b);

         // Gauge chart
         var data_g = [
             {
                 domain: {x: [0,1], y: [0,1]},
                 value: wfreq,
                 title: {text: `Belly Button Washing Frequency`},
                 type: "indicator",

                 mode: "gauge+number",
                 gauge: {axis: {range: [null, 9]},
                 steps: [
                     {range: [0, 1], color: "yellow"},
                     {range: [1, 2], color: "green"},
                     {range: [2, 3], color: "blue"},
                     {range: [3, 4], color: "purple"},
                     {range: [4, 5], color: "orange"},
                     {range: [5, 6], color: "red"},
                     {range: [6, 7], color: "black"},
                     {range: [7, 8], color: "white"},
                     {range: [8, 9], color: "white"}
                 ]}
             }
         ];
         var layout_g = {
             width: 700,
             height: 600,
             margin: {t: 20, b: 40, l:100, r:100}
        };
        Plotly.newPlot("gauge", data_g, layout_g);
        });
    }
    function init() {
        // Read the data
        d3.json("samples.json").then((data) => {
            //console.log(data);

            //Name ID to the dropdown menu
            data.names.forEach((name) => {
                d3.select("#selDataset").append("option").text(name).property("value");
            });
    })};
    init();

    //Change event function
    function optionChanged(id) {
        plots(id);
        Info(id)
    }
