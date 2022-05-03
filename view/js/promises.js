function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};

function ajaxPromiseToken(sType, sTData, sUrl, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            headers: {token: localStorage.getItem("token") != null ? localStorage.getItem("token") : false }
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};

function ajaxPromiseTimeout(ms, sType, sTData, sUrl, sData = undefined) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
            $.ajax({
                url: sUrl,
                type: sType,
                dataType: sTData,
                data: sData
            }).done((data) => {
                resolve(data);
            }).fail((jqXHR, textStatus, errorThrow) => {
                reject(errorThrow);
            }); 
        } catch (error) {
            
        }

        }, ms)
    });
};
