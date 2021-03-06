d3.csv("https://atsuta01.github.io/InfoVis2022_at/W08/data2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.w = +d.w; d.h = +d.h; d.yl = +d.yl});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:30, left:30}
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });


class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:30, left:30}
        }
        this.data = data;
        this.init();
    }

   init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(10);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_width})`);

	self.yaxis = d3.axisLeft( self.yscale )
	    .ticks(10);

	self.yaxis_group = self.chart.append('g')
 	    .attr('transform', 'translate(0, ${self.inner_height})');
   }

   update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.w );
        const xmax = d3.max( self.data, d => d.w );
        self.xscale.domain( [0, xmax+10] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax+50] );

        self.render();
   }

   render() {
       let self = this;

//       self.chart.selectAll("circle")
//           .data(self.data)
//           .enter()
//           .append("circle")
//           .attr("cx", d => self.xscale( d.x ))
//           .attr("cy", d => self.yscale( d.y ))
//           .attr("r", d => d.r);
//           .attr("cx", function(d){ return d.x; })
//           .attr("cy", function(d){ return d.y; })
//           .attr("r", function(d){ return d.r; })

       self.chart.selectAll("rect")
           .data(self.data)
           .enter()
           .append("rect")
           .attr("x", d => 0 )
           .attr("y", d => self.yscale( d.y ))
	   .attr("width", d => self.xscale( d.w ))
           .attr("height", d => d.h );

       	self.chart.selectAll("text")
	   .data(self.data)
	   .enter()
	   .append("text")
	   .attr("x", -15)
	   .attr("y", d => d.yl)
	   .text(d => d.s);

       self.xaxis_group
           .call( self.xaxis );

//       self.yaxis_group
//	   .call( self.yaxis );
    }
}
    
