auto.waitFor();
setScreenMetrics(device.width,device.height);
device.keepScreenDim();
console.setSize(device.width/2,device.width/2);
console.setPosition(device.width/2-100,340);
Log("w"+device.width+"h,"+device.height);
toast('脚本运行起来了');
home();
var ac=null;//当前activity
setInterval(()=>{},1000);
var btnTitle;
var start=true;
var AD_WAIT_TIME=35;//35 头条广告页面每条广告等待时间
const GO_BACK_TT_AD=300;//300 间隔300s返回头条刷广告
const GO_BACK_DY_AD=20*60;// 间隔20分钟返回头条刷广告
const LIGHT_KEY='setLight';
const OPEN_SET_KEY='openSet';
const DATE_KEY='ke_date';
const KILLER_TYPE_KEY='killer_type';

//快手
const KS_SIGN_KEY='ke_ks_sign_date';
const KS_READ_KEY='ke_ks_read1_time'

//快手标准
const KSBZ_SIGN_KEY='ke_ksbz_sign_date';
const KSBZ_READ_KEY='ke_ksbz_read1_time';

//头条
const SLEEP_KEY='ke_sleep_state_date';
const LAUNCH_KEY='ke_launch_tag';
const TT_READ_KEY='ke_tt_read1_time'
const SIGN_KEY='ke_sign_date';

//抖音
const DY_READ_KEY='ke_dy_read1_time'
const DY_HOT_GOOD = 'ke_read_hot_good'
const DY_SIGN_KEY='ke_dy_sign_date';
const LIVETONG = 'ke_like_tong'

//看点
const KD_SIGN_KEY='ke_kd_sign_date';
const KD_READ_KEY='ke_kd_read_total_time'
const KD_DRINK_KEY = 'ke_kd_drink'

var storage=storages.create("toutiao_ke");
var myDate=new Date();
var defultTitle;
var win = null;
var iSLight;
var TYPE=-1;//0:头条 1:快手 2:抖音 3:看点 4:快手标准
var sTotalTime=0;//刷广告总时间

var floClick=false;//悬浮窗按钮点击
var startScript=true;//是否开启脚本
var dLight=0;//当前屏幕亮度

var sleepTime=0;
var ligSensor=null;//广告传感器
var isToday=false;
var lookTime=1;
var reStartApp=false;
var liveAnchor = ['美女']

//抖音
var dyAdWaitTime=0;//抖音广告等待时间
var hadDyhopping=true;//抖音逛街
var hadDyStory=true;//抖音小说
var nowDay=myDate.getDate();//获取今天的日期
var defultDate=storage.get(DATE_KEY,0);//存储的日期
var dyHadSign=storage.get(DY_SIGN_KEY,false);//抖音是否已签到
var dyReadTime=0;//抖音阅读时
var dyReadHotGood=storage.get(DY_HOT_GOOD,true);//边买边赚
var killerType = storage.get(KILLER_TYPE_KEY,-1)
var dyOpenFollow = true;
var dyOpenLike=true;

//头条
var adWaitTime=0;//头条广告等待时间
var hadTTLookAd=true;//头条看广告赚钱
var hadTThopping=true;//头条逛商品
var hadSign=storage.get(SIGN_KEY,false);//头条是否已签到
var ttReadTime=0;//头条阅读时长


//快手
var lookKSShoppint = true;
var lookKSBox = true;
var lookKSLive = true;
var lookKSReward = true;
var ksReadTime=0;//快手阅读时长
var hadKShopping=true;//快手逛街
var ksHadSign=storage.get(KS_SIGN_KEY,false);//快手是否已签到
var hadKSReward=true;//快手悬赏
var hadKSLive = true;//快手看直播
var ksAdWaitTime=0;//快手广告等待时间
var ksOpenLike=true;
var ksOpenFollow = true;


//快手标准
var lookKSBZBox = true;
var lookKSBZLive = true;
var lookKSBZReward = true;
var ksbzReadTime=0;//快手阅读时长
var ksbzHadSign=storage.get(KSBZ_SIGN_KEY,false);//快手是否已签到
var hadKSBZReward=true;//快手悬赏
var hadKSBZLive = true;//快手看直播
var ksbzOpenLike=true;
var ksbzOpenFollow = true;
var hadKSBZhopping = true

//看点
var kdReadTime=0;//阅读时长
var drinkTime = storage.get(KD_DRINK_KEY,-1);//喝水时间
var nowDay=myDate.getDate();//获取今天的日期
var hadkdSign=storage.get(KD_SIGN_KEY,false);//是否已签到
var hadKDReward=true;//悬赏
var scrolling = false;
var kdLikeTime=0;//点赞时间
var bigTurntableTime = 30*60*60;
var hadTurntableTask = true;
var hadBangGameTask = true;
var doubleGold = false;//翻倍领取
var kdAdWaitTime = 0;
var mainT = null;

initData();
startApp(-1);


function initData(){
  storage=storages.create("toutiao_kyo");
  TYPE=-1;//0:头条 1:快手 2:抖音 3:看点
  sTotalTime=0;//刷广告总时间
  floClick=false;//悬浮窗按钮点击
  startScript=true;//是否开启脚本
  dLight=0;//当前屏幕亮度
  ligSensor=null;//广告传感器
  var myDate=new Date();
  nowDay=myDate.getDate();//获取今天的日期
  defultDate=storage.get(DATE_KEY,0);//存储的日期

  //头条
  hadSign=storage.get(SIGN_KEY,false);//头条是否已签到
  ttReadTime=storage.get(TT_READ_KEY,0);//头条阅读时长
  adWaitTime=0;//头条广告等待时间
  hadTThopping=true;

  //抖音
  dyHadSign=storage.get(DY_SIGN_KEY,false);//抖音是否已签到
  dyReadTime=storage.get(DY_READ_KEY,0);//抖音阅读时
  dyReadHotGood=storage.get(DY_HOT_GOOD,true);//边买边赚
  dyAdWaitTime=0;//抖音广告等待时间
  hadDyhopping=true;
  hadDyStory = true;
  dyOpenLike=true;
  var liveArr = '美女@财经@创业'
  if(liveArr.indexOf('@')!=-1){
    liveAnchor = liveArr.split("@");
  }else{
    if(liveArr!=" "&&liveArr!="" && liveArr!=null){
      liveAnchor[0] = liveArr;
    }
  }
  Log("liveAnchor:"+liveAnchor);

  //快手
  ksHadSign=storage.get(KS_SIGN_KEY,false);//快手是否已签到
  ksReadTime=storage.get(KS_READ_KEY,0);//快手阅读时长
  hadKShopping=true;//快手逛街任务
  ksAdWaitTime=0;
  hadKSReward=true;//快手悬赏
  hadKSLive = true;
  ksOpenLike=true;


  //快手标准
  ksbzHadSign=storage.get(KSBZ_SIGN_KEY,false);//快手是否已签到
  ksbzReadTime=storage.get(KSBZ_READ_KEY,0);//快手阅读时长
  hadKSBZhopping=true;//快手逛街任务
  hadKSBZReward=true;//快手悬赏
  hadKSBZLive = true;
  ksbzOpenLike=true;

  //看点
  kdHadSign=storage.get(KD_SIGN_KEY,false);//是否已签到
  kdReadTime=storage.get(KD_READ_KEY,0);//阅读时长
  kdDrinkTime = storage.get(KD_DRINK_KEY,-1);//喝水时间
  kdAdWaitTime=0;

  lookTime=1;
  isToday=false;
  reStartApp=false;
  if(defultDate!=0&&defultDate==nowDay){
    isToday=true;
  }
  //新的一天，要重新查询签到；
  if(!isToday){
    //头条
    storage.put(SLEEP_KEY,"");//睡觉
    storage.put(LAUNCH_KEY,-1);//吃饭
    storage.put(TT_READ_KEY,0);//头条阅读时长
    storage.put(SIGN_KEY,false);//头条是否已签到
    ttReadTime=0;

    storage.put(DY_READ_KEY,0);//抖音阅读时
    storage.put(DY_SIGN_KEY,false);//抖音是否已签到
    storage.put(DY_HOT_GOOD,true);//抖音阅读时
    dyReadTime=0;

    storage.put(KS_SIGN_KEY,false);//快手是否已签到
    storage.put(KS_READ_KEY,0);//快手阅读时长
    ksReadTime=0;

    storage.put(KD_READ_KEY,0);//阅读时长
    storage.put(KD_SIGN_KEY,false);//签到
    storage.put(KD_DRINK_KEY,-1);//喝水时间
    kdReadTime=0;
    reStartApp=false;
  }
  Log('isToday:'+isToday);
  Log('头条阅读累计:'+ttReadTime);
  Log('抖音阅读累计:'+dyReadTime);
  Log('快手阅读累计:'+ksReadTime);
  Log('看点阅读累计:'+kdReadTime);
  storage.put(DATE_KEY,nowDay);
  if(win!=null){
    showTip('数据初始化...');
    ui.run(function(){
      win.start.setText(startScript?"停止运行":"开始运行");
    });
  }
  iSLight=true;
  if(iSLight){
    var set=storage.get(OPEN_SET_KEY,false);
    if(!set){
      openSettingConfig();
    }
    storage.put(OPEN_SET_KEY,true);
    var ll=storage.get(LIGHT_KEY,false);
    Log('自动设置亮度？'+ll);
    if(ll){
      setLight();
    }
  }
}


//启动APP方法
function startApp(type){
  if(win!=null){
    ui.run(function(){
      win.setAdjustEnabled(false)
    })
  }
  switch(type){
    case-1:
      back();
      back();
      back();
      home();
      if(win!=null){
        showTip('返回桌面重启任务');
      }
      Log('启动APP');
      threads.shutDownAll();
      mainT=threads.start(function(){
        if(win!=null){
          win.close();
        }
        win=showFlowin();
        sleep(1500);
        shuakuaishoubiaozhun()
        shuaKuaiShou();
        shuaTouTiao();
        shuaDouYin();
        shuaKanDian();
        reStart()
      });
      break;
    case 100://头条
      Log('TYPE:'+TYPE);
      if(TYPE==0){
        return;
      }
      Log('开始单刷头条');
      back();
      back();
      back();
      home();
      start=false;
      floClick=true;
      threads.shutDownAll()
      var ttT=threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
          shuaTouTiao();
          showTip('单刷头条完毕');
          TYPE=-1;
          wait = false
          reStart();
        },2000);
      });

      break;
    case 200:
      if(TYPE==1){//快手
        return;
      }
      back();
      back();
      back();
      home();
      start=false;
      floClick=true;
      threads.shutDownAll()
      var ksT=threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
          shuaKuaiShou();
          showTip('单刷快手完毕');
          TYPE=-1;
          reStart();
        },2000);
      });
      break;
    case 300:
      if(TYPE==2){
        return;
      }
      back();
      back();
      back();
      home();
      start=false;
      floClick=true;
      threads.shutDownAll()
      var dyT=threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
          shuaDouYin();
          showTip('单刷抖音完毕');
          TYPE=-1;
          reStart();
        },2000);
      });
      break;
    case 400:
      if(TYPE==3){
        return;
      }
      back();
      back();
      back();
      home();
      start=false;
      floClick=true;
      threads.shutDownAll()
      var kdT=threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
          shuaKanDian();
          showTip('单刷看点完毕');
          TYPE=-1;
          reStart();
        },2000);
      });
      break;
    case 500:
      if(TYPE == 4){
          return
      }
      back();
      back();
      back();
      home();
      start=false;
      floClick=true;
      threads.shutDownAll()
      var ksbzT=threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
          shuakuaishoubiaozhun();
          showTip('单刷快手标准完毕');
          TYPE=-1;
          reStart();
        },2000);
      });
  }
}


function reStart(){
  var wait=true;
  while(wait){
    var myDate=new Date();
    var hour=6-myDate.getHours();
    var min=59-myDate.getMinutes();
    if(hour>0){
      showTip('剩余'+hour+"小时"+min+"分重启脚本\n如需停止，请点击关闭脚本");
    }else{
      showTip('剩余'+min+"分钟重启脚本\n如需停止，请点击关闭脚本");
      if(min<=1){
        wait=false;
      }
    }
    sleep(60*1000);
  }
  reStartApp=true;
  Log('主线程reStartApp：：'+reStartApp);
  reStartForOtherDay();
}

function reStartForOtherDay(){
  if(reStartApp){
    if(win!=null){
      showTip('跨天了,脚本重启中,请稍后...');
    }
    storage.put(TT_READ_KEY,0);//头条阅读时长
    storage.put(DY_READ_KEY,0);//抖音阅读时
    storage.put(KS_READ_KEY,0);//快手阅读时长
    storage.put(KD_READ_KEY,0);//快手阅读时长
    storage.put(KSBZ_READ_KEY,0);//快手阅读时长
    ttReadTime = 0;
    ksReadTime = 0;
    dyReadTime = 0;
    kdReadTime = 0;
    ksbzReadTime = 0;
    reStartApp=false;
    back();
    sleep(500);
    back();
    back();
    sleep(1000);
    home();
    sleep(1000);
    initData();
    startApp(-1);
  }
}


//===========================================快手标准START===========================================//
function shuakuaishoubiaozhun(){
  if(!reStartApp){
    toast('操作快手');
    TYPE = 4;
    var app = false
    var appId=getPackageName('快手');
    if(appId != null){
      app = launch(appId);
    }else{
      app = click('快手')
    }
    if(app){
    sTotalTime=0;//快手阅读时长;;
    hadKShopping = true;
    hadKSLive = true;
    ksAdWaitTime=0;
    showTip('启动抖快手标准版,初始化等待...');
    Log('快手累计阅读：'+sTotalTime);
    showTip('查询跳过按钮');
    var jump=checkBtn("跳过",0,0,device.width,device.height/5);
    if(jump!=null){
      btnClick(jump);
    }
    sleep(3000);
    checkAc('首页',0,parseInt(device.height*2/3),device.width/2,device.height,false,'首页');
    var count=0;
    var hadDialog=false;
    while(!hadDialog && count<5){
      showTip('等待'+(5-count)+'s检测是否有弹窗');
      hadDialog = ksbzSign()
      if(!hadDialog){
        var konw=checkBtn('知道了',0,parseInt(device.height/2),device.width,device.height);
        if(konw == null){
          konw=checkBtn('立即领取',0,parseInt(device.height/2),device.width,device.height);
        }
        if(konw!=null){
          btnClick(konw);
          sleep(1000);
          count=5;
        }
      }
      count++;
      sleep(500);
    }
    ac=currentActivity();
    toKSBZTask();
    sleep(3000);
    var hadSign = storage.get(KSBZ_SIGN_KEY,false);
    if(!hadSign){
      showTip('检查签到弹出')
      ksbzSign()
      sleep(2000)
    }
    //1:宝箱广告2:刷悬赏3:逛街4:看直播5:金币翻倍6:提现
    var typeArray=[1,2,3,4];
    startTaskList(typeArray);
    showTip('返回首页刷视频');
    checkAc('关注',0,0,device.width,device.height/4,true,'首页');
    shua();
    sleep(2000);
    stopApp("快手");
    }else{
      showTip('没安装快手标准版');
    }
  }
}

function ksbzSign(){
var tip = checkBtn('立即领取',0,parseInt(device.height/2),device.width,device.height*4/5);
if(tip!=null){
  btnClick(tip);
  sleep(2000);
  storage.put(KSBZ_SIGN_KEY,true);
  tip = null;
  tip = checkBtn('明日继续领现金',0,parseInt(device.height/2),device.width,device.height*4/5);
  if(tip!=null){
    btnClick(tip);
    sleep(2000);
    tip = null;
    tip = checkBtn('允许',device.width/2,device.height*2/3,device.width,device.height);
    if(tip!=null){
      btnClick(tip)
      sleep(2000);
    }
  }else{
    tip = checkBtn('继续做任务赚更多',0,parseInt(device.height/2),device.width,device.height*4/5);
    if(tip!=null){
      btnClick(tip);
      sleep(2000);
    }
  }
  return true;
}else{
  tip = checkBtn('立即签到',0,parseInt(device.height/4),device.width,device.height*3/4);
  if(tip!=null){
    btnClick(tip);
    storage.put(KSBZ_SIGN_KEY,true);
    var count = 0;
    var adBtn = null;
    while(adBtn == null && count<4){
      sleep(1000)
      adBtn = checkBtn('看视频赚',0,parseInt(device.height/3),device.width,device.height*4/5);
      count++
    }
    if(adBtn !=null){
      btnClick(adBtn);
      sleep(2000)
      shuaKuaiShouAdvert();
    }
    return true;
  }
}
return false
}

function shuaBZBox(){
showTip('查询开宝箱得金币任务');
var box=checkBtnAll("立刻领128金币",0,device.width);
if(box == null){
  box=checkBtnAll("立刻领150金币",0,device.width);
}
if(box!=null){
  btnClick(box);
  sleep(5000);
  var lookAdAgain=checkBtnStart("看精彩视频再赚",0,device.height/4,device.width,device.height);
  if(lookAdAgain!=null){
    btnClick(lookAdAgain);
    sleep(1000);
    shuaKuaiShouAdvert();
  }
}
}

function ksbzTaskClick(){
var get=checkByIdAllLR("progress_bar",0,device.width);
if(get == null){
  get=checkByIdAllLR("pendant_bg",0,device.width);
}
if(get == null){
  get=checkByIdAllLR("pendant_mask_bg",0,device.width);
}
if(get!=null){
  btnClick(get);
  showTip('等待页面加载完毕...');
  sleep(3000);
}
  return checkAc("现金收益",device.width/3,0,device.width,device.height/3,false,'任务列表');
}

function toKSBZTask(){
  showTip('去任务页');
  var inTask=ksbzTaskClick();
  if(!inTask){
    showTip('检测失败，重进');
    ksbzSign();
    sleep(1500);
    ksbzTaskClick();
  }
  sleep(1000);
  showTip('页面加载完毕');
}

function checkKSBZDialog(){
var close = checkBtn("知道了",0,device.height/2,device.width,device.height);
if(close == null){
  close = checkBtn("提醒我明日来领",0,device.height/2,device.width,device.height);
}
if(close!=null){
  btnClick(close);
  return true
}else{
  close = checkBtnStart("再看",0,device.height/2,device.width,device.height);
  if(close!=null){
    btnClick(close);
    sleep(2000);
    toKSBZTask()
    return true
  }
}
return false
}


function getKSBZTask(type,isTop){
  checkKSBZDialog();
  switch(type){
    case 1:
      //1:宝箱广告
      shuaBZBox();
      break;
    case 2:
      //刷悬赏
      toTop();
      var taskTop = null;
      let taskCount = 0;
      while(taskTop == null && taskCount<4){
        randomScroll(true,true);
        taskTop = checkBtnAllLR("日常任务",0,device.width*2/3);
        sleep(1000);
        taskCount++;
      }
      showTip('查悬赏任务');
      sleep(1500);
      var rewardArr = ['看视频狂赚金币'];
      shuaReward(rewardArr);
      break;
    case 3:
      //逛街
      shopping(isTop);
      break;
    case 4:
      //看直播
      ksLive("live_follow_text" ,"pendant_status_tv");
      showTip('返回任务页');
      if(checkBtn('看直播领金币',0,0,device.width,device.height/5)!=null) {
        back();
      }
      break;
    case 5:
      //双倍
      // ksDoubleGold();
      break;
    case 6:
      //提现
      // getKSMoney();
      break;
  }
  sleep(2000);
  }
//===========================================快手标准 END===========================================//

//===========================================快看点START===========================================//
function shuaKanDian(){
  if(!reStartApp){
    TYPE = 3;
    refreshData("快看点");
    var app=openApp('快看点');
    if(app){
      sTotalTime=0;//看点阅读时长;
      showTip('启动快点看,初始化等待...');
      sleep(3000);
      click('跳过');
      sleep(2000);
      checkAc('首页',0,parseInt(device.height*4/5),device.width*2/5,device.height,true,'首页');
      //跳转任务页
      showTip('跳转任务页');
      toKDTask();
      ac = currentActivity();
      //签到
      hadkdSign=storage.get(KD_SIGN_KEY,false);
      if(!hadkdSign){
        var share = checkBtn('继续邀请好友赚钱',0,device.height/2,device.width,device.height*2/3);
        if(share!=null){
          back();
        }
        showTip('等待签到弹窗');
        sleep(2000);
        kdSignApp();
      }
      sleep(2000);
      var share = checkBtn('继续邀请好友赚钱',0,device.height/2,device.width,device.height*2/3);
      if(share!=null){
        back();
      }
      //1:开宝箱 2:悬赏 3:喝水赚钱；4:大转盘任务
      //5:红包雨 6:阅读红包
      var tList=[1,2,3,4,5,6,7];
      startTaskList(tList);
      sleep(1000);
      win.setPosition(0,device.height/3);
      var canRead = checkTaskBtn("阅读赚金币",0,device.width/2,'阅读');
      if(canRead){
        var readBtn = checkBtnAllLR('点击翻倍',device.width/2,device.width);
        if(readBtn!=null){
          btnClick(readBtn);
          sleep(1000);
        }
      }
      btnKDIndex();
      showTip('开始刷视频')
      shua();
      stopApp();
    }
  }
}

//阅读福利组合
function giftCombination(){
  var gift=checkBtnAllLR("阅读福利集合",0,device.width*2/3);
  if(gift == null){
    toTop();
    sleep(2000);
  }
  var hadGift = checkTaskBtn('阅读福利集合',0,device.width*2/3,"福利集合");
  if(hadGift){
    var tList=[1,2,3];
    var index=tList.length-1;
    for(var i=index;i>=0;i--){
      var type=random(0,i);
      if(tList[type] == 1){
        kdSignApp();
      }else if(tList[type] == 2){
        showTip('阅读任务中');
        var read = checkBtnAllLR('阅读2分钟',0,device.width);
        if(read!=null){
            var toRead = checkBtnAllLR('去阅读',device.width/2,device.width);
            if(toRead!=null){
              btnKDIndex();
              for (let index = 0; index < 2; index++) {
                adWaitTime = 0;
                while(adWaitTime<125*1000){
                  sleepTime = random(30,40)*1000;
                  scroll();
                }
                adWaitTime = 0;
                sleepTime = 0;
              }
              taskClick();
            }
        }
      }else{
        showTip('看视频领金币任务中');
        var lookVideo = checkBtnAllLR('看视频领金币',0,device.width);
        if(lookVideo!=null){
          var toLook = checkBtnAllLR('去观看',device.width/2,device.width);
          if(toLook){
            btnClick(toLook);
            sleep(2000);
            startKDAd();
          }
        }
      }
      tList.splice(type,1);
    }
  }
  win.setPosition(0,200)
  sleep(1000);
  gesture(300,[device.width/2,parseInt(device.height*2/3)],[device.width/2,parseInt(device.height/3)]);
  sleep(1000);
  var getGold = checkBtnAllLR('领取金币',0,device.width/2);
  if(getGold!=null){
    btnClick(getGold);
    sleep(3000);
    var toLook = checkBtnStart('看视频最高领',0,device.height/3,device.width,device.height*4/5);
    if(toLook!=null){
      btnClick(toLook);
      sleep(2000);
      startKDAd();
    }
  }
  sleep(2000);
}

//银行赚钱
function bandGame(){
  var bandGameBtn=checkBtnAllLR("银行赚金币",0,device.width/2);
  if(bandGameBtn==null){
    toTop();
    sleep(2000);
  }
  var hadBangGame = checkTaskBtn('银行赚金币',0,device.width/2);
  if(hadBangGame){
    bandGameBtn=checkBtnAllLR("银行赚金币",0,device.width/2);
    if(bandGameBtn!=null){
      btnClick(bandGameBtn);
      checkAc('00:00',device.width/2,device.height*3/4,device.width,device.height,false,'银行页面');
      press(945,1605,10);
      sleep(2000);
      var start = checkBtnStart('支付0金币',0,device.height/3,device.width,device.height*3/4);
      if(start!=null){
        btnClick(start);
        sleep(2000);
      }
      if(!hadBangGameTask){
        showTip('无兑换金币次数');
        sleep(2000);
        back();
        return;
      }
      win.setPosition(0,device.height/2);
      sleep(1000);
      press(device.width/8,device.height/4,10);
      sleep(2000);
      var p = checkBtnStart('1000',0,device.height/5,device.width,device.height/2);
      if(p!=null){
        win.setPosition(0,0);
        sleep(1000);
        let moneyBtn = className('android.view.View').indexInParent(6).boundsInside(0,device.height/3,device.width,device.height).findOne(4000);
        let money = 1;
        if(moneyBtn!=null && moneyBtn.text!=null){
          money = parseInt(moneyBtn.text());
        }
        if(money!=NaN && money!=0){
          press(device.width/2,device.height*9/13,10);
          sleep(2000);
          startKDAd();
          checkAc('恭喜获得',0,device.height/3,device.width,device.height*3/4,false,'弹窗');
        }else{
          showTip('无兑换金币次数');
          sleep(2000);
        }
        hadBangGameTask = false;
        back();
      }
    }
  }
}

//大转盘任务
function bigTurntable(){
  if(!hadTurntableTask){
    showTip('大转盘任务做完了');
    sleep(1500);
    return;
  }
  showTip('查询大转盘任务');
  var turntableBtn=checkBtnAllLR("超级大转盘",0,device.width/2);
  if(turntableBtn==null){
    kdTaskClick();
    sleep(2000);
  }
  var hadTurntable = checkTaskBtn("超级大转盘",0,device.width/2,'大转盘');
  if(hadTurntable){
    turntableBtn=checkBtnAllLR("超级大转盘",0,device.width/2);
    if(turntableBtn!=null){
      btnClick(turntableBtn);
      sleep(2000);
      var inTurntable = checkArr(['总金币','幸运大转盘'],0,0,device.width/2,device.height/2,false,'大转盘');
      if(inTurntable){
        win.setPosition(0,200);
        showTip('查询大转盘剩余次数');
        var times = 20;
        var timesBtn = checkBtn('今日剩余',device.width/4,device.height/3,device.width*3/4,device.height);
        if(timesBtn!=null && timesBtn.text!=null){
          var proText = timesBtn.text();
          times = parseInt(proText.substring(proText.length-3));
          Log('大转盘剩余'+times+'次');
          if(times == 0){
            hadTurntableTask = false;
            showTip('大转盘任务做完了');
            sleep(2000);
            return;
          }
          sleep(1000);
        }
        var count = 0;
        while(count<times){
          win.setPosition(0,200);
          sleep(500);
          if( times - count==9 || times - count ==10 ||
             times - count ==4 || times - count ==5){
            sleep(3000);
            click(device.width/2,device.height*3/5);
            sleep(2500);
            var ac = 'com.kuaishou.athena.common.webview.WebViewActivity';
            if(ac != currentActivity().toString()){
              back();
            }
            var inBig = checkAc('总金币',0,0,device.width/2,device.height/2,false,'大转盘');
            if(!inBig){
              inBig = checkAc('幸运大转盘',0,0,device.width,device.height/3,false,'大转盘');
            }
            if(!inBig){
              back();
            }
            sleep(2000);
            var waitBtn = checkBtn('后可继续',0,device.height/2,device.width,device.height);
            if(waitBtn!=null){
              var waitTimeBtn = checkBtnStart('0:',0,device.height/2,device.width,device.height);
              if(waitTimeBtn!=null && waitTimeBtn.text!=null){
                var timeText = waitTimeBtn.text();
                var arr = timeText.split(':');
                if(arr.length >0){
                  bigTurntableTime = getWaitTime(arr);
                  Log('大转盘等待时间没到,等待'+bigTurntableTime+'s');
                }
              }
              count = times+1;
              back();
              sleep(2500);
              return;
            }
          }
          var chou = className('android.view.View').clickable(true).depth(12)
          .boundsInside(device.width/4,device.height/2,device.width,device.height).findOne(3000);
          if(chou!=null){
            showTip('查询到大转盘按钮！！');
            btnClick(chou);
          }else{
            timesBtn = checkBtnStart('今日剩余',device.width/5,device.height/3,device.width*4/5,device.height);
            if(timesBtn!=null){
              var btnArr = getBounds(timesBtn);
              showTip('没有查询到大转盘按钮，二次点击');
              click(device.width/2,btnArr[1]+device.width/4);
            }else{
              showTip('没有查询到大转盘按钮，默认点击');
              click(device.width/2,1653);
            }
          }
          sleep(7000);
          var moreBtn = checkBtn('看视频金币翻倍',0,device.height/3,device.width,device.height*4/5);
          if(moreBtn!=null){
            btnClick(moreBtn);
          }else{
            press(device.width/2,1194,10);
          }
          var inAd = startKDAd();
          if(!inAd){
            checkAc('我的金币',0,0,device.width/2,parseInt(device.height/3),true,'任务');
            count = times;
          }
          sleep(1500);
          count++;
        }
      }
    }
  }else{
    showTip('没查到大转盘任务');
    sleep(1500);
  }
}

//喝水赚钱
function drinkTask(){
  showTip('查询喝水任务');
  drinkTime = storage.get(KD_DRINK_KEY,-1);//喝水时间
  var myDate=new Date();
  var hour=myDate.getHours();
  var min=myDate.getMinutes();
  if(drinkTime == -1 || hour == 7 || hour == 9 ||
     (hour == 11 && min<30)|| (hour == 13 && min<30)||hour == 15
     ||(hour == 17 && min<30)|| hour == 19 || (hour == 20 && min<30)){
    if(drinkTime == hour){
      showTip('当前时间段已执行过喝水任务');
      sleep(1500);
      return;
    }
    storage.put(KD_DRINK_KEY,hour);
    var drinkBtn=checkBtnAllLR("喝水赚金币",device.width/2,device.width);
    if(drinkBtn==null){
      taskClick();
      sleep(2000);
    }
    var hadDrink=checkTaskBtn("喝水赚金币",device.width/2,device.width,'喝水');
    if(hadDrink){
      drinkBtn=checkBtnAllLR("喝水赚金币",device.width/2,device.width);
      if(drinkBtn!=null){
        btnClick(drinkBtn);
        win.setPosition(0,300);
        sleep(2000);
        checkAcById('title-container',device.width*4/5,0,device.width,device.height/4,false,'喝水补贴');
        var share = checkBtnAllLR('邀请好友',device.width/2,device.width);
        if(share!=null){
          showTip('检测点击')
          let arr = getBounds(share);
          press(device.width/2,arr[1]-15,10);
        }else{
          showTip('默认点击')
          click(device.width/2,1713);
        }
        sleep(2500);
        var more = checkBtnStart('再领',0,device.height/2,device.width,device.height*4/5);
        if(more!=null){
          btnClick(more);
          sleep(2000);
          startKDAd();
          back();
          var isTask=checkAc('我的金币',0,0,device.width/2,parseInt(device.height/3),false,'任务');
          if(!isTask){
            back();
          }
        }else{
          back();
        }
        sleep(1500);
      }
    }else{
      showTip('没查到喝水任务');
      sleep(1500);
    }
  }
}

//悬赏任务
function checkReward(){
  showTip('查询悬赏任务');
  var rewardBtn=checkBtnAllLR("金币悬赏任务",0,device.width*2/3);
  if(rewardBtn==null){
    toTop();
    sleep(2000);
  }
  var hadReward=checkTaskBtn("金币悬赏任务",0,device.width*2/3,'悬赏');
  if(hadReward){
    rewardBtn=checkBtnAllLR("金币悬赏任务",0,device.width*2/3);
    if(rewardBtn!=null){
      btnClick(rewardBtn);
      sleep(2000);
      rewardBtn=checkBtnAllLR("金币悬赏任务",0,device.width*2/3);
      if(rewardBtn == null){
        startKDAd();
      }else{
        showTip('悬赏任务时间未到');
        sleep(1000);
      }
    }
  }else{
    showTip('没查到悬赏任务');
    sleep(1500);
  }
}


//查询宝箱广告
function checkTTBox(){
  showTip('查询宝箱广告比较耗时请稍后...')
  var box = className('android.widget.FrameLayout').depth(6).findOne();

  if(box!=null){
    showTip('检测[宝箱]广告入口');
    btnClick(box);
    sleep(5000);
    var lad=checkBtn('观看视频再领',0,device.height/3,device.width,device.height*4/5);
    if(lad == null){
      lad=checkBtn('看视频领',0,device.height/3,device.width,device.height*4/5);
    }
    if(lad!=null){
      btnClick(lad);
      sleep(3000);
      startKDAd();
    }else{
      var close = checkBtnById('close',device.width/3,device.height*2/3,device.width*2/3,device.height*4/5);
      if(close!=null){
        btnClick(close);
      }
    }
  }else{
    showTip('头条宝箱时间没到');
  }
}

function kdSignApp(){
  showTip('查询签到...');
  var doubleSign=checkBtn('立即签到',0,device.height/2,device.width,device.height);
  if(doubleSign == null){
    var tip =checkBtnAllLR('完成今日签到',0,device.width);
    if(tip!=null){
      var toSign = checkBtnAllLR('去完成',device.width/2,device.width);
      if(toSign!=null){
        btnClick(toSign);
        let count = 0;
        doubleSign = null;
        while(doubleSign == null && count <4){
          sleep(1000);
          doubleSign=checkBtn('立即签到',0,device.height/2,device.width,device.height);
          count++;
        }
      }
    }
  }
  if(doubleSign!=null){
    storage.put(KD_SIGN_KEY,true);
    btnClick(doubleSign);
    sleep(2000);
    showTip('查询看广告...');
    var signAgain=checkBtn('看视频再领',0,device.height/2,device.width,device.height);
    if(signAgain!=null){
      storage.put(KD_SIGN_KEY,true);
      btnClick(signAgain);
      showTip('观看签到广告');
      startKDAd();
      sleep(3000);
    }
    checkKDDialog();
  }
  return (doubleSign!=null);
}

//红包雨
function redBagGame(){
  var redBagBtn=checkBtnAllLR("红包雨",device.width/2,device.width);
  if(redBagBtn==null){
    toTop();
    sleep(2000);
  }
  showTip('查询红包雨');
  var hadRedBag=checkTaskBtn("红包雨",device.width/2,device.width,'红包雨');
  if(hadRedBag){
    redBagBtn=checkBtnAllLR("红包雨",device.width/2,device.width);
    if(redBagBtn!=null){
      btnClick(redBagBtn);
      sleep(2000);
      startRedGame();
    }
    checkAc('我的金币',0,0,device.width/2,parseInt(device.height/3),true,'任务');
  }
}

function startRedGame(){
  let inRed = checkAc('活动规则',device.width/2,0,device.width,device.height/2,false,'红包雨');
  if(!inRed){
    inRed = checkAc('超强红包雨',0,0,device.width,device.height/3,false,'红包雨');
  }
  if(inRed){
    let countText = checkBtnStart('今日剩余',0,device.height/2,device.width,device.height);
    var allCount = 10;
    if(countText!=null && countText.text!=null && containsNumber(countText.text())){
      let timesText = countText.text().substring(countText.text().indexOf('余')+2,countText.text().indexOf('次'));
      allCount = parseInt(timesText);
    }
    sleep(2000);
    var count = 0;
    while(count<allCount){
      showTip('查询游戏入口');
      let startBtn = checkBtn('立即开始',0,device.height/2,device.width,device.height);
      if(startBtn!=null){
        btnClick(startBtn);
        var btn = null;
        let waitCount = 0;
        while(btn = null && waitCount<14){
          btn = checkBtn('剩余时间',0,0,device.width/2,device.height/2,false,'游戏页面');
          sleep(500);
          waitCount++;
        }
        win.setPosition(0,device.height*2/3);
        var lStarPre = true;
        var mStarPre = true;
        var rStarPre = true;
        var redL = threads.start(function(){
          var rCount = 1;
          showTip('开始游戏');
          while(lStarPre){
            if(rCount>4){
              rCount = 1;
            }
            press(device.width/3,device.height*rCount/8, 10);
            sleep(100);
            rCount++;
          }
        });
        var redM = threads.start(function(){
          var mCount = 1;
          while(mStarPre){
            if(mCount>4){
              mCount = 1;
            }
            press(device.width*2/3,device.height*mCount/8, 10);
            sleep(100);
            mCount++;
          }
        });
        var redR = threads.start(function(){
          var rCount = 1;
          while(rStarPre){
            if(rCount>4){
              rCount = 1;
            }
            press(device.width-10,device.height*rCount/8, 10);
            sleep(100);
            rCount++;
          }
        });
        var adbtn = null;
        let checkAdCount = 0;
        while((adbtn == null && checkAdCount <34)){
          if(checkAdCount == 5){
            redAc = currentActivity();
            Log('记录页面redAc：'+redAc);
          }
          if(checkAdCount%2==0){
            showTip('游戏时长'+(checkAdCount/2+1)+'s');
          }
          adbtn = checkBtn('观看视频领金币',device.width/5,device.height/2,device.width,device.height);
          sleep(500);
          checkAdCount++;
        }

        lStarPre = false;
        mStarPre = false;
        rStarPre = false;
        redL.interrupt();
        redM.interrupt();
        redR.interrupt();

        if(adbtn!=null){
          win.setPosition(0,200);
          sleep(1000);
          btnClick(adbtn);
          startKDAd();
          var againRed = null;
          let checkAgainCount = 0;
          win.setPosition(0,200);
          sleep(1000);
          while((againRed == null && checkAgainCount <17)){
            showTip('检测红包页面'+(checkAgainCount+1)+'次');
            againRed = checkBtnEnd('活动规则',device.width/2,0,device.width,device.height/2);
            sleep(1000);
            checkAgainCount++;
          }
          if(againRed!=null){
            count++;
          }else{
            count = allCount+1;
            showTip('红包按钮检测不在，返回任务页')
            var isTask=checkAc('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height,true,'首页');
            while(!isTask){
              isTask = checkAc('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height,true,'首页');
            }
            showTip('跳转任务页');
            toKDTask();
          }
        }else{
          count = allCount+1;
          showTip('红包页面检测不在，返回任务页')
          var isTask=checkAc('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height,true,'首页');
          while(!isTask){
            isTask = checkAc('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height,true,'首页');
          }
          showTip('跳转任务页');
          toKDTask();
        }
      }else{
        count = allCount+1;
      }
    }
  }
}

//自动刷广告
function startKDAd(){
  showTip('检测是否进入广告页面');
  win.setPosition(0,device.height/3);
   var adAc='com.kwai.ad.biz.award.AwardVideoPlayActivity';
  sleep(1500);
  var inAd=checkAc('领取奖励',0,0,device.width*2/3,device.height/4,false,'广告');
  if(!inAd){
    inAd = (currentActivity()==adAc);
  }
  if(inAd){
    var count=random(25,29);
    win.setPosition(0,200);
    isAD=id('video_countdown').findOne(3000);
    if(isAD!=null && isAD.text!=null){
      if(containsNumber(isAD.text())){
        count =parseInt(isAD.text().toString(),10)+random(1,3);
        showTip('广告剩余时间'+count+'s');
      }else{
        Log('没有检查到时间');
      }
    }
    var startAd=true;
    while(startAd){
      sleep(1000);
      if(count< 1){
        var reject = checkBtnStart('拒绝',0,device.height*3/4,device.width/2,device.height);
        if(reject!=null){
          btnClick(reject);
          sleep(2000);
        }
        var closeBtn = checkBtnById('video_close_icon',0,0,device.width/3,device.height/4);
        if(closeBtn!=null){
          btnClick(closeBtn);
        }else{
          showTip('没检测到关闭按钮，默认点击');
          press(90,90,10);
        }
        sleep(2000);
        showTip('查询是否在看广告');
        var lookAgain = getKDAdBtn();
        if(lookAgain == null){
          closeBtn = checkBtnById('video_close_icon',0,0,device.width/3,device.height/4);
          if(closeBtn!=null){
            btnClick(closeBtn);
            sleep(2000);
            lookAgain = getKDAdBtn();
          }
        }
        if(lookAgain != null){
          btnClick(lookAgain);
          sleep(3000);
          var goBack=checkBtn('知道了',0,device.height/2,device.width/2,device.height*3/4);
          if(goBack!=null){
            btnClick(goBack);
            sleep(3000);
            showTip('退出广告页了');
            startAd=false;
          }else{
            isAD=checkBtn('后可领取奖励',0,0,device.width/2,device.height/4);
            if(isAD!=null && isAD.text!=null && containsNumber(isAD.text())){
              count =parseInt(isAD.text().toString(),10)+random(1,3);
              showTip('广告剩余时间'+count+'s');
            }else{
              count = random(25,29);
              Log('没有检查到时间');
            }
          }
        }else{
          showTip('不在广告页了');
          startAd=false;
        }
      }else{
        count--;
        ui.run(function(){
          showTip("当前广告等待"+count+"s");
        });
      }
    }
    return true;
  }else{
    showTip('不在广告页');
    sleep(1500);
    return false;
  }
}

function getKDAdBtn(){
  let lookAgain = null;
  let count = 1;
  while(lookAgain == null && count<4){
    showTip('第'+count+"次检测下一个看广告")
    lookAgain = checkBtnEnd('再看一个',0,device.height/3,device.width,device.height);
    if(lookAgain == null){
      lookAgain=checkBtnEnd('继续观看',0,device.height/3,device.width,device.height);
      AD_WAIT_TIME=random(5,10);
    }else{
      AD_WAIT_TIME=random(23,26);
    }
    count++;
    sleep(1000);
  }
  return lookAgain;
}

function getKDTask(type,isTop){
  //1:开宝箱 2:悬赏 3:喝水赚钱；4:大转盘任务 5:红包雨
  switch(type){
    case 1:
      checkTTBox();
      break;
    case 2:
      checkReward();
      break;
    case 3:
      drinkTask();
      break;
    case 4:
      bigTurntable();
      back();
      sleep(2000);
      break;
    case 5:
      redBagGame();
      break;
    case 6:
      bandGame();
      break;
    case 7:
      giftCombination()
      break;
  }
  checkKDDialog();
}

function checkKDDialog(){
  showTip('检测是否有弹窗');
  sleep(2500);
  var close = checkBtnById('close',device.width/3,device.height*2/3,device.width*2/3,device.height);
  if(close == null){
    close = className('android.view.View').clickable(true).depth(8).findOne(3000);
  }
  if(close !=null){
    btnClick(close);
  }else{
    btn = checkBtnStart('提醒我拿赏金',0,device.height/2,device.width,device.height);
    if(btn == null){
      checkBtnStart('再赚',0,device.height/2,device.width,device.height);
    }
    if(btn!=null){
      btnClick(btn);
      sleep(2000);
      back();
      var isTask=checkAc('我的金币',0,0,device.width/2,parseInt(device.height/3),false,'任务');
      if(!isTask){
        back();
        sleep(2000);
      }
    }
  }
}

function kdTaskClick(){

  var task=checkBtnByIdWithLimt('normal_icon_wrapper',device.width*4/5,parseInt(device.height*4/5)
                                ,device.width,device.height,device.width*9/10);
  if(task!=null){
    btnClick(task);
    sleep(2000);
  }else{
    var entern=checkBtn('首页',0,parseInt(device.height*4/5),device.width*2/5,device.height);
    if(entern!=null){
      var arr=getBounds(entern);
      click(device.width*9/10,arr[1]);
    }else{
      click('福利');
    }
  }
}

function btnKDIndex(){
  Log('查询视频列表按钮');
  var entern=checkBtnByIdWithLimt('tab_icon_container',0,parseInt(device.height*4/5)
                                  ,device.width,device.height,device.width*3/10);
  if(entern==null){
    Log('视频按钮ID没找到');
    entern=checkBtn('视频',0,parseInt(device.height*4/5),device.width*2/5,device.height);
  }
  if(entern!=null){
    btnClick(entern);
  }else{
    Log('默认点击视频列表');
    click('视频');
  }
}
function toKDTask(){
  kdTaskClick();
  var isTask=checkAc('我的金币',0,0,device.width/2,parseInt(device.height/3),false,'任务');
  if(!isTask && !kdSignApp()){
    showTip('去任务页被卡，最后重来1次');
    back();
    sleep(1500);
    kdTaskClick();
    checkAc('我的金币',0,0,device.width/2,device.height/3,false,'任务');
  }
  showTip('进入了任务页');
}

//===========================================快看点END===========================================//

//=======================================头条START=======================================

function shuaTouTiao(){
  if(!reStartApp){
    toast('操作头条极速版');
    refreshData("头条");
    TYPE = 0;
    var app=openApp('今日头条极速版');
    if(app){
      sTotalTime=0;//头条阅读时长;
      Log('头条累计阅读：'+sTotalTime);
      showTip('启动头条极速版,初始化等待...');
      sleep(3000);
      click('跳过广告');
      sleep(2000);
      var count=0;
      var close = null;
      while(close == null && count<5){
        showTip('等待'+(5-count)+'s检测是否有弹窗');
        close = checkBtnById('a3g',0,device.height/2,device.width,device.height);
        if(close == null){
          close = checkBtnById('lw',device.width/2,device.height/6,device.width,device.height*2/3);
        }
        if(close!=null){
          btnClick(close);
        }
        sleep(1000);
        count++;
      }
      checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
      //跳转任务页
      toTTTask();
      sleep(3000)
      //签到
      hadSign=storage.get(SIGN_KEY,false);//头条是否已签到
      if(!hadSign){
        showTip('等待签到弹窗');
        sleep(4000);
        ttSignApp();
      }
      var buqian=checkBtn('立即补签',device.width/5,device.height/2,
                          device.width,parseInt(device.height*3/4));
      if(buqian!=null){
        btnClikc(buqian);
      }
      //1:领取吃饭补贴 2:领取睡觉补贴 3:看广告赚钱
      //4:逛商品 5:宝箱广告任务 6:去赚钱任务
      var tList=[1,2,3,4,5,6,7];
      startTaskList(tList);
      sleep(1000);
      win.setPosition(0,device.height/3);
      if(true){//
        toTop();
        showTip('检测新人翻倍阅读奖励');
        win.setPosition(0,200);
        sleep(2000)
        var moreLook;
        for(var i=0;i<10;i++){
          moreLook=checkBtnAllLR('点击翻',device.width/2,device.width);
          if(moreLook!=null && adjustPos(moreLook,"翻倍奖励")){
            break;
          }else{
            let lookAd=checkBtnAllLR('翻倍中',0,device.width*2/3);
            if(lookAd!=null&& adjustPos(lookAd,"翻倍奖励")){
              break
            }
            gesture(300,[parseInt(device.width/6),device.height*2/3],
                    [parseInt(device.width/6),device.height/5]);
            sleep(1000);
            var bottom = checkBtnStart('如有疑问请参考',0,device.height/2,device.width,device.height);
            if(bottom!=null){
              break
            }
          }
        }
        if(moreLook!=null){
          showTip('领取阅读翻倍');
          btnClick(moreLook);
          sleep(1500);
          var noTip=checkBtn('不再提示',0,device.height/2,device.width,device.height*3/4);
          if(noTip!=null){
            btnClick(noTip);
            sleep(1000);
          }
        }
      }
      showTip('返回首页');
      btnTTIndex();
      sleep(1000);
      shua();
      sleep(2000);
      stopApp('今日头条极速版');
    }else{
      showTip('没安装今日头条极速版');
    }
  }
}


//签到功能
function ttSignApp(){
  sleep(4000);
  showTip('查询签到翻倍领取...');
  var doubleSign=checkBtn('翻倍领取',0,device.height/2,device.width,device.height);
  if(doubleSign!=null){
    storage.put(SIGN_KEY,true);
    btnClick(doubleSign);
    showTip('观看签到广告');
    startTTAd();
  }else{
    showTip('查询签到额外再领...');
    var signAgain=checkBtn('额外再领',0,device.height/2,device.width,device.height);
    if(signAgain!=null){
      storage.put(SIGN_KEY,true);
      btnClick(signAgain);
      showTip('观看签到广告');
      startTTAd();
    }else{
      showTip('查询签到点击领取...');
      var sign=checkBtn('点击领取',0,device.height/2,device.width,device.height);
      if(sign!=null){
        storage.put(SIGN_KEY,true);
        btnClick(sign);
        sleep(2000);
      }
    }
  }
}


//头条逛商品
function ttShopping(isTop){
  if(!hadTThopping){
    showTip('今日逛商品任务做完了');
    sleep(1500);
    return;
  }
  var shopping = checkBtnAllLR('逛商品赚金币',0,device.width*2/3);
  if(shopping == null){
    toTop();
    sleep(1000);
    showTip('查询[更多任务]按钮');
    var moreTask = null;
    for(var i=0;i<6;i++){
      showTip('查询[更多任务]按钮');
      gesture(300,[parseInt(device.width/6),device.height*2/3],
      [parseInt(device.width/6),device.height/4]);
      sleep(1000);
      shopping = checkBtnAllLR('逛商品赚金币',0,device.width*2/3);
      if(shopping!=null){
        break;
      }else{
        var bottom = checkBtnStart('如有疑问请参考',0,device.height/2,device.width,device.height);
        if(bottom!=null){
          moreTask=checkBtnAllLR('更多任务',device.width/4,device.width*4/5);
          break;
        }
      }
    }
    if(moreTask!=null){
      btnClick(moreTask);
      sleep(1000);
    }
  }
  var hadShopping = checkTaskBtn("逛商品赚金币",0,device.width*2/3,"逛街",'如有疑问请参考');
  if(hadShopping){
    shopping = checkBtnAllLR('逛商品赚金币',0,device.width*2/3);
    showTip('检测逛商品次数');
    if(checkBtnAll('3/3次')!=null){
      hadTThopping=false;
      showTip('逛商品任务做完了');
      return;
    }
    showTip('检测是否开启逛商品');
    btnClick(shopping);
    sleep(1000);
    shopping=checkBtnAllLR('逛商品赚金币',0,device.width*2/3);
    if(shopping==null){
      var time=0;
      var waitTime=random(33,40);
      while(time<waitTime*1000){
        showTip('逛商品开始,当前剩余：'+(waitTime-(time/1000))+'s');
        var w=random(parseInt(device.width*2/3),parseInt(device.width*4/5));
        var sH=random(parseInt(device.height*4/5),parseInt(device.height*2/3));
        var eH=random(parseInt(device.height/5),parseInt(device.height/6));
        gesture(random(2,5)*100,[w,sH],[w,eH]);
        var ranTime=parseInt(random(2,5))*1000;
        time=time+ranTime;
        sleep(ranTime);
      }
      back();
      sleep(1500);
    }else{
      if(checkBtnAll('3/3次')!=null){
        hadTThopping=false;
        showTip('逛商品任务做完了');
      }else{
        showTip('逛商品任务还没到时间');
      }
      sleep(1500);
    }
  }

}

//去赚钱任务
function lookForMoney(isTop){
  if(true){//新人去赚钱
    showTip('查询[看任意内容]比较耗时..请稍后');
    var lookAd=checkBtnAllLR('看任意内容赚钱',0,device.width*2/3);
    if(lookAd==null){
      lookAd=checkBtnAllLR('继续看',device.width/2,device.width);
    }

    var hadTask = false;
    if(lookAd ==null){
      toTop();
      sleep(1000);
      showTip('查询[看任意内容]比较耗时..请稍后');
      for(var i=0;i<10;i++){
        lookAd=checkBtnAllLR('看任意内容赚钱',0,device.width*2/3);
        if(lookAd==null){
          lookAd=checkBtnAllLR('继续看',device.width/2,device.width);
        }
        if(lookAd!=null && adjustPos(lookAd,'看任意内容赚钱')){
          hadTask=true;
          break;
        }else{
          lookAd=checkBtnAllLR('翻倍中',0,device.width*2/3);
          if(lookAd!=null){
            break
          }
          gesture(300,[parseInt(device.width*5/6),device.height*2/3],
                  [parseInt(device.width*5/6),device.height/3]);
          sleep(1000);
          var bottom = checkBtnStart('如有疑问请参考',0,device.height/2,device.width,device.height);
          if(bottom!=null){
            break
          }
        }
      }
    }else{
      hadTask=true;
    }

    if(hadTask){
      adjustPos(lookAd,'去赚钱');
      showTip('查询[去赚钱]按钮');
      var getMoney=checkBtn('去赚钱',0,device.height/5,device.width,device.height*3/4);
      if(getMoney==null){
        getMoney=checkBtn('继续看',0,device.height/3,device.width,device.height*3/4);
      }
      if(getMoney!=null){
        var hArr=getBounds(getMoney);
        var hadGod=textContains('已得')
        .boundsInside(0,hArr[1],device.width,hArr[1]+300).find();
        var progress=hadGod.length;
        showTip('查询进度：'+progress);
        if(progress>3){
          progress=progress/2;
        }
        if(progress>=3){
          showTip('看去赚钱进度已满');
        }else{
          if(progress<3){
            startLookForMon(progress);
          }
        }
      }
    }else{
      showTip('没有[去赚钱]任务');
    }
  }
}

function startLookForMon(progress){
  btnTTIndex();
  sleep(2000);
  showTip('开始播放视频任务');
  win.setPosition(0,device.height/3);
  var video=checkBtn('首页',0,device.height*3/4,device.width/2,device.height);
  if(video!=null){
    btnClick(video);
    var time=0;
    if(parseInt(progress)==1){
      showTip('看文章已经满足1个进度,再看8分钟');
      time=60;
    }else if(parseInt(progress)==2){
      showTip('看文章已经满足2个进度,再看5分钟');
      time=4*60;
    }
    sleep(1000);
    lookVideo(time);
  }
}


function lookVideo(time){
  win.setPosition(0,device.height/3+100);
  var video=checkBtnStart('视频',0,device.height*4/5,device.width*3/5,device.height);
  if(video!=null){
    btnClick(video);
    showTip("等待影视列表刷新...\n如果播放失败，请手动播放第一个视频");
    sleep(6000);
    for(var i=0;i<2;i++){
      showTip('播放视频');
      let startBtn = checkByIdAllLR('lk',device.width*2/5,device.width*4/5);
      adjustPos(startBtn,'播放按钮');
      sleep(2000);
      startBtn = checkBtnById('lk',device.width*2/5,device.height/4, device.width*4/5,device.height*4/5);
      if(startBtn!=null){
        showTip('id点击');
        btnClick(startBtn);
      }else{
        showTip('默认点击');
        win.setPosition(0,device.height/2);
        sleep(1000);
        click(device.width/2,device.height*3/10);
      }
      var sleepTime=random(2,4)*60+random(10,30);
      time=time+sleepTime;
      while(sleepTime>=0){
        sleep(1000);
        showTip('视频播放倒计时'+sleepTime+'s');
        sleepTime--;
      }
      gesture(500,[device.width*5/6,parseInt(device.height*2/3)],
              [device.width*5/6,parseInt(device.height/4)]);
      sleep(1000);
    }
    if(time>9.5*60){
      showTip('去赚钱任务完毕');
    }else{
      showTip('观看视频总时长'+time+'s');
      gesture(500,[device.width*5/6,parseInt(device.height*2/3)],
              [device.width*5/6,parseInt(device.height/4)]);
      lookVideo(time);
    }
  }
}


//看广告赚钱
function lookAdress(isTop){
  if(!hadTTLookAd){
    showTip('广告赚金币 任务做完了');
    return;
  }
  showTip('查询[看广告赚金币]任务');
  var lookAd = checkBtnAllLR("看广告赚金币",0,device.width*2/3);
  if(lookAd == null){
    toTop();
  }
  var hadAd=checkTaskBtn("看广告赚金币",0,device.width*2/3,"看广告赚金币");
  if(hadAd){
    lookAd=checkBtnAllLR("看广告赚金币",0,device.width*2/3);
    if(lookAd!=null){
      btnClick(lookAd);
      startTTAd();
    }else{
      hadTTLookAd=false;
      showTip('没查到看广告赚金币任务');
    }
  }
}


//睡觉赚钱
function getSleepGold(isTop){
  var d=new Date();
  var hour=d.getHours();
  var ss=storage.get(SLEEP_KEY,"");
  Log('睡觉按钮状态：'+ss);
  if((hour>=20&&hour<=24)||(hour>=0&&hour<=2)){
    if(ss==""||ss=="morning"){
      showTip('查询睡觉补贴');
      var sleepBtn=checkBtnAll("睡觉赚钱");
      if(sleepBtn == null){
        taskClick();
        sleep(2000);
      }
      var hadSleep = checkTaskBtn("睡觉赚钱",0,device.width,"睡觉赚钱");
      if(hadSleep){
        sleepBtn=checkBtnAll("睡觉赚钱");
        if(sleepBtn!=null){
          btnClick(sleepBtn);
          sleep(3000);
          var toSleep=checkBtn("我要睡了",0,device.height*3/4,device.width,device.height);
          if(toSleep!=null){
            btnClick(toSleep);
          }else{
            click(device.width/2,parseInt(device.height*9/10));
          }
          storage.put(SLEEP_KEY,"night");
          sleep(1000);
          back();
        }
      }else{
        showTip('没找到睡觉任务');
        sleep(2000);
      }
    }else{
      showTip('已领睡觉任务');
      sleep(1000);
    }
  }else if(hour>=7){
    if(ss==""||ss=="night"){
      var sleepBtn=checkBtnAll("睡觉赚钱");
      if(sleepBtn == null){
        taskClick();
        sleep(2000);
      }
      var hadSleep = checkTaskBtn("睡觉赚钱",0,device.width,"睡觉赚钱");
      if(hadSleep){
        showTip('查询睡觉补贴');
        sleepBtn=checkBtnAll("睡觉赚钱");
        if(sleepBtn!=null){
          btnClick(sleepBtn);
          sleep(2500);
          win.setPosition(0,device.height/3);
          checkAc("我睡醒了",0,device.height*3/4,device.width,device.height,false,'睡觉补贴');
          var up=checkBtn("我睡醒了",0,device.height*3/4,device.width,device.height);
          if(up==null){
            up=checkBtn("可领取",0,device.height/3,device.width,device.height*4/5);
          }
          if(up!=null){
            btnClick(up);
          }else{
            click(device.width/2,parseInt(device.height*9/10));
          }
          storage.put(SLEEP_KEY,"morning");
          sleep(1000);
          var get=checkBtn("领取",0,device.height/4,device.width,device.height);
          if(get!=null){
            btnClick(get);
            sleep(4000);
            var lad=checkBtn("看视频再领",0,device.height/4,device.width,device.height);
            if(lad!=null){
              btnClick(lad);
              Log('刷睡觉广告');
              startTTAd();
            }else{
              Log('没有睡觉广告');
            }
          }
          back();
          sleep(1000);
        }
      }else{
        showTip('没找到睡觉任务');
        sleep(2000);
      }
    }else{
      showTip('已领睡觉补贴');
    }
  }
}

//领取吃饭补贴
function getLunchGold(isTop){
  var d=new Date();
  var hour=d.getHours();
  if((hour>=21&&hour<24)||(hour>=5&&hour<9)
     ||(hour>=11&&hour<14)||(hour>=17&&hour<20)){
    showTip('查询吃饭补贴');
    var get=checkBtnAll("吃饭补贴");
    if(get == null){
      taskClick();
      sleep(2000);
    }
    var hadLunch = checkTaskBtn("吃饭补贴",0,device.width,"吃饭补贴");
    if(hadLunch){
      get=checkBtnAll("吃饭补贴");
      if(get!=null){
        btnClick(get);
        sleep(3000);
        win.setPosition(0,200);
        Log('领取补贴金币:');
        click(device.width/2,parseInt(device.height*22/25));
        sleep(4000);
        showTip('查吃饭广告');
        var lad=checkBtn('看视频再领',0,device.height/3,device.width,device.height*4/5);
        if(lad!=null){
          btnClick(lad);
          startTTAd();
        }
        back();
        sleep(1500);
      }
    }
  }
}

//头条提现
function getTTMoney(){
  showTip('提现')
  taskClick()
  win.setPosition(0,device.height/3);
  sleep(4000);
  press(device.width/10,device.height/8,10);
  var inMon = checkAc("我的收益",device.width/5,0,device.width*4/5,device.height/5,false,"提现");
  if(inMon!=null){
    var getMon = checkBtn('去提现',device.width/2,0,device.width,device.height/3);
    if(getMon!=null){
      btnClick(getMon);
      sleep(2000)
      inMon = checkAc("提现记录",device.width/2,0,device.width,device.height/5,false,"提现");
      if(inMon){
        getMon = checkBtnAllLR('0.5元',0,device.width);
        if(getMon!=null){
          btnClick(getMon);
          inMon = checkAc("立即提现",0,device.height*4/5,device.width,device.height,false,"提现");
          if(inMon){
            getMon = checkBtn("立即提现",0,device.height*4/5,device.width,device.height);
            if(getMon!=null){
              btnClick(getMon);
            }
          }
        }
      }
    }
  }
  checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
}

//查询宝箱广告
function checkTTBox(){
  showTip('查询头条宝箱广告比较耗时请稍后...')
  var box= null;
  var myDate = new Date();
  if(myDate.getMonth()+1 == 2 && myDate.getDate()<20){
    box = checkBtn('冰雪季分百亿金币',device.width/2,device.height/3,device.width,device.height);
    if(box==null){
      box=checkBtnAll('冰雪季分百亿金币');
    }
  }else{
    box = checkBtn('开宝箱得金币',device.width/2,device.height/3,device.width,device.height);
  }
  if(box==null){
    box=checkBtnAll('开宝箱得金币');
  }
  if(box!=null){
    showTip('检测['+box.text()+']广告入口');
    btnClick(box);
    sleep(4000);
    var lad=checkBtn('看完视频再领',0,device.height/3,device.width,device.height*4/5);
    if(lad!=null){
      btnClick(lad);
      sleep(3000);
      var adAc='com.ss.android.excitingvideo.ExcitingVideoActivity';
      if(currentActivity().toString()==adAc){
        Log('刷宝箱广告');
        startTTAd();
      }
    }
  }else{
    showTip('头条宝箱时间没到');
  }
}

//自动刷广告
function startTTAd(){
  showTip('检测是否进入广告页面');
  sleep(3000);
  AD_WAIT_TIME=random(25,29);
  var isAD =checkBtn('可领取奖励',device.width/3,0,device.width,device.height/4);
  if(isAD == null){
    isAD=checkBtn('可领金币',device.width/3,0,device.width,device.height/4);
  }
  var adAc='com.ss.android.excitingvideo.ExcitingVideoActivity';
  var inAd=false;
  if(isAD!=null||currentActivity().toString()==adAc){
    inAd=true;
  }
  if(inAd){
    var count=parseInt(AD_WAIT_TIME);
    win.setPosition(0,200);
    isAD=className('com.lynx.tasm.behavior.ui.text.UIText').indexInParent(17)
      .boundsInside(0,0,device.width,device.height/5).findOne(3000);
    if(isAD!=null && isAD.text!=null && containsNumber(isAD.text())){
      Log('查询时间按钮：：'+isAD);
      Log('时间text：：'+isAD.text());
      count =parseInt(isAD.text().toString(),10)+random(2,4);
      Log('广告检测剩余时间'+count+'s');
    }else{
      Log('广告默认时间'+count);
    }
    var go;//继续观看广告按钮；
    var startAd=true;
    var checkNo = true;
    while(startAd){
      sleep(1000);
      if(count< 1){
        back();
        sleep(1500);
        showTip('查询是否在看广告');
        var index=checkBtn('任务',device.width/5,parseInt(device.height*4/5),device.width*4/5,device.height);
        if(index!=null){
          showTip('不在广告页——返回首页了');
          startAd=false;
        }else{
          var lookAgain = getTTAdBtn();
          if(lookAgain == null){
            var index=checkBtn('任务',device.width/5,parseInt(device.height*4/5),device.width*4/5,device.height);
            if(index == null){
              //不在首页,检测是否有别的弹窗
              back();
              sleep(2000);
              lookAgain = getTTAdBtn();
            }
          }
          if(lookAgain!=null){
            btnClick(lookAgain);
            sleep(2500);
            var isAD=className('com.lynx.tasm.behavior.ui.text.UIText').indexInParent(17)
            .boundsInside(0,0,device.width,device.height/5).findOne(3000);
            if(isAD!=null && isAD.text!=null && containsNumber(isAD.text())){
              Log('查询时间按钮：：'+isAD);
              Log('时间text：：'+isAD.text());
              count =parseInt(isAD.text().toString(),10)+random(1,4);
              Log('广告检测剩余时间'+count+'s');
            }else{
              count =parseInt(AD_WAIT_TIME)-3;
              Log('广告默认时间'+count);
            }
          }else{
            showTip('不在广告页了');
            startAd=false;
          }
        }
      }else{
        if(checkNo && count == 6){
          checkNo = false;
          var no = checkBtn('不允许',0,device.height/3,device.width/2,device.height*2/3);
          if(no!=null){
            showTip('不允许权限弹出');
            btnClick(no);
            count = count+6
          }
        }
        count--;
        ui.run(function(){
          showTip("当前广告等待"+count+"s");
        });
      }
    }
  }
}


function getTTAdBtn(){
  win.setPosition(0,200);
  sleep(1000)
  AD_WAIT_TIME=random(25,29);
  var lookAgain=null
  var count = 0;
  while(lookAgain == null && count<2){
    lookAgain =textStartsWith('再看一个获得').boundsInside(0,device.height/3,device.width,device.height).clickable(true).findOne(1500);
    if(lookAgain == null){
      lookAgain=textStartsWith('继续观看').boundsInside(0,device.height/3,device.width,device.height).clickable(true).findOne(1500);
      AD_WAIT_TIME=random(5,10);
    }
    sleep(500)
    count++
  }
  return lookAgain;
}

function containsNumber(str) {
  var reg=/\d/;
  return reg.test(str);
}

//头条滑动
function scrollTT(count){
  Log('tt_waitTime:'+adWaitTime);
  if(adWaitTime>=GO_BACK_TT_AD){//300
    showTip('返回任务页面刷宝箱和广告');
    toTTTask();
    showTip('进入了任务页');
    sleep(3000);
    //3:看广告赚钱4:逛商品 5:宝箱广告任务
    var list=[3,4,5];
    startTaskList(list);
    btnTTIndex();
    showTip('返回首页');
    sleep(2000);
    adWaitTime=0;
  }
  storage.put(TT_READ_KEY,sTotalTime);
  //只能是4，兼容不能滑动只能通过选不同title来刷头条
  if(count%6==0){
    if(ac!=currentActivity()){
      back();
    }
    sleep(500);
    var ttTitle = ['健康',"推荐","抗疫","娱乐","体育","懂车帝","科技","国际","军事","财经","历史"]
    var titleIndex = random(0,ttTitle.length-1);
    var collectArr = [0,4,5,6,9]
    ttCollect = (collectArr.indexOf(titleIndex)!=-1);
    btnTitle=ttTitle[titleIndex];
    if(defultTitle==null){
      defultTitle=btnTitle;
      click(defultTitle);
    }else{
      click(setTitle(ttTitle,collectArr));
    }
  }
}

function getTTScrollTask(type,longTime,timeEnd){
  switch(type){
    case 1:
      if(timeEnd && random(1,5)==5){
        lookTTContent();
      }
      break;
  }
}

//观看头条文章
function lookTTContent(){
  showTip('开始阅读文章');
  sleep(2000);
  if(random(1,2) == 1){
    //点击上半区
    win.setPosition(0,device.height/2);
    sleep(1000);
    var isAd = checkBtn("广告",0,parseInt(device.height/3),device.width,parseInt(device.height/2));
    if(isAd==null){
      let w = random(parseInt(device.width/3),parseInt(device.width*3/4));
      let h = random(parseInt(device.height/3),parseInt(device.height/2-random(50,100)));
      press(w,h,10);
    }else{
      Log('上半区存在广告区域，不点');
    }
  }else{
    //点击下半区
    win.setPosition(0,0);
    sleep(1000);
    var isAd = checkBtn("广告",0,device.height/2,device.width,device.height);
    if(isAd==null){
      let w = random(parseInt(device.width/3),parseInt(device.width*3/4));
      let h = random(parseInt(device.height/2),parseInt(device.height*4/5));
      press(w,h,10);
    }else{
      Log('下半区存在广告区域，不点');
    }
  }
  let inContent = checkAc('写评论',0,device.height*4/5,device.width/2,device.height,false,'文章');
  let readT = 6;
  if(inContent){
    showTip('开始阅读文章');
    var ttCollect = true;
    let start = true;
    let count = 0;
    var endCount = random(10,15);
    var isEnd = false;
    var btn = checkBtn('写评论',0,device.height*4/5,device.width/2,device.height);
    var btnArr = null;
    if(btn!=null){
      btnArr = getBounds(btn);
    }
    while(start){
      sleep(random(3,5)*1000);
      randomScroll(false,false);
      count++;
      showTip('开始阅读文章:'+count);
      if(count % 3==0){
        let endBtn = checkBtnAllLR('已显示全部评论',device.width/4,device.width*4/5);
        if(endBtn == null){
          endBtn =  checkBtnAllLR('无评论',device.width/4,device.width*4/5);
        }
        if(endBtn == null){
          ttCollect = false;
        }
        isEnd = (endBtn !=null);
        if(isEnd){
          start = false;
        }
      }
      if(count > endCount){
        start = false;
      }
      //收藏，点赞
      if(!start){
        if(ttCollect && random(1,6) == 6){
          showTip('收藏文章');
          let saveBtn = checkBtnById('atb',device.width/3,device.height*4/5,device.width,device.height);
          if(saveBtn == null){
            saveBtn = checkBtnById('atg',device.width/3,device.height*4/5,device.width,device.height);
          }
          if(saveBtn!=null){
            btnClick(saveBtn);
          }else if(btnArr!=null){
            press(device.width*13/20,btnArr[1],10);
            Log('收藏文章——对比点击');
          }else{
            press(device.width*13/20,device.height*24/25,10);
            Log('收藏文章——对比点击');
          }
        }

        if(random(1,5) == 5){
          showTip('点赞文章');
          let saveBtn = checkBtnById('wn',device.width/3,device.height*4/5,device.width,device.height);
          if(saveBtn!=null){
            btnClick(saveBtn);
            Log('点赞文章——按钮点击');
          }else if(btnArr!=null){
            press(device.width*4/5,btnArr[1],10);
            Log('点赞文章——对比点击');
          }else{
            press(device.width*4/5,device.height*24/25,10);
            Log('点赞文章——默认点击');
          }
        }
        sleep(2000);
        readT = readT+2;
      }
    }
    readT = readT+36;
    sTotalTime = sTotalTime+readT;
    adWaitTime = adWaitTime+readT;
  }else{
    showTip('没检测到进入文章,检测是否有弹窗');
    sleep(2000);
    var cancle = checkBtn('取消',0,device.height*3/4,device.width/2,device.height);
    if(cancle == null){
      cancle = checkBtn('拒绝',0,device.height*3/4,device.width/2,device.height);
    }
    if(cancle == null){
      cancle = checkBtn('不允许',0,device.height/3,device.width*2/3,device.height);
    }
    if(cancle!=null){
      btnClick(cancle);
      sleep(1000);
    }
  }
  var index = checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
  if(!index){
    cancle = checkBtn('知道了',0,device.height/3,device.width,device.height*5/6);
    if(cancle!=null){
      btnClick(cancle);
      sleep(1000);
      checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
    }
  }
}



function taskClick(){
  var task=checkBtnByIdWithLimt('k2',0,parseInt(device.height*4/5)
                                ,device.width,device.height,device.width/2);
  if(task!=null){
    showTip('点击任务按钮：：');
    btnClick(task);
    sleep(2000);
  }else{
    var entern=checkBtn('首页',0,parseInt(device.height*2/3),device.width/2,device.height);
    if(entern!=null){
      var arr=getBounds(entern);
      press(device.width/2,arr[1]-10,10);
    }else{
      click('任务');
    }
  }
}

function btnTTIndex(){
  var entern=checkBtnByIdWithLimt('k2',0,parseInt(device.height*4/5)
                                  ,device.width,device.height,device.width/10);
  if(entern!=null){
    btnClick(entern);
  }else{
    var entern=checkBtn('首页',0,parseInt(device.height*2/3),device.width/2,device.height);
    if(entern!=null){
      var arr=getBounds(entern);
      press(arr[0],arr[1]-20,10);
    }else{
      click('任务');
    }
  }
}
function toTTTask(){
  taskClick();
  var isTask=checkAc('金币',0,0,device.width,parseInt(device.height/3),false,'任务列表');
  if(!isTask){
    showTip('去任务页被卡，最后重来1次');
    back();
    sleep(1500);
    taskClick();
    checkAc('金币',0,0,device.width,device.height/3,false,'任务列表');
  }
  showTip('进入了任务页');
}

function getTTTask(type,isTop){
  switch(type){
    case 1:
      //吃饭补贴
      getLunchGold(isTop);
      break;
    case 2:
      //睡觉补贴
      getSleepGold(isTop);
      break;
    case 3:
      //看广告
      lookAdress(isTop);
      break;
    case 4:
      ttShopping(isTop);
      break;
    case 5:
      //查宝箱
      checkTTBox();
      break;
    case 6:
      //去赚钱
      lookForMoney(isTop);
      break;
    case 7:
      getTTMoney()
      break
  }
}

//=======================================头条END=======================================//


//=======================================抖音START=======================================//
function getDYTask(type,isTop){
  //1:宝箱，2：广告赚金币，3:逛街
  //4:边买边赚,5:看小说
  switch(type){
    case 1:
      lookDYBox();
      break;
    case 2:
      checkAdTask();
      sleep(1500);
      break;
    case 3:
      dyShopping();
      sleep(1000);
      break;
    case 4:
      dyGodlByLook();
      break;
    case 5:
      lookStory();
      break;
    case 6:
      checkSign();
      break;
    case 7:
      dyWalk();
      break;
    case 8:
      dySearch()
      break;
  }
}
function shuaDouYin(){
  if(!reStartApp){
    toast('操作抖音极速版');
    refreshData('抖音');
    TYPE = 2;
    var app=openApp('抖音极速版');
    if(app){
      sTotalTime=0;//抖音阅读时长;
      Log('抖音累计阅读：'+sTotalTime);
      showTip('启动抖音极速版,初始化等待...');
      sleep(3000);
      back();
      sleep(2000);
      showTip('查询跳过按钮');
      var jump=checkBtn("跳过",0,0,device.width,device.height/5);
      if(jump!=null){
        btnClick(jump);
      }
      sleep(3000);
      checkAc('首页',0,parseInt(device.height*4/5),device.width,device.height,true,'首页');
      var count=0;
      while(count<5){
        showTip('等待'+(5-count)+'s检测是否有弹窗');
        var tip=checkBtn('青少年模式',0,parseInt(device.height/2),device.width,device.height*3/4);
        if(tip!=null){
          var konw=checkBtn('知道了',0,parseInt(device.height/2),device.width,device.height);
          if(konw!=null){
            btnClick(konw);
            sleep(1000);
            count=5;
          }
        }
        sleep(1000);
        count++;
      }
      ac=currentActivity();
      Log('ac:'+ac);
      dyTask()
      sleep(2000);
      checkArr(['金币收益','赚钱任务'],0,0,device.width,device.height/3,false,'任务页');
      checkDYDiaolg();
      //签到
      dySign();
      //1:宝箱，2：广告赚金币，3：逛街,4：边买边赚,
      //5:看小说,6:签到,7:走路,8:搜索
      var tList=[1,2,3,4,5,6,7,8];
      // var tList=[3]
      startTaskList(tList);
      sleep(2000);
      back();
      sleep(2500);
      checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
      back();
      sleep(2500);
      var entern=checkBtn('首页',0,parseInt(device.height*4/5),device.width/2,device.height);
      if(entern!=null){
        btnClick(entern);
      }else{
        click('首页');
      }
      sleep(2000);
      shua();
      sleep(2000);
      stopApp('抖音极速版');
    }else{
      showTip('没安装抖音极速版');
    }
  }
}

//抖音搜索
function dySearch(){
  var search = checkBtnAllLR('搜索赚金币',0,device.width*2/3);
  if(search == null){
    toTop();
  }
  showTip('查询搜索赚金币任务')
  var hadSearch = checkTaskBtn('搜索赚金币',0,device.width*2/3,'搜索','已经到底了')
  if(hadSearch){
    search = checkBtnAllLR('搜索赚金币',0,device.width*2/3);
    var arr = getBounds(search);
    var searchEnd = checkBtn("已获得搜索",0,arr[0],device.width/2,arr[1]+device.width/8);
    if(searchEnd!=null){
      showTip('搜索任务做完了')
      sleep(2000)
      return
    }
    var searchCount = getTimse(search,'搜索一次',"已完成",'搜索任务',2);
    if(searchCount == -1){
      searchCount = 3
    }
    if(search!=null){
      btnClick(search)
      sleep(1000)
      checkAc('首页',0,parseInt(device.height*4/5),device.width,device.height,true,'首页');
      var count = 0
      while(count<searchCount){
        showTip("搜索任务第"+(searchCount-count)+'次')
        search = checkBtnById('ye',device.width*3/4,0,device.width,device.height/5)
        if(search != null){
          btnClick(search)
        }else{
          press(device.width*9/10,110,10)
        }
        sleep(1000)
        var inSearch =checkAcById('fl_intput_hint_container',0,0,device.width,device.height/5,false,"搜索")
        if(inSearch){
          var input = checkBtnById('fl_intput_hint_container',0,0,device.width,device.height/5)
          if(input!=null){
            var sArr = ['热门','美女','游戏','财经','战争','疫情','流量','热榜','创业','美妆','搞笑']
            let ii = random(0,sArr.length-1);
            input.setText(sArr[ii]);
            sleep(2000);
            search = checkBtn("搜索",device.width*4/5,0,device.width,device.height/5);
            if(search!=null){
              btnClick(search)
              sleep(5000)
              var i = 0
              var times = random(10,15);
              while(i<times){
                if(count>5 && random(1,5) == 5){
                  randomScroll(true,(random(1,3) == 3));
                }else{
                  randomScroll(false,(random(1,3) == 3));
                }
                if(i == 6){
                  var end = checkBtnStartAll('搜索结果为空');
                  if(end!=null){
                    showTip('没有数据');
                    sleep(3000);
                    i == times;
                    return
                  }
                }
                var t =random(2,4);
                sleep(t*1000);
                i++
              }
            }
          }
          var index = checkAc('首页',0,parseInt(device.height*4/5),device.width,device.height,true,'首页');
          if(!index){
            back()
            sleep(3000)
            back()
            sleep(3000)
          }
        }
        count++
      }
      dyTask();
    }
  }
}


//步行赚钱
function dyWalk(){
  var walk = checkBtnAllLR('走路赚金币',0,device.width*2/3);
  if(walk == null){
    toTop();
  }
  var hadWalk = checkTaskBtn('走路赚金币',0,device.width*2/3,'走路','已经到底了')
  if(hadWalk){
    walk = checkBtnAllLR('走路赚金币',0,device.width*2/3);
    if(walk){
      btnClick(walk);
      var inWalk = checkAc('走路赚金币',device.width/5,0,device.width*4/5,device.height/4,false,"走路")
      if(inWalk){
        showTip('查询按钮')
        sleep(3000)
        var get = checkBtnStart("领取",device.width/5,device.width/4,device.width*4/5,device.height*2/3);
        if(get!=null){
          btnClick(get)
          sleep(3000)
          get = checkBtnStart("暂不浏览",device.width/5,device.width/2,device.width*4/5,device.height*2/3);
          if(get!=null){
            btnClick(get)
            sleep(1000)
          }
        }
        showTip('返回任务页')
        checkArr(['金币收益','赚钱任务'],0,0,device.width,device.height/3,true,'任务页');
      }
    }
  }else{
    showTip('没找到步行任务');
    sleep(2000);
  }
}

function checkDYDiaolg(){
  showTip('检测弹窗');
  var giveUp = checkBtnStartAll('放弃',0,device.width);
  if(giveUp!=null){
    btnClick(giveUp)
  }else{
    var lookAd =checkBtn("看广告视频",0,parseInt(device.height/3),device.width,parseInt(device.height*4/5));
    if(lookAd!=null){
      win.setPosition(0,200);
      sleep(1000)
      var arr = getBounds(lookAd);
      press(device.width/5,arr[1],10);
      sleep(3000);
      shuaDouYinAdvert();
    }
  }
  sleep(2000);
}


function checkSign(){
  dyHadSign=storage.get(DY_SIGN_KEY,false);
  if(!dyHadSign){
    var sign = checkBtnAllLR('签到',device.width*2/3,device.width);
    if(sign == null){
      toTop();
    }
    showTip('查询签到任务')
    var hadSign = checkTaskBtn('签到',device.width*2/3,device.width,'签到任务');
    if(hadSign){
      sign = checkBtnAllLR('签到',device.width*2/3,device.width);
      if(sign!=null){
        storage.put(DY_SIGN_KEY,true);
        btnClick(sign)
        sleep(2500)
        var count = 0
        var lookAd = null;
        while(lookAd == null&&count<2){
          lookAd =checkBtn("看广告视频",0,parseInt(device.height/3),device.width,parseInt(device.height*4/5));
          sleep(1000)
          count++;
        }
        if(lookAd!=null){
          win.setPosition(0,200);
          sleep(1000)
          var arr = getBounds(lookAd);
          press(device.width/5,arr[1],10);
          sleep(3000);
          shuaDouYinAdvert();
        }
      }
    }
  }
}


//签到
function dySign(){
  sleep(2000);
  showTip('等待签到弹窗');
  sleep(3000);
  showTip('查询立即签到');
  var signNow=checkBtnStartAll("立即签到");
  if(signNow!=null){
    storage.put(DY_SIGN_KEY,true);
    btnClick(signNow);
    showTip('查询抖音签到看广告视频');
    sleep(3000);
    var count = 0
    var lookAd = null;
    while(lookAd == null&&count<2){
      lookAd =checkBtn("看广告视频",0,parseInt(device.height/3),device.width,parseInt(device.height*4/5));
      sleep(1000)
      count++;
    }
    if(lookAd!=null){
      win.setPosition(0,200);
      sleep(1000)
      var arr = getBounds(lookAd);
      press(device.width/5,arr[1],10);
      sleep(3000);
      shuaDouYinAdvert();
    }else{
      var ok=checkBtn("好的",0,device.height/3,device.width,device.height*4/5);
      if(ok!=null){
        btnClick(ok);
        sleep(2000);
      }else{
        ok = checkBtn('签到提醒',device.width/4,device.height/3,device.width*3/4,device.height*4/5);
        if(ok!=null){
          win.setPosition(0,200);
          sleep(1000)
          var arr = getBounds(ok);
          press(arr[0],arr[1]-device.width/8,10);
          sleep(3000);
          shuaDouYinAdvert();
        }
      }
    }
  }else{
    signNow=checkBtnAllLR("点击领取",0,device.width);
    if(signNow!=null){
      storage.put(DY_SIGN_KEY,true);
      btnClick(signNow);
      sleep(2000);
      var arr = getBounds(signNow);
      press(device.width/2,arr[1]+device.width/5,10);
    }
  }
}

//看小说
function lookStory(){
  if(!hadDyStory){
    showTip('小说任务做完了');
    sleep(2000);
    return;
  }
  showTip('查询[看小说任务]请稍后...');
  var story = checkBtnAllLR('看小说赚金币',0,device.width*2/3);
  if(story == null){
    toTop();
  }
  var hadStory = checkTaskBtn('看小说赚金币',0,device.width*2/3,'小说任务');;
  if(hadStory){
    story = checkBtnAllLR('看小说赚金币',0,device.width*2/3);
    if(story!=null){
      var arr= getBounds(story);
      var adTimes = checkBtn('每天可赚',0,arr[1],device.width,arr[1]+device.height/6);
      if(adTimes!=null){
        var proText = adTimes.text();
        var pro = parseInt(proText.substr(proText.indexOf("已完成")+3));
        var allPro = parseInt(proText.substr(proText.indexOf("/")+1));
        if(allPro<=pro){
          showTip('小说任务做完了');
          sleep(2000);
          hadDyStory = false;
          return;
        }
        btnClick(story);
        sleep(3000);
        var inStory = checkAc('推荐',0,0,device.width,device.height/5,false,'小说频道');
        if(inStory){
          sleep(4000);
          let bang = checkBtnStart('排行榜',0,0,device.width/2,device.height*3/4);
          var hot = checkBtnStart('热搜榜',0,0,device.width,device.height*3/4);
          if(hot!=null){
            btnClick(hot);
            sleep(2000);
          }
          if(bang!=null){
            let storyArr = getBounds(story);
            let bangArr = getBounds(bang);
            var top1 = className('android.view.View').indexInParent(9)
            .boundsInside(0,storyArr[1],device.width/2,device.height*4/5).findOne(3000);
            if(top1!=null){
              let topArr = getBounds(top1);
              press(bangArr[0],topArr[1],10);
            }else{
              top1 = checkBtnEnd('w',0,0,device.width/2,device.height*4/5);
              if(top1!=null){
                btnClick(top1);
              }
            }
            sleep(3000);
            var toRead = checkBtnStart('立即阅读',device.width/2,device.height*3/4,device.width,device.height);
            if(toRead == null){
              toRead = checkBtnStart('继续阅读',device.width/2,device.height*3/4,device.width,device.height);
            }
            if(toRead!=null){
              btnClick(toRead);
              sleep(2000);
            }
            checkAc('第',0,0,device.width/2,device.height/3,false,'内容');
            Log('ac:::'+currentActivity());
            showTip('开始看小说');
            let count = 0;
            let readTimes = random(60,70);
            while(count<readTimes){
              showTip('开始看小说'+(readTimes-count));
              sleep(random(3,5)*1000);
              var ad = checkBtnStart('看视频免',0,device.height/2,device.width,device.height);
              if(ad!=null){
                btnClick(ad);
                var lookAd = shuaDouYinAdvert();
                if(currentActivity() != 'com.bytedance.novel.view.NovelReaderActivity'){
                  if(!lookAd){
                    back();
                    sleep(3000);
                  }
                  Log('不在广告页——滑动');
                  gesture(50,[device.width*4/5,device.height*15/16],[device.width/5,device.height*15/16]);
                  sleep(2000);
                  var right = checkBtnById('tv_right',device.width/3,device.height/3,device.width,device.height*4/5);
                  if(right!=null){
                    back();
                  }
                }else{
                  press(device.width*4/5,device.height*15/16,10);
                }
              }else{
                press(device.width*4/5,device.height*15/16,10);
              }
              count++;
            }
            back();
            sleep(3000);
            var right = checkBtnById('tv_right',device.width/3,device.height/3,device.width,device.height*4/5);
            if(right!=null){
              btnClick(right);
              sleep(2000);
            }
          }else{
            var top1 = checkBtnEnd('w',0,0,device.width/2,device.height*4/5);
            if(top1!=null){
              btnClick(top1);
            }
          }
        }
        checkAc('推荐',0,0,device.width,device.height/5,true,'小说频道页面');
        back();
        sleep(1000);
      }
    }
  }
}

//边买边赚
function dyGodlByLook(){
  dyReadHotGood=storage.get(DY_HOT_GOOD,true);//抖音阅读时
  if(!dyReadHotGood){
    showTip('[边买边赚]任务已做完');
    sleep(2000);
    return;
  }
  showTip('查找[边买边赚]任务请稍后...');
  var shop = checkBtnAllLR('边买边赚',0,device.width*2/3);
  if(shop == null){
    shop = checkBtnAllLR('浏览爆款赚金币',0,device.width*2/3);
  }
  if(shop==null){
    toTop();
  }

  var name = checkTaskBtnList(['边买边赚','浏览爆款赚金币'],0,device.width*2/3,'边买边赚','已经到底了');
  if(name == null){
    showTip('没有查询到[边买边赚]任务')
    sleep(2000);
    return
  }
  var hadShopping = checkTaskBtn(name,0,device.width*2/3,'边买边赚')
  if(hadShopping){
    var buyBtn = checkBtnAllLR(name,0,device.width*2/3);
    if(buyBtn!=null){
      btnClick(buyBtn);
      sleep(2000)
      var inBuy = checkArr(['点击领取','浏览赚金币'],0,0,device.width,device.height/2,false,'买卖');
      if(inBuy){
        var get = checkBtn('点击领取',0,device.height/2,device.width,device.height);
        if(get == null){
          get = checkBtn('点击领取',0,0,device.width*2/3,device.height/2);
        }
        if(get!=null){
          btnClick(get);
          sleep(2000);
        }
        storage.put(DY_HOT_GOOD,false);//抖音浏览爆款
        win.setPosition(0,0);
        sleep(1500);
        randomScroll(false,false);
        sleep(1500);
        randomScroll(false,false);
        sleep(1500);
        var time = random(152,170);
        var timeBtn = checkBtnStart('再浏览',device.width/2,device.height/2,device.width,device.height);
        if(timeBtn!=null && timeBtn.text!=null && containsNumber(timeBtn.text())){
          sleep(1500);
          let str = timeBtn.text().replace(/[^0-9]/ig,"");
          if(!isNaN(str)){
            time = parseInt(str,10)+random(5,10);
          }
          sleep(1500);
        }
        let count = 0;
        var sele = -1
        while(count<=time){
          showTip('浏览商品倒计时'+(time - count)+"s");
          if(count>0){
            if(count%20==0){
              win.setPosition(0,device.height/3);
              sleep(2000);
              pos = random(1,9);
              if(pos%2 == 0){
                pos = pos-1;
              }
              if(sele == -1 || sele != pos){
                sele = pos;
                showTip('切换标题：'+sele);
                press(device.width*sele/10,device.height*14/100,10);
                sleep(1000);
                let inAc = checkAc('买就返',0,device.height/4,device.width/2,device.height*2/3,false,'商品');
              }
            }
            if(count%40==0 || count == time){
              showTip('修正时间');
              timeBtn = checkBtnStart('再浏览',device.width*2/3,device.height/2,device.width,device.height);
              if(timeBtn!=null && timeBtn.text!=null && containsNumber(timeBtn.text())){
                sleep(1500);
                let str = timeBtn.text().replace(/[^0-9]/ig,"");
                let cTime = parseInt(str,10);
                if(!isNaN(cTime) && cTime>0){
                  count = time-cTime-random(3,5);
                }
              }
            }
          }
          if(random(1,4)==4){
            randomScroll(true,true);
            sleep(500);
            randomScroll(true,true);
          }else{
            randomScroll(false,true);
            sleep(500);
            randomScroll(false,true);
          }
          let waitTime = 1000+random(3,5)*100;
          sleep(waitTime);
          count=count+parseInt(waitTime/1000);
        }
        back();
        sleep(2000);
      }else{
        buyBtn = checkBtnAllLR('边买边赚',0,device.width*2/3);
        if(buyBtn ==null){
          back();
          sleep(2000);
        }
      }
    }else{
      showTip('买卖任务入口失踪了');
      sleep(2000);
    }
  }
}


//抖音逛街
function dyShopping(){
  if(!hadDyhopping){
    showTip('逛街任务已完成了');
    sleep(1000);
    return;
  }
  showTip('查找逛街任务请稍后..');
  var shop = checkBtnAllLR("逛街赚钱",0,device.width*2/3);
  if(shop==null){
    toTop();
  }
  var hadShopping = checkTaskBtn("逛街赚钱",0,device.width*2/3,'逛街','已经到底了');
  if(!hadShopping){
    showTip('没找到逛街任务');
    sleep(2000);
    return;
  }
  var shopTimeText = checkBtnAllLR('每日可完成',0,device.width);
  var totalTime = 10;
  var hadTimes = 0;
  if(shopTimeText!=null && shopTimeText.text!=null){
    var pos = shopTimeText.text().indexOf(':');
    if(pos!=-1){
      showTip('逛街时间没到');
      sleep(1500);
      return;
    }

    if(shopTimeText.text().indexOf('，')!=-1){
      var start= shopTimeText.text().indexOf('，');
      var end = shopTimeText.text().indexOf('/');
      Log('text:'+shopTimeText.text()+'，start：'+start+"，end:"+end);
      if(end!=-1){
        let totalText = shopTimeText.text().substring(end+1,end+3);
        totalTime = parseInt(totalText,10);
        Log('totalText::'+totalText);
      }
      var checkTimes = shopTimeText.text().substring(end-1,end);
      Log('checkTimes::'+checkTimes);
      hadTimes = parseInt(checkTimes.toString(),10);
      if(isNaN(hadTimes)){
        checkTimes = shopTimeText.text().substring(end-2,end);
        Log('checkTimes::'+checkTimes);
        hadTimes = parseInt(checkTimes.toString(),10);
      }
      Log('逛街'+totalTime+'次，已逛'+hadTimes+'次');
      if(hadTimes == totalTime){
        showTip('逛街任务做完了');
        sleep(1500);
        hadDyhopping = false;
        return;
      }
    }
  }
  if(hadTimes< totalTime){
    showTip('检测是否能开始逛街');
    reward=checkBtnAllLR('每日可完成',0,device.width);
    if(reward!=null){
      if(reward.text!=null && reward.text().indexOf(':')!=-1){
        hadTimes = totalTime;
        showTip('逛街任务时间没到');
        sleep(1500);
        return;
      }
      btnClick(reward);
      sleep(2000);
      var inShopping =checkAc("浏览",0,0,device.width,device.height/2,false,'逛街');
      if(inShopping){
        sleep(1000);
        var time=0;
        win.setPosition(0,device.height/3);
        var waitTime=random(125,135);
        var mv = checkBtnAllLR('秒',device.width/2,device.width);
        if(mv==null){
          mv = checkBtnAllLR('s',device.width/2,device.width);
        }
        if(mv!=null && mv.text!=null && containsNumber(mv.text())){
          waitTime = parseInt(mv.text())+random(5,8);
        }
        while(time<waitTime){
          showTip('逛街开始,当前剩余:'+(waitTime-time)+'s');
          if(time>30 && random(1,5) >= 4){
            randomScroll(true,false);
          }else{
            randomScroll(false,false);
          }
          var ranTime=random(2,5);
          time=time+ranTime;
          sleep(ranTime*1000);
          if(time == 75){
            var waitTime = checkBtnAllLR(":",device.width*4/5,device.width);
            if(waitTime!=null){
              time = waitTime;
              showTip('逛街完毕')
            }
          }
        }
        back();
        sleep(1000);
        var giveUp=checkBtn("坚持退出",0,device.height/3,device.width,device.height);
        if(giveUp!=null){
          btnClick(giveUp);
          sleep(2000);
        }
      }else{
        showTip('逛街任务做完了');
        sleep(1500);
        hadDyhopping=false;
        hadTimes == totalTime;
      }
    }else{
      showTip('逛街任务时间没到');
      sleep(1500);
      hadTimes == totalTime;
    }
    hadTimes++;
  }
}

//查询抖音广告赚钱任务
function checkAdTask(){
  showTip('查询看广告赚金币任务');
  var name = '看广告赚金币';
  var lAd=checkBtnAllLR(name,0,device.width*2/3);
  if(lAd == null){
    name = '看广告得金币';
    lAd=checkBtnAllLR(name,0,device.width*2/3);
  }
  if(lAd == null){
    toTop();
    sleep(1000);
  }
  var name = checkTaskBtnList(["看广告赚金币",'看广告得金币'],0,device.width*4/5,'看广告','已经到底了');
  if(name == null){
    showTip('没有查询看广告赚金币任务');
    sleep(2000)
    return;
  }
  var hadAd = checkTaskBtn(name,0,device.width*4/5,'看广告');
  if(hadAd){
    showTip('开始看广告赚金币任务');
    var lAd=checkBtnAllLR(name,0,device.width*2/3);
    if(lAd!=null){
      btnClick(lAd);
      sleep(3000);
      var tastAc=checkBtn('金币收益',0,0,device.width/2,device.height/3);
      if(tastAc == null){
        shuaDouYinAdvert();
      }else{
        showTip('广告赚金币时间还没到');
      }
    }else{
      Log('没有赚钱广告');
      showTip('广告赚金币时间还没到');
    }
  }
}

//查询抖音宝箱
function lookDYBox(){
  showTip('查询宝箱广告');
  var get=checkBtn("点击领金币",0,device.height*3/4,device.width,device.height);
  if(get==null){
    get=checkBtn("开宝箱得金币",0,device.height*3/4,device.width,device.height);
  }
  if(get!=null){
    btnClick(get);
    showTip('查询[看广告视频再赚]按钮');
    sleep(5000);
    var ad = checkBtnStart('看广告视频再赚',0,device.height/3,device.width,device.height);
    if(ad!=null){
      var arr = getBounds(ad);
      press(device.width/5,arr[1],10);
    }else{
      press(device.width/5,device.height*59/100,50);
    }
    sleep(2000);
    var lookAd = shuaDouYinAdvert();
    if(!lookAd){
      showTip('观看广告失败，关闭弹窗')
      press(device.width/2,parseInt(device.height*17/25),50);
      sleep(1000);
    }
  }else{
    showTip('宝箱广告时间还没到');
  }
}

//刷抖音广告
function shuaDouYinAdvert(){
  sleep(1000);
  var ad = checkArr(['领取奖励','关闭广告','反馈'],device.width/5,0,device.width,device.height/4,false,'广告页');
  var adAc = 'com.ss.android.excitingvideo.ExcitingVideoActivity';
  var count = 35;
  if(ad || currentActivity().toString() == adAc){
    count=random(33,43);
    win.setPosition(0,200);
    var isAD=checkBtn("s",device.width/3,0,device.width,device.height/4);
    if(isAD!=null && isAD.text!=null && containsNumber(isAD.text())){
      Log('查询时间按钮：：'+isAD);
      Log('时间text：：'+isAD.text());
      let index = isAD.text().indexOf("s");
      let timeText = isAD.text().substring(index-2,index);
      let time =parseInt(timeText,10)+random(2,4);
      if(!isNaN(time)){
        count = time;
      }
      Log('广告检测剩余时间'+count+'s');
    }else{
      Log('广告默认时间'+count);
    }
    var startAd=true;
    while(startAd){
      sleep(1000);
      if(count< 1){
        back();
        sleep(1500);
        showTip('查询是否还能看广告');
        var lookAd=checkBtn('广告',0,0,device.width/2,device.height/4);
        if(lookAd == null){
          lookAd=checkBtn('关闭当前视频',0,0,device.width,device.height/4);
        }
        if(lookAd == null){
          lookAd=checkBtn('反馈',0,0,device.width,device.height/4);
        }
        if(lookAd!=null){
          back();
          sleep(1500);
        }

        var get=checkDyAdBtn();
        if(get!=null){
          btnClick(get);
          sleep(2000);
          isAD=checkNumBtn('金币倒计时',0,0,device.width,device.height/4);
          if(isAD!=null && isAD.text!=null && containsNumber(isAD.text())){
            var start = isAD.text().indexOf('金币倒计时');
            Log('时间text：：'+isAD.text()+",start:"+start);
            var timeText = isAD.text().substring(start+5);
            var time =parseInt(timeText.toString(),10)+random(1,4);
            if(!isNaN(time)){
              count = time;
            }else{
              count =parseInt(AD_WAIT_TIME)-2;
            }
            Log('广告检测剩余时间'+count+'s');
          }else{
            count =parseInt(AD_WAIT_TIME)-3;
            Log('广告默认时间'+count);
          }
        }else{
          showTip('不在广告页了');
          startAd=false;
        }
      }else{
        count--;
        ui.run(function(){
          showTip("当前广告等待"+count+"s");
        });
      }
    }
    return true;
  }else{
    showTip('没检测到广告');
    sleep(2000);
    return false;
  }
}

function checkDyAdBtn(){
  win.setPosition(0,200)
  sleep(1000)
  AD_WAIT_TIME=random(23,33);
  var get=null
  var count = 0;
  while(get == null && count<2){
    get=textEndsWith('领取奖励').boundsInside(0,device.height/3,device.width,device.height*4/5).clickable(true).findOne(1500)
    if(get==null){
      get=textEndsWith('继续观看').boundsInside(0,device.height/3,device.width,device.height*4/5).clickable(true).findOne(1500)
      AD_WAIT_TIME=random(5,10);
    }
    if(get==null){
      get=textEndsWith('再看一个').boundsInside(0,device.height/3,device.width,device.height*4/5).clickable(true).findOne(1500)
    }
    count++;
    sleep(500)
  }
  return get;
}

function dyTask(){
  showTip('跳转任务页');
  var taskBtn =  className('android.widget.RelativeLayout').depth(5).boundsInside(0,0,device.width/2,device.height).findOne(5000);
  if(taskBtn==null){
    taskBtn = className('android.widget.RelativeLayout').depth(5).boundsInside(device.width/2,0,device.width,device.height).findOne(5000);
  }
  if(taskBtn==null){
    showTip('底部id任务')
    taskBtn = checkBtnById("e1t",device.width/2,parseInt(device.height*4/5),device.width,device.height)
  }
  if(taskBtn!=null){
    btnClick(taskBtn)
  }else{
    var msg=checkBtn('消息',device.width/2,parseInt(device.height*4/5),device.width,device.height);
    if(msg!=null){
      var arr=getBounds(msg);
      press(device.width/2,arr[1],10);
    }
  }
}
//=======================================抖音END=======================================//

//=======================================快手START=======================================//
function shuaKuaiShou(){
  if(!reStartApp){
    toast('操作快手极速版');
    refreshData('快手');
    TYPE = 1;
    var app=openApp('快手极速版');
    if(app){
      sTotalTime=0;//快手阅读时长;;
      hadKShopping = true;
      hadKSLive = true;
      ksAdWaitTime=0;
      showTip('启动抖快手极速版,初始化等待...');
      Log('快手累计阅读：'+sTotalTime);
      back();
      sleep(2000);
      showTip('查询跳过按钮');
      var jump=checkBtn("跳过",0,0,device.width,device.height/5);
      if(jump!=null){
        btnClick(jump);
      }
      sleep(3000);
      var isIn=checkAc('首页',0,parseInt(device.height*2/3),device.width/2,device.height,true,'首页');
      var count=0;
      while(count<5){
        showTip('等待'+(5-count)+'s检测是否有弹窗');
        var tip=checkBtn('青少年模式',0,parseInt(device.height/2),device.width,device.height*3/4);
        if(tip!=null){
          var konw=checkBtn('知道了',0,parseInt(device.height/2),device.width,device.height);
          if(konw!=null){
            btnClick(konw);
            sleep(1000);
            count=5;
          }
        }
        sleep(1000);
        count++;
      }
      ac=currentActivity();
      toKSTask();
      sleep(3000);
      //签到
      kuaiShouSign();
      showTip('等待显示广告..');
      sleep(5000);
      //查询快手广告
      checkKuaiShouAd();
      //1:宝箱广告2:刷悬赏3:逛街4:看直播5:金币翻倍6:提现
      var typeArray=[1,2,3,4,5,6];
      startTaskList(typeArray);
      showTip('返回首页刷视频');
      checkAc('关注',0,0,device.width,device.height/4,true,'首页');
      var double = checkBtnAllLR('点击翻倍',device.width*2/3,device.width);
      if(double!=null){
        btnClick(double);
        sleep(1000);
      }
      shua();
      sleep(2000);
      stopApp('快手极速版');
    }else{
      showTip('没安装快手极速版');
    }
  }
}


//快手签到
function kuaiShouSign(){
  ksHadSign=storage.get(KS_SIGN_KEY,false);
  if(!ksHadSign){
    var count=0;
    var sign = null;
    while(sign==null && count<5){
      showTip('查询签到弹窗');
      sign = checkBtnStart("立即签到",0,device.height/2,device.width,device.height);
      if(sign==null){
        sign=checkBtnStart("签到立得",0,device.height/2,device.width,device.height);
      }
      if(sign==null){
        sign=checkBtnStart("打开签到提醒",0,device.height/2,device.width,device.height);
      }
      sleep(1000);
      count++;
    }
    if(sign!=null){
      storage.put(KS_SIGN_KEY,true);
      btnClick(sign);
      sign = null;
      sleep(2000);
    }
    if(sign==null){
      sign=checkBtnStart("看广告再得",0,device.height/2,device.width,device.height);
    }
    if(sign==null){
      sign==checkBtnStart("看视频最高得",0,device.height/2,device.width,device.height);
    }
    if(sign==null){
      sign=checkBtnEnd("金币看视频就赚",0,device.height/2,device.width,device.height);
    }
    if(sign!=null){
      storage.put(KS_SIGN_KEY,true);
      btnClick(sign);
      sleep(1000);
      shuaKuaiShouAdvert();
      sleep(2000);
      var entern=checkBtn('首页',0,parseInt(device.height*2/3),device.width/2,device.height);
      if(entern!=null){
        btnClick(entern);
        sleep(1000);
        toKSTask()
      }
    }
  }
}


//快手直播
function ksLive(liveId,liveTimeId){
  if(!hadKSLive){
    showTip('直播任务做完了');
    sleep(2000);
    return;
  }
  showTip('查询看直播任务请稍后...');
  var live=checkBtnAllLR("金币看直播",0,device.width*4/5);
  if(live == null){
    toTop();
  }
  showTip('查询看直播任务请稍后...');
  var name = checkTaskBtnList(["金币看直播",'看直播赚'],0,device.width*4/5,'直播任务');
  var canLive = checkTaskBtn(name,0,device.width*4/5,'直播任务');
  if(canLive){
    var count=1;
    showTip('开始看直播任务');
    var live = checkBtnAllLR(name,0,device.width*4/5);
    if(live!=null){
      btnClick(live);
      sleep(4000);
      var startLive = checkBtnStart('看直播额外得',0,device.height/2,device.width,parseInt(device.height*3/4));
      if(startLive!=null){
        btnClick(startLive);
        sleep(2000);
      }
      var isLive=checkAc('看直播领金币',0,0,device.width,device.height/4,false,'直播列表');
      if(!isLive){
        isLive = checkAc('规则',device.width/2,0,device.width,device.height/4,false,'直播列表');
      }
      if(isLive){
        var proBtn=checkBtn('/10',0,0,device.width/2,device.height/3);
        var proText = '0';
        if(proBtn!=null && proBtn.text!=null){
          proText = proBtn.text();
        }
        var pro = parseInt(proText);
        Log('直播进度：：'+proText+',截取：'+pro);
        if(pro == 10){
          hadKSLive = false;
          back();
          showTip('直播任务做完了');
          sleep(2000);
          return;
        }
        var net = checkBtn('点击重试',0,device.height/3,device.width,device.height*2/3);
        if(net!=null){
          showTip('页面没数据，重试');
          btnClick(net);
          sleep(2000);
        }
        var count=1;
        var titleList=['总榜','家居之光榜','万人购买','家电数码榜','1000万+人关注',
                       '新秀榜','美妆个护榜','100万+人关注','创业','短视频','第1名','近7天'];
        var selectPos=-1;
        var selectTimes =0;//选择次数
        while(count<=(10-pro)){
          var titlePos = random(0,titleList.length-1);
          showTip('筛选直播间');
          var checkInLive = true;
          if(selectPos==-1||(selectPos!=-1&&selectPos!=titlePos)){
            selectPos=titlePos;
            var title;
            let checkTitleCount = 0;
            var bang=null;
            while(bang == null && checkTitleCount<3){
              titlePos = random(0,titleList.length-1);
              selectPos=titlePos;
              title=titleList[titlePos];
              if(random(1,3)==1){
                bang=checkBtnAllLR(title,0,device.width/2);
                if(bang==null){
                  bang = checkBtnAllLR(title,device.width/2,device.width);
                }
              }else{
                bang=checkBtnAllLR(title,device.width/2,device.width);
                if(bang==null){
                  bang = checkBtnAllLR(title,0,device.width/2);
                }
              }
              checkTitleCount++;
            }
            if(bang == null){
              selectTimes++;
              if(selectTimes%7==0 && checkInLive){
                checkInLive = false;
                isLive=checkAc('看直播领金币',0,0,device.width,device.height/4,false,'直播列表');
                if(!isLive){
                  isLive = checkAc('规则',device.width/2,0,device.width,device.height/4,false,'直播列表');
                }
                if(!isLive){
                  showTip('不在直播列表了');
                  count == 12;
                  return;
                }
              }
              var w=random(parseInt(device.width*2/3),parseInt(device.width*4/5));
              var sH=random(parseInt(device.height*4/5),parseInt(device.height*2/3));
              var eH=random(parseInt(device.height/5),parseInt(device.height/6));
              if(random(1,4) ==4){
                win.setPosition(0,device.height/3);
                sleep(1000);
                gesture(random(1,4)*100,[w,eH],[w,sH]);
              }else{
                win.setPosition(0,200);
                sleep(1000);
                gesture(random(1,4)*100,[w,sH],[w,eH]);
              }
              sleep(1000);
            }else{
              showTip('看['+title+']类直播');
              var adCount = 1;
              while(adCount<7){
                bang = checkBtnAll(title);
                if(adjustPos(bang,title)){
                  adCount=7;
                }else{
                  adCount++;
                }
              }
              sleep(1000);
              bang = checkBtnAll(title);
              if(bang!=null){
                btnClick(bang);
                sleep(2500);
              }
              var liveEnd=checkBtn('直播已结束',0,0,device.width,device.height/5);
              if(liveEnd!=null){
                back();
                sleep(2000);
              }else{
                showTip('检测是否进入直播间');
                var time = checkAcById(liveId,
                                       0,0,device.width/2,device.height/4,false);
                //倒计时等待中，返回
                if(!time){
                  showTip('不在直播间内');
                  back();
                  sleep(2000);
                  var live = checkBtn('看直播领金币',0,0,device.width,device.height/5);
                  if(live == null){
                    count = 12;//暂停看直播
                    var isIndex=checkBtn("首页",0,device.height*4/5,device.width/2,device.height);
                    if(!isIndex){
                      var backTimes = 0;
                      var liveBtn = null;
                      while(liveBtn == null && backTimes < 5 ){
                        back();
                        sleep(2000);
                        var goBack=checkBtnStart('退出',0,device.height/3,device.width,device.height*4/5);
                        if(goBack !=null){
                          btnClick(goBack);
                          sleep(2000);
                        }
                        backTimes ++;
                        liveBtn=checkBtn('看直播领金币',0,0,device.width,device.height/4);
                        if(liveBtn == null){
                          liveBtn=checkBtn('规则',device.width/2,0,device.width,device.height/4);
                        }
                        if(liveBtn == null){
                          if(TYPE == 4){
                            liveBtn = checkBtn("详情",device.width*2/3,0,device.width,device.height/4);
                          }else{
                            liveBtn = checkBtn("抵用金",0,0,device.width,device.height/3);
                          }
                          if(liveBtn!=null){
                            count == 12;
                            return;
                          }
                        }

                      }
                    }
                  }
                }else{
                  var countDownBtn = checkBtnById(liveTimeId,
                                                  device.width*4/5,device.height/2,device.width,device.heigh);
                  if(countDownBtn!=null){
                    Log('直播间剩余时间还有:'+countDownBtn.text());
                  }
                  var noCountDown = (countDownBtn==null ||
                                     (countDownBtn!=null && countDownBtn.text==null)||
                                     (countDownBtn!=null && countDownBtn.text()==''));
                  if(noCountDown){
                    count++;
                    var min=0;
                    var waitTime=random(62,66);
                    var isLike = (random(1,11)>=9);
                    if(random(1,7)>=6){
                      waitTime=random(70,90);
                    }
                    var likeTime = random(50,70);
                    if(TYPE == 4){
                      waitTime = random(30,40)
                    }
                    showTip('进入直播间');
                    while((waitTime-min)>=0){
                      showTip('直播间等待倒计时'+(waitTime-min)+"s");
                      if(isLike && min==likeTime){
                        quickPress(device.width/6,device.height/5,device.width/3,device.height*23/50,5);
                      }
                      sleep(1000);
                      min++;
                    }
                    if(TYPE == 4){
                      var btn = checkBtnAllLR('领金币',device.width*2/3,device.width);
                      if(btn == null){
                        btn = checkBtnAllLR('领福利',device.width*2/3,device.width);
                      }
                      if(btn!=null){
                        btnClick(btn);
                        sleep(2000)
                        back();
                      }
                    }
                  }else{
                    sleep(2000);
                    count = 12;
                  }
                  var backTimes = 0;
                  var liveBtn = null;
                  while(liveBtn == null && backTimes < 5){
                    back();
                    sleep(1000);
                    var goBack=checkBtnStart('退出',0,device.height/3,device.width,device.height*4/5);
                    if(goBack !=null){
                      btnClick(goBack);
                      sleep(2000);
                    }
                    liveBtn = checkBtn('看直播领金币',0,0,device.width,device.height/5);
                    if(liveBtn == null){
                      liveBtn=checkBtn('规则',device.width/2,0,device.width,device.height/4);
                    }
                    if(liveBtn == null){
                      if(TYPE == 4){
                        liveBtn = checkBtn("详情",device.width*2/3,0,device.width,device.height/4);
                      }else{
                        liveBtn = checkBtn("抵用金",0,0,device.width,device.height/3);
                      }
                      if(liveBtn!=null){
                        count == 12;
                        return;
                      }
                    }
                    backTimes++;
                  }
                  if(noCountDown){
                    showTip('查找新直播间');
                    var scrollTimes = random(3,6);
                    for(var i = 0;i<scrollTimes;i++){
                      var w=random(parseInt(device.width*2/3),parseInt(device.width*4/5));
                      var sH=random(parseInt(device.height*4/5),parseInt(device.height*2/3));
                      var eH=random(parseInt(device.height/5),parseInt(device.height/6));
                      gesture(random(2,5)*100,[w,sH],[w,eH]);
                      sleep(1000);
                    }
                  }
                  //=============================band END==============================//
                }
              }
            }
          }
        }
      }
    }
  }
}


//金币广告任务
function shuaAdReward(isTop){
  if(!hadKSReward){
    showTip('金币任务做完了');
    sleep(1000);
    return;
  }
  showTip('查询金币广告任务');
  var reward=checkBtnAllLR("金币广告任务",0,device.width*4/5);
  if(reward == null){
    toTop();
  }
  showTip('查询金币广告任务');
  var hadReward=checkTaskBtn("金币广告任务",0,device.width*4/5,'悬赏任务');
  var reward=checkBtnAllLR("金币广告任务",0,device.width*4/5);
  var times = 10;
  if(reward!=null){
    times = getRewardTimse(reward,'多看多得','广告金币');
    if(times == -1){
      times = getRewardTimse(reward,'看广告限时','广告金币');
    }
    if(times == -1){
      times = getRewardTimse(reward,'累计看','广告金币');
     }
    if(times == -1){
      times = 10;
    }
    if(times == 0){
      hadReward=false;
    }else{
      hadReward=true;
    }
  }
  if(hadReward){
    var count=1;
    while(count<=times){
      showTip('查询是否还有金币任务');
      reward=checkBtnAllLR("金币广告任务",0,device.width*4/5);
      if(reward!=null){
        if(adjustPos(reward,'金币广告任务')){
          btnClick(reward);
          sleep(2000);
          reward=checkBtnAllLR("金币广告任务",0,device.width*4/5);
          if(reward==null){
            shuaKuaiShouAdvert();
            sleep(2000);
          }else{
            var times = getRewardTimse(reward,'多看多得','广告金币');
            if(times == -1){
              times = getRewardTimse(reward,'看广告限时','广告金币');
            }
            if(times == -1){
              times = getRewardTimse(reward,'累计看','广告金币');
             }
            if(times == 0){
              showTip('广告金币任务做完了');
              hadKSReward=false;
            }else if(times>0){
              showTip('广告金币务倒计时中');
            }
            count=11;
          }
        }
      }
      count++;
    }
  }else{
    showTip('没有金币广告任务');
    sleep(1500);
  }
}

function getRewardTimse(reward,str,tip){
  return getTimse(reward,str," ",tip,1)
}

function getTimse(reward,str,split,tip,line){
  showTip('查询'+tip+'次数');
  var arr= getBounds(reward);
  var adTimes = checkBtn(str,0,arr[1],device.width,arr[1]+device.width*line/8);
  if(adTimes!=null){
    var proText = adTimes.text();
    let index = proText.indexOf(split.toString());
    if(index == -1){
      index = 0
    }
    let tt = proText.substring(index+split.toString().length,proText.indexOf('/'));
    var pro = parseInt(tt);
    var allPro = parseInt(proText.substr(proText.length-2));
    if(isNaN(allPro)){
      allPro = parseInt(proText.substr(proText.length-1));
    }
    Log('查询进度:'+proText+'，已完成:'+pro+', 总共:'+allPro+",剩余:"+(allPro-pro));
    if(isNaN(pro)){
      return -1;
    }else{
      return allPro-pro;
    }
  }else{
    return -1;
  }
}


function shuaReward(rewardTipArr){
  if(!hadKSReward){
    showTip('悬赏任务做完了');
    sleep(1000);
    return;
  }
  showTip('查询金币悬赏任务');
  var reward=checkBtnAllLR("金币悬赏",0,device.width*4/5);
  if(reward == null){
    toTop();
  }
  showTip('查询金币悬赏任务');
  var times = 21;
  var name = checkTaskBtnList(["金币悬赏",'7日必得'],0,device.width*4/5,'金币悬赏');
  Log('查到['+name+"]悬赏任务");
  if(name == null){
    showTip('没查到悬赏任务');
    sleep(1000);
    return;
  }
  var hadReward=checkTaskBtn(name,0,device.width*4/5,'悬赏任务');
  reward=checkBtnAllLR(name,0,device.width*4/5);
  if(reward!=null){
    if(rewardTipArr!=null && rewardTipArr.length>0){
      for (let index = 0; index < rewardTipArr.length; index++) {
        var element = rewardTipArr[index];
        times = getRewardTimse(reward,element,'金币悬赏');
        if(times!=-1){
          break;
        }
      }
    }
    if(times == -1){
      times = 10;
    }
    if(times == 0){
      hadReward=false;
      showTip('悬赏任务做完了');
      hadKSReward=false;
    }else{
      hadReward=true;
    }
  }
  hadReward=checkTaskBtn(name,0,device.width*4/5,'悬赏任务');
  var count = 1
  sleep(2000);
  if(hadReward){
    while(count<=times){
      reward=checkBtnAllLR(name,0,device.width*4/5);
      if(reward!=null){
        showTip('查询是否还有悬赏');
        btnClick(reward);
        sleep(3000);
        reward=checkBtnAllLR(name,0,device.width*4/5);
        if(reward==null){
          shuaKuaiShouAdvert();
          sleep(2000);
        }else{
          times = getRewardTimse(reward,'观看广告单日最高','金币悬赏');
          if(times == -1){
            times = getRewardTimse(reward,'看广告赚金币','金币悬赏');
          }
          if(times == -1){
            times = getRewardTimse(reward,'看广告限时多送','金币悬赏');
          }
          if(times == -1){
            times = getRewardTimse(reward,'累计看','金币悬赏');
          }
          if(times == 0){
            showTip('悬赏任务做完了');
            hadKSReward=false;
          }else{
            showTip('悬赏任务倒计时中');
          }
          count=11;
        }
      }
      count++;
    }
  }else{
    showTip('没有悬赏任务');
    sleep(1500);
  }
}

//快手逛街
function shopping(isTop){
  if(!hadKShopping){
    showTip('逛街任务已完成了');
    sleep(1000);
    return;
  }
  showTip('查询逛街任务');
  var shopping=checkBtnAllLR('逛街领',0,device.width*2/3);
  if(shopping ==null){
    toTop();
  }
  var name = checkTaskBtnList(["逛街领",'逛好货','挑好货','逛街送'],0,device.width*4/5,'逛街任务');
  var canShopping = checkTaskBtn(name,0,device.width*4/5,'逛街任务');
  if(canShopping){
    shopping=checkBtnAllLR(name,0,device.width*4/5);
    var sTimes = 11;
    if(shopping!=null){
      sTimes = getTimse(shopping,'浏览',"完成 ",'逛街任务',1);
      if(sTimes == -1){
        sTimes = getTimse(shopping,'浏览',"完成",'逛街任务',1);
      }
      if(sTimes == -1){
        sTimes = 11;
      }
      if(sTimes == 0){
        hadKShopping=false;
      }else{
        hadKShopping=true;
      }
    }
    sleep(2000)
    var count=0;
    while(count<sTimes){
      var reward=checkBtnAllLR(name,0,device.width*2/3);
      if(reward!=null){
        btnClick(reward);
        win.setPosition(0,200);
        sleep(2000);
        gesture(300,[parseInt(device.width*2/3),device.height*2/3],[
          parseInt(device.width*2/3),device.height/6]);
        var inShopping=checkAc("更多商品",device.width/2,0,device.width,device.height/3,false,'逛街页面');
        if(!inShopping){
          sleep(1000);
          reward=checkBtn("逛逛街 多赚钱",0,0,device.width,device.height);
        }
        if(reward!=null){
          sleep(1000);
          var time=0;
          var totalTime=random(95,108);
          while(time<totalTime){
            showTip('逛街开始,当前剩余：'+(totalTime-time)+'s');
            if(time>30 && random(1,5) >= 4){
              randomScroll(true,false);
            }else{
              randomScroll(false,false);
            }
            var runTime=random(2,5);
            let waitTime=time+runTime;
            while(time<=waitTime){
              sleep(1000);
              time++;
              if(time%20==0){
                var fresh = checkBtn('刷新',device.width/4,device.height/2,device.width*3/4,device.height*2/3);
                if(fresh!=null){
                  showTip('刷新页面，重新开始');
                  btnClick(fresh);
                  checkAc('浏览',device.width/5,0,device.width/2,device.height/4,false,'逛街');
                  time = waitTime-runTime;
                }
              }
            }
          }
          showTip('逛街完毕');
          var waitTime = checkBtnAllLR(":",device.width*4/5,device.width);
          if(waitTime == null){
            waitTime = checkBtnAllLR("s",device.width*4/5,device.width);
            if(waitTime!=null && waitTime.text!=null){
              var moreTime = parseInt(waitTime.text())+5;
              var time= 0;
              while(time< moreTime*1000){
                showTip('延迟'+moreTime+'s,当前剩余：'+(moreTime-(time/1000))+'s');
                var w=random(parseInt(device.width/3),parseInt(device.width*4/5));
                gesture(500,[w,device.height*2/3],[w,device.height/6]);
                var ranTime=parseInt(random(2,5))*1000;
                time=time+ranTime;
                sleep(ranTime);
              }
            }
          }
          showTip('逛街时间完毕');
          sleep(2000);
          back();
          sleep(2000);
          var giveUp=checkBtn("放弃奖励",0,device.height/3,device.width,device.height);
          if(giveUp == null){
            giveUp = checkBtn("离开",0,device.height/2,device.width*2/3,device.height);
          }
          if(giveUp!=null){
            btnClick(giveUp);
            sleep(2000);
          }
        }else{
          if(count == 0){
            showTip('逛街任务做完了');
            hadKShopping = false;
          }else{
            showTip('逛街任务倒计时中');
          }
          count = 11;
        }
      }
      count++;
    }
  }
}

function getKSMoney(){
  var getM = checkBtn("领现金",device.width/2,0,device.width,device.height/3);
  if(getM == null){
    ksTaskClick();
    sleep(2000);
  }
  getM = checkBtn("领现金",device.width/2,0,device.width,device.height/3);
  if(getM!=null){
    btnClick(getM);
    var inMon = checkAc("可兑换",0,0,device.width/2,device.height/3,false,"提现");
    if(inMon){
      var sanyuan = checkBtn("3元",device.width/5,0,device.width*3/4,device.height*4/5);
      if(sanyuan!=null){
        btnClick(sanyuan);
        sleep(2000);
        var duihuan = checkBtnStart("立即兑换",0,device.height*2/3,device.width,device.height);
        if(duihuan!=null){
          btnClick(duihuan);
          sleep(2000);
          duihuan = checkBtnStart("极速到账",0,device.height*2/3,device.width,device.height);
          if(duihuan!=null){
            btnClick(duihuan);
            sleep(2000)
            var inWX = checkAc("选择一个聊天",0,0,device.width,device.height/4,false,'微信');
            if(inWX){
              back();
              sleep(2000);
            }
            var can = checkAc("提现",0,0,device.width,device.height/4,false,'提现页面');
            if(can){
              duihuan = checkBtnStart("立即提现",0,device.height/3,device.width,device.height*3/4);
              if(duihuan!=null){
                btnClick(duihuan);
                sleep(2000);
              }
            }
          }
        }
      }else{
        showTip('提现金额不够3元');
        sleep(2000);
      }
      checkAc("抵用金",0,0,device.width,device.height/3,true,'任务列表');
    }
  }
}

//翻倍
function ksDoubleGold(){
  showTip('检测是否有双倍')
  var live=checkBtnAll("开启看视频奖励");
  if(live == null){
    toTop();
  }
  var hadDouble = checkTaskBtn("开启看视频奖励",0,device.width,'双倍奖励')
  if(hadDouble){
    live=checkBtnAll("开启看视频奖励");
    if(live!=null){
      btnClick(live);
      sleep(2000);
    }
  }
}

//快手宝箱
function shuaBox(){
  showTip('查询开宝箱得金币任务');
  var box=checkBtn("开宝箱得金币",0,device.height*2/3,device.width,device.height);
  if(box!=null){
    btnClick(box);
    sleep(5000);
    checkKuaiShouAd();
  }
}


function checkKuaiShouAd(){
  showTip('检测广告视频弹窗');
  var lookAdAgain=checkBtn("看视频最高得",0,device.height/4,device.width,device.height);
  if(lookAdAgain==null){
    lookAdAgain=checkBtn("看广告再得",0,device.height/2,device.width,device.height);
  }
  if(lookAdAgain!=null){
    btnClick(lookAdAgain);
    sleep(1000);
    shuaKuaiShouAdvert();
  }else{
    lookAdAgain=checkBtn("看直播再赚",0,device.height/4,device.width,device.height);
    if(lookAdAgain!=null){
      btnClick(lookAdAgain);
      let aaa = 0;
      let bbb = random(64,69);
      while(aaa<bbb){
        showTip('直播间倒计时:'+(bbb-aaa));
        sleep(1000);
        aaa++;
      }
      back();
      sleep(1000);
      var goBack=checkBtnStart('退出',0,device.height/3,device.width,device.height*4/5);
      if(goBack !=null){
        btnClick(goBack);
        sleep(2000);
      }
      checkAc("抵用金",0,0,device.width,device.height/3,true,'任务列表');
    }else{
      showTip('没有广告视频弹窗');
      sleep(1000);
    }
  }
}


//刷快手广告
function shuaKuaiShouAdvert(){
  showTip('检测是否进入广告页面');
  var name = '后可领取奖励';
  var inAd=checkAc('后可领取奖励',0,0,device.width*2/3,device.height/4,false,'广告页');
  var adAc='com.yxcorp.gifshow.ad.award.AwardVideoPlayActivity';
  if(!inAd){
    inAd = checkAc('领取观看奖励',0,0,device.width*2/3,device.height/4,false,'广告页');
    name = '领取观看奖励';
  }
  if(!inAd){
    inAd = checkAc('成功领取奖励',0,0,device.width*2/3,device.height/4,false,'广告页');
    name = '成功领取奖励';
  }
  if(!inAd){
    inAd=(currentActivity()==adAc);
  }
  if(inAd){
    var isAD = checkBtn(name,0,0,device.width*2/3,device.height/4);
    AD_WAIT_TIME=random(20,30);
    var count = AD_WAIT_TIME;
    if(isAD!=null && isAD.text!=null&&containsNumber(isAD.text())){
      count =parseInt(isAD.text().toString(),10)+random(1,4);
      showTip('广告检测剩余时间'+count+'s');
    }else{
      Log('广告默认时间:'+count);
    }
    sleep(2000);
    var startAd=true;
    while(startAd){
      sleep(1000);
      if(count == 5){
        adAc = currentActivity();
      }
      if(count< 1){
        back();
        showTip('查询是否还能看广告');
        sleep(3000);
        var lookAgain=checkAdBtn();
        if(lookAgain!=null){
          btnClick(lookAgain);
          sleep(2000);
          isAD=checkBtn('后可领取奖励',0,0,device.width*2/3,device.height/4);
          if(isAD!=null&&isAD.text!=null&&containsNumber(isAD.text())){
            count =parseInt(isAD.text().toString(),10)+random(1,4);
            showTip('广告检测剩余时间'+count+'s');
          }else{
            count=parseInt(AD_WAIT_TIME);
            Log('广告默认时间:'+count);
          }
          sleep(2000);
        }else{
          var giveUp=checkBtn('放弃奖励',0,device.height/2,device.width,device.height);
          if(giveUp!=null){
            btnClick(giveUp);
            showTip('不广告页了-放弃');
            startAd=false;
          }else{
            var isIndex = null;
            if(TYPE == 4){
              isIndex=checkBtn("规则",device.width/2,0,device.width,device.height/4);
              if(isIndex == null){
                isIndex=checkBtn("详情",device.width/2,0,device.width,device.height/4);
              }
            }else{
              isIndex=checkBtn("去赚钱",device.width/2,device.height*4/5,device.width,device.height);
            }
            if(isIndex==null){
              if(currentActivity().toString() != adAc){
                showTip('返回桌面重新打开快手')
                home();
                sleep(2500)
                if(TYPE == 4){
                  openApp('快手');
                }else{
                  openApp('快手极速版');
                }
                sleep(2000);
              }
              back();
              sleep(2000);
              lookAgain=checkAdBtn();
              if(lookAgain == null){
                isAD = checkBtnEnd('领取奖励',0,0,device.width*2/3,device.height/4);
              }
              if(lookAgain!=null || isAD!=null){
                showTip('返回继续查看广告')
                lookAgain=checkAdBtn();
                if(lookAgain == null){
                  back();
                  sleep(2000);
                  lookAgain=checkAdBtn();
                }
                if(lookAgain!=null){
                  btnClick(lookAgain);
                  sleep(2000);
                  var isAD=checkBtn('后可领取奖励',0,0,device.width*2/3,device.height/4);
                  if(isAD == null){
                    isAD = checkAc('领取观看奖励',0,0,device.width*2/3,device.height/4,false,'广告页');
                  }
                  if(isAD!=null&&isAD.text!=null&&containsNumber(isAD.text())){
                    count =parseInt(isAD.text().toString(),10)+random(1,4);
                    showTip('广告检测剩余时间'+count+'s');
                  }else{
                    count=AD_WAIT_TIME;
                    Log('广告默认时间:'+count);
                  }
                }else{
                  var giveUp=checkBtn('放弃奖励',0,device.height/2,device.width,device.height);
                  if(giveUp!=null){
                    btnClick(giveUp);
                    showTip('不在广告页了-放弃');
                    startAd=false;
                  }
                }
              }else{
                var giveUp=checkBtn('放弃奖励',0,device.height/2,device.width,device.height);
                if(giveUp!=null){
                  btnClick(giveUp);
                }
                showTip('不在广告页了');
                startAd=false;
              }
            }else{
              showTip('不在广告页了-回首页了');
              startAd=false;
            }
          }
        }
      }else{
        count--;
        ui.run(function(){
          showTip("当前广告等待"+count+"s");
        });
      }
    }
  }else{
    showTip('没进入广告页');
  }
}

function checkAdBtn(){
  AD_WAIT_TIME=random(25,35);
  var lookAgain=checkBtnStart('再看一个',0,device.height/2,device.width,device.height);
  if(lookAgain==null){
    lookAgain=checkBtnStart('再看一个最高',0,device.height/2,device.width,device.height);
  }
  if(lookAgain==null){
    lookAgain=checkBtnStart('继续观看',0,device.height/2,device.width,device.height);
    AD_WAIT_TIME=random(5,10);
  }
  return lookAgain;
}



function getKSTask(type,isTop){
  checkKuaiShouAd();
  switch(type){
    case 1:
      //1:宝箱广告
      shuaBox();
      break;
    case 2:
      //刷悬赏
      toTop();
      var taskTop = null;
      let taskCount = 0;
      while(taskTop == null && taskCount<4){
        randomScroll(true,true);
        taskTop = checkBtnAllLR("日常任务",0,device.width*2/3);
        sleep(1000);
        taskCount++;
      }
      var reward=checkBtnAllLR("金币悬赏",0,device.width*2/3);
      if(reward!=null){
        showTip('查悬赏任务');
        sleep(1500);
        var arr = ['观看广告单日最高','看广告赚金币','看广告限时多送','累计看']
        shuaReward(arr);
      }else{
        showTip('查金币任务');
        sleep(1500);
        shuaAdReward(isTop);
      }
      break;
    case 3:
      //逛街
      shopping(isTop);
      break;
    case 4:
      //看直播
      ksLive("live_follow_text" ,"award_count_down_text");
      showTip('返回任务页');
      if(checkBtn('看直播领金币',0,0,device.width,device.height/5)!=null) {
        back();
      }
      break;
    case 5:
      //双倍
      ksDoubleGold();
      break;
    case 6:
      //提现
      getKSMoney();
      break;
  }
  sleep(2000);
}

function ksTaskClick(){
  var get=checkBtn("去赚钱",device.width/2,device.height*4/5,device.width,device.height);
  if(get!=null){
    btnClick(get);
    showTip('等待页面加载完毕...');
    sleep(3000);
  }
  return checkAc("抵用金",0,0,device.width,device.height/3,false,'任务列表');
}

function toKSTask(){
  showTip('去任务页');
  var inTask=ksTaskClick();
  if(!inTask){
    showTip('检测失败，重进');
    sleep(1500);
    ksTaskClick();
  }
  sleep(1000);
  showTip('页面加载完毕');
}
//=======================================快手END=======================================//


//任务列表想
function startTaskList(typeArray){
  var index=typeArray.length-1;
  for(var i=index;i>=0;i--){
    var type=random(0,i);
    getTask(typeArray[type])
    typeArray.splice(type,1);
  }
}

function getTask(taskType){
  switch(TYPE){
    case 0:
      //1:领取吃饭补贴 2:领取睡觉补贴 3:看广告赚钱
      //4:逛商品 5:宝箱广告任务 6:去赚钱任务
      getTTTask(taskType,(taskType==5));
      break;
    case 1:
      //1:宝箱广告2:刷悬赏3:逛街
      getKSTask(taskType,(taskType==1));
      break;
    case 2:
      getDYTask(taskType,(taskType==1));
      break;
    case 3:
      getKDTask(taskType,(taskType==1));
      break;
    case 4:
      getKSBZTask(taskType,(taskType==1));
      break
  }
}

function quickPress(left,top,right,bottom,time){
  var x = random(parseInt(left),parseInt(right));
  var y = random(parseInt(top),parseInt(bottom));
  var count = random(5,time+5);
  showTip('点个小心心');
  sleep(1000);
  win.setPosition(0,bottom+80);
  for (var i = 0; i < count; i++) {
    sleep(random(1,2)*100)
    press(x, y,80);
  }
  win.setPosition(0,200);
}

function checkBtnByIdWithLimt(str,left,top,right,buttom,limt){
  try{
    var lAd=id(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询id['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      var btn;
      for(var i=0;i<lAd.length;i++){
        Log('查询'+lAd[i]+'按钮:');
        var arr=getBounds(lAd[i]);
        if(arr[0]>limt-30&&arr[0]<limt+30){
          btn=lAd[i];
          break;
        }
      }
      return btn;
    }
  }catch(err){
    return null;
  }
}

function checkBtnById(str,left,top,right,buttom){
  try{
    var lAd=idContains(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询id['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      for(var i=0;i<lAd.length;i++){
        Log('查询'+lAd[i]+'按钮:');
      }
      return lAd[0];
    }
  }catch(err){
    return null;
  }
}


function checkBtnStart(str,left,top,right,buttom){
  try{
    var lAd=textStartsWith(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      for(var i=lAd.length-1;i>=0;i--){
        Log('查询'+lAd[i]+'按钮:');
      }
      return lAd[0];
    }
  }catch(err){
    Log('没有查询到err'+err);
    return null;
  }
}

function checkBtnEnd(str,left,top,right,buttom){
  try{
    var lAd=textEndsWith(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      for(var i=lAd.length-1;i>=0;i--){
        Log('查询'+lAd[i]+'按钮:');
      }
      return lAd[0];
    }
  }catch(err){
    return null;
  }
}

function checkNumBtn(str,left,top,right,buttom){
  try{
    var lAd=textContains(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      var btn = null;
      for(var i=0;i<lAd.length;i++){
        Log('查询'+lAd[i]+'按钮:');
        if(lAd[i].text!=null && containsNumber(lAd[i].text())){
          btn = lAd[i];
          break;
        }
      }
      return btn;
    }
  }catch(err){
    return null;
  }
}

function checkBtnWithId(str,left,top,right,buttom){
  try{
    var lAd=id(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询id['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      for(var i=0;i<lAd.length;i++){
        Log('查询'+lAd[i]+'按钮:');
      }
      return lAd[0];
    }
  }catch(err){
    return null;
  }
}


function checkBtn(str,left,top,right,buttom){
  try{
    var lAd=textContains(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询['+str+']按钮:'+lAd.length);
    if(lAd.length==0){
      Log('没有查询到'+str);
      return null;
    }else{
      for(var i=lAd.length-1;i>=0;i--){
        Log('查询'+lAd[i]+'按钮:');
      }
      return lAd[0];
    }
  }catch(err){
    return null;
  }
}

function getBounds(btn){
  var bArr=new Array();
  if(btn!=null){
    var btnBounds=btn.bounds();
    Log('范围：'+btnBounds);
    bArr[0]=btnBounds.centerX();
    bArr[1]=btnBounds.centerY();
  }
  return bArr;
}

function btnClick(btn){
  var btnB=getBounds(btn);
  if(btnB[0]>=0 && btnB[1]>=0){
    if(btnB[1]>device.height/2-100){
      win.setPosition(0,200);
    }else{
      win.setPosition(0,device.height/2);
    }
    sleep(1000);
    Log('点击区域w:'+btnB[0]+",h:"+btnB[1]);
    press(btnB[0],btnB[1],10);
  }
}

//刷首页
function shua(){
  showTip('开始刷首页');
  Log('初始阅读时长：：'+sTotalTime);
  start=true;
  adWaitTime=0;
  dyAdWaitTime=0;
  ksAdWaitTime=0;
  kdAdWaitTime=0;
  sleepTime=0;
  var count = 1;
  while(start && sTotalTime<=(lookTime*3600+5)){
    var myDate=new Date();
    var hour=myDate.getHours();
    var min=myDate.getMinutes();
    Log("hour="+hour+",min = "+min);
    if(!reStartApp&&(hour==0||hour==24)&&min>=1){
      var nowDay=myDate.getDate();//获取今天的日期
      Log('defultDate:'+defultDate+",nowDay:"+nowDay);
      if(defultDate!=nowDay){
        showTip('跨天了');
        reStartApp=true;
        start=false;
        return
      }else{
        Log('同一天');
      }
    }
    if(TYPE == 3){
      kdScroll();
    }else{
      scroll();
    }
    switch(TYPE){
      case 0://头条
        scrollTT(count);
        break;
      case 1://快手
      case 4:
        scrollKS();
        break;
      case 2://抖音
        scrollDY();
        break;
      case 3://看点
        scrollKD(count);
        break;
    }
    if(win.getY()!=parseInt(device.height/5)){
      win.setPosition(0,parseInt(device.height/5));
    }
    count++;
  }
}

//看点滑动
function kdScroll(){
  var scrollTimes = random(1,4);
  for (let index = 0; index < scrollTimes; index++) {
    var sH;
    var w=device.width/2;
    var h=device.height-200;
    var sW=random(parseInt(w/3),w);
    var time=parseInt(random(3,5))*100;
    sH=random(parseInt(device.height*3/4),parseInt(device.height*4/5));
    var upH=parseInt(device.height/500) //获得距离的上限
    var downH=parseInt(device.height/400) //获得距离的下限
    var dH=random(upH,downH)*100;
    gesture(time,[sW,sH],[sW,dH]);
  }
  sleepTime=random(1,2)*60+random(5,55);
  Log('刷的总时长：'+sTotalTime+"s");
  var i = sleepTime;
  var t=0;
  var isIndex = false;
  likeTime = random(60,80);
  while(t<=i){
    if(t>0&&t%20 ==0){
      if(!isIndex){
        showTip('检测是否在视频列表');
        var safe = checkBtn('请完成安全验证',0,0,device.width,device.height/5);
        if(safe!=null){
          win.setPosition(0,device.height*2/3)
          waitTime(10,"请手动验证安全模块，")
        }
        var goldIcon = checkByIdAllLR('gold',device.width*3/4,device.width);
        if(goldIcon==null){
          back();
          sleep(2000);
        }
        isIndex = true;
      }
      var double = checkBtnAllLR('点击翻倍',device.width*2/3,device.width);
      if(double == null){
        double = checkBtnAllLR('翻倍领取',device.width*2/3,device.width);
      }
      if(double!=null){
        btnClick(double)
      }
      var stop = checkBtnAllLR('重播',device.width/3,device.width*2/3);
      if(stop!=null){
        i = t;
      }
    }

    if(t == likeTime){
      var goldArr = null;
      var likeBtn = null;
      try{
        var goldIcon = checkByIdAllLR('gold',device.width*3/4,device.width);
        if(goldIcon!=null){
          goldArr = getBounds(goldIcon);
        }
        var lAd=id('like')
        .boundsInside(device.width*3/4,device.height/5,device.width,device.height*4/5).find();
        if(lAd.length!=0){
          for(var i=0;i<lAd.length;i++){
            var arr=getBounds(lAd[i]);
            if(goldArr!=null){
              if(arr[1]>goldArr[1]+250 || arr[1]<goldArr[1]-250){
                likeBtn=lAd[i];
                break;
              }
            }else{
              likeBtn=lAd[i];
              break;
            }
          }
        }
      }catch(err){
      }
      if(likeBtn!=null){
        Log('点赞！！！！');
        btnClick(likeBtn);
        showTip('检测是否还在视频列表页');
        var goldIcon = checkBtn('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height);
        let count = 1;
        while(goldIcon == null && count<4){
          goldIcon = checkBtn('小视频',device.width*2/5,parseInt(device.height*4/5),device.width*4/5,device.height);
          count++;
          sleep(1000);
        }
        if(goldIcon == null){
          back();
          sleep(1000);
        }
      }
    }
    ui.run(function(){
      showTip("当前画面等待"+t+"s");
    });
    sleep(1000);
    t++;
  }
  sTotalTime=sTotalTime+t-1;
  kdAdWaitTime=kdAdWaitTime+t-1;
}

//看点滑动
function  scrollKD(count){
    if(kdAdWaitTime>11*60){//300
      showTip('返回任务页面刷金币');
      toKDTask();
      sleep(3000);
      //1:开宝箱 2:悬赏 3:喝水赚钱；4:大转盘任务 5:红包雨
      var list=[1,2,3,4];
      startTaskList(list);
      btnKDIndex();
      showTip('返回视频列表');
      sleep(2000);
      kdAdWaitTime=0;
    }
    //只能是4，兼容不能滑动只能通过选不同title来刷头条
    if(count%6==0){
      if(ac!=currentActivity()){
        back();
      }
      sleep(500);
      var kdTitle = ["趣闻","推荐","搞笑","美食","体育","综艺","美食","影视","军事","游戏","小品"]
      var titleIndex = random(0,kdTitle.length-1);
      btnTitle=kdTitle[titleIndex];
      if(defultTitle==null){
        defultTitle=btnTitle;
        click(defultTitle);
      }else{
        click(setTitle(kdTitle,null));
      }
      sleep(3000);
    }
  }

//==============================================快手滑动逻辑Start==============================================//
 //快手评论
function scrollksComment(){
var comBtn = checkBtnById('comment_icon',device.width*2/3,device.height/4, device.width,device.height*4/5);
  if(comBtn!=null){
    showTip('点击评论')
    btnClick(comBtn);
    sleep(3000);
    var end = checkBtnAllLR('没有更多评论',device.width/4,device.width*4/5);
    if(end!=null){
      win.setPosition(0,device.height/3);
      sleep(1000);
      press(device.width/2,device.height/10,10);
      sleep(2000);
      randomScroll(false,true);
      sleep(1000);
      return;
    }
    var times = random(1,3);
    var count = 0;
    showTip('浏览评论')
    while(count<times){
      if(count>0){
        randomScroll(false,random(1,3)==3?true:false);
      }else{
        randomScroll(false,false);
      }
      sleep(1000);
      var end = checkBtnAllLR('没有更多评论',device.width/4,device.width*4/5);
      if(end == null){
        end = checkByIdAll('finish_button_wrapper');
      }
      if(end!=null){
        count = times;
      }
      if(random(0,6)>=5){
        var like = checkBtnById('comment_like_frame',device.width*2/3,device.height/2,device.width,device.height);
        if(like!=null){
          btnClick(like);
          sleep(1000);
        }
      }
      count++;
    }
    win.setPosition(0,device.height/3);
    sleep(1000);
    back();
    sleep(2500)
    back();
    sleep(2500)
  }
}

//快手滑动
function scrollKS(){
  var isBZ = TYPE == 4;
  storage.put(isBZ?KS_READ_KEY:KSBZ_READ_KEY,sTotalTime);
  Log('ks_waitTime:'+ksAdWaitTime);
  if((hadKShopping && lookKSShoppint &&ksAdWaitTime>65)||//逛街
     (hadKSLive && lookKSLive && ksAdWaitTime>3*60)||//直播
     (lookKSBox && ksAdWaitTime>10*60)||//宝箱
     (hadKSReward && lookKSReward &&ksAdWaitTime>15*60)){//悬赏
    //1:宝箱广告2:刷悬赏3:逛街4:看直播
    var typeArray =[1,2,3,4];
    if(lookKSShoppint){
      lookKSShoppint = false;
      typeArray=[3]
    }else if(lookKSLive){
      lookKSLive = false;
      typeArray=[3,4]
    }else if(lookKSBox){
      lookKSBox = false;
      typeArray=[1,3,4]
    }else{
      ksAdWaitTime = 0;
      typeArray=[1,2,3,4]
      lookKSShoppint = true;
      lookKSLive = true;
      lookKSBox = true;
    }
    if(isBZ){
      toKSBZTask()
    }else{
      toKSTask();
    }
    sleep(2000);
    checkKuaiShouAd();
    startTaskList(typeArray);
    showTip('返回首页刷视频');
    sleep(2000);
    var entern=checkBtn(isBZ?'精选':'首页',0,parseInt(device.height*2/3),device.width/2,device.height);
    if(entern!=null){
      btnClick(entern);
    }
    if(isBZ){
      checkAc('首页',0,parseInt(device.height*2/3),device.width/2,device.height,true,'首页');
    }else{
      checkAc('同城',0,0,device.width*3/4,device.height/3,true,'首页');
    }

  }
}

function getKSScrollTask(type,longTime,timeEnd){
  switch(type){
    case 1://点赞
      if(longTime && timeEnd && ksOpenLike && random(1,2) == 2){
        var like=checkBtnById('like_icon',device.width*2/3,device.height/4,device.width,device.height);
        if(like ==null){
          like=checkBtnById('like_button',device.width*2/3,device.height/4,device.width,device.height);
        }
        if(like!=null){
          btnClick(like);
          sleep(2000);
        }
      }
      break;
    case 2://评论
      if(timeEnd && random(1,4) == 4){
        scrollksComment();
      }
      break
    case 3://收藏
      if(longTime && timeEnd && random(1,5) == 5){
        var collect=checkBtnById('collect_text',device.width*2/3,device.height/3,device.width,device.height);
        if(collect!=null && collect.text!=null && containsNumber(collect.text())){
          var n = parseInt(collect.text());
          if(!isNaN(n) && n >2000){
            showTip('收藏一下');
            btnClick(collect);
            sleep(1000);
          }
        }
      }
      break;
    case 4://浏览主播
    if(timeEnd && random(1,5) == 5){
      win.setPosition(0,300);
      sleep(1000);
      var isAd  = checkBtn('立即下载',0,device.height/2,device.width,device.height);
      if(isAd == null){
        isAd  = checkBtn('已下载',0,device.height/2,device.width,device.height);
      }
      if(isAd!=null){
        Log('广告主播，不看。')
        return
      }
      var likeN=checkBtnById('like_count_view',device.width*2/3,device.height/4,device.width,device.height*3/4);
      if(likeN!=null && likeN.text!=null && likeN.text().indexOf('w')!=-1){
        let count = 0;
        showTip('浏览作者主页中...');
        while(count <2){
          let dH = random(device.height/2,parseInt(device.height*3/4));
          let ss = random(device.width/2,parseInt(device.width*2/3));
          let se = random(device.width/4,parseInt(device.width/2));
          gesture(35,[ss,dH],[se,dH]);
          sleep(2500);
          count++;
        }
        let scrollCount = 0
        let sTimes = random(3,6);
        while(scrollCount<=sTimes){
          showTip('浏览作者主页中...');
          randomScroll(false,true);
          sleep(1000);
          var end = checkBtnById('profile_no_more',0,device.height*2/3, device.width,device.height);
          if(end!=null){
            scrollCount = sTimes;
          }
          if(random(1,3)==3 && (scrollCount>0 && scrollCount%2 == 0)){
            win.setPosition(0,0);
            sleep(3000);
            press(random(parseInt(device.width/6),parseInt(device.width*9/12)),random(parseInt(device.height/3),parseInt(device.height*4/5)),10);
            var inC = checkAc('作品列表',0,0,device.width/2,device.height/4,false,"内容");
            if(inC){
              showTip('观看作品');
              sleep(random(5,13)*1000+random(4,9)*100+random(30,50));
              back();
              sleep(1000);
            }
          }
          scrollCount++;
        }
        win.setPosition(0,device.height/3);
        sleep(1000);
        checkAc('首页',0,parseInt(device.height*4/5),device.width,device.height,true,'视频列表');
        sleep(1000);
        randomScroll(false,true);
      }
    }
      break;
  }
}

//==============================================快手滑动逻辑END==============================================//

//==============================================抖音滑动逻辑Start==============================================
function scrollDY(){
  storage.put(DY_READ_KEY,sTotalTime);
  showTip('查询是否有红包');
  var redBagTip=checkBtn('恭喜你被红包砸中',0,device.height/3,device.width,device.height*2/3);
  if(redBagTip!=null){
    var open =id('dul').findOne(5000);
    if(open!=null){
      btnClick(open);
    }else{
      click(device.width/2,parseInt(device.height*63/100));
    }
    sleep(1500);
    back();
    sleep(1000);
  }
  if(dyAdWaitTime>13*60){
    dyTask()
    var intTask = checkArr(['金币收益','赚钱任务'],0,0,device.width,device.height/3,false,'任务页');
    if(intTask){
      dyAdWaitTime=0;
      //1:宝箱，2：广告赚金币，3：逛街,4：边买边赚,5:看小说
      var tList=[1,2,3,5];
      startTaskList(tList);
      sleep(2000);
      back();
      sleep(2500);
      checkAc('首页',0,parseInt(device.height*4/5),device.width/3,device.height,true,'首页');
      back();
      sleep(2500);
    }
  }
}

function getDYScrollTask(type,longTime,timeEnd){
  switch(type){
    case 1://点赞
      if(longTime && timeEnd && dyOpenLike && random(1,2) == 2){
        var like=checkBtnById('b8+',device.width*2/3,device.height/5,device.width,device.height*2/3);
        if(like ==null){
          like=checkBtnById('b7l',device.width*2/3,device.height/5,device.width,device.height*2/3);
        }
        if(like!=null){
          btnClick(like);
          sleep(2000);
        }
      }
      break;
    case 2:
      if(dyOpenFollow && timeEnd && random(1,4)==4){
        showTip('搜索配置类型主播')
        var msg=checkBtn('消息',device.width/2,parseInt(device.height*4/5),device.width,device.height);
        if(msg!=null){
          btnClick(msg);
          sleep(2000);
          var count = 0
          var tip = null;
          while(tip == null && count<4){
           showTip('检测表情提示弹窗')
           let dialog = checkBtn('表情推荐功能升级',0,device.height/2,device.width,device.height);
           if(dialog!=null){
             tip = checkBtnStart('好的',0,device.height*2/3,device.width,device.height);
             if(tip!=null){
               btnClick(tip);
               sleep(1000)
             }
           }
           sleep(1000);
           count++
          }
          var inMsg= checkAcById("jp",device.width*4/5,0,device.width,device.height/5,false);
          if(inMsg){
              var search = checkBtnById("jp",device.width*4/5,0,device.width,device.height/5);
              if(search!=null){
                btnClick(search);
                dyOpenFollow = false
                sleep(1000);
                var inSearch = checkAcById("et_search_kw",0,0,device.width,device.height/5,false);
                if(inSearch){
                  if(liveAnchor.length>0){
                    for (let index = 0; index < liveAnchor.length; index++) {
                      var liveText = liveAnchor[index];
                      showTip('关注['+liveText+']类型主播')
                      likeAnchor('et_search_kw',liveText,true);
                      back();
                      sleep(2000)
                      let like = storage.get(LIVETONG,true);
                      if(like){
                        storage.put(LIVETONG,false);
                        likeAnchor('et_search_kw',"Xxx.Tong",false);
                        back();
                        sleep(2000)
                        likeAnchor('et_search_kw',"LPL_9527",false);
                        back();
                        sleep(2000)
                      }
                    }
                  }
                }
              }
              showTip('返回首页观看视频')
              checkAcById("b8+",device.width*2/3,device.height/5,device.width,device.height*2/3,true);
          }
        }
      }
      break
  }
}

function likeAnchor(searchId,anchor,checkMore){
  var clear = checkBtnById('btn_clear',device.width/2,0,device.width,device.height/5);
  if(clear!=null){
    btnClick(clear)
    sleep(2000)
  }
  var input = checkBtnById(searchId,0,0,device.width,device.height/5);
  if(input!=null){
   input.setText(anchor);
   sleep(2000);
   var count = 0;
   search = null;
   while(search == null && count<4){
     search = checkBtn("搜索",0,0,device.width,device.height/2);
     sleep(1000);
     count++
   }
   if(search!=null){
     btnClick(search);
     var inResult = checkAc("搜索",device.width*3/4,0,device.width,device.height/2,false,"搜索结果");
     if(inResult){
       if(checkMore){
        var index = random(1,3);
        startSearch(index,anchor);
       }else{
        var follow = checkBtnStart("关注",device.width/2,device.height/5,device.width,device.height*2/3);
        if(follow!=null){
          btnClick(follow);
          sleep(2000)
        }
       }
     }
   }
 }
}


function startSearch(index,anchor){
  var name = getName(index);
  var btn = checkBtn(name,0,0,device.width,device.height/3);
  if(btn!=null){
    btnClick(btn);
    sleep(4000);
    var count = 0
    var times = random(10,20);
    showTip('观看['+anchor+"]"+name+"类")
    if(index == 1){
      while(count<times){
        if(count>5 && random(1,5) == 5){
          randomScroll(true,(random(1,3) == 3));
        }else{
          randomScroll(false,(random(1,3) == 3));
        }
        var t =random(2,4);
        sleep(t*1000);
        sTotalTime = sTotalTime +t
        count++;
      }
    }else if(index == 2){
      while(count<times){
        if(count>5 && random(1,5) == 5){
          randomScroll(true,(random(1,3) == 3));
        }else{
          randomScroll(false,(random(1,3) == 3));
        }
        if(count == 6){
          var end = checkBtnStartAll('搜索结果为空');
          if(end!=null){
            showTip(name+'没有数据');
            sleep(3000);
            count == times;
            return
          }
        }
        var t =random(2,4);
        sTotalTime = sTotalTime +t
        sleep(t*1000);
        if(count %4 ==0 && random(1,4)==3){
          var w = random(device.width/6,device.width/2);
          var h = random(device.height/3,device.height*4/5);
          if(random(1,2) == 1){
            w = random(device.width/2,device.width*7/8);
          }
          press(w,h,10);
          sleep(3000);
          var inLive = checkBtnById("fl_intput_hint_container",0,0,device.width,device.height/5);
          if(inLive==null){
             t = random(5,10)
             sleep(t*1000);
             back()
             sleep(2000);
             sTotalTime = sTotalTime +t+2
          }
        }
        count++;
      }
    }else if(index == 3){
      while(count<times){
        if(count>5 && random(1,5) == 5){
          randomScroll(true,(random(1,3) == 3));
        }else{
          randomScroll(false,(random(1,3) == 3));
        }
        if(count % 4 ==0){
          var end = checkBtnStartAll('暂时没有更多了');
          if(end!=null){
            count == times
            return;
          }
        }
        var t =random(10,20);
        sleep(t*1000);
        sTotalTime = sTotalTime +t
        count++;
      }
    }
    sleep(2000)
    btn = checkBtn('用户',0,0,device.width,device.height/3);
    if(btn!=null){
      btnClick(btn);
      sleep(2000)
      showTip('关注主播')
      if(random(1,4)==4){
        randomScroll(false,true)
        sleep(3000);
      }
      sTotalTime = sTotalTime +5;
      var follow = checkBtnStart("关注",device.width/2,device.height/5,device.width,device.height*2/3);
      if(follow!=null){
        btnClick(follow);
        sleep(2000)
      }
    }
  }
}

function getName(index){
  switch(index){
    case 1:
      return "综合";
    case 2:
      return "视频";
    case 3:
      return "直播";
  }
}

//==============================================抖音滑动逻辑END==============================================

//滑动逻辑
function scroll(){
  var scroCount = 1;
  if(TYPE == 0){
    sleepTime=random(4,6);
  }else{
    var sele=random(1,6);
    if(sele>4){
      sleepTime=random(38,48);
    }else{
      sleepTime=random(3,20);
    }
    if(random(0,5)>=4){
      scroCount=random(2,5);
    }else{
      scroCount = 1;
    }
  }
  Log('刷的总时长：'+sTotalTime+"s");
  var t=sleepTime;
  let likeTime = 5;
  if(TYPE == 0){
    likeTime = sleepTime;
  }else{
    if(sleepTime>=38){
      likeTime = random(37,sleepTime-1);
    }else{
      likeTime = random(2,sleepTime-1);
    }
  }
  var arr = [1];
  if(TYPE == 0){
    arr = [1];
  }else if(TYPE == 1){
    arr = [1,2];
  }else if(TYPE == 2){
    arr = [1,2];
  }
  while(t>=0){
    showTip("当前画面等待"+t+"s");
    sleep(1000);
    if(t == (sleepTime-likeTime)){
      startScrollTaskList(arr,sleepTime>38,true);
    }
    t--;
  }
  var upH=parseInt(device.height/500) //获得距离的上限
  var downH=parseInt(device.height/400) //获得距离的下限
  var dH=random(upH,downH)*100;
  var sH=random(parseInt(device.height*3/4),parseInt(device.height*4/5));
  var sW=random(parseInt(device.width/6),device.width/2);
  while(scroCount>0){
    showTip('筛选视频..');
    gesture(35,[sW,sH],[sW,dH]);
    let s = 2500+random(2,8)*100+random(2,8)*10;
    sleepTime = sleepTime+Math.round(s/1000);
    sleep(s);
    if(TYPE == 1){
      var a = checkBtnStart("更多相关推荐",0,device.height/3,device.width/2,device.height*3/4);
      if(a!=null){
        back();
        sleep(2000);
      }
    }
    scroCount--;
  }
  sTotalTime=sTotalTime+sleepTime;
  adWaitTime=adWaitTime+sleepTime;
  dyAdWaitTime=dyAdWaitTime+sleepTime;
  ksAdWaitTime=ksAdWaitTime+sleepTime;
}

//任务列表
function startScrollTaskList(typeArray,longTime,timeEnd){
  var index=typeArray.length-1;
  for(var i=index;i>=0;i--){
    var type=random(0,i);
    getScrollTask(typeArray[type],longTime,timeEnd)
    typeArray.splice(type,1);
  }
}

function getScrollTask(taskType,longTime,timeEnd){
  switch(TYPE){
    case 0://头条
      getTTScrollTask(taskType,longTime,timeEnd);
      break;
    case 1://快手
      getKSScrollTask(taskType,longTime,timeEnd);
      break;
    case 2://抖音
      getDYScrollTask(taskType,longTime,timeEnd);
      break;
  }
}


function hadDialog(){
  return(currentActivity().toString()=='android.app.Dialog');
}

function waitTime(time,tip){
  let count = 0;
  while(count<time){
    sleep(1000);
    showTip(tip+"倒计时"+(time-count)+"s");
    count++
  }
}

function killerApp(name){
  showTip('清理应用缓存')
  recents()
  sleep(3000)
  if(name == null){
    var clear = checkBtnById('recent_igmbutton_clear_all',device.width/4,device.height*2/3,device.width*2/3,device.height);
    if(clear!=null){
      btnClick(clear);
    }else{
      press(device.width/2,device.height-device.width/5,10);
    }
    sleep(3000)
    home();
  }else{
    var clear = id('dismiss_task').className('android.widget.ImageView').desc('移除'+name+'。').boundsInside(device.width/2,device.height/8,device.width,device.height).findOne(5000);
    if(clear!=null){
      btnClick(clear);
      sleep(2000);
    }
    home()
    waitTime(10,'等待启动下一个APP，')
  }

}

function checkTaskBtnList(btnArr,left,right,tip,bottom){
  var name = null;
  showTip('查询['+tip+"]任务")
  for(var i=0;i<10;i++){
    for (let index = 0; index < btnArr.length; index++) {
      cBtn = checkBtnAllLR(btnArr[index],left,right);
      if(cBtn!=null){
        name = btnArr[index];
        break;
      }
    }
    if(name == null){
      if(i>4 && typeof(bottom) != 'undefined'){
        var bottomBtn = checkBtnStart(bottom.toString(),0,device.height*2/3,device.width,device.height);
        if(bottomBtn!=null){
          break;
        }
      }
      gesture(300,[parseInt(device.width*5/6),device.height*2/3],
              [parseInt(device.width*5/6),device.height/3]);
      sleep(1000);
    }else{
      break;
    }
  }
  return name;
}


function checkTaskBtn(btn,left,right,tip,bottom){
  var hadBtn = false;
  for(var i=0;i<10;i++){
    var cBtn=checkBtnAllLR(btn,left,right);
    if(cBtn!=null){
      if(adjustPos(cBtn,tip)){
        hadBtn=true;
        break;
      }
    }else{
      if(i>4 && typeof(bottom) != 'undefined'){
        var bottomBtn = checkBtnStart(bottom.toString(),0,device.height*2/3,device.width,device.height);
        if(bottomBtn!=null){
          break;
        }
      }
      gesture(300,[parseInt(device.width*5/6),device.height*2/3],
              [parseInt(device.width*5/6),device.height/3]);
      sleep(1000);
    }
  }
  return hadBtn;
}

function adjustPos(view,btnText){
  var arr=getBounds(view);
  Log('调整arr[1]：'+arr[1]+',[4/5]:'+device.height*4/5+",[1/5]:"+device.height/5);
  if(arr[1]-parseInt(device.height*4/5)>0){
    win.setPosition(0,200);
    Log('上滑调整['+btnText+']按钮位置');
    gesture(300,[parseInt(device.width*5/6),parseInt(device.height/2)]
            ,[parseInt(device.width*5/6),parseInt(device.height/4)]);
    sleep(1000);
    return false;
  }else if(parseInt(device.height/5)-arr[1]>0){
    win.setPosition(0,device.height/2-80);
    Log('下滑调整['+btnText+']按钮位置');
    gesture(300,[parseInt(device.width*5/6),parseInt(device.height/4)]
            ,[parseInt(device.width*5/6),parseInt(device.height/2)]);
    sleep(1000);
    return false;
  }
  return true;
}

function checkBtnAll(str){
  return checkBtnStartAllScreen(str,0,device.width,false,false);
}

function checkBtnAllLR(str,left,right){
  return checkBtnStartAllScreen(str,left,right,false,false);
}

function checkByIdAll(str){
  return checkBtnStartAllScreen(str,0,device.width,true,false);
}

function checkByIdAllLR(str,left,right){
  return checkBtnStartAllScreen(str,left,right,true,false);
}


function checkBtnStartAll(str){
  return checkBtnStartAllScreen(str,0,device.width,false,true);
}

function checkBtnStartAllLR(str,left,right){
  return checkBtnStartAllScreen(str,left,right,false,true);
}

function checkByIdStartAllLR(str,left,right){
  return checkBtnStartAllScreen(str,left,right,true,true);
}


function checkBtnStartAllScreen(str,left,right,byId,start){
  var lock=threads.lock();
  lock.lock();
  var tBtn=null;
  var mBtn=null;
  var bBtn=null;
  var tt=false;
  var mm=false;
  var bb=false;
  var top=threads.start(function(){
    if(byId){
      tBtn=checkBtnWithId(str,left,0,right,parseInt(device.height/3));
    }else{
      if(start){
        tBtn=checkBtnStart(str,left,0,right,parseInt(device.height/3));
      }else{
        tBtn=checkBtn(str,left,0,right,parseInt(device.height/3));
      }
    }
    if(tBtn!=null){
      tt=true;
      mm=true;
      bb=true;
      top.interrupt();
      bottom.interrupt();
      mid.interrupt();
    }else{
      tt=true;
    }
  });
  var mid=threads.start(function(){
    if(byId){
      mBtn=checkBtnWithId(str,left,parseInt(device.height/4),right,parseInt(device.height*3/4));
    }else{
      if(start){
        mBtn=checkBtnStart(str,left,parseInt(device.height/4), right,parseInt(device.height*3/4));
      }else{
        mBtn=checkBtn(str,left,parseInt(device.height/4), right,parseInt(device.height*3/4));
      }
    }

    if(mBtn!=null){
      tt=true;
      mm=true;
      bb=true;
      top.interrupt();
      bottom.interrupt();
      mid.interrupt();
    }else{
      mm=true;
    }
  });
  var bottom=threads.start(function(){
    if(byId){
      bBtn=checkBtnWithId(str,left,parseInt(device.height*2/3),right,device.height);
    }else{
      if(start){
        bBtn=checkBtnStart(str,left,parseInt(device.height*2/3),right,device.height);
      }else{
        bBtn=checkBtn(str,left,parseInt(device.height*2/3),right,device.height);
      }
    }
    if(bBtn!=null){
      tt=true;
      mm=true;
      bb=true;
      top.interrupt();
      bottom.interrupt();
      mid.interrupt();
    }else{
      bb=true;
    }
  });
  while(!tt||!mm||!bb){
    sleep(100);
  }
  top.interrupt();
  bottom.interrupt();
  mid.interrupt();
  lock.unlock();
  if(tBtn!=null){
    return tBtn;
  }else if(mBtn!=null){
    return mBtn;
  }else if(bBtn!=null){
    return bBtn;
  }

  return null;
}

function checkAcById(id,left,top,right,bottom,goBack){
  var entern=null;
  var count=1
  var checkTime=9;
  while(entern==null&&count<checkTime){
    Log('页面检测'+checkTime+'次,第'+count+'次检测['+id+"]页面");
    entern=checkBtnById(id,left,top,right,bottom);
    count++;
    if(entern == null && goBack){
      back();
      sleep(3000);
    }else{
      sleep(1000);
    }
  }
  return(entern!=null);
}

function checkArr(strArr,left,top,right,bottom,goBack,tip){
  if(strArr == null || strArr.length == 0){
    return false
  }
  var entern=null;
  var count=1
  var checkTime=9;
  while(entern==null&&count<checkTime){
    showTip(tip+'页面检测第'+count+'次');
    for (let index = 0; index < strArr.length; index++) {
      var str = strArr[index];
      entern=checkBtn(str,left,top,right,bottom);
      if(entern!=null){
        break
      }
    }
    count++;
    if(entern == null && goBack){
      back();
      sleep(3000);
    }else{
      sleep(1000);
    }
  }
  return(entern!=null);
}

function checkAc(str,left,top,right,bottom,goBack,tip){
  var entern=null;
  var count=1
  var checkTime=9;
  while(entern==null&&count<checkTime){
    showTip(tip+'页面检测第'+count+'次');
    Log('第'+count+'次检测['+str+"]页面");
    entern=checkBtn(str,left,top,right,bottom);
    count++;
    if(entern == null && goBack){
      back();
      sleep(3000);
    }else{
      sleep(1000);
    }
  }
  Log('页面['+str+"]"+((entern!=null)?"在":'不在'));
  return(entern!=null);
}

function openApp(appName){
  var open=false;
  var appId=getPackageName(appName);
  // if(appId==null){
  //   Log('click启动');
  //   open=click(appName);
  // }else{
  //   Log('id启动');
  //   open=launch(appId);
  //   Log('app'+open);
  // }
  open=click(appName);
  return open;
}

function setTitle(titleArr,collectArr){
  if(defultTitle!=btnTitle){
    Log('defultTitle:'+defultTitle);
    defultTitle=btnTitle;
    return defultTitle;
  }else{
    var titleIndex = random(0,titleArr.length-1);
    if(TYPE == 0 && collectArr!=null && collectArr.length>0){
      ttCollect = (collectArr.indexOf(titleIndex)!=-1);
    }
    btnTitle=titleArr[titleIndex];
    setTitle(titleArr,collectArr);
  }
}

function Log(str){
  console.log(str);
  console.log("=============");
}

function toTop(){
  win.setPosition(0,device.height/3);
  switch(TYPE){
    case 0:
    case 1:
      var type=random(1,2);
      if(type==1){
        scrollToTop('日常任务');
      }else{
        if(TYPE==0){
          taskClick();
        }else{
          sleep(1000);
          ksTaskClick();
        }
      }
      break;
    case 2:
      scrollToTop('日常任务');
      break;
    case 3:
      var type=random(1,2);
      if(type==1){
        scrollToTop('阅读福利集合');
      }else{
        kdTaskClick();
      }
    break
  }
}

function scrollToTop(str){
  for(var i=0;i<6;i++){
    if(i>=0&&i%2==0){
      var isTop=checkBtnAllLR(str,0,device.width/2);
      if(isTop!=null && adjustPos(isTop,'顶部')){
        break;
      }
    }
    gesture(300,[parseInt(device.width*5/6),device.height/6],
            [parseInt(device.width*5/6),device.height*2/3]);
    sleep(500);
  }
}

function openSettingConfig(){
  var iSetting=confirm('是否运行脚本自动设置屏幕亮度和音量?');
  if(iSetting){
    storage.put(LIGHT_KEY,true);
    setLight();
  }else{
    storage.put(LIGHT_KEY,false);
  }
}

function getSetBtnText(){
  if(storage.get(LIGHT_KEY,false)){
    return'关闭调整亮度';
  }
  return'开启调整亮度';
}

function setLight(){
  try{
    var d=new Date();
    var hour=d.getHours();
    var ll=50;
    if(hour>10&&hour<20){
      ll=150;
    }
    device.setBrightnessMode(0);
    ligSensor=sensors.register('light').on('change',(event,light)=>{
      if(dLight==0){
        dLight=light;
        device.setBrightness(dLight>ll?ll:dLight);
      }else if(light-dLight>100||dLight-light>100){
        dLight=light;
        device.setBrightness(dLight>ll?ll:dLight);
      }else if(parseInt(light)==1&&parseInt(dLight)!=1){
        dLight=light;
        device.setBrightness(1);
      }
    });
  }catch(err){
    Log('设置亮度err');
  }
}
function getWaitTime(timeArr){
  var time = 0;
  var hour = timeArr.length >= 3;
  if(hour){
    for (let index = 0; index < timeArr.length; index++) {
      if(index == 0){
        time = time+parseInt(timeArr[0])*60*60;
      }else if(index == 1){
        time = time+parseInt(timeArr[1])*60;
      }else{
        time = time+parseInt(timeArr[index]);
      }
    }
  }else{
    for (let index = 0; index < timeArr.length; index++) {
      if(index == 0){
        time = time+parseInt(timeArr[0])*60;
      }else{
        time = time+parseInt(timeArr[index]);
      }
    }
  }
  return time;
}
//控制面板
function showFlowin(){
  var w=floaty.window(
    <frame gravity='center'bg='#66000000'>
    <vertical>
    <text text='PS:当前APP在首页运行时才切换要操作的软件'bg='#000000'
    gravity='center'textColor="#ffffff"textSize='10sp'/>
    <text text='【1:头条 2:快手 3:抖音 4:看点 5:快手标准】'bg='#000000'
    gravity='center'textColor="#ffffff"textSize='11sp'/>
    <horizontal bg='#66000000'>
      <button w='50' id='tt'text='1'textSize='12sp'/>
      <button w='50' id='ks'text='2'textSize='12sp'/>
      <button w='50' id='douyin'text='3'textSize='12sp'/>
      <button w='50' id='kandian'text='4'textSize='12sp'/>
      <button w='50' id='ksbz'text='5'textSize='12sp'/>
    </horizontal>
    <horizontal bg='#66000000'>
    <button id='start'text='停止运行'textSize='10sp'/>
    <button id='cStop'text='清理缓存'textSize='10sp'/>
    </horizontal>
    <text id='cTip'bg="#88000000"color="#ffffff"
    gravity='left'textSize='12sp'bg='#000000'/>

    </vertical>
    </frame>);

    w.setSize(-2,-2);
  w.setPosition(0,200);

  w.tt.click(function(){
    confirm('是否重置头条阅读时长？').then((ttRead)=>{
      if(ttRead){
        storage.put(TT_READ_KEY,0);
      }
      initData();//头条阅读时长
      startApp(100);
    });
  });

  w.ks.click(function(){
    confirm('是否重置快手阅读时长？').then((ksRead)=>{
      if(ksRead){
        storage.put(KS_READ_KEY,0);
      }
      initData();//快手阅读时长
      startApp(200);
    });
  });

  w.douyin.click(function(){
    confirm('是否重置抖音阅读时长？').then((dyRead)=>{
      if(dyRead){
        storage.put(DY_READ_KEY,0);
      }
      initData();//抖音阅读时长
      startApp(300);
    });
  });

  w.kandian.click(function(){
    confirm('是否重置看点阅读时长？').then((kdRead)=>{
      if(kdRead){
        storage.put(KD_READ_KEY,0);
      }
      initData();//抖音阅读时长
      startApp(400);
    });
  });
  w.ksbz.click(function(){
    confirm('是否重置KS标准阅读时长？').then((kdRead)=>{
      if(kdRead){
        storage.put(KDBZ_READ_KEY,0);
      }
      initData();//抖音阅读时长
      startApp(500);
    });
  });
  w.start.click(function(){
    if(startScript){
      startScript=false;
      threads.shutDownAll();
      showTip("脚本已停止,请把APP返回首页再次开启");
    }else{
      startScript=true;
      initData();
      startApp(-1);
    }
    ui.run(function(){
      win.setAdjustEnabled(!startScript)
      win.start.setText(startScript?"停止运行":"开始运行");
    });
  });
  w.cStop.click(function(){
    threads.shutDownAll()
    threads.start(function(){
      showTip('清理应用缓存')
      home();
      sleep(2000)
      killerApp(null);
    })
  });
  return w;
}

function randomScroll(down,quick){
  var sH;
  var time;
  var sW=random(parseInt(device.width*2/3),parseInt(device.width*4/5));
  if(quick){
    time=35;
  }else{
    time=parseInt(random(2,4))*100;
  }
  if(TYPE==0){
    sH=random(parseInt(device.height*3/4),parseInt(device.height*4/5));
  }else{
    sH=random(parseInt(device.height*4/5),parseInt(device.height*5/6));
  }
  var upH=parseInt(device.height/4) //获得距离的上限
  var downH=parseInt(device.height/3) //获得距离的下限
  var dH=random(upH,downH);
  if(down){
    if(win.getY()!=device.height/3){
      win.setPosition(0,device.height/3);
      sleep(1000);
    }
    gesture(time,[sW,dH],[sW,sH]);
  }else{
    if(win.getY()!=0){
      win.setPosition(0,0);
      sleep(1000);
    }
    gesture(time,[sW,sH],[sW,dH]);
  }
}


function stopPlugin(){
  Log('stopPlugin');
  threads.shutDownAll();
  floaty.closeAll();
  exit();
}



function stopApp(name){
  Log('stopApp');
  back();
  back();
  back();
  home();
  sleep(2000);
  killerApp(name);
}

function showTip(str){
  var appName="";
  switch(TYPE){
    case 0:
      appName='头条: ';
      break;
    case 1:
      appName='快手: ';
      break;
    case 2:
      appName='抖音: ';
      break;
    case 3:
      appName='看点: ';
      break;
    case 4:
      appName='KS标准: ';
      break;
  }
  ui.run(function(){
    win.cTip.setText(appName+str);
  });
  if(str.indexOf('当前广告等待')==-1&&str.indexOf('当前画面等待')==-1
     &&str.indexOf('倒计时')==-1 && str.indexOf('当前剩余')==-1){
    Log(appName+str);
  }
}

function checkBtnByIdWithLimt(str,left,top,right,buttom,limt){
  try{
    var lAd=id(str)
    .boundsInside(left,top,right,buttom).find();
    Log('查询id['+str+']按钮:'+lAd.length);
    if(lAd.length==0 ){
      Log('没有查询到'+str);
      return null;
    }else{
      var btn;
      for(var i=0;i<lAd.length;i++){
        Log('查询'+lAd[i]+'按钮:');
        var arr=getBounds(lAd[i]);
        if(arr[0]>limt-30&&arr[0]<limt+30){
          btn=lAd[i];
          break;
        }
      }
      return btn;
    }
  }catch(err){
    return null;
  }
}


function refreshData(appName){
  Log('refreshData:'+appName);
  showTip("");
  sTotalTime=0;
  count=1;
  start=false;
  btnTitle=null;
  floClick=false;
}