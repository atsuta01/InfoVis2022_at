d3.csv("https://atsuta01.github.io/InfoVis2022_at/W08/data4.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:30, left:30}
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });


class PieChart {

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

       self.chart.selectAll('pie')
           .data( pie(data) )
           .enter()
           .append('path')
           .attr('d', arc)
           .attr('fill', 'black')
           .attr('stroke', 'white')
           .style('stroke-width', '2px');

       self.xaxis_group
           .call( self.xaxis );

       self.yaxis_group
	   .call( self.yaxis );
    }
}
    
