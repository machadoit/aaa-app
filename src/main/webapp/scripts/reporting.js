var xmlhttp = new XMLHttpRequest();
var url = "/reports/monthly/2015/08";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var download = JSON.parse(xmlhttp.responseText);
        buildMonthlyReport(download);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function buildMonthlyReport(download){
	var week = download.week_start;
	
	var request = download.month;
	var current = new Date(download.start);
	var stop = new Date(download.end);
	
	//TODO maybe use it again...
	//var width = 85/((stop - current)/(1000*60*60*24*7))
	var html = "<div>";

	html += "<div class='sidebar'>";
	html += "<div class='skip_header'></div>";
	html += "<div id='labels'>";
	
	html += "</div>";
	html += "</div>";
	
	while(current < stop){
		html += "<div class='week' style='width:140pt'>";
		
		html += "<div class='week-title'>"
		html += "<h2>"+week+"</h2><p>week_number</p>";
		html += "</div>";

		html += "<div class='days'>"
		for(i = 0; i < 7;i++){
			html += "<div class='day header_day'>";
			html += current.getDate();
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		html += "<div id='week-data-"+week+"'></div>";
		
		html += "</div>";
		
		html += "</div>";
		week++;
	}
	html += "</div>"
	document.body.innerHTML = html;
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='warmup' class='label'>"
	html += "<p>warmup</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += "'>";
			if(download.arrow_counts.warmup[current.toJSON().substring(0,10)]){
				html += download.arrow_counts.warmup[current.toJSON().substring(0,10)];
			}
			else{
				html += " ";
			}
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	
	
	for(var distance in download.arrow_counts){		
		if(!isNaN(distance)){ 
			html = document.getElementById("labels").innerHTML;
			html += "<div id='counts-"+distance+"' class='label'>"
			html += "</div>";
			document.getElementById("labels").innerHTML = html;
			var label = "";
			label += "<table cellspacing='0' cellpadding='0'><tr>"
			label += "<td class='text'><p>"+distance+" m</p></td>";
			label += "<td class='text'>";
			for(var type in download.arrow_counts[distance]){
				label += "<p>"+type+"</p>";
				current = new Date(download.start);
				week = download.week_start;
				while(current < stop){
					html = document.getElementById("week-data-"+week).innerHTML;
					for(i = 0; i < 7;i++){
						html += "<div class='day";
						if(i > 4) html += " weekend";
						if(current.getMonth() + 1 != download.month) html += " offtime";
						html += "'>";
						if(download.arrow_counts[distance][type][current.toJSON().substring(0,10)]){
							html += download.arrow_counts[distance][type][current.toJSON().substring(0,10)];
						}
						else{
							html += " ";
						}
						html += "</div>";
						current.setDate(current.getDate() + 1);
					}
					document.getElementById("week-data-"+week).innerHTML = html;
					week++;				
				}
			}
			for(var i = download.week_start;i < week; i++){
				var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
				var length = element.length;
				for(j = 0; j < 7; j++){
					element[length-1-j]['className'] += " end";
				}
			}
			label += "</td>";
			label += "</table></tr>"
			document.getElementById("counts-"+distance).innerHTML = label;
		}
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='warmout' class='label'>"
	html += "<p>warmout</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += "'>";
			if(download.arrow_counts.warmout[current.toJSON().substring(0,10)]){
				html += download.arrow_counts.warmout[current.toJSON().substring(0,10)];
			}
			else{
				html += " ";
			}
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='technique_totals' class='label'>"
	html += "<p>technique_totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end subtotal";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += "'>";
			if(download.arrow_counts.technique_totals[current.toJSON().substring(0,10)]){
				html += download.arrow_counts.technique_totals[current.toJSON().substring(0,10)];
			}
			else{
				html += " ";
			}
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='totals' class='label'>"
	html += "<p>totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += " summary'>";
			if(download.arrow_counts.totals[current.toJSON().substring(0,10)]){
				html += download.arrow_counts.totals[current.toJSON().substring(0,10)];
			}
			else{
				html += " ";
			}
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_technique</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " '>";
		if(download.weekly[week].total){
			html += download.weekly[week].technique_total;
		}
		/**Dummies not to break the CSS child rule**/
		html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_total</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " '>";
		if(download.weekly[week].total){
			html += download.weekly[week].total;
		}
		/**Dummies not to break the CSS child rule**/
		html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	
	for(var distance in download.results){		
		if(!isNaN(distance)){ 
			html = document.getElementById("labels").innerHTML;
			html += "<div id='results-"+distance+"' class='label'>"
			html += "</div>";
			document.getElementById("labels").innerHTML = html;
			var label = "";
			label += "<table cellspacing='0' cellpadding='0'><tr>"
			label += "<td class='text'><p>"+distance+" m</p></td>";
			label += "<td class='text'>";
			for(var classes in download.results[distance]){
				label += "<p class='classes'>"+classes+"</p>";
				for(var order in download.results[distance][classes]){
					if(order != 0){
						label += "<p class='individual_results'>"+order+"</p>";
						current = new Date(download.start);
						week = download.week_start;
						while(current < stop){
							html = document.getElementById("week-data-"+week).innerHTML;
							for(i = 0; i < 7;i++){
								html += "<div class='day";
								if(i > 4) html += " weekend";
								if(current.getMonth() + 1 != download.month) html += " offtime";
								html += "'>";
								if(download.results[distance][classes][order][current.toJSON().substring(0,10)]){
									html += download.results[distance][classes][order][current.toJSON().substring(0,10)];
								}
								else{
									html += " ";
								}
								html += "</div>";
								current.setDate(current.getDate() + 1);
							}
							document.getElementById("week-data-"+week).innerHTML = html;
							week++;				
						}
					}
				}
				
				label += "<p> average_inacurracy </p>";
				
				current = new Date(download.start);
				week = download.week_start;
				while(current < stop){
					html = document.getElementById("week-data-"+week).innerHTML;
					for(i = 0; i < 7;i++){
						html += "<div class='day subtotal";
						if(i > 4) html += " weekend";
						if(current.getMonth() + 1 != download.month) html += " offtime";
						html += "'>";
						if(download.results[distance][classes][0][current.toJSON().substring(0,10)]){
							html += (10-download.results[distance][classes][0][current.toJSON().substring(0,10)]).toPrecision(3);
						}
						else{
							html += " ";
						}
						html += "</div>";
						current.setDate(current.getDate() + 1);
					}
					document.getElementById("week-data-"+week).innerHTML = html;
					week++;				
				}
				
				for(var i = download.week_start;i < week; i++){
					var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
					var length = element.length;
					for(j = 0; j < 7; j++){
						element[length-1-j]['className'] += " end";
					}
				}
				
			}
			for(var i = download.week_start;i < week; i++){
				var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
				var length = element.length;
				for(j = 0; j < 7; j++){
					element[length-1-j]['className'] += " end";
				}
			}
			label += "</td>";
			label += "</table></tr>"
			document.getElementById("results-"+distance).innerHTML = label;
		}
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='result_totals' class='label'>"
	html += "<p>result_totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += " summary'>";
			if(download.results.result_totals[current.toJSON().substring(0,10)]){
				html += (10-download.results.result_totals[current.toJSON().substring(0,10)]).toPrecision(3);
			}
			else{
				html += " ";
			}
			html += "</div>";
			current.setDate(current.getDate() + 1);
		}
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_inacurracy</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " summary'>";
		if(download.weekly[week].result_total){
			html += (10-download.weekly[week].result_total).toPrecision(3);
		}
		html += "</div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	//TODO put max in json
	document.body.innerHTML += drawDailyGraph(download);
	document.body.innerHTML += drawSeasonGraph(download);
}

function getGrid(height, columns){
	var s = "<g>";
	for(var i = 0; i <= columns; i++){
		s += "<path class='grid' d='m "+100*i+",0 0,"+(-height)+"  ' />";
	}
	for(var i = height; i > 0; i -= height/10){
		s += "<path class='grid' d='m 0,"+(-i)+" "+(columns*100)+",0  ' />";
	}
	s += "</g>";
	return s;
}

function getPlan(value, column){
	var s = "<g transform='translate(0,"+(-value)+")'>";
	s += "<rect class='plan' x='"+(10+column*100)+"' height='"+value+"' width='80' />";
	s += "</g>";
	return s;
}

function getActual(target, training, column){
	var s = "<g transform='translate(0,"+(-target-training)+")'>";
	s += "<rect class='target' x='"+(10+column*100)+"' height='"+ target +"' width='80' />";
	s += "<rect class='training' x='"+(10+column*100)+"' y='"+target+"' height='"+ training +"' width='80' />";
	s += "</g>";
	return s;
}

function getShare(value, column){
	var s = "<g transform='translate("+(column*100)+","+(-value)+")'>";
	s += "<rect class='share-shadow' x='5' y='0' height='20' width='100' />";
	s += "<rect class='share' y='-5' height='20' width='100' />";
	s += "</g>";
	return s;
}

function getResult(value,position,size) {
	var s = "<g>";
	var k = -((value)/10);
	s+= "<circle class='result' cx='"+(position*100+50)+"' cy='"+(k*size)+"' r='10'/>";
	s+="</g>";
	return s;
}

function getEstimations(data, size) {
	var s = "<g><path class='estimation' d='M ";
	var first = true;
	for(var i = 0; i < data.length;i++){ //TODO improve this
		var k = -((data[i])/10);
		if(k <= 0){
			if(first){
				s += (50+i*100)+" "+(k*size)+" C "+ (i*100+100) +","+(k*size)+" ";
				first = false;
			}
			else {
				s += (50+i*100-50)+","+(k*size)+" "+(i*100+50)+" "+(k*size)+" S ";
			}
		}
	}
	s+="'/></g>";
	return s;
}

function drawDailyGraph(download){

	var days = (new Date(download.end) - new Date(download.start))/(1000*60*60*24);
	var season = download.season;
	var max = download.season.max*1.1;
	
	var general_width = (days*100+700);
	var width = 20.2/(100/general_width);
	
	html = "<svg xmlns='http://www.w3.org/2000/svg'";
	html += " id='season'";
	html += " version='1.1'";
	html += " viewBox='0 "+(-max)+" "+(general_width+2)+" "+(max+1)+"'";
	html += " preserveAspectRatio='xMidYMid meet'";
	html += " width='"+width+"pt'>";
	
	html += getStyle();
	
	html += "<g id='main'>";
	
	html += getLabels(max);
	
	html += "<g id='data' transform='translate(700,0) scale(1,1)'>";
	
	html += getGrid(max,days);
	
	var estimate = false;
	var estimations = [];
	var bullets = {};
	
	current = new Date(download.start);
	week = download.week_start;
	stop = new Date(download.end);
	var i = 0;
	var estimate = false;
	var estimations = [];
	var bullets = {};
	while(current < stop){
		var now = current.toJSON().substring(0,10);
		var technique = 0;
		var gauged = 0;
		
		if(download.arrow_counts.totals[now]){
			if(download.arrow_counts.technique_totals[now]){
				technique = download.arrow_counts.technique_totals[now];
				gauged = download.arrow_counts.totals[now] - technique;
			}
			else{
				gauged = download.arrow_counts.totals[now];
			}
		}
		
		if(gauged > 0 || technique > 0){
			html += getActual(gauged,technique,i);
		}
		
		if(download.results.result_totals[now]){
			bullets[i] = download.results.result_totals[now];
			estimations.push(download.results.result_totals[now]);
			estimate = true;
		}
		else{
			if(estimate && i > 1){
				//TODO test this... probably not working.
				estimations.push((estimations[i-1]+estimations[i-2])/2);
			}
			else{
				estimations.push(-1);
			}
		}
			
		current.setDate(current.getDate() + 1);
		i++
	}
	html += getEstimations(estimations,max);
	
	for(bullet in bullets){
		html += getResult(bullets[bullet],bullet,max);
	}
	
	
	html += "</g>";
	
	html += "</g>";
	
	html += "</svg>";
	
	return html;
}

function drawSeasonGraph(download){
	
	var weeks = download.season.size;
	var season = download.season;
	var max = download.season.max*1.1;
	
	var general_width = (weeks*100+700);
	var width = 20.2/(100/general_width);
	
	html = "<svg xmlns='http://www.w3.org/2000/svg'";
	html += " id='season'";
	html += " version='1.1'";
	html += " viewBox='0 "+(-max)+" "+(general_width+2)+" "+(max+2)+"'";
	html += " preserveAspectRatio='xMidYMid meet'";
	html += " width='"+width+"pt'>";
	
	html += getStyle();
	
	html += "<g id='main'>";
	
	html += getLabels(max);
	
	html += "<g id='data' transform='translate(700,0) scale(1,1)'>";
	
	html += getGrid(max,weeks);
	
	var estimate = false;
	var estimations = [];
	var bullets = {};
	for(i in season){
		if(!isNaN(i)){
			html += getPlan(season[i].total_plan,i-season.start);
			html += getActual(season[i].total-season[i].technique_total,season[i].technique_total,i-season.start);
			html += getShare(season[i].total_plan-season[i].gauged_plan,i-season.start);
			if(season[i].result_total){
				bullets[i] = season[i].result_total;
				estimations.push(season[i].result_total);
				estimate = true;
			}
			else{
				if(estimate && i > 1){
					//TODO test this... probably not working.
					estimations.push((estimations[i-season.start-1]+estimations[i-season.start-2])/2);
				}
				else{
					estimations.push(-1);
				}
			}
			
		}
	}
	html += getEstimations(estimations,max);
	
	for(bullet in bullets){
		html += getResult(bullets[bullet],bullet-season.start,max);
	}
	
	html += "</g>";
	
	html += "</g>";
	
	html += "</svg>";
	
	return html;
}

function getLabels(max){
	var html = "<g id='labels' transform='translate(0,-"+max+")'>";
	
	html += "<rect class='plan' x='0' y='"+(1*max/10-25)+"' height='20' width='100' />";
	html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'> total_plan </text>"
	
	html += "<rect class='training' x='0' y='"+(2*max/10-25)+"' height='20' width='100' />";
	html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'> technique_totals </text>"
	
	html += "<rect class='target' x='0' y='"+(3*max/10-25)+"' height='20' width='100' />";
	html += "<text class='graph_label' x='125' y='"+(3*max/10-2)+"'> totals </text>"
	
	html += "<rect class='share-shadow' x='5' y='"+(4*max/10-25)+"' height='20' width='100' />";
	html += "<rect class='share' y='"+(4*max/10-5-25)+"' height='20' width='100' />";
	html += "<text class='graph_label' x='125' y='"+(4*max/10-2)+"'> technique_share </text>"
	
	html += "<path class='estimation' d='M 0,"+(5*max/10-12.5)+" l 100,0'/>";
	html += "<circle class='result' cx='50' cy='"+(5*max/10-12.5)+"' r='10'/>";
	html += "<text class='graph_label' x='125' y='"+(5*max/10-2)+"'> result_totals </text>"
	
	html += "<circle class='strength' cx='50' cy='"+(6*max/10-12.5)+"' r='10'/>";
	html += "<text class='graph_label' x='125' y='"+(6*max/10-2)+"'> strength_training </text>"
	
	html += "</g>";
	
	return html;
}

function getStyle(){
	var html = "<style>";
	
	html += ".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}";
	
	html += ".plan {fill:#FFF;stroke:#000;stroke-opacity:1}";
	html += ".training {fill:#CCFFFF;stroke:#000;stroke-opacity:1}";
	html += ".target {fill:#FFCC99;stroke:#000;stroke-opacity:1}";
	html += ".result {fill:#33CCCC;stroke:#000;stroke-opacity:1}";
	html += ".estimation {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}";
	html += ".strength {fill:#FFCC00;stroke:#000;stroke-opacity:1}";
	
	html += ".grid {fill:none;stroke:#000;stroke-opacity:1;stroke-dasharray: 10 5}";
	
	html += ".share {fill:#777}";
	html += ".share-shadow {fill:#000}";
	
	html += ".graph_scale {}";
	html += ".graph_label {font-size:40}";
	
	html += "</style>";
	return html;
}