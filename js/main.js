function ajax(url, mode, fnSucc) {
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    } else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTPP");
    }
    // 2.連接到設定網頁
    oAjax.open(mode, url, true);
    // 3.發送請求
    oAjax.send();
    // 4.接收請求返回的數據
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4 && oAjax.status == 200) {
            fnSucc(oAjax.responseText);
        }
    };
};

const t2eApi = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';

ajax(t2eApi, 'get', function (str) {
    var data = JSON.parse(str);

    var dataResults = data.result.records; //存data.result.records
    console.log(dataResults)
    for (let i = 0; i < 20; i++) {
        //post的 HTML+ CSS
        const article = `
                <article class="article-post " data-num=${dataResults[i]._id}>
                    <img src="${dataResults[i].Picture1}" alt="" class="img-fluid col-lg-4 col-md-12">
                    <div class="article-post-info col-lg-8 col-md-12">
                        <h1 class="article-post-title">${dataResults[i].Name}</h1>
                        <p class="article-post-text">${dataResults[i].Description}</p>
                        <span class="article-post-info-class">
                            <h4 class="post-info-class-
                            organizer">門票說明</h4>
                            <h4 class="post-info-class">${dataResults[i].Ticketinfo}</h4>
                        </span>
             set2           <span class="article-post-info-loc-date">
                            <i class="fas fa-map-marker-alt fa-2x">
                                <span>${dataResults[i].Zone}</span>
                            </i>
                            <i class="far fa-calendar-alt fa-2x">
                                <span>${dataResults[i].Opentime}</span>
                            </i>
                        </span>
                    </div>
                    <a href=post.html class="link"></a>
                </article>`;

        const oArticleArea = document.querySelector('.article-area');
        oArticleArea.innerHTML += article;

    }
    let str3 = [];
    for (let index = 0; index < dataResults.length; index++) {
        str3.push(dataResults[index].Zone);

    }
    console.log(str3);

    // const aa = `<option value="${dataResults[i].Zone}">${dataResults[i].Zone}</option>`;
    let bb = document.querySelector('#aside-area-select');


    const set = new Set();
    let set2 = str3.filter(item => !set.has(item) ? set.add(item) : false);
    let temp = '';
    for (let index = 0; index < set2.length; index++) {

        temp += `<option value="${set2[index]}">${set2[index]}</option>`
    }
    bb.innerHTML = temp;

    console.log(typeof (set2))

});