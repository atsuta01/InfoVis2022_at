d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:30, right:30, bottom:60, left:60} //軸を表示するため下と左を大きく
        };

        const scatter_plot = new ScatterPlot( config, data ); //クラスを実体化
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });


class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 512,
            height: config.height || 512,
            margin: config.margin || {top:30, right:30, bottom:60, left:60} //軸を表示するため下と左を大きく
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent ) //外側の四角
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g') //内側の四角
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear() //内側の四角にスケーリング
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear() //内側の四角にスケーリング
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(10);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_width})`);

	//changes
	self.yaxis = d3.axisLeft( self.yscale )
	    .ticks(10); //軸メモリの数を制御する。整数値

	self.yaxis_group = self.chart.append('g')
	    .attr('transform', 'translate(0, ${self.inner_height})');
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax+10] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax+10] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis );

	//changes
	self.yaxis_group
	    .call( self.yaxis );
    }
}
