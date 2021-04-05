// Function for entire demographic information
function demoInfo(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);

        // Filtering demoInfo data by id
        var filterResult = metadata.filter(info => info.id.toString() === id) [0];

        var panelBody = d3.select("#sample-metadata");

        //
        panelBody.html("");
        Object.defineProperties(filterResult).forEach((key) =>{
            panelBody.append("p").text(key[0] + ":" + key [1]);    
        });
    });
};

//Function for entire plots
function plots(id) {
    //Get data from json.file
    d3.json("sample.json").then((data) => {
        // console.log(data)

        // Filtering wfreq value by id
        var wfreq = data.metadata.filter(f => f.idtoString() === id) [0];
        wreq = wfreq.wfreq;
        console.lof("Washing Frequency: " + wfreq);

        // Filtering samples values by id
        var samples = data.samples.filter(s => s.id.toString() === id) [0];
        // console.log("Samples: " + samples);
        
        //Top 10 labels to create a plot and revering it
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);

        // Trace for the plot
        var trace = {
            x: samplevalues,
            y: OTD_id,
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
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color:
                samples.otu_ids
            },
            text:samples.otu_labels
        };
         
         //Layout for the buble plot
         var layput_b = {
             xaxis: {title: "OTU ID"},
             height: 600,
             width: 1200
         };

         // Data variable
         var data1 = [tarce1];

         // Bubble plot
         Plotly.newPlot("bubble", data1, layout_b);

         // Guage chart
         var data_g = [
             {
                 domain: {x: [0,1], y: [0,1]},
                 value: wfreq,
                 title: {text: `Belly Button Washing Frequency`},
                 type: "indicator",
                 
             }
         ]
        }
    })
}
