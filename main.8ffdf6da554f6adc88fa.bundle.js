(()=>{"use strict";const t=["../assets/background/1.png","../assets/background/2.png","../assets/background/3.png"];var s,e,i=5;!function(t){t[t.GAME_MENU=1]="GAME_MENU",t[t.GAME_PLAY=2]="GAME_PLAY",t[t.GAME_OVER=3]="GAME_OVER"}(s||(s={}));class a{static add(t,s=0,e=0,i=-1,h=-1){a.imagesString.push(t),a.imagesStat.push([s,e,i,h])}static draw(){for(var t=a.imagesString.length,s=0,e=0;e<t;e++)a.images[e]=new Image,a.images[e].src=a.imagesString[e],a.images[e].onload=function(){++s==t&&a.drawImage()}}static drawImage(){for(var t,s,e=0;e<a.imagesString.length;e++)-1==a.imagesStat[e][2]?null===(t=a.ctx)||void 0===t||t.drawImage(a.images[e],a.imagesStat[e][0],a.imagesStat[e][1]):null===(s=a.ctx)||void 0===s||s.drawImage(a.images[e],a.imagesStat[e][0],a.imagesStat[e][1],a.imagesStat[e][2],a.imagesStat[e][3]);a.imagesString.length=0,a.imagesStat.length=0}}a.canvas=document.getElementById("game"),a.ctx=a.canvas.getContext("2d"),a.imagesString=[],a.imagesStat=[],a.images=new Array;class h{constructor(){this.start()}start(){console.log("TRexJump created"),a.canvas.width=700,a.canvas.height=400,a.canvas.setAttribute("style","margin: auto"),this.tRex=new n,this.sceneNum=0,this.obtacles=new c,this.score=new u,i=5,this.backgroundStt=0,this.state=s.GAME_MENU,a.canvas.addEventListener("keydown",(t=>{switch(t.preventDefault(),t.key,t.code){case"ArrowUp":case"Space":this.tRex.state!=e.FALL&&(this.tRex.state=e.JUMP);break;case"ArrowDown":this.tRex.state!=e.JUMP&&this.tRex.state!=e.FALL||(this.tRex.jumpSize*=3,this.tRex.state=e.FALL)}}),!1),a.canvas.addEventListener("keyup",(t=>{switch(t.preventDefault(),t.key,t.code){case"ArrowUp":case"Space":this.tRex.state==e.JUMP&&(this.tRex.state=e.FALL)}}),!1),a.canvas.addEventListener("mousedown",(t=>{let i=a.canvas.getBoundingClientRect(),h=t.clientX-i.left,r=t.clientY-i.top;this.state==s.GAME_PLAY&&this.tRex.state!=e.FALL&&(this.tRex.state=e.JUMP),this.state!=s.GAME_OVER&&this.state!=s.GAME_MENU||(h-350)*(h-350)+(r-260)*(r-260)<1600&&(this.tRex.start(),this.obtacles.start(),this.score.start(),this.sceneNum=0,this.changeState(s.GAME_PLAY))}),!1),this.backgroundList=[];for(let s=0;s<4;s++){let s=t[Math.floor(Math.random()*t.length)];for(let t=0;t<10;t++)this.backgroundList.push(s)}}update(){let t=this.backgroundList[this.backgroundStt],h=this.backgroundList[(this.backgroundStt+1)%this.backgroundList.length];switch(a.add(t,this.sceneNum,0),this.sceneNum<=a.canvas.width-1e3&&a.add(h,this.sceneNum+1e3,0),this.state){case s.GAME_PLAY:this.sceneNum-=i,this.sceneNum<=-1e3&&(this.sceneNum+=1e3,this.backgroundStt=(this.backgroundStt+1)%this.backgroundList.length),this.tRex.update(),this.score.update(),this.obtacles.update(),this.obtacles.checkCollision(this.tRex)&&this.changeState(s.GAME_OVER);break;case s.GAME_OVER:a.ctx&&(a.ctx.font="bold 50px Cambria",a.ctx.textAlign="center",a.ctx.fillText("GAME OVER",350,150),a.ctx.font="30px Cambria",a.ctx.fillText(`Highscore: ${this.score.maxScore}`,350,200),this.tRex.state=e.DEAD,this.tRex.update(),this.obtacles.update(!0),this.score.update(!0),a.ctx.beginPath(),a.ctx.arc(350,260,40,0,2*Math.PI),a.ctx.stroke(),a.ctx.beginPath(),a.ctx.moveTo(340,240),a.ctx.lineTo(340,280),a.ctx.lineTo(370,260),a.ctx.fill(),this.tRex.update());break;case s.GAME_MENU:a.ctx&&(a.ctx.font="bold 50px Cambria",a.ctx.textAlign="center",a.ctx.fillText("T-Rex Jump",350,150),a.ctx.font="30px Cambria",a.ctx.fillText(`Highscore: ${this.score.maxScore}`,350,200),this.tRex.state=e.IDLE,this.tRex.update(),this.obtacles.update(!0),a.ctx.beginPath(),a.ctx.arc(350,260,40,0,2*Math.PI),a.ctx.stroke(),a.ctx.beginPath(),a.ctx.moveTo(340,240),a.ctx.lineTo(340,280),a.ctx.lineTo(370,260),a.ctx.fill(),this.tRex.update())}a.draw()}changeState(t){this.state=t}}!function(t){t[t.MOVE=1]="MOVE",t[t.JUMP=2]="JUMP",t[t.FALL=3]="FALL",t[t.DEAD=4]="DEAD",t[t.IDLE=5]="IDLE"}(e||(e={}));class r{constructor(t){this.sprites=t,this.stt=0,this.delay=0}getSprite(){return this.stt>=this.sprites.length&&console.log("Error Sprites"),this.sprites[this.stt]}addStt(){return this.delay++,this.delay>10&&(this.stt++,this.delay=0),this.stt%=this.sprites.length,this.stt}}class n{constructor(){this.start()}start(){console.log("TRex created"),this.moveSprite=new r(["../assets/dinosaur-sprites/Run (1).png","../assets/dinosaur-sprites/Run (2).png","../assets/dinosaur-sprites/Run (3).png","../assets/dinosaur-sprites/Run (4).png","../assets/dinosaur-sprites/Run (5).png","../assets/dinosaur-sprites/Run (6).png","../assets/dinosaur-sprites/Run (7).png","../assets/dinosaur-sprites/Run (8).png"]),this.jumpSprite=new r(["../assets/dinosaur-sprites/Jump (1).png","../assets/dinosaur-sprites/Jump (2).png","../assets/dinosaur-sprites/Jump (3).png","../assets/dinosaur-sprites/Jump (4).png","../assets/dinosaur-sprites/Jump (5).png","../assets/dinosaur-sprites/Jump (6).png","../assets/dinosaur-sprites/Jump (7).png","../assets/dinosaur-sprites/Jump (8).png"]),this.fallSprite=new r(["../assets/dinosaur-sprites/Jump (9).png","../assets/dinosaur-sprites/Jump (10).png","../assets/dinosaur-sprites/Jump (11).png","../assets/dinosaur-sprites/Jump (12).png"]),this.deadSprite=new r(["../assets/dinosaur-sprites/Dead (6).png"]),this.idleSprite=new r(["../assets/dinosaur-sprites/Idle (1).png"]),this.xDefault=10,this.yDefault=250,this.jumpSizeDefault=5,this.width=100,this.height=100,this.x=this.xDefault,this.y=this.yDefault,this.jumpSize=this.jumpSizeDefault,this.state=e.MOVE}update(){const t=new Image;let s=this.width,i=this.height,h=this.x,r=this.y;switch(this.state){case e.MOVE:this.jumpSprite.stt=this.fallSprite.stt=0,this.moveSprite.addStt(),t.src=this.moveSprite.getSprite();break;case e.JUMP:this.jumpSize=this.jumpSizeDefault,this.moveSprite.stt=this.fallSprite.stt=0,this.y-=this.jumpSize,this.jumpSprite.stt+1<this.jumpSprite.sprites.length&&this.jumpSprite.addStt(),t.src=this.jumpSprite.getSprite(),this.y<=this.yDefault-30*this.jumpSize&&(this.state=e.FALL);break;case e.FALL:this.jumpSprite.stt=this.moveSprite.stt=0,this.y+=this.jumpSize/2,this.fallSprite.stt+2<this.fallSprite.sprites.length&&this.fallSprite.addStt(),t.src=this.fallSprite.getSprite(),this.y+10*this.jumpSize>=this.yDefault&&(this.fallSprite.stt=this.fallSprite.sprites.length-2),this.y+20*this.jumpSize>=this.yDefault&&(this.fallSprite.stt=this.fallSprite.sprites.length-1),this.y>=this.yDefault&&(this.y=this.yDefault,this.state=e.MOVE,this.fallSprite.stt=0);break;case e.DEAD:this.y=this.yDefault,t.src=this.deadSprite.getSprite(),s=4*s/3,i=2*i/3,r+=this.height-i+10;break;case e.IDLE:this.y=this.yDefault,t.src=this.idleSprite.getSprite()}a.add(t.src,h,r,s,i)}}class c{constructor(){this.start()}start(){this.obtacles=[new p(1e3),new l(1500)]}update(t=!1){let s=0;for(let e=0;e<this.obtacles.length;e++)this.obtacles[e].x<=1210&&this.obtacles[e].render(),t||(this.obtacles[e].x-=i+this.obtacles[e].moveSpeed),this.obtacles[e].x<-this.obtacles[e].width&&s++;if(!t){this.obtacles=this.obtacles.slice(s,this.obtacles.length);for(let t=0;t<s;t++)switch(Math.floor(4*Math.random())){case 0:case 1:this.obtacles.push(new l(this.obtacles[this.obtacles.length-1].x+Math.floor(1e3*Math.random())+500));break;case 2:this.obtacles.push(new p(this.obtacles[this.obtacles.length-1].x+Math.floor(1e3*Math.random())+500));break;default:this.obtacles.push(new p(this.obtacles[this.obtacles.length-1].x+Math.floor(1e3*Math.random())+500,"../assets/fly-dinosaur/2.png"))}}}checkCollision(t){let s,e,i,a,h,r,n,c;s=t.x,e=t.y,i=t.width-20,a=t.height-20;for(let t=0;t<this.obtacles.length;t++)if(h=this.obtacles[t].x,r=this.obtacles[t].y,n=this.obtacles[t].width-10,c=this.obtacles[t].height-10,s+i>=h&&h+n>=s&&e+i>=r&&r+n>=e)return!0;return!1}}class o{constructor(){}render(){const t=new Image;t.src=this.sprite.getSprite();let s=this.width,e=this.height,i=this.y,h=this.x;a.add(t.src,h,i,s,e)}}class l extends o{constructor(t){super(),this.sprite=new r(["../assets/Cactus/Cactus.png"]),this.x=t,this.width=60,this.height=80,this.y=280,this.moveSpeed=0}}class p extends o{constructor(t,s="../assets/fly-dinosaur/1.png"){super(),this.sprite=new r([s]),this.x=t,this.width=80,this.height=50,this.y=150,this.moveSpeed=1}}class u{constructor(){this.maxScore=0,this.start()}start(){this.score=0,this.level=1e3}update(t=!1){t?this.maxScore=this.maxScore>this.score?this.maxScore:this.score:(this.score+=1,this.score>this.level&&(i+=.5,this.level+=1e3)),a.ctx&&(a.ctx.font="30px Cambria",a.ctx.textAlign="start",a.ctx.fillText(this.score.toString(),20,30))}}(new class{constructor(){}update(){this.tRexJump.update(),requestAnimationFrame((()=>this.update()))}start(){this.tRexJump=new h,requestAnimationFrame((()=>this.update()))}}).start()})();