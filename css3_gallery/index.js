function g(selector)
{
		var method=selector.substr(0,1)=="."?"getElementsByClassName":"getElementById";
		return document[method](selector.substr(1));
}

function random(range)
{
		var max=Math.max(range[0],range[1]);
		var min=Math.min(range[0],range[1]);
		var diff=max-min;
		var number=Math.ceil(Math.random()*diff+min);
		return number;
}

//输出所有的对象
var data=data;
function addPhotos()
{
		var template=g("#warp").innerHTML.replace(/^\s*/,"").replace(/\s*$/,"");
		var html=[];
		var nav=[];
		
		for(s in data)
		{
			var _html=template.replace("{{index}}",s)
								.replace("{{img}}",data[s].img)
								.replace("{{caption}}",data[s].caption)
								.replace("{{desc}}",data[s].desc);
			html.push(_html);
			nav.push('<span class="i" id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))">&nbsp;</span>');
		}
		html.push('<div class="nav">'+nav.join("")+'</div>');
		g("#warp").innerHTML=html.join("");		
		rsort(random([0,data.length-1]));
}

function range()
{
		var range={
			left:{x:[],y:[]},
			right:{x:[],y:[]}
		}
		var wrap={
			w:g("#warp").clientWidth,
			h:g("#warp").clientHeight
		}
		var photo={
			w:g(".photo")[0].clientWidth,
			h:g(".photo")[0].clientHeight
		}
		range.wrap=wrap;
		range.photo=photo;
		range.left.x=[0-photo.w/4,wrap.w/2-photo.w/2-photo.w];
		range.left.y=[0-photo.h/4,wrap.h-photo.h/4];
		range.right.x=[wrap.w/2+photo.w*1.5,wrap.w-photo.w/4];
		range.right.y=range.left.y;

		return range;
}

function rsort(n)
{
		var _photo=g(".photo");
		var photos=[];
		var navs=g(".i");
		for(i=0;i<_photo.length;i++){
			_photo[i].className=_photo[i].className.replace(/\s*photo_center\s*/," ")
													.replace(/\s*photo_front\s*/," ")
													.replace(/\s*photo_back\s*/," ");

			_photo[i].style["transform"]=_photo[i].style["-webkit-transform"]="rotate(360deg) scale(1.1)";
			
			_photo[i].style.left="";
			_photo[i].style.top="";

			_photo[i].className+=" photo_front";


			navs[i].className=navs[i].className.replace(/\s*i_back\s*/," ");
			navs[i].className=navs[i].className.replace(/\s*i_current\s*/," ");

			photos.push(_photo[i]);
    }
		var rside=range();
		var photo_center=g("#photo_"+n);		
		photo_center.className+=" photo_center";
		photo_center=photos.splice(n,1)[0];
		
    // 1.左右分布效果
    var photos_left=photos.splice(0,Math.ceil(photos.length/2));
		var photos_right=photos;
		for(var s in photos_left)
		{
			var photo=photos_left[s];
			photo.style.left=random(rside.left.x)+"px";
			photo.style.top=random(rside.left.y)+"px";
			photo.style["transform"]=photo.style["-webkit-transform"]="rotate("+random([-150,150])+"deg) scale(1)";	
		}

		for(var s in photos_right)
		{
			var photo=photos_right[s];
			photo.style.left=random(rside.right.x)+"px";
			photo.style.top=random(rside.right.y)+"px";
			photo.style["transform"]=photo.style["-webkit-transform"]="rotate("+random([-150,150])+"deg)  scale(1)";	
		}
		
	  /* 2.环形效果
		for( s in photos){
      var photo = photos[s];
      var ang = random([0,360])
      var avg = ang*2*Math.PI/360;
      var ang = -ang;
      photo.style['transform'] = 'translate('+500*Math.sin(avg)+'px,'+500*Math.cos(avg)+'px) rotate('+ang+'deg) scale(1)';
      // 500 为半径值;
    }
    */
   
		g("#nav_"+n).className+=" i_current";
}

// 翻面控制
function turn(elem)
{
		var cls=elem.className;
		var n=elem.id.split('_')[1];
		if(!/photo_center/.test(cls)){
			rsort(n);
			return;
    }
		
		if(/photo_front/.test(cls)){
			cls=cls.replace(/photo_front/,"photo_back");
			g("#nav_"+n).className+=" i_back";
		}else if(/photo_back/.test(cls)){
			cls=cls.replace(/photo_back/,"photo_front");
			g("#nav_"+n).className=g("#nav_"+n).className.replace(/\s*i_back\s*/," ");
		}
		return elem.className=cls;
}


window.onload = function()
{
	addPhotos();
}