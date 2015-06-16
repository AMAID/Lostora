'use strict'
var Lostora=(function(){
    function paramType(param){
        if(typeof(param)=="string"){
            return "string"
        }
        else if(Object.prototype.toString.call(param)=="[object Array]"){
            return "array"
        }
        else if(typeof(param)=="object"){
            return "object"
        }
        else{
            return "other"
        }
    }
    function parseString(value){
        if(paramType(value)=="object") {
            value=JSON.stringify(value)
        }
        return value
    }
    function parseObject(value){
        if(paramType(value)!="object") {
            value=JSON.parse(value)
        }
        return value
    }
    function importJSON(json,scope){
        if(!scope){
            for(var key in json){
                Handler.set(key,json[key])
            }
        }
        else{
            Handler.set(scope,json)
        }
    }
    function getValue(value){
        try{value=parseObject(value)}
        catch(e){}
        return value
    }
    var Handler={
        exist:function(key){
            return !(localStorage[key]==undefined)
        },
        setJson:function(json,scope){
            json=parseString(json)
            importJSON(json,scope)
        },
        all:function(){
            var obj={}
            for(var key in localStorage){
                obj[key]=this.get(key)
            }
            if(obj.debug=="undefined"){delete(obj.debug)}
            return obj
        },
        add:function(key,value){
            if(!localStorage[key]){
                this.set(key,value)
            }
            else{
                console.error('LocalStorage "'+key+'" is already exsits.')
            }
        },
        update:function(key,value){
            if(localStorage[key]){
                this.set(key,value)
            }
            else{
                console.error('LocalStorage "'+key+'" doesn\'t exist.')
            }
        },
        get:function(key){
            if(paramType(key)=="array"){
                var obj={}
                for(var k in key)
                {
                    console.log(key[k])
                    obj[key[k]]=getValue(localStorage.getItem(key[k]))
                }
                return obj
            }else{
                try{var value=parseObject(localStorage.getItem(key))}
                catch(e){value=localStorage.getItem(key)}
                return value
            }
        },
        set:function(key,value){
            value=parseString(value)
            localStorage.setItem(key,value)
        },
        remove:function(key){
            localStorage.removeItem(key)
        },
        clear:function(){
            localStorage.clear()
        }
    }
    return Handler
})()