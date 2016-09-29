<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
  <link href="css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
  <link href="css/bootstrap-theme.min.css" rel="stylesheet">
  
  	<style type="text/css">  
		.align-center{  
  		      margin:0 auto;               
   		      text-align:center; 	
	          position:relative; 
        } 
        .area{
       		 width: 600px;
        } 
	</style> 
  
  <script type="text/javascript">  
// <![CDATA[  
    bratLocation = "brat";
// ]]>
</script>
 <link rel="stylesheet" type="text/css" href="brat/style-vis.css"/>
<script type="text/javascript" src="brat/client/lib/head.load.min.js"></script>
  <script src="scripts/fnlp.js" type="text/javascript"></script>
<title>FNLP_Demo</title>
<link rel="shortcut icon" href="fnlp.ico" type="image/x-icon" />
</head>
<body>
<!-- 页面导航 -->
<div role="navigation">
	<ul class="nav nav-pills">
  		<li role="presentation"><a href="http://nlp.fudan.edu.cn/">FNLP</a></li>
  		<li role="presentation" class="active"><a href="demo.jsp">Demo</a></li>
	</ul>
</div>

<div align="center">
		<div style="width: 600px">

			    <h3 class="panel-title">This demo provide Word Segmentation,POS Tagging and Sentence Parser results</h3>
			    <hr>
			    <h4>Input text or click the example button</h4>
			<a id="example">Click Example</a><br />	
			<textarea name="text" id="inputtext" class="area" rows="6" tabindex="1" default="" onmouseover="this.focus()"></textarea><br />
			<button id="analyse" type="button" class="btn btn-primary">Analyse</button><br />
			<div id="result" class="align-center"></div>
						
		</div>
</div>
	<div id ="resu" class="align-center">	</div>
			
  <script src="http://code.jquery.com/jquery-latest.js"></script>
  <script src="scripts/bootstrap.min.js"></script>

  <footer class="footer  navbar-fixed-bottom" >
    <div class="container">
    <hr />  
<h5 align="center">© 2016 Fudan Natural Language Processing Group | Maintained by lsyin.
   </h5>
    </div>
</footer>
</body>
</html>