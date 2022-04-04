/*-------
	
# SdfStart
# by: DSFdsfWxp
	
A light start page.
一个轻量起始页.
	
-------*/

const SdfDOM = {
	backgroundimg: document.getElementById("backgroundimg-img"),
	background: document.getElementById("backgroundimg")
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
		this.randomPicApi=function(){
			//SdfToolKit.apiCallBackJson("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN",(obj)=>{
				SdfDOM.backgroundimg.style.background=SdfToolKit.url2css("https://api.dujin.org/bing/1920.php");
			//});
		};
		switch (SdfSettings.settingsStorage.background.mode){
			case "Color":
				var t=SdfSettings.settingsStorage.background.color;
				SdfDOM.backgroundimg.style.background=SdfToolKit.rgb2css(t[0],t[1],t[2]);
				break;
			case "UserDefinePic":
				SdfDOM.backgroundimg.style.background=SdfToolKit.url2css(SdfSettings.settingsStorage.background.UserDefinePic);
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
				SdfDOM.backgroundimg.style.background=SdfToolKit.rgb2css(t[0],t[1],t[2]);
				break;
		}
	}
	
	static _fadeIn(){
		SdfDOM.backgroundimg.style.opacity="1";
	}
	
	static _fadeOut(){
		SdfDOM.backgroundimg.style.opacity="0";
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
		return this.fillstr("url(%s)",[u]);
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
        xmlHttpRequest.onreadystatechange = ()=>{ 
					cb(JSON.parse(xmlHttpRequest.responseText));
		};
        xmlHttpRequest.open("POST",u,true);
        xmlHttpRequest.send(null);
	}
}

function SdfStart_Main(){
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('SdfStart/sw.js');
	}
	SdfSettings.init();
	SdfBackground.init();
	SdfToolKit.sleep(250).then(()=>{
		SdfBackground._fadeIn();
	});
}

SdfStart_Main();