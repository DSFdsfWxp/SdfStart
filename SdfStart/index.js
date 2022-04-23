/*-------
	
# SdfStart
# by: DSFdsfWxp
	
A light but useful start page.
一个轻量但实用的起始页.
	
-------*/


const SdfDOM = {
	backgroundimg: document.getElementById("backgroundimg-img"),
	background: document.getElementById("backgroundimg"),
	toptime: document.getElementById("top-time"),
	topdate: document.getElementById("top-date"),
	backgroundpicCopyright: document.getElementById("pic-copyrights"),
	topdiv: document.getElementById("top"),
	searchdiv: document.getElementById("search"),
	searchtime: document.getElementById("search-time")
};

const SdfFlags = {
	State: {
		Startup: -2,
		NotSet: -1,
		Top: 0,
		Search: 1,
		SearchIn: 2,
		Links: 3
	},
	BackgroundMode: {
		Top: 0,
		Search: 1,
		SearchIn: 2,
		Links: 3
	}
};

class SdfSettings{
	static init(){
		this.settingsStorage={};
		if (window.localStorage.getItem("sdfstart-settings")==null || window.localStorage.getItem("sdfstart-settings")=="null"){
			this.settingsStorage={
				background: {
					mode: "Color",
					userDefinePic: null,
					randomPicApi: 0,
					color: [80,80,80]
				},
				user: {
					name: "guest"
				},
				search: {
					suggestOffer: true,
					apiSwitch: 0,
					httpsUsing: true,
					apiList: [
						{
							name: "Baidu",
							searchApi: "www.baidu.com/s?wd=$%swd",
							suggestApi: "suggestion.baidu.com/su?wd=$%swd&cb=$%swcb",
							suggestCallBack: "return 0;"
						},
						{
							name: "Google",
							searchApi: "www.baidu.com/s?wd=$%swd",
							suggestApi: "suggestion.baidu.com/su?wd=$%swd&cb=$%swcb",
							suggestCallBack: "return 0;"
						},
						{
							name: "Bing",
							searchApi: "www.baidu.com/s?wd=$%swd",
							suggestApi: "suggestion.baidu.com/su?wd=$%swd&cb=$%swcb",
							suggestCallBack: "return 0;"
						},
						{
							name: "Sougo",
							searchApi: "www.baidu.com/s?wd=$%swd",
							suggestApi: "suggestion.baidu.com/su?wd=$%swd&cb=$%swcb",
							suggestCallBack: "return 0;"
						}
					],
					defaultApi: {
						name: "Baidu",
						searchApi: "www.baidu.com/s?wd=$%swd",
						suggestApi: "suggestion.baidu.com/su?wd=$%swd&cb=$%swcb",
						suggestCallBack: "return 0;"
					}
				},
				links: {
					list: [
						{
							name: "Github",
							url: "github.com"
						},
						{
							name: "Bilibili",
							url: "www.bilibili.com"
						},
						{
							name: "Baidu",
							url: "www.baidu.com"
						},
						{
							name: "Weibo",
							url: "www.weibo.com"
						},
						{
							name: "Gitee",
							url: "www.gitee.com"
						},
						{
							name: "Runoob",
							url: "www.runoob.com"
						},
						{
							name: "Bigjpg",
							url: "www.bigjpg.com"
						},
						{
							name: "网易云音乐",
							url: "music.163.com"
						},
						{
							name: "QQ音乐",
							url: "y.qq.com"
						},
						{
							name: "酷狗音乐",
							url: "www.kugou.com"
						}
					]
				}
			};
			this.updateToStorage();
		}else{
			this.updateFromStorage();
		}
	}
	
	static updateFromStorage(){
		if (this.settingsStorage==null || this.settingsStorage==undefined){
			this.init();
		}
		this.settingsStorage = JSON.parse(window.localStorage.getItem("sdfstart-settings"));
	}
	
	static updateToStorage(){
		if (this.settingsStorage==null || this.settingsStorage==undefined){
			this.init();
		}
		window.localStorage.setItem("sdfstart-settings",JSON.stringify(this.settingsStorage));
	}
	
	static resetInStorage(){
		window.localStorage.setItem("sdfstart-settings","null");
		this.init();
	}
}

class SdfBackground{
	static init(){
		this.topTxtColor=[255,255,255];
		this.__c=null;
		this.randomPicApi=function(){
			var t=SdfSettings.settingsStorage.background.color;
			SdfBackground.setBackgroundColor(t[0],t[1],t[2]);
		};
		switch (SdfSettings.settingsStorage.background.mode){
			case "Color":
				var t=SdfSettings.settingsStorage.background.color;
				SdfBackground.setBackgroundColor(t[0],t[1],t[2]);
				break;
			case "UserDefinePic":
				SdfBackground.setBackgroundPic(SdfSettings.settingsStorage.background.UserDefinePic,"");
				break;
			case "RandomPic":
				if (SdfSettings.settingsStorage.background.randomPicApi!=0) {
					this.randomPicApi=Function(SdfSettings.settingsStorage.background.randomPicApi);
				}
				this.randomPicApi();
				break;
			default:
				SdfSettings.settingsStorage.background.mode="Color";
				SdfSettings.settingsStorage.background.color=[80,80,80];
				SdfSettings.updateToStorage();
				var t=SdfSettings.settingsStorage.background.color;
				SdfBackground.setBackgroundColor(t[0],t[1],t[2]);
				break;
		}
	}
	
	static _fadeIn(){
		SdfDOM.backgroundimg.style.opacity="1";
	}
	
	static _fadeOut(){
		SdfDOM.backgroundimg.style.opacity="0";
	}
	
	
	static setBackgroundPic(url,copyright){
		this._fadeOut();
		SdfDOM.backgroundpicCopyright.innerText="图片来源: [究竟是哪呢?]";
		if (copyright.trim()!=""){
			SdfDOM.backgroundpicCopyright.innerText="图片来源: "+copyright;
		}else{
			SdfDOM.backgroundpicCopyright.innerText="";
		}
		SdfDOM.backgroundimg.style.background=SdfToolKit.url2css(url);
		SdfDOM.backgroundimg.style.backgroundSize="cover";
		var c=document.createElement("img");
		SdfBackground.__c=c;
		c.addEventListener("load",()=>{
			//SdfToolKit.sleep(1000).then(()=>{
				//console.log(SdfBackground.__c);
				try{
					var t=SdfToolKit.getImageColor(SdfBackground.__c,SdfBackground.__c.width-460,SdfBackground.__c.height-210,210,460);
					for (var ii=0;ii<=2;ii++){
						t[ii]=255-t[ii];
						if (t[ii]>=127){
							t[ii]=SdfToolKit.limitMax(t[ii]+75,255);
						}else{
							t[ii]=SdfToolKit.limitMin(t[ii]-75,0);
						}
					}
					SdfBackground.topTxtColor=[t[0],t[1],t[2]];
					SdfTop.refreshTxt();
					SdfBackground._fadeIn();
				}catch(e){}
			//});
		});
		c.src=url;
	}
	
	static setBackgroundColor(r,g,b){
		SdfBackground._fadeOut();
		SdfDOM.backgroundpicCopyright.innerText="";
		SdfDOM.backgroundimg.style.background=SdfToolKit.rgb2css(r,g,b);
		this.topTxtColor=[255-r,255-g,255-b];
		SdfTop.refreshTxt();
		SdfBackground._fadeIn();
	}
	
	static setBackgroundMode(m){
		switch (m){
			case SdfFlags.BackgroundMode.Top:
				SdfDOM.background.style.filter="";
				SdfDOM.backgroundimg.style.filter="";
				break;
			case SdfFlags.BackgroundMode.Search:
				SdfDOM.background.style.filter="";
				SdfDOM.backgroundimg.style.filter="brightness(0.75)";
				break;
			case SdfFlags.BackgroundMode.SearchIn:
				SdfDOM.background.style.filter="blur(7px)";
				SdfDOM.backgroundimg.style.filter="brightness(0.75)";
				break;
			case SdfFlags.BackgroundMode.Links:
				SdfDOM.background.style.filter="blur(7px)";
				SdfDOM.backgroundimg.style.filter="brightness(0.7)";
				break;
			default:
				break;
		}
	}
	
}

class SdfTop{
	static init(){
		this.__isOn=false;
		SdfDOM.topdiv.addEventListener("mousemove",()=>{SdfTop.__mouseHandle();});
		this.__lastState=SdfFlags.State.Search;
	}
	static __mouseHandle(){
		if (!this.__isOn){return;}
		this.__isOn=false;
		SdfStart.switchState(this.__lastState);
	}
	static refreshTxt(){
		var t=SdfToolKit.rgb2css(SdfBackground.topTxtColor[0],SdfBackground.topTxtColor[1],SdfBackground.topTxtColor[2]);
		SdfDOM.toptime.style.color=t;
		SdfDOM.topdate.style.color=t;
		SdfDOM.backgroundpicCopyright.style.color=t;
	}
	static _fadeIn(){
		SdfDOM.topdiv.style.opacity="1";
		this.__isOn=true;
	}
	static _fadeOut(){
		SdfDOM.topdiv.style.opacity="0";
		this.__isOn=false;
	}
	static registerLastState(s){
		this.__lastState=s;
	}
}

class SdfSearch{
	static init(){
		
	}
}


class SdfTime{
	static init(){
		this.__TdayCover=new Array();
		this.__TdayCover[0]="日";
		this.__TdayCover[1]="一";
		this.__TdayCover[2]="二";
		this.__TdayCover[3]="三";
		this.__TdayCover[4]="四";
		this.__TdayCover[5]="五";
		this.__TdayCover[6]="六";
		
		this.__rfDate();
		setInterval("SdfTime.__rfDate()",1000);
		
	}
	static __TnumCover(val){
		if (val<0){
			return "00";
		}
		if (val<10){
			return "0"+val.toString();
		}
		if (val>=10){
			return val.toString();
		}
	}
	static __rfDate(){
		var date = new Date();
		var Tdate = new Array();
		var Ttime = new Array();
		var Tday=this.__TdayCover[date.getDay()];
		Ttime[1]=this.__TnumCover(date.getHours());
		Ttime[2]=this.__TnumCover(date.getMinutes());
		Ttime[3]=this.__TnumCover(date.getSeconds());
		Tdate[1]=this.__TnumCover(date.getFullYear());
		Tdate[2]=this.__TnumCover(date.getMonth()+1);
		Tdate[3]=this.__TnumCover(date.getDate());
		// Tdate[1] 年, Tdate[2] 月, Tdate[3] 日, 周 Tday,  Ttime[1] : Ttime[2] : Ttime[3]
		SdfDOM.toptime.innerText=SdfToolKit.fillstr("%s:%s",[Ttime[1],Ttime[2]]);
		SdfDOM.topdate.innerText=SdfToolKit.fillstr("%s年%s月%s日, 周%s",[Tdate[1],Tdate[2],Tdate[3],Tday]);
		SdfDOM.searchtime.innerText=SdfToolKit.fillstr("%s年%s月%s日 周%s %s:%s",[Tdate[1],Tdate[2],Tdate[3],Tday,Ttime[1],Ttime[2]]);
	}
}

class SdfToolKit{
	static rgb2css(r,g,b){
		return this.fillstr("rgb(%s,%s,%s)",[r,g,b]);
	}
	static fillstr(str,args){
		var outstr = str;
		for (var i=0;i<args.length;i++){
			outstr=outstr.replace("%s",args[i].toString());
		}
		return outstr;
	}
	static url2css(u){
		return this.fillstr("url('%s')",[u]);
	}
	static sleep(t){
		return new Promise((resolve) => setTimeout(resolve, t));
	}
	static apiCallBackJson(u,cb){
		var xmlHttpRequest;

        if(window.ActiveXObject){
			try{
				xmlHttpRequest= new ActiveXObject("Microsoft.XMLHTTP");
			}catch(s){console.warn("XMLHttpRequest is required.");return;}
        }else if(window.XMLHttpRequest){
			try{
				xmlHttpRequest= new XMLHttpRequest();
			}catch(s){console.warn("XMLHttpRequest is required.");return;}
        }
        xmlHttpRequest.onload = ()=>{ 
			if (xmlHttpRequest.responseText.trim()!="" && xmlHttpRequest.responseText!=null){
				//if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
					cb(JSON.parse(xmlHttpRequest.responseText));
				//}
			}
		};
        xmlHttpRequest.open("GET",u,true);
        xmlHttpRequest.send(null);
	}
	static getImageColor(img,x,y,h,w) {
      var canvas = document.createElement('canvas')
      canvas.width = w;
      canvas.height = h;

      var context = canvas.getContext("2d");
      img.crossOrigin = "Anonymous"
      context.drawImage(img, x, y, canvas.width, canvas.height,0,0,w,h);

      // 获取像素数据
      var data = context.getImageData(0, 0, w, h).data;
      //console.log(data)
      var r = 1,
        g = 1,
        b = 1;
      // 取所有像素的平均值
      for (var row = 0; row < h; row++) {
        for (var col = 0; col < w; col++) {
          // console.log(data[((img.width * row) + col) * 4])
          if (row == 0) {
            r += data[((w * row) + col)];
            g += data[((w * row) + col) + 1];
            b += data[((w * row) + col) + 2];
          } else {
            r += data[((w * row) + col) * 4];
            g += data[((w * row) + col) * 4 + 1];
            b += data[((w * row) + col) * 4 + 2];
          }
        }
      }

      //console.log(r, g, b)
      // 求取平均值
      r /= (w * h);
      g /= (w * h);
      b /= (w * h);

      // 将最终的值取整
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      //console.log(r, g, b)

      return [r, g, b]
    }
	static fetchCache(url,usingf){
		fetch(url, {
			method: "GET",
			mode: "no-cors",
			headers: {
				"Content-Type": "image/jpeg"
			}
		}).then(function(res) {usingf();});
	}
	static limitMax(i,max){
		return (i>max) ? max : i;
	}
	static limitMin(i,min){
		return (i<min) ? min : i;
	}
	static randomNum(s,e){
		return parseInt(Math.random() * (e - s + 1) + s, 10);
	}
	static randomStr(length){
		var t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var o='';
		for (var i=1;i<=length;i++){
			o+=t[SdfToolKit.randomNum(0,t.length-1)];
		}
		return o;
	}
}


class SdfStart{
	static init(){
		this.__state=SdfFlags.State.Startup;
		this.__version=[0,0,1];
		this.__tips="只还是一个不太完善的测试版啦~";
	}
	static main(){
		
		// If we need a serviceWorker later... (keep for backup)
		/*
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('SdfStart/sw.js').then(function(registration) {
				console.log(registration);
			}).catch(function(err) {
				console.log(err);
			});
		}
		*/
		
		this.init();
		
		this._greeting();
		
		this.switchContextMenu(false);
		
		SdfSettings.init();
		SdfBackground.init();
		SdfTop.init();
		SdfTime.init();
		
		this.__state=SdfFlags.State.Search;
		SdfBackground.setBackgroundMode(SdfFlags.BackgroundMode.Search);
		
	}
	static _greeting(){
		var g=  "\n";
		g = g+  "**************** \n";
		g = g+  "*   SdfStart   * \n";
		g = g+  "**************** \n\n";
		g = g+  "#[%s] \n\n";
		g = g+  "#Version: %s.%s.%s \n";
		g = g+  "$请遵守 MIT 开源协议. \n";
		g = g+  "$项目地址: https://github.com/DSFdsfWxp/SdfStart \n";
		g = g+  "$By DSFdsfWxp, made with ❤. \n\n"
		
		g = SdfToolKit.fillstr(g,[this.__tips,this.__version[0].toString(),this.__version[1].toString(),this.__version[2].toString()]);
		
		console.log(g);
	}
	static _cleanState(){
		switch (this.__state){
			case SdfFlags.State.Top:
				SdfTop._fadeOut();
				SdfBackground.setBackgroundMode(SdfFlags.BackgroundMode.Top);
				this.__state=SdfFlags.State.NotSet;
				break;
			case SdfFlags.State.Search:
				
				this.__state=SdfFlags.State.NotSet;
				break;
			case SdfFlags.State.SearchIn:
				
				this.__state=SdfFlags.State.NotSet;
				break;
			case SdfFlags.State.Links:
				
				this.__state=SdfFlags.State.NotSet;
				break;
			default:
				console.warn(SdfToolKit.fillstr("A unexpect state: %s\n    #At: SdfStart->_cleanState()",[s.toString()]));
				break;
		}
	}
	static switchState(s){
		switch (s){
			case SdfFlags.State.Top:
				this._cleanState();
				SdfTop._fadeIn();
				this.__state=s;
				break;
			case SdfFlags.State.Search:
				this._cleanState();
				
				this.__state=s;
				break;
			case SdfFlags.State.SearchIn:
				this._cleanState();
				
				this.__state=s;
				break;
			case SdfFlags.State.Links:
				this._cleanState();
				
				this.__state=s;
				break;
			default:
				console.warn(SdfToolKit.fillstr("A unexpect state: %s\n    #At: SdfStart->switchState(s)",[s.toString()]));
				break;
		}
	}
	static switchContextMenu(o){
		switch (o){
			case true:
				document.oncontextmenu=null;
				break;
			case false:
				document.oncontextmenu=()=>{return false;};
				break;
			default:
				break;
		}
	}
}

SdfStart.main();
