/**
 * @file mip-pcbabyad 组件
 * @author Jesse
 */

define(function (require) {
    var target;
    var customElement = require('customElement').create();
    var bingEvent = function (element, adid) {
        var closeBtn = target.querySelector('.close-btn');
        closeBtn.onclick = function () {
            window.document.getElementById('adWrap' + adid).style.display = 'none';
        };
    };
    var triggerPv = function (pvcode) {
        if (pvcode && pvcode !== '{SRC2}') {
            (window['tmp' + 1 * new Date()] = new Image()).src = pvcode.replace(/\[timestamp\]/i, new Date() * 1);
        }
    };

    var setLocationAd = function (str) {
        if (str === '') {
            return;
        }
        var data = JSON.parse(str);
        var adId = data['adId'];
        var locId = data['locationId'];
        var loc = data['id'];
        var src = data['src'];
        var pvcode = data['pv'];
        var link = data['link'];
        var html = [
            '<div style="position: relative;" id="adWrap' + adId + '">',
            '<a target="_blank" id="ad' + adId + '" href="' + link + '">',
            '<img src="' + src + '" style="width:100%; max-width:640px;">',
            '</a>',
            '<span class="close-btn">X</span>',
            '<span class="ad-tip">广告</span>',
            '</div>'];
        target = document.getElementsByClassName(loc)[0];
        target.innerHTML = html.join('');
        triggerPv(pvcode);
        bingEvent(target, adId);
    };


    var ajax = function (url, sccuessFn) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    sccuessFn(xhr.responseText);
                }
            }
        };
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        target = this.element;
        var loc = target.className.replace(/^([^\s]+\.).*/, '$1');
        var url = '//ivy.pcbaby.com.cn/show?id=' + loc + '&media=html&mip';
        ajax(url, setLocationAd);
    };
    return customElement;
});