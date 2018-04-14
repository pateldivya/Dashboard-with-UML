class Statistics {
	constructor(selectedColumns, numericColumns, df) {
		this.selectedColumns = selectedColumns;
		this.numericColumns = numericColumns;
		this.df = df;
	}

	generateStatistics() {
		this.statisticCheckBox = document.getElementsByName('statisticsColumn');
		this.checkedStatisticsColumns = [];
		for(this.i=0; this.i<this.statisticCheckBox.length; this.i++) {
			if(this.statisticCheckBox[this.i].checked) {
				this.id = this.statisticCheckBox[this.i].id-9999;
				this.checkedStatisticsColumns.push(this.id);
			}
		}

		this.heading = this.df.listColumns();
		this.statisticsTbl = "<table class=bordered><tr><td>Column Name</td><td>Max</td><td>Min</td><td>Mean</td><td>Average</td><td>Standard Deviation</td></tr>";
		for(this.i=0; this.i<this.checkedStatisticsColumns.length; this.i++) {
			this.head = this.heading[this.numericColumns[this.checkedStatisticsColumns[this.i]]];
			this.max = this.df.stat.max(this.head);
			this.min = this.df.stat.min(this.head);
			this.mean = this.df.stat.mean(this.head);
			this.avg = this.df.stat.min(this.head);
			this.sd = this.df.stat.sd(this.head);

			this.statisticsTbl += "<tr><td>"+ this.heading[this.numericColumns[this.checkedStatisticsColumns[this.i]]] +"</td><td>" + this.max + "</td><td>" + this.min + "</td><td>" + this.mean + "</td><td>" + this.avg + "</td><td>" + this.sd + "</td></tr>";
		}
		this.statisticsTbl += "</table>";

		return this.statisticsTbl;
	}
}