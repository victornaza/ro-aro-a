bpl = {
    autowoot: true,
    clicks: 0,
    version: 3.02,
    close: function(){ 
        API.off(API.DJ_ADVANCE, djAdvance); 
        API.off(API.CHAT, chat); 
        $('#woot').unbind('click', doubleClick);
        }
    }

function BassPlugLite(){
window.BPLite = true;
    
//Core Functions
    djAdvance = function(data){
        if(bpl.autowoot){setTimeout(function(){
            $("#woot").click();
        }, 2000);
        }
    };
    
    chat = function(data){
        if(data.message == "!whosrunning" && data.fromID == "50aeb07e96fba52c3ca04ca8"){
            API.sendChat("@"+data.from+" Você acaba de ativar o Auto-Woot editado pelo Carlos Victor, Versão "+bpl.version);
        }
    };
    
    API.on(API.DJ_ADVANCE, djAdvance, this);
    API.on(API.CHAT, chat, this); 

//CSS/jQuery
    doubleClick = function() {
        bpl.clicks++;
        if (bpl.clicks == 2){
            bpl.autowoot = !bpl.autowoot;
            bpl.clicks = 0;
            require('app/base/Context').trigger('notify', 'icon-woot', bpl.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off');
        }
        setTimeout(function(){
            bpl.clicks = 0;
        }, 1000);
    };
    
    $("#woot").bind('click', doubleClick); 
        
API.chatLog("Running BassPlugLite V. "+bpl.version);
$('#woot').click();
}

if(typeof BPLite !== "undefined") bpl.close();

BassPlugLite();
