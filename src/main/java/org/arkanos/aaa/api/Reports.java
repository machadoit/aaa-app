package org.arkanos.aaa.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.controllers.ReportData;

/**
 * Servlet implementation class Reports
 */
@WebServlet("/reports/*")
public class Reports extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Reports() {
        super();
        Database.initialize();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String json = "";
		String to_parse = request.getRequestURI();
		if(!to_parse.endsWith("/")) to_parse += "/";
		
		to_parse = to_parse.replaceAll("/reports/", "");
		if(to_parse.substring(0, to_parse.indexOf("/")).equals("monthly")){
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int year = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int month = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			
			//TODO error if there is still BS in the URI.
			
			GregorianCalendar gc = new GregorianCalendar();
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month-1);
			gc.set(Calendar.DATE,1);
			int week_start = gc.get(Calendar.WEEK_OF_YEAR);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month);
			gc.set(Calendar.DATE,0);
			int week_end = gc.get(Calendar.WEEK_OF_YEAR);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.WEEK_OF_YEAR,week_start);
			Date start = gc.getTime();
			
			gc.clear();
			if(week_start < week_end){
				gc.set(Calendar.YEAR, year);
			}
			else {
				gc.set(Calendar.YEAR, year+1);
			}
			gc.set(Calendar.WEEK_OF_YEAR,week_end+1);
			Date end = gc.getTime();
					
			ReportData.Season season = null;
			ReportData.DailyReport report = null;
			try {
				season = ReportData.compileSeasonData(start, "arkanos");
				report = ReportData.compileDailyReport(start,end,"arkanos");
			}
			catch(SQLException e){
				//TODO
				e.printStackTrace();
			}
			//TODO move JSON generation to ReportData objects.
			json += "{";
			
			json += "\"arrow_counts\":";

			json += "{";
			for(String t: report.technique_days.keySet()){
				json += "\""+t+"\":";
				json += "{";
				for(String d: report.technique_days.get(t).keySet()){
					json += "\""+d+"\":"+report.technique_days.get(t).get(d)+",";
				}
				if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
				json += "},";
			}
			
			for(Integer di: report.distance_type.keySet()){
				json += "\""+di+"\":";
				json += "{";
				for(String t: report.distance_type.get(di).keySet()){
					json += "\""+t+"\":";
					json += "{";
					for(String d: report.distance_type.get(di).get(t).keySet()){
						json += "\""+d+"\":"+report.distance_type.get(di).get(t).get(d)+",";
					}
					if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
					json += "},";
				}
				if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
				json += "},";
			}

			json += "\"technique_totals\":";
			json += "{";
			for(String d: report.technique_totals.keySet()){
				json += "\""+d+"\":"+report.technique_totals.get(d)+",";
			}
			if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
			json += "},";
			
			json += "\"totals\":";
			json += "{";
			for(String d: report.totals.keySet()){
				json += "\""+d+"\":"+report.totals.get(d)+",";
			}
			if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
			json += "}";
			
			json += "},";
			
			json += "\"results\":";
			json += "{";
			for(Integer di: report.results.keySet()){
				json += "\""+di+"\":";
				json += "{";
				for(String c: report.results.get(di).keySet()){
					json += "\""+c+"\":";
					json += "{";
					for(int o: report.results.get(di).get(c).keySet()){
						json += "\""+o+"\":";
						json += "{";
						for(String d: report.results.get(di).get(c).get(o).keySet()){
							json += "\""+d+"\":"+report.results.get(di).get(c).get(o).get(d)+",";
						}
						if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
						json += "},";
					}
					
					json += "\"0\":";
					json += "{";
					for(String d: report.averages.get(di).get(c).keySet()){
						json += "\""+d+"\":"+report.averages.get(di).get(c).get(d)+",";
					}
					if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
					json += "}";
					
					json += "},";					
				}
				
				if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
				json += "},";
			}
			
			json += "\"result_totals\":";
			json += "{";
			for(String d: report.gauged_trainings.keySet()){
				json += "\""+d+"\":"+(report.average_sum.get(d)/report.gauged_trainings.get(d))+",";
			}
			if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
			json += "}";
			
			json += "},";
			
			json += "\"weekly\":";
			json += "{";
			//TODO Reestructure this JSON so that report uses this duplication from Season.
			for(int i = week_start; i <= week_end;i++){
				json += "\""+i+"\":";
				json += "{";
				json += "\"technique_total\":"+season.technique[i-season.start]+",";
				if(season.results[i-season.start] > 0) json += "\"result_total\":"+(season.sum[i-season.start]/season.results[i-season.start])+",";
				json += "\"total\":"+season.totals[i-season.start];
				json += "},";
			}
			if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
			
			json += "},";
			
			json += "\"season\":";
			json += "{";
			json += "\"name\":\""+season.name+"\",";
			json += "\"size\":"+season.size+",";
			json += "\"start\":"+season.start+",";
			for(int i = 0; i < season.size; i++){
				json += "\""+(season.start+i)+"\":";
				json += "{"; //TODO make names uniform...
				json += "\"total_plan\":"+season.plan[i]+",";
				json += "\"gauged_plan\":"+season.gauged[i]+",";
				json += "\"technique_total\":"+season.technique[i]+",";
				if(season.results[i] > 0) json += "\"result_total\":"+(season.sum[i]/season.results[i])+",";
				json += "\"total\":"+season.totals[i];
				if(season.totals[i] > season.max) season.max = season.totals[i];
				json += "},";
			}
			json += "\"max\":"+season.max;
			json += "},";
			
			json += "\"start\":\""+ReportData.sdf.format(start)+"\",";
			json += "\"end\":\""+ReportData.sdf.format(end)+"\",";
			json += "\"week_start\":"+week_start+",";
			json += "\"week_end\":"+week_end+",";
			json += "\"month\":"+month+",";
			json += "\"response\":200}";
			System.out.println(json);
		}
		//TODO throw error, treat exceptions
		
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		//to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		response.getWriter().append(json);
		response.addHeader("Content-Type", "application/json");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}