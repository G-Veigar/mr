import{d as R,c as S,o as Y,a as q,b as s,n as $,e as I,t as w,f as st,p as ot,g as ct,_ as G,h as vt,i as H,w as ut,T as pt,j as Dt,u as Mt,k as kt,A as _t,r as g,l as Pt,m as xt,q as St,s as J,v as z,x as Ot,y as K,z as Tt,B as Wt,C as Yt,D as Ct,E as Et,W as Ft,F as Nt,G as qt}from"./index-iTM1BudA.js";const U=t=>(ot("data-v-4f3c69cb"),t=t(),ct(),t),$t={key:0,class:"common-dialog"},At=U(()=>s("div",{class:"dialog-mask"},null,-1)),Lt={key:0,class:"dialog-box"},Bt={class:"title"},Ht={class:"dialog-content"},Qt={class:"btn-group"},Vt={key:1,class:"dialog-box loading-content"},Xt=U(()=>s("div",{class:"lds-ring"},[s("div"),s("div"),s("div"),s("div")],-1)),jt=U(()=>s("div",{class:"loading-tip"},"Minting NFT",-1)),It=[Xt,jt],Rt=R({__name:"CommonDialog",props:{type:{},content:{},show:{type:Boolean},loading:{type:Boolean}},emits:["cancel","confirm","update:show"],setup(t,{emit:n}){const e=t,a=n,r=S(()=>e.type=="error"?"Error":"Success");function i(){a("update:show",!1),a("cancel")}return(o,d)=>o.show?(Y(),q("div",$t,[At,o.loading?(Y(),q("div",Vt,It)):(Y(),q("div",Lt,[s("button",{class:"close-btn",onClick:d[0]||(d[0]=l=>o.$emit("update:show",!1))}),s("div",Bt,[s("div",{class:$(["type-icon",{error:o.type==="error"}])},null,2),I(w(r.value),1)]),s("div",Ht,w(o.content),1),s("div",Qt,[s("button",{class:"cancel-btn",onClick:i},"Cancel"),s("button",{class:"confirm-btn",onClick:d[1]||(d[1]=l=>o.$emit("confirm"))},"Try again")])]))])):st("",!0)}}),Gt=G(Rt,[["__scopeId","data-v-4f3c69cb"]]),Ut={class:"message-content"},Jt={class:"left-info"},zt={class:"title"},Kt={class:"content"},Zt=R({__name:"TopMessage",props:{type:{},show:{type:Boolean},title:{},content:{}},setup(t){return(n,e)=>(Y(),vt(Dt,{to:"body"},[H(pt,{mode:"out-in"},{default:ut(()=>[n.show?(Y(),q("div",{key:0,class:$(["top-message",{error:n.type==="error",success:n.type==="success"}])},[s("div",Ut,[s("div",Jt,[s("div",zt,w(n.title),1),s("div",Kt,w(n.content),1)])])],2)):st("",!0)]),_:1})]))}}),te=G(Zt,[["__scopeId","data-v-b672332d"]]);function v(t){const n=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&n==="[object Date]"?new t.constructor(+t):typeof t=="number"||n==="[object Number]"||typeof t=="string"||n==="[object String]"?new Date(t):new Date(NaN)}function T(t,n){return t instanceof Date?new t.constructor(n):new Date(n)}const dt=6048e5,ee=864e5;let ne={};function V(){return ne}function A(t,n){var d,l,f,h;const e=V(),a=(n==null?void 0:n.weekStartsOn)??((l=(d=n==null?void 0:n.locale)==null?void 0:d.options)==null?void 0:l.weekStartsOn)??e.weekStartsOn??((h=(f=e.locale)==null?void 0:f.options)==null?void 0:h.weekStartsOn)??0,r=v(t),i=r.getDay(),o=(i<a?7:0)+i-a;return r.setDate(r.getDate()-o),r.setHours(0,0,0,0),r}function Q(t){return A(t,{weekStartsOn:1})}function lt(t){const n=v(t),e=n.getFullYear(),a=T(t,0);a.setFullYear(e+1,0,4),a.setHours(0,0,0,0);const r=Q(a),i=T(t,0);i.setFullYear(e,0,4),i.setHours(0,0,0,0);const o=Q(i);return n.getTime()>=r.getTime()?e+1:n.getTime()>=o.getTime()?e:e-1}function Z(t){const n=v(t);return n.setHours(0,0,0,0),n}function tt(t){const n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),t.getTime()-n.getTime()}function ae(t,n){const e=Z(t),a=Z(n),r=e.getTime()-tt(e),i=a.getTime()-tt(a);return Math.round((r-i)/ee)}function re(t){const n=lt(t),e=T(t,0);return e.setFullYear(n,0,4),e.setHours(0,0,0,0),Q(e)}function ie(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function se(t){if(!ie(t)&&typeof t!="number")return!1;const n=v(t);return!isNaN(Number(n))}function oe(t){const n=v(t),e=T(t,0);return e.setFullYear(n.getFullYear(),0,1),e.setHours(0,0,0,0),e}const ce={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},ue=(t,n,e)=>{let a;const r=ce[t];return typeof r=="string"?a=r:n===1?a=r.one:a=r.other.replace("{{count}}",n.toString()),e!=null&&e.addSuffix?e.comparison&&e.comparison>0?"in "+a:a+" ago":a};function X(t){return(n={})=>{const e=n.width?String(n.width):t.defaultWidth;return t.formats[e]||t.formats[t.defaultWidth]}}const de={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},le={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},fe={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},he={date:X({formats:de,defaultWidth:"full"}),time:X({formats:le,defaultWidth:"full"}),dateTime:X({formats:fe,defaultWidth:"full"})},me={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},ge=(t,n,e,a)=>me[t];function F(t){return(n,e)=>{const a=e!=null&&e.context?String(e.context):"standalone";let r;if(a==="formatting"&&t.formattingValues){const o=t.defaultFormattingWidth||t.defaultWidth,d=e!=null&&e.width?String(e.width):o;r=t.formattingValues[d]||t.formattingValues[o]}else{const o=t.defaultWidth,d=e!=null&&e.width?String(e.width):t.defaultWidth;r=t.values[d]||t.values[o]}const i=t.argumentCallback?t.argumentCallback(n):n;return r[i]}}const we={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ye={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},be={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},ve={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},pe={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},De={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Me=(t,n)=>{const e=Number(t),a=e%100;if(a>20||a<10)switch(a%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"},ke={ordinalNumber:Me,era:F({values:we,defaultWidth:"wide"}),quarter:F({values:ye,defaultWidth:"wide",argumentCallback:t=>t-1}),month:F({values:be,defaultWidth:"wide"}),day:F({values:ve,defaultWidth:"wide"}),dayPeriod:F({values:pe,defaultWidth:"wide",formattingValues:De,defaultFormattingWidth:"wide"})};function N(t){return(n,e={})=>{const a=e.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],i=n.match(r);if(!i)return null;const o=i[0],d=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],l=Array.isArray(d)?Pe(d,y=>y.test(o)):_e(d,y=>y.test(o));let f;f=t.valueCallback?t.valueCallback(l):l,f=e.valueCallback?e.valueCallback(f):f;const h=n.slice(o.length);return{value:f,rest:h}}}function _e(t,n){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&n(t[e]))return e}function Pe(t,n){for(let e=0;e<t.length;e++)if(n(t[e]))return e}function xe(t){return(n,e={})=>{const a=n.match(t.matchPattern);if(!a)return null;const r=a[0],i=n.match(t.parsePattern);if(!i)return null;let o=t.valueCallback?t.valueCallback(i[0]):i[0];o=e.valueCallback?e.valueCallback(o):o;const d=n.slice(r.length);return{value:o,rest:d}}}const Se=/^(\d+)(th|st|nd|rd)?/i,Oe=/\d+/i,Te={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},We={any:[/^b/i,/^(a|c)/i]},Ye={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Ce={any:[/1/i,/2/i,/3/i,/4/i]},Ee={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Fe={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Ne={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},qe={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},$e={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Ae={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Le={ordinalNumber:xe({matchPattern:Se,parsePattern:Oe,valueCallback:t=>parseInt(t,10)}),era:N({matchPatterns:Te,defaultMatchWidth:"wide",parsePatterns:We,defaultParseWidth:"any"}),quarter:N({matchPatterns:Ye,defaultMatchWidth:"wide",parsePatterns:Ce,defaultParseWidth:"any",valueCallback:t=>t+1}),month:N({matchPatterns:Ee,defaultMatchWidth:"wide",parsePatterns:Fe,defaultParseWidth:"any"}),day:N({matchPatterns:Ne,defaultMatchWidth:"wide",parsePatterns:qe,defaultParseWidth:"any"}),dayPeriod:N({matchPatterns:$e,defaultMatchWidth:"any",parsePatterns:Ae,defaultParseWidth:"any"})},Be={code:"en-US",formatDistance:ue,formatLong:he,formatRelative:ge,localize:ke,match:Le,options:{weekStartsOn:0,firstWeekContainsDate:1}};function He(t){const n=v(t);return ae(n,oe(n))+1}function Qe(t){const n=v(t),e=Q(n).getTime()-re(n).getTime();return Math.round(e/dt)+1}function ft(t,n){var h,y,p,_;const e=v(t),a=e.getFullYear(),r=V(),i=(n==null?void 0:n.firstWeekContainsDate)??((y=(h=n==null?void 0:n.locale)==null?void 0:h.options)==null?void 0:y.firstWeekContainsDate)??r.firstWeekContainsDate??((_=(p=r.locale)==null?void 0:p.options)==null?void 0:_.firstWeekContainsDate)??1,o=T(t,0);o.setFullYear(a+1,0,i),o.setHours(0,0,0,0);const d=A(o,n),l=T(t,0);l.setFullYear(a,0,i),l.setHours(0,0,0,0);const f=A(l,n);return e.getTime()>=d.getTime()?a+1:e.getTime()>=f.getTime()?a:a-1}function Ve(t,n){var d,l,f,h;const e=V(),a=(n==null?void 0:n.firstWeekContainsDate)??((l=(d=n==null?void 0:n.locale)==null?void 0:d.options)==null?void 0:l.firstWeekContainsDate)??e.firstWeekContainsDate??((h=(f=e.locale)==null?void 0:f.options)==null?void 0:h.firstWeekContainsDate)??1,r=ft(t,n),i=T(t,0);return i.setFullYear(r,0,a),i.setHours(0,0,0,0),A(i,n)}function Xe(t,n){const e=v(t),a=A(e,n).getTime()-Ve(e,n).getTime();return Math.round(a/dt)+1}function u(t,n){const e=t<0?"-":"",a=Math.abs(t).toString().padStart(n,"0");return e+a}const k={y(t,n){const e=t.getFullYear(),a=e>0?e:1-e;return u(n==="yy"?a%100:a,n.length)},M(t,n){const e=t.getMonth();return n==="M"?String(e+1):u(e+1,2)},d(t,n){return u(t.getDate(),n.length)},a(t,n){const e=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return e.toUpperCase();case"aaa":return e;case"aaaaa":return e[0];case"aaaa":default:return e==="am"?"a.m.":"p.m."}},h(t,n){return u(t.getHours()%12||12,n.length)},H(t,n){return u(t.getHours(),n.length)},m(t,n){return u(t.getMinutes(),n.length)},s(t,n){return u(t.getSeconds(),n.length)},S(t,n){const e=n.length,a=t.getMilliseconds(),r=Math.floor(a*Math.pow(10,e-3));return u(r,n.length)}},W={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},je={G:function(t,n,e){const a=t.getFullYear()>0?1:0;switch(n){case"G":case"GG":case"GGG":return e.era(a,{width:"abbreviated"});case"GGGGG":return e.era(a,{width:"narrow"});case"GGGG":default:return e.era(a,{width:"wide"})}},y:function(t,n,e){if(n==="yo"){const a=t.getFullYear(),r=a>0?a:1-a;return e.ordinalNumber(r,{unit:"year"})}return k.y(t,n)},Y:function(t,n,e,a){const r=ft(t,a),i=r>0?r:1-r;if(n==="YY"){const o=i%100;return u(o,2)}return n==="Yo"?e.ordinalNumber(i,{unit:"year"}):u(i,n.length)},R:function(t,n){const e=lt(t);return u(e,n.length)},u:function(t,n){const e=t.getFullYear();return u(e,n.length)},Q:function(t,n,e){const a=Math.ceil((t.getMonth()+1)/3);switch(n){case"Q":return String(a);case"QQ":return u(a,2);case"Qo":return e.ordinalNumber(a,{unit:"quarter"});case"QQQ":return e.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return e.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return e.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,n,e){const a=Math.ceil((t.getMonth()+1)/3);switch(n){case"q":return String(a);case"qq":return u(a,2);case"qo":return e.ordinalNumber(a,{unit:"quarter"});case"qqq":return e.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return e.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return e.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,n,e){const a=t.getMonth();switch(n){case"M":case"MM":return k.M(t,n);case"Mo":return e.ordinalNumber(a+1,{unit:"month"});case"MMM":return e.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return e.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return e.month(a,{width:"wide",context:"formatting"})}},L:function(t,n,e){const a=t.getMonth();switch(n){case"L":return String(a+1);case"LL":return u(a+1,2);case"Lo":return e.ordinalNumber(a+1,{unit:"month"});case"LLL":return e.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return e.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return e.month(a,{width:"wide",context:"standalone"})}},w:function(t,n,e,a){const r=Xe(t,a);return n==="wo"?e.ordinalNumber(r,{unit:"week"}):u(r,n.length)},I:function(t,n,e){const a=Qe(t);return n==="Io"?e.ordinalNumber(a,{unit:"week"}):u(a,n.length)},d:function(t,n,e){return n==="do"?e.ordinalNumber(t.getDate(),{unit:"date"}):k.d(t,n)},D:function(t,n,e){const a=He(t);return n==="Do"?e.ordinalNumber(a,{unit:"dayOfYear"}):u(a,n.length)},E:function(t,n,e){const a=t.getDay();switch(n){case"E":case"EE":case"EEE":return e.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return e.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return e.day(a,{width:"short",context:"formatting"});case"EEEE":default:return e.day(a,{width:"wide",context:"formatting"})}},e:function(t,n,e,a){const r=t.getDay(),i=(r-a.weekStartsOn+8)%7||7;switch(n){case"e":return String(i);case"ee":return u(i,2);case"eo":return e.ordinalNumber(i,{unit:"day"});case"eee":return e.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return e.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return e.day(r,{width:"short",context:"formatting"});case"eeee":default:return e.day(r,{width:"wide",context:"formatting"})}},c:function(t,n,e,a){const r=t.getDay(),i=(r-a.weekStartsOn+8)%7||7;switch(n){case"c":return String(i);case"cc":return u(i,n.length);case"co":return e.ordinalNumber(i,{unit:"day"});case"ccc":return e.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return e.day(r,{width:"narrow",context:"standalone"});case"cccccc":return e.day(r,{width:"short",context:"standalone"});case"cccc":default:return e.day(r,{width:"wide",context:"standalone"})}},i:function(t,n,e){const a=t.getDay(),r=a===0?7:a;switch(n){case"i":return String(r);case"ii":return u(r,n.length);case"io":return e.ordinalNumber(r,{unit:"day"});case"iii":return e.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return e.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return e.day(a,{width:"short",context:"formatting"});case"iiii":default:return e.day(a,{width:"wide",context:"formatting"})}},a:function(t,n,e){const r=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,n,e){const a=t.getHours();let r;switch(a===12?r=W.noon:a===0?r=W.midnight:r=a/12>=1?"pm":"am",n){case"b":case"bb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,n,e){const a=t.getHours();let r;switch(a>=17?r=W.evening:a>=12?r=W.afternoon:a>=4?r=W.morning:r=W.night,n){case"B":case"BB":case"BBB":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,n,e){if(n==="ho"){let a=t.getHours()%12;return a===0&&(a=12),e.ordinalNumber(a,{unit:"hour"})}return k.h(t,n)},H:function(t,n,e){return n==="Ho"?e.ordinalNumber(t.getHours(),{unit:"hour"}):k.H(t,n)},K:function(t,n,e){const a=t.getHours()%12;return n==="Ko"?e.ordinalNumber(a,{unit:"hour"}):u(a,n.length)},k:function(t,n,e){let a=t.getHours();return a===0&&(a=24),n==="ko"?e.ordinalNumber(a,{unit:"hour"}):u(a,n.length)},m:function(t,n,e){return n==="mo"?e.ordinalNumber(t.getMinutes(),{unit:"minute"}):k.m(t,n)},s:function(t,n,e){return n==="so"?e.ordinalNumber(t.getSeconds(),{unit:"second"}):k.s(t,n)},S:function(t,n){return k.S(t,n)},X:function(t,n,e,a){const i=(a._originalDate||t).getTimezoneOffset();if(i===0)return"Z";switch(n){case"X":return nt(i);case"XXXX":case"XX":return O(i);case"XXXXX":case"XXX":default:return O(i,":")}},x:function(t,n,e,a){const i=(a._originalDate||t).getTimezoneOffset();switch(n){case"x":return nt(i);case"xxxx":case"xx":return O(i);case"xxxxx":case"xxx":default:return O(i,":")}},O:function(t,n,e,a){const i=(a._originalDate||t).getTimezoneOffset();switch(n){case"O":case"OO":case"OOO":return"GMT"+et(i,":");case"OOOO":default:return"GMT"+O(i,":")}},z:function(t,n,e,a){const i=(a._originalDate||t).getTimezoneOffset();switch(n){case"z":case"zz":case"zzz":return"GMT"+et(i,":");case"zzzz":default:return"GMT"+O(i,":")}},t:function(t,n,e,a){const r=a._originalDate||t,i=Math.floor(r.getTime()/1e3);return u(i,n.length)},T:function(t,n,e,a){const i=(a._originalDate||t).getTime();return u(i,n.length)}};function et(t,n=""){const e=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),i=a%60;return i===0?e+String(r):e+String(r)+n+u(i,2)}function nt(t,n){return t%60===0?(t>0?"-":"+")+u(Math.abs(t)/60,2):O(t,n)}function O(t,n=""){const e=t>0?"-":"+",a=Math.abs(t),r=u(Math.floor(a/60),2),i=u(a%60,2);return e+r+n+i}const at=(t,n)=>{switch(t){case"P":return n.date({width:"short"});case"PP":return n.date({width:"medium"});case"PPP":return n.date({width:"long"});case"PPPP":default:return n.date({width:"full"})}},ht=(t,n)=>{switch(t){case"p":return n.time({width:"short"});case"pp":return n.time({width:"medium"});case"ppp":return n.time({width:"long"});case"pppp":default:return n.time({width:"full"})}},Ie=(t,n)=>{const e=t.match(/(P+)(p+)?/)||[],a=e[1],r=e[2];if(!r)return at(t,n);let i;switch(a){case"P":i=n.dateTime({width:"short"});break;case"PP":i=n.dateTime({width:"medium"});break;case"PPP":i=n.dateTime({width:"long"});break;case"PPPP":default:i=n.dateTime({width:"full"});break}return i.replace("{{date}}",at(a,n)).replace("{{time}}",ht(r,n))},Re={p:ht,P:Ie},Ge=["D","DD"],Ue=["YY","YYYY"];function Je(t){return Ge.indexOf(t)!==-1}function ze(t){return Ue.indexOf(t)!==-1}function rt(t,n,e){if(t==="YYYY")throw new RangeError(`Use \`yyyy\` instead of \`YYYY\` (in \`${n}\`) for formatting years to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(t==="YY")throw new RangeError(`Use \`yy\` instead of \`YY\` (in \`${n}\`) for formatting years to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(t==="D")throw new RangeError(`Use \`d\` instead of \`D\` (in \`${n}\`) for formatting days of the month to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(t==="DD")throw new RangeError(`Use \`dd\` instead of \`DD\` (in \`${n}\`) for formatting days of the month to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`)}const Ke=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ze=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,tn=/^'([^]*?)'?$/,en=/''/g,nn=/[a-zA-Z]/;function an(t,n,e){var h,y,p,_,C,L,B,D;const a=V(),r=(e==null?void 0:e.locale)??a.locale??Be,i=(e==null?void 0:e.firstWeekContainsDate)??((y=(h=e==null?void 0:e.locale)==null?void 0:h.options)==null?void 0:y.firstWeekContainsDate)??a.firstWeekContainsDate??((_=(p=a.locale)==null?void 0:p.options)==null?void 0:_.firstWeekContainsDate)??1,o=(e==null?void 0:e.weekStartsOn)??((L=(C=e==null?void 0:e.locale)==null?void 0:C.options)==null?void 0:L.weekStartsOn)??a.weekStartsOn??((D=(B=a.locale)==null?void 0:B.options)==null?void 0:D.weekStartsOn)??0,d=v(t);if(!se(d))throw new RangeError("Invalid time value");const l={firstWeekContainsDate:i,weekStartsOn:o,locale:r,_originalDate:d};return n.match(Ze).map(function(m){const b=m[0];if(b==="p"||b==="P"){const P=Re[b];return P(m,r.formatLong)}return m}).join("").match(Ke).map(function(m){if(m==="''")return"'";const b=m[0];if(b==="'")return rn(m);const P=je[b];if(P)return!(e!=null&&e.useAdditionalWeekYearTokens)&&ze(m)&&rt(m,n,String(t)),!(e!=null&&e.useAdditionalDayOfYearTokens)&&Je(m)&&rt(m,n,String(t)),P(d,m,r.localize,l);if(b.match(nn))throw new RangeError("Format string contains an unescaped latin alphabet character `"+b+"`");return m}).join("")}function rn(t){const n=t.match(tn);return n?n[1].replace(en,"'"):t}function j(t){return an(t,"d LLL yyyy HH:mm:ss")+" UTC"}const sn="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20opacity='0.24'%20cx='12'%20cy='12'%20r='12'%20fill='%23C8AA41'/%3e%3ccircle%20cx='12'%20cy='12'%20r='5'%20fill='%23C8AA41'/%3e%3c/svg%3e",it="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20opacity='0.24'%20cx='12'%20cy='12'%20r='12'%20fill='%233FC74D'/%3e%3ccircle%20cx='12'%20cy='12'%20r='5'%20fill='%233FC74D'/%3e%3c/svg%3e",on="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20opacity='0.24'%20cx='12'%20cy='12'%20r='12'%20fill='%23848484'/%3e%3ccircle%20cx='12'%20cy='12'%20r='5'%20fill='%23848484'/%3e%3c/svg%3e",mt=t=>(ot("data-v-8f7b57e8"),t=t(),ct(),t),cn={class:"mint-page"},un={class:"page-main"},dn=mt(()=>s("div",{class:"page-bg"},[s("div",{class:"inner-bg"})],-1)),ln={class:"nft-info"},fn=["src"],hn={class:"nft-name pc"},mn={class:"mint-box"},gn={class:"top-info"},wn={class:"nft-status"},yn=["src"],bn={class:"mint-progress-number"},vn={class:"mint-progress"},pn=Tt('<div class="start-time-tip" data-v-8f7b57e8><div class="tip-title" data-v-8f7b57e8> Mint Schedule </div><div class="time-wrapper" data-v-8f7b57e8><div class="start-icon" data-v-8f7b57e8>Start</div><span data-v-8f7b57e8>Whitelist Mint Start:<br data-v-8f7b57e8>31 Dec 2023 11:00:00 UTC</span></div><div class="time-wrapper" data-v-8f7b57e8><div class="start-icon" data-v-8f7b57e8>Start</div><span data-v-8f7b57e8>Public Mint Start:<br data-v-8f7b57e8>31 Dec 2023 13:00:00 UTC</span></div></div>',1),Dn={class:"mint-price"},Mn=mt(()=>s("img",{class:"sol-logo",src:"https://static.demr.xyz/assets/solana-sol-logo-RyWxbhGV.png"},null,-1)),kn=["onClick"],_n=R({__name:"MintView",setup(t){const n=Mt(),e=kt(),a=S(()=>{var x;const c=((x=n.query)==null?void 0:x.type)||_t;return Wt[+c]}),r={pending:0,whiteListActive:1,publicActive:2,ended:3},i=g(0),o=S(()=>{let c="";switch(i.value){case r.pending:c=sn;break;case r.whiteListActive:c=it;break;case r.publicActive:c=it;break;case r.ended:c=on;break}return c}),d=S(()=>{let c="";switch(i.value){case r.pending:c="Pending";break;case r.whiteListActive:c="WhiteList Mint Active";break;case r.publicActive:c="Public Mint Acitve";break;case r.ended:c="Ended";break}return c}),l=g(new Date),f=g(new Date);S(()=>{const c=[];return i.value===r.pending?c.push(`Whitelist Mint Start ${j(l.value)}`,`Public Mint Start at ${j(f.value)}`):i.value===r.whiteListActive&&c.push(`Public Mint Start at ${j(f.value)}`),c});const h=g(0),y=g(1),p=g(2),_=g(0),C=S(()=>_.value>=p.value?{error:!0,content:`You've minted ${p.value} NFT`}:{error:!1,content:`Max ${p.value} mints per wallet`}),L=S(()=>({width:`${h.value}%`}));function B(c){e.value?console.log("Coming soon~!"):(c(),Nt(()=>{const E=document.querySelector(".swv-modal-list");qt.emit("wallet-select",E)}))}const D=g(!0);function m(){D.value=!D.value}const b=g("User rejected the request"),P=g(!1),gt=g(!1),wt=g("success"),yt=g(""),bt=g("");let M;return Pt(()=>{console.log("wallet.value",e.value,M);const c=M==null?void 0:M[0];e.value?c==null||c.enable():c==null||c.disable()}),xt(()=>{var c;M=St("#mint-page-mint-btn",{content:"Coming soon!",trigger:"click",theme:"light"}),e.value||(c=M==null?void 0:M[0])==null||c.disable()}),(c,E)=>(Y(),q("div",cn,[s("div",un,[dn,s("div",ln,[s("img",{class:"nft-img",src:a.value.img},null,8,fn),s("div",{class:$(["nft-name h5 padding",{opened:D.value}]),onClick:m},w(a.value.title),3),s("div",hn,w(a.value.title),1),J(s("div",{class:"nft-content padding"},w(a.value.content),513),[[z,D.value]]),J(s("div",{class:"nft-tip padding"},w(a.value.tip),513),[[z,D.value]])]),s("div",mn,[s("div",gn,[s("div",wn,[s("img",{class:"status-icon",src:o.value},null,8,yn),I(w(d.value),1)]),s("div",bn,w(h.value)+"% Minted ",1)]),s("div",vn,[s("div",{class:"inner-bar",style:Ot(L.value)},null,4)]),pn,s("div",Dn,[Mn,I(w(y.value)+" Sol",1)]),H(K(Ft),{dark:!0},{default:ut(x=>[Yt(c.$slots,"default",Ct(Et({...x})),()=>[s("button",{id:"mint-page-mint-btn",class:$(["mint-btn",{disabled:K(e)}]),onClick:Pn=>B(x.openModal)},"Mint",10,kn)],!0)]),_:3}),s("div",{class:$(["mint-limit-tip",{error:C.value.error}])},w(C.value.content),3)])]),H(Gt,{type:"error",content:b.value,show:P.value,"onUpdate:show":E[0]||(E[0]=x=>P.value=x),loading:!0},null,8,["content","show"]),H(te,{title:yt.value,show:gt.value,content:bt.value,type:wt.value},null,8,["title","show","content","type"])]))}}),Sn=G(_n,[["__scopeId","data-v-8f7b57e8"]]);export{Sn as default};