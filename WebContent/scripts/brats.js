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
 

					var result="我们 是 好 朋友\n人称代词 动词 形容词 名词\n1 -1 3 1\n主语 核心词 定语 宾语";
				
head.ready(function() {

var webFontURLs = [
    bratLocation + '/static/fonts/Astloch-Bold.ttf',
    bratLocation + '/static/fonts/PT_Sans-Caption-Web-Regular.ttf',
    bratLocation + '/static/fonts/Liberation_Sans-Regular.ttf'
];

if(type=="seg")
{
document.getElementById("result").innerHTML=result;
}

if(type=="pos")
{
alert("pos");
}

if(type=="time")
{
alert("time");
}

//if(type=="parser")
{
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

    Util.embed(
        // id of the div element where brat should embed the visualisations
        'result',
        // object containing collection data
        collData,
        // object containing document data
        docData,
        // Array containing locations of the visualisation fonts
        webFontURLs
        );
}

if(type=="key")
{
alert("key");
}

if(type=="ar")
{
alert("ar");
}


});

//解析字符串，返回docData的json数据
function handle(result)       
{
	                
					var a=0;
					 //创建一个字符串数组，s[0]保存分词后的句子，是s[1]保存句法分析后的词性，s[2]保存依存关系的下标，s[3]保存句子成分
					var s=new Array();
					var str=""; //用str保存中间解析结果
					var text; //text保存分词后的结果
					for(var i=0;i<3;i++)
					{
						var b=result.indexOf('\n',a);
						s[i]=result.substring(a,b);						
						a=b+1;					
					}
					text=s[0];
					s[3]=result.substring(result.lastIndexOf('\n')+1,result.length);
						
					for(var i=0;i<4;i++)
						 s[i]=s[i].split(" ");
						 						
					for(var j=0;j<s[0].length;j++)
						str=str+"{\"word\":"+"\""+s[0][j]+"\","+"\"cixing\":"+"\""+s[1][j]+"\","+"\"pose\":"+"\""+s[2][j]+"\","+"\"depend\":"+"\""+s[3][j]+"\"},";  //将其变成JSON格式
					str=str.substring(0,str.lastIndexOf(','));	//末尾多了个逗号
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