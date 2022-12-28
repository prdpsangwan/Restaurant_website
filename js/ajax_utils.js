(function(global){
    var ajaxUtils={};

    function getRequestObject(){
        if(window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if(window.ActiveXObject){
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not suppoerted!");
            return(null);
        }
    }

    ajaxUtils.sendGetRequest=function(requestUrl,responseHandler,isJsonResponse){
        var request=getRequestObject();
        request.onreadystatechange=
        function(){
            handleResponse(request,responseHandler,isJsonResponse);
        };
        request.open("GET",requestUrl,true);
        request.send(null);
    }

    function handleResponse(request,responseHandler,isJsonResponse){
        if((request.readyState==4) && (request.status==200)){

            //default to isJsonresponse =true
            if(isJsonResponse==undefined){
                isJsonResponse = true;
            }
            if(isJsonResponse){
                responseHandler(JSON.parse(request.responseText)); //here the argument is a JSON string 
            }
            else{
                responseHandler(request.responseText);
            }
        }
    }

    global.$ajaxUtils=ajaxUtils;
})(window);