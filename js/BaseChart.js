var s = document.createElement("script");
s.type = "text/javascript"; 
document.head.appendChild(s);
s.src = "js/Chart.min.js";

class ChartController {
	constructor(area, data, label, type) {
		this.area = area;
		this.data = data;
		this.label = label;
		this.type = type;
	}

	findChartInstance() {
		this.chartFactory = new ChartFactory();
		this.chart = this.chartFactory.getChart(this.type);
		this.chart.plotChart(this.area, this.data, this.label);
	}
}

class ChartFactory {
	constructor() {
	}

	getChart(type) {
		this.type = type;
		if (this.type == 'bar') {
			return new BarChart();
		} else if(this.type == 'line') {
			return new LineChart();
		} else if(this.type == 'pie') {
			return new PieChart();
		} else if(this.type == 'stacked') {
			return new StackedChart();
		} else if(this.type == 'pivot') {
			return new PivotChart();
		}
	}
}

class BaseChart {
	constructor(){
	}
	draw_chart(area, settings) {
		setTimeout(() => {
			this.area = area;
			this.settings = settings;
			new Chart(this.area, this.settings);
		}, 200); 
	}
}

class ConfiguredChart extends BaseChart {
	constructor(){
		super();
	}
	create_settings(chart_area, chart_data) {
		this.chart_area = chart_area;
		this.chart_data = chart_data;
		this.iterator = new Iterator(this.chart_data["data"]["labels"].length);
		this.temp = this.chartData["data"]["datasets"][0];

		this.bgColor = [];
		for(this.i=0; this.i<this.chart_data["data"]["labels"].length; this.i++) {
			this.bgColor.push(this.iterator.getBackGroundColor(this.i));
		}

		this.temp["backgroundColor"] = this.bgColor;
		this.chart_data["data"]["datasets"][0] = this.temp;

		super.draw_chart(this.chart_area, this.chart_data);
	}
}

class PieChart extends ConfiguredChart {
	constructor(){
		super();
	}

	createType() {
		return 'pie';
	}

	createLabel() {
		return this.label;
	}

	createData(){
		return this.data;
	}

	createSettings() {
		this.chartData = {};
		this.chartData["type"] = this.createType();

		this.datasets = {};
		this.datasets["data"] = this.createData();
		this.data = [];
		this.data.push(this.datasets);

		this.tempData = {};
		this.tempData["datasets"] = this.data;
		this.tempData["labels"] = this.createLabel();

		this.chartData["data"] = this.tempData;
		return this.chartData;
	}

	plotChart(area, data, label){
		this.area = area;
		this.data = data;
		this.label = label;
		super.create_settings(this.area, this.createSettings());
	}
}

class BarChart extends ConfiguredChart {
	constructor(){
		super();
		
	}

	createType() {
		return 'bar';
	}

	createLabel() {
		return this.label;
	}

	createData(){
		return this.data;
	}

	createSettings() {
		this.chartData = {};
		this.chartData["type"] = this.createType();

		this.datasets = {};
		this.datasets["data"] = this.createData();
		this.datasets["label"] = "count";
		this.data = [];
		this.data.push(this.datasets);

		this.tempData = {};
		this.tempData["datasets"] = this.data;
		this.tempData["labels"] = this.createLabel();

		this.chartData["data"] = this.tempData;
		return this.chartData;
	}

	plotChart(area, data, label){
		this.area = area;
		this.data = data;
		this.label = label;
		super.create_settings(this.area, this.createSettings());
	}
}

class LineChart extends ConfiguredChart {
	constructor(){
		super();
	}

	createType() {
		return 'line';
	}

	createLabel() {
		return this.label;
	}

	createData(){
		return this.data;
	}

	createSettings() {
		this.chartData = {};
		this.chartData["type"] = this.createType();

		this.datasets = {};
		this.datasets["data"] = this.createData();
		this.datasets["label"] = "count";
		this.data = [];
		this.data.push(this.datasets);

		this.tempData = {};
		this.tempData["datasets"] = this.data;
		this.tempData["labels"] = this.createLabel();
		this.chartData["data"] = this.tempData;
		return this.chartData;
	}

	plotChart(area, data, label){
		this.area = area;
		this.data = data;
		this.label = label;
		super.create_settings(this.area, this.createSettings());
	}
}

class PivotChart extends ConfiguredChart {
	constructor(){
		super();
	}

	createType() {
		return 'bar';
	}

	createLabel() {
		return this.label;
	}

	createData() {
		this.datasets = [];
		this.maxValue = Math.max.apply(null, this.data);
		this.bgColor = new Iterator(this.maxValue); 

		for(this.i=0; this.i<this.maxValue; this.i++) {
			this.arrayData = {};
			this.tempData = [];
			for(this.j=0; this.j<this.data.length; this.j++) {
				if(this.i<this.data[this.j]) {
					this.tempData.push(1);
				} else {
					this.tempData.push(0);
				}
			}
			this.arrayData["data"] = this.tempData;
			this.arrayData["label"] = this.label[this.i];
			this.arrayData["backgroundColor"] = this.bgColor.getBackGroundColor(this.i);
			this.datasets.push(this.arrayData);
		}

		this.returnData = {};
		this.returnData["datasets"] = this.datasets;
		this.returnData["labels"] = this.createLabel();
		return this.returnData;
	}

	createSettings() {
		this.chartData = {};
		this.chartData["type"] = this.createType();

		this.chartData["data"] = this.createData();

		this.axes = [];
		this.stacked = {};
		this.stacked["stacked"] = true;
		this.axes.push(this.stacked);

		this.scales = {};
		this.scales["xAxes"] = this.axes;

		this.options = {};
		this.options["scales"] = this.scales;
		this.legend = {};
		this.legend["display"] = false;

		this.options["legend"] = this.legend;

		this.callbacks = {};
		this.callbacks["label"] = function(tooltipItem) {
			return tooltipItem.yLabel;
		}
		this.tooltips = {};
		this.tooltips["callbacks"] = this.callbacks;
		this.options["tooltips"] = this.tooltips;

		this.chartData["options"] = this.options;
		return this.chartData;
	}

	plotChart(area, data, label){
		this.area = area;
		this.data = data;
		this.label = label;
		super.create_settings(this.area, this.createSettings());
	}
}

class StackedChart extends BarChart {
	constructor(){
		super();
	}

	createLabel() {
		return this.label;
	}

	createData() {
		this.datasets = [];
		this.maxValue = Math.max.apply(null, this.data);
		this.bgColor = new Iterator(this.maxValue); 

		for(this.i=0; this.i<this.maxValue; this.i++) {
			this.arrayData = {};
			this.tempData = [];
			for(this.j=0; this.j<this.data.length; this.j++) {
				if(this.i<this.data[this.j]) {
					this.tempData.push(1);
				} else {
					this.tempData.push(0);
				}
			}
			this.arrayData["data"] = this.tempData;
			this.arrayData["label"] = this.label[this.i];
			this.arrayData["backgroundColor"] = this.bgColor.getBackGroundColor(this.i);
			this.datasets.push(this.arrayData);
		}

		this.returnData = {};
		this.returnData["datasets"] = this.datasets;
		this.returnData["labels"] = this.createLabel();
		return this.returnData;
	}

	createSettings() {
		this.chartData = {};
		this.chartData["type"] = super.createType();

		this.chartData["data"] = this.createData();

		this.axes = [];
		this.stacked = {};
		this.stacked["stacked"] = true;
		this.axes.push(this.stacked);

		this.scales = {};
		this.scales["yAxes"] = this.axes;

		this.options = {};
		this.options["scales"] = this.scales;
		this.legend = {};
		this.legend["display"] = false;

		this.options["legend"] = this.legend;

		this.callbacks = {};
		this.callbacks["label"] = function(tooltipItem) {
			return tooltipItem.yLabel;
		}
		this.tooltips = {};
		this.tooltips["callbacks"] = this.callbacks;
		this.options["tooltips"] = this.tooltips;

		this.chartData["options"] = this.options;
		return this.chartData;
	}

	plotChart(area, data, label){
		this.area = area;
		this.data = data;
		this.label = label;
		super.create_settings(this.area, this.createSettings());
	}
}

class Iterator {
	constructor(length) {
		this.length = length;
		this.bgColor = new BackGroundColor();
		this.backGroundArray = this.bgColor.backGroundColour(this.length);
	}

	getBackGroundColor(indexOf) {
		this.index = indexOf;
		return this.backGroundArray[this.index];
	}
}

class Decorator {
	backGroundColour(data) {
		throw new Error('This method should be overwritten!');
	}
}
class BackGroundColor extends Decorator{
	constructor() {
		super();
	}

	backGroundColour(data){
		this.data = data;
		this.arr=[];
		for (this.i = 0; this.i < this.data; this.i++ ) {
		    this.hue = 'rgb(' + (Math.floor(Math.random() * 256)) +
			 ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (0.6) + ')';
			this.arr.push(this.hue);
		}
		return this.arr;
	}
}