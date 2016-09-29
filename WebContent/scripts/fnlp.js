window.onload = initPage;


head.js(
    // External libraries
    bratLocation + '/client/lib/jquery.min.js',
    bratLocation + '/client/lib/jquery.svg.min.js',
    bratLocation + '/client/lib/jquery.svgdom.min.js',

    // brat helper modules
    bratLocation + '/client/src/configuration.js',
    bratLocation + '/client/src/util.js',
    bratLocation + '/client/src/annotation_log.js',
    bratLocation + '/client/lib/webfont.js',

    // brat modules
    bratLocation + '/client/src/dispatcher.js',
    bratLocation + '/client/src/url_monitor.js',
    bratLocation + '/client/src/visualizer.js'
);
 

function initPage() 
{
	document.getElementById("example").onclick=fill;
	document.getElementById("analyse").onclick=anaylsis;

}

function fill()
{
	document.getElementsByName("text")[0].value = "今天天气阳光明媚，适合出去旅游。我们打算下午去西塘逛逛，缓解一下烦闷的心情。";
	
}

function anaylsis()
{	
	
	var text;
	var type;
    var URL="http://nlp.fudan.edu.cn/service/mode";
    //var URL="http://localhost:9000/service/mode";	

	text=document.getElementsByName("text")[0].value;
	
	//实现text=text.trim()函数的功能，去掉多余空格
	String.prototype.trim = function()
		{
		    return this.replace(/(^\s*)|(\s*$)/g, "");
		}
	text=text.trim();
	
	var xmlhttp=null;
	if (window.XMLHttpRequest)
		{// code for all new browsers
			xmlhttp=new XMLHttpRequest();
		}
	else if (window.ActiveXObject)
		{// code for IE5 and IE6
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
	xmlhttp.open("POST",URL,true);	

	var data="{'type':'parser','text':'"+text+"'}";
	xmlhttp.send(data);	
	xmlhttp.onreadystatechange = callback;  

	function callback()
		{   
	
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{  						  					
				    result = xmlhttp.responseText.toString(); 				
				   // result=eval("(" + result + ")");	//变为json对象				    
				    result=JSON.parse(result);
				    var speed = result.process_time;
					
				    document.getElementById("result").innerHTML="";
		    		document.getElementById("resu").innerHTML="";
		    		var ress = document.createElement("div");
		    		ress.setAttribute("id","res"); 
		    		ress.setAttribute("class","align-center"); 
		    		document.getElementById("resu").appendChild(ress);
				   							
				    head.ready(function() {

				    		var webFontURLs = [
				    		bratLocation + '/static/fonts/Astloch-Bold.ttf',
				    		bratLocation + '/static/fonts/PT_Sans-Caption-Web-Regular.ttf',
				    		bratLocation + '/static/fonts/Liberation_Sans-Regular.ttf'
				    		];
			    		
				    	
				    	
				    		var textField = document.createElement("textarea");    
				    		// textField.setAttribute("cols",200);   
				    		textField.setAttribute("rows",5);   
				    		textField.setAttribute("disabled","disabled");
				    		textField.setAttribute("style","width: 600px;border:1px solid #ccc");  
				    		temp=""; //暂存分词结果，直接返回result.word的话逗号是分隔符。所以要换成空格
				    		for(var j=0;j<result.word.length;j++){
				    			temp=temp+result.word[j]+" ";
				    		}
  
				    		textField.value=temp;
				    		document.getElementById("result").appendChild(textField);				    		
				    		var textField2 = document.createElement("textarea");    
				    		// textField.setAttribute("cols",200);   
				    		textField2.setAttribute("rows",5);
				    		textField2.setAttribute("disabled","disabled");
				    		textField2.setAttribute("style","width: 600px;border:1px solid #ccc");  
 
				    		temp=""; //暂存分词结果，直接返回result.pos的话只有词性。
				    		for(var j=0;j<result.word.length;j++){
				    			temp=temp+result.word[j]+"/"+result.pos[j]+"  ";
				    		}
 
				    		textField2.value=temp;
				    		document.getElementById("result").appendChild(textField2);								    	
          
				    		//  alert(document.getElementById("parse_loading").innerHTML)  ; 

                           
				    		handle(result);

				    		collData ={
				    				"entity_types": [
				    				      {
				    				    	  "type": "人称代词",
				    				    	  "labels": [ "人称代词" ],
				    				    	  "bgColor": "#7fa2ff",
				    				    	  "borderColor": "darken"
				    				      }	,
				    				      {
				    				    	  "type": "动词",
				    				    	  "labels": [ "动词" ],
				    				    	  "bgColor": "#7fa2ff",
				    				    	  "borderColor": "darken"
				    				      },
				    				      {
				    				    	  "type": "形容词",
				    				    	  "labels": [ "形容词" ],
				    				    	  "bgColor": "#7fa2ff",
				    				    	  "borderColor": "darken"
				    				      },
				    				      {
				    				    	  "type": "名词",
				    				    	  "labels": [ "名词" ],
				    				    	  "bgColor": "#7fa2ff",
				    				    	  "borderColor": "darken"
				    				      }	
				    				      ],
				    				      "relation_types": [
				    				      {
				    				    	  "type": "Dependence",
				    				    	  "labels": [ "Dep" ],
				    				    	  "dashArray": "0,0",
				    				    	  "color": "purple",
				    				    	  "args": [
				    				    	           {
				    				    	        	   "role": "Dependence"
				    				    	           },
				    				    	           {
				    				    	        	   "role": "root"
				    				    	           }
				    				    	           ]
				    				      }
				    				      ]
		
				    		}
				    		Util.embed('res',collData,docData,webFontURLs);				    	
                           
				    });


									
						
				}
			
				
		}  	
	
	
}

//解析字符串，返回docData的json数据
function handle(result)       
{
					
					var a=0;
					 //创建一个字符串数组，s[0]保存分词后的句子，是s[1]保存句法分析后的词性，s[2]保存依存关系的下标，s[3]保存句子成分
					var s=new Array();
					var str=""; //用str保存中间解析结果
					var text=""; //text保存分词后的结果
						 						
					for(var j=0;j<result.word.length;j++){
					    str=str+"{\"word\":"+"\""+result.word[j]+"\","+"\"cixing\":"+"\""+result.pos[j]+"\","+"\"pose\":"+"\""+result.head[j]+"\","+"\"depend\":"+"\""+result.dep[j]+"\"},"; //将其变成JSON格式
					    text=text+result.word[j]+" ";
					}
					str="["+str+"]";	
					
					//document.getElementById("result").value=result;
					str = eval("(" + str + ")"); //将字符串变为json
				
					
					
				    var entity="";
				    var relation="";
					var start=0;
					for(var i=0;i<str.length;i++)
					{
						if(start==0) // 注意下标是从0开始的
						   var end=start+str[i].word.length-1;
						end=start+str[i].word.length;  
						entity=entity+"[\"A"+i.toString()+"\",\""+str[i].cixing+"\",[["+start.toString()+","+end.toString()+"]]],";
						
						if(str[i].pose=="-1")	  //root,自己指向自己					
							str[i].pose=i;
						
						relation=relation+"[\"B"+i.toString()+"\",\""+str[i].depend+"\",[[\"Dependence\",\"A"+i.toString()+"\"],[\"root\",\"A"+str[i].pose+"\"]]],";
						
						start=end+1;	//注意空格					
						}


entity=entity.substring(0,entity.lastIndexOf(','));
relation=relation.substring(0,relation.lastIndexOf(','));

//var testString="我们 是 好 朋友";
docData="{\"text\":"+"\""+text+"\","+"\"entities\":["+entity+"],\"relations\":["+relation+"]}";

//document.getElementById("test").value=docData;


docData=eval("(" + docData + ")");		
	
}
