function check_activity() {
    var checkActivity = setInterval(function() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(time);
        if (localStorage.getItem("token")) {
            ajaxPromiseToken("POST","JSON",friendlyURL("?module=login&op=control_user"))
                .then((jsonControlUser)=>{
                    if (jsonControlUser==false) {
                        logout({error:"12",title:"Error Usuario",desc:"Por favor vuelva a iniciar sesión"})
                    }
                }).catch(()=>{
                    console.log("Error Control User");
            })
            ajaxPromise("POST","JSON",friendlyURL("?module=login&op=activity"))
                .then((jsonActivity)=>{
                    if (jsonActivity=="inactivo") {
                        logout({error:"11",title:"Usuario inactivo",desc:"Por favor vuelva a iniciar sesión"})
                    }
                }).catch(()=>{
                    console.log("Error Activity");
            })
            
        } else {
            clearInterval(checkActivity);
        }
        
      }, 1 * 10 * 1000);
    
};

function refresh_cookie() {
    $(document).on('click', ()=>{
        if (localStorage.getItem("token")) {
            ajaxPromise("POST","JSON",friendlyURL("?module=login&op=refresh_cookie"))
                .then((jsonRefreshCookie)=>{
                    
                }).catch(()=>{
                    console.log("Error Refresh Cookie");
                })
        }
    })

};

function refresh_token(){
    var checkToken = setInterval(function() {
        if (localStorage.getItem("token")) {
            ajaxPromiseToken("POST","JSON",friendlyURL("?module=login&op=refresh_token"))
                .then((jsonToken)=>{
                    console.log(jsonToken);
                    if (jsonToken==false) {
                        logout({error:"12",title:"Error Usuario",desc:"Por favor vuelva a iniciar sesión"})
                    } else {
                        localStorage.setItem('token',jsonToken);
                    } 
                }).catch(()=>{
                    console.log("Error Refresh Token");
            })
            
        } else {
            clearInterval(checkToken);
        }
        
      }, 5 * 60 * 1000);
};


$(document).ready(function () {
    check_activity();
    refresh_cookie();
    refresh_token();
});