(function(){
	function mix(a,b){
		for(var i in b){
			a[i] = b[i];
		}
		return a;
	}
	function QrcodeScanner(element,options){
		this.element = element;
		this.options = mix({
			width : 300,
			height : 250,
			scanningSrc : 'src/scanning.html?' + (+new Date),
			//识别成功，返回识别结果
			onDecodeSuccess : function(result){},
			//识别失败
			onDecodeError : function(){},
			//初始化失败，返回原因
			onInitError : function(result){}
		},options);
	}
	QrcodeScanner.prototype = {
		init : function(){
			var me = this;
			var options = this.options;
			window.QRCODE_SCAN_CALLBACK = function(flag,result){
				if(flag === 0){
					options.onDecodeError.call(me);
				}else if(flag === 1){
					options.onDecodeSuccess.call(me,result);
				}else if(flag === -1){
					options.onInitError.call(me,result);
				}
			};
			var element = this.element;
			element.setAttribute("style","width:" + options.width + 
				"px;height:" + options.height + "px;border: 1px solid #d2d2d2;background-color: #000;margin:0px auto;");
			element.innerHTML = "<iframe style='width: 100%;height: 100%;' src='" + options.scanningSrc + 
						"' frameborder='0' scrolling='no'></iframe>";
		},
		close : function(){
			this.element.innerHTML = '';
		},
		pause : function(){
			this.element.querySelector("iframe").contentWindow.pauseScan();
		},
		goon : function(){
			this.element.querySelector("iframe").contentWindow.continueScan();
		}
	};
	window.QrcodeScanner = QrcodeScanner;
})();