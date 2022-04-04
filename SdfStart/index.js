/*-------
	
# SdfStart
# by: DSFdsfWxp
	
A light start page.
一个轻量起始页.
	
-------*/

const SdfDOM = {
	backgroundimg: document.getElementById("backgroundimg-img"),
	background: document.getElementById("backgroundimg"),
	toptime: document.getElementById("top-time"),
	topdate: document.getElementById("top-date"),
	backgroundpicCopyright: document.getElementById("pic-copyrights")
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
		this.backgroundTxtColor=[255,255,255];
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
				/*
				SdfBackground.__c.LeftY=SdfBackground.__c.height-210;
				SdfBackground.__c.height=210;
				SdfBackground.__c.LeftX=SdfBackground.__c.width-460;
				SdfBackground.__c.width=460;
				*/
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
					SdfBackground.backgroundTxtColor=[t[0],t[1],t[2]];
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
		this.backgroundTxtColor=[255-r,255-g,255-b];
		SdfTop.refreshTxt();
		SdfBackground._fadeIn();
	}
}

class SdfTop{
	static refreshTxt(){
		var t=SdfToolKit.rgb2css(SdfBackground.backgroundTxtColor[0],SdfBackground.backgroundTxtColor[1],SdfBackground.backgroundTxtColor[2]);
		SdfDOM.toptime.style.color=t;
		SdfDOM.topdate.style.color=t;
		SdfDOM.backgroundpicCopyright.style.color=t;
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
}


function SdfStart_Main(){
	/*
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('SdfStart/sw.js').then(function(registration) {
			console.log(registration);
		}).catch(function(err) {
			console.log(err);
		});
	}
	*/
	SdfSettings.init();
	SdfBackground.init();

}

SdfStart_Main();
