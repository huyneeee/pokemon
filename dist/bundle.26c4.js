(()=>{"use strict";var o=new(function(){function o(){}return o.prototype.bai1=function(){console.log("Result is 7.8")},o.prototype.bai2=function(){var o,e=(void 0===o&&(o=5),+(o="2.8")+10);console.log(e)},o.prototype.bai3=function(){console.log("TypeScript")},o.prototype.bai4=function(){var o;!function(o){o[o.ADMIN=0]="ADMIN",o[o.READ_ONLY=1]="READ_ONLY",o[o.AUTHOR=2]="AUTHOR"}(o||(o={}));var e={name:"TypeScript",age:11,hobbies:["Sports","cooking"],role:o[o.ADMIN],roletuple:[2,"author"]};e.role===o[o.AUTHOR]&&console.log("is author"),e.roletuple.push("admin"),e.roletuple[0]=10,e.roletuple=[0,"user"]},o}());o.bai1(),o.bai2(),o.bai3(),o.bai4()})();