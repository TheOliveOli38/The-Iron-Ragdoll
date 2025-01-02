(function(N,b){typeof exports=="object"&&typeof module<"u"?b(exports):typeof define=="function"&&define.amd?define(["exports"],b):(N=typeof globalThis<"u"?globalThis:N||self,b(N.colorSorter={}))})(this,function(N){"use strict";var Y0=Object.defineProperty;var X0=(N,b,B)=>b in N?Y0(N,b,{enumerable:!0,configurable:!0,writable:!0,value:B}):N[b]=B;var Ce=(N,b,B)=>(X0(N,typeof b!="symbol"?b+"":b,B),B);var bt,pt,Mt;function b(t,e){let r=t.length;Array.isArray(t[0])||(t=[t]),Array.isArray(e[0])||(e=e.map(i=>[i]));let n=e[0].length,a=e[0].map((i,o)=>e.map(l=>l[o])),s=t.map(i=>a.map(o=>{let l=0;if(!Array.isArray(i)){for(let u of o)l+=i*u;return l}for(let u=0;u<i.length;u++)l+=i[u]*(o[u]||0);return l}));return r===1&&(s=s[0]),n===1?s.map(i=>i[0]):s}function B(t){return D(t)==="string"}function D(t){return(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase()}function Rt(t,{precision:e,unit:r}){return le(t)?"none":It(t,e)+(r??"")}function le(t){return Number.isNaN(t)||t instanceof Number&&(t==null?void 0:t.none)}function It(t,e){if(t===0)return 0;let r=~~t,n=0;r&&e&&(n=~~Math.log10(Math.abs(r))+1);const a=10**(e-n);return Math.floor(t*a+.5)/a}const zt={deg:1,grad:.9,rad:180/Math.PI,turn:360};function xt(t){if(!t)return;t=t.trim();const e=/^([a-z]+)\((.+?)\)$/i,r=/^-?[\d.]+$/,n=/%|deg|g?rad|turn$/,a=/\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;let s=t.match(e);if(s){let i=[];return s[2].replace(a,(o,l)=>{let u=l.match(n),c=l;if(u){let f=u[0],h=c.slice(0,-f.length);f==="%"?(c=new Number(h/100),c.type="<percentage>"):(c=new Number(h*zt[f]),c.type="<angle>",c.unit=f)}else r.test(c)?(c=new Number(c),c.type="<number>"):c==="none"&&(c=new Number(NaN),c.none=!0);o.startsWith("/")&&(c=c instanceof Number?c:new Number(c),c.alpha=!0),typeof c=="object"&&c instanceof Number&&(c.raw=l),i.push(c)}),{name:s[1].toLowerCase(),rawName:s[1],rawArgs:s[2],args:i}}}function kt(t){return t[t.length-1]}function Le(t,e,r){return isNaN(t)?e:isNaN(e)?t:t+(e-t)*r}function $t(t,e,r){return(r-t)/(e-t)}function Se(t,e,r){return Le(e[0],e[1],$t(t[0],t[1],r))}function Pt(t){return t.map(e=>e.split("|").map(r=>{r=r.trim();let n=r.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);if(n){let a=new String(n[1]);return a.range=[+n[2],+n[3]],a}return r}))}function Bt(t,e,r){return Math.max(Math.min(r,e),t)}function ue(t,e){return Math.sign(t)===Math.sign(e)?t:-t}function x(t,e){return ue(Math.abs(t)**e,t)}function Ne(t,e){return e===0?0:t/e}function Et(t,e,r=0,n=t.length){for(;r<n;){const a=r+n>>1;t[a]<e?r=a+1:n=a}return r}class Tt{add(e,r,n){if(typeof arguments[0]!="string"){for(var e in arguments[0])this.add(e,arguments[0][e],arguments[1]);return}(Array.isArray(e)?e:[e]).forEach(function(a){this[a]=this[a]||[],r&&this[a][n?"unshift":"push"](r)},this)}run(e,r){this[e]=this[e]||[],this[e].forEach(function(n){n.call(r&&r.context?r.context:r,r)})}}const Z=new Tt,k={D50:[.3457/.3585,1,(1-.3457-.3585)/.3585],D65:[.3127/.329,1,(1-.3127-.329)/.329]};function ce(t){return Array.isArray(t)?t:k[t]}function F(t,e,r,n={}){if(t=ce(t),e=ce(e),!t||!e)throw new TypeError(`Missing white point to convert ${t?"":"from"}${!t&&!e?"/":""}${e?"":"to"}`);if(t===e)return r;let a={W1:t,W2:e,XYZ:r,options:n};if(Z.run("chromatic-adaptation-start",a),a.M||(a.W1===k.D65&&a.W2===k.D50?a.M=[[1.0479297925449969,.022946870601609652,-.05019226628920524],[.02962780877005599,.9904344267538799,-.017073799063418826],[-.009243040646204504,.015055191490298152,.7518742814281371]]:a.W1===k.D50&&a.W2===k.D65&&(a.M=[[.955473421488075,-.02309845494876471,.06325924320057072],[-.0283697093338637,1.0099953980813041,.021041441191917323],[.012314014864481998,-.020507649298898964,1.330365926242124]])),Z.run("chromatic-adaptation-end",a),a.M)return b(a.M,a.XYZ);throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.")}const Q={gamut_mapping:"css",precision:5,deltaE:"76",verbose:((Mt=(pt=(bt=globalThis==null?void 0:globalThis.process)==null?void 0:bt.env)==null?void 0:pt.NODE_ENV)==null?void 0:Mt.toLowerCase())!=="test",warn:function(e){var r,n;this.verbose&&((n=(r=globalThis==null?void 0:globalThis.console)==null?void 0:r.warn)==null||n.call(r,e))}},Ht=new Set(["<number>","<percentage>","<angle>"]);function Re(t,e,r,n){return Object.entries(t.coords).map(([s,i],o)=>{let l=e.coordGrammar[o],u=n[o],c=u==null?void 0:u.type,f;if(u.none?f=l.find(d=>Ht.has(d)):f=l.find(d=>d==c),!f){let d=i.name||s;throw new TypeError(`${c??u.raw} not allowed for ${d} in ${r}()`)}let h=f.range;c==="<percentage>"&&(h||(h=[0,1]));let M=i.range||i.refRange;return h&&M&&(n[o]=Se(h,M,n[o])),f})}function Ie(t,{meta:e}={}){var n,a,s,i;let r={str:(n=String(t))==null?void 0:n.trim()};if(Z.run("parse-start",r),r.color)return r.color;if(r.parsed=xt(r.str),r.parsed){let o=r.parsed.name;if(o==="color"){let l=r.parsed.args.shift(),u=l.startsWith("--")?l.substring(2):`--${l}`,c=[l,u],f=r.parsed.rawArgs.indexOf("/")>0?r.parsed.args.pop():1;for(let d of m.all){let g=d.getFormat("color");if(g&&(c.includes(g.id)||(a=g.ids)!=null&&a.filter(p=>c.includes(p)).length)){const p=Object.keys(d.coords).map((y,w)=>r.parsed.args[w]||0);let C;return g.coordGrammar&&(C=Re(d,g,"color",p)),e&&Object.assign(e,{formatId:"color",types:C}),g.id.startsWith("--")&&!l.startsWith("--")&&Q.warn(`${d.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${g.id}) instead of color(${l}).`),l.startsWith("--")&&!g.id.startsWith("--")&&Q.warn(`${d.name} is a standard space and supported in the CSS spec. Use color(${g.id}) instead of prefixed color(${l}).`),{spaceId:d.id,coords:p,alpha:f}}}let h="",M=l in m.registry?l:u;if(M in m.registry){let d=(i=(s=m.registry[M].formats)==null?void 0:s.color)==null?void 0:i.id;d&&(h=`Did you mean color(${d})?`)}throw new TypeError(`Cannot parse color(${l}). `+(h||"Missing a plugin?"))}else for(let l of m.all){let u=l.getFormat(o);if(u&&u.type==="function"){let c=1;(u.lastAlpha||kt(r.parsed.args).alpha)&&(c=r.parsed.args.pop());let f=r.parsed.args,h;return u.coordGrammar&&(h=Re(l,u,o,f)),e&&Object.assign(e,{formatId:u.name,types:h}),{spaceId:l.id,coords:f,alpha:c}}}}else for(let o of m.all)for(let l in o.formats){let u=o.formats[l];if(u.type!=="custom"||u.test&&!u.test(r.str))continue;let c=u.parse(r.str);if(c)return c.alpha??(c.alpha=1),e&&(e.formatId=l),c}throw new TypeError(`Could not parse ${t} as a color. Missing a plugin?`)}function S(t){if(Array.isArray(t))return t.map(S);if(!t)throw new TypeError("Empty color reference");B(t)&&(t=Ie(t));let e=t.space||t.spaceId;return e instanceof m||(t.space=m.get(e)),t.alpha===void 0&&(t.alpha=1),t}const qt=75e-6,R=class R{constructor(e){var a;this.id=e.id,this.name=e.name,this.base=e.base?R.get(e.base):null,this.aliases=e.aliases,this.base&&(this.fromBase=e.fromBase,this.toBase=e.toBase);let r=e.coords??this.base.coords;for(let s in r)"name"in r[s]||(r[s].name=s);this.coords=r;let n=e.white??this.base.white??"D65";this.white=ce(n),this.formats=e.formats??{};for(let s in this.formats){let i=this.formats[s];i.type||(i.type="function"),i.name||(i.name=s)}(a=this.formats.color)!=null&&a.id||(this.formats.color={...this.formats.color??{},id:e.cssId||this.id}),e.gamutSpace?this.gamutSpace=e.gamutSpace==="self"?this:R.get(e.gamutSpace):this.isPolar?this.gamutSpace=this.base:this.gamutSpace=this,this.gamutSpace.isUnbounded&&(this.inGamut=(s,i)=>!0),this.referred=e.referred,Object.defineProperty(this,"path",{value:At(this).reverse(),writable:!1,enumerable:!0,configurable:!0}),Z.run("colorspace-init-end",this)}inGamut(e,{epsilon:r=qt}={}){if(!this.equals(this.gamutSpace))return e=this.to(this.gamutSpace,e),this.gamutSpace.inGamut(e,{epsilon:r});let n=Object.values(this.coords);return e.every((a,s)=>{let i=n[s];if(i.type!=="angle"&&i.range){if(Number.isNaN(a))return!0;let[o,l]=i.range;return(o===void 0||a>=o-r)&&(l===void 0||a<=l+r)}return!0})}get isUnbounded(){return Object.values(this.coords).every(e=>!("range"in e))}get cssId(){var e,r;return((r=(e=this.formats)==null?void 0:e.color)==null?void 0:r.id)||this.id}get isPolar(){for(let e in this.coords)if(this.coords[e].type==="angle")return!0;return!1}getFormat(e){if(typeof e=="object")return e=ze(e,this),e;let r;return e==="default"?r=Object.values(this.formats)[0]:r=this.formats[e],r?(r=ze(r,this),r):null}equals(e){return e?this===e||this.id===e||this.id===e.id:!1}to(e,r){if(arguments.length===1){const o=S(e);[e,r]=[o.space,o.coords]}if(e=R.get(e),this.equals(e))return r;r=r.map(o=>Number.isNaN(o)?0:o);let n=this.path,a=e.path,s,i;for(let o=0;o<n.length&&n[o].equals(a[o]);o++)s=n[o],i=o;if(!s)throw new Error(`Cannot convert between color spaces ${this} and ${e}: no connection space was found`);for(let o=n.length-1;o>i;o--)r=n[o].toBase(r);for(let o=i+1;o<a.length;o++)r=a[o].fromBase(r);return r}from(e,r){if(arguments.length===1){const n=S(e);[e,r]=[n.space,n.coords]}return e=R.get(e),e.to(this,r)}toString(){return`${this.name} (${this.id})`}getMinCoords(){let e=[];for(let r in this.coords){let n=this.coords[r],a=n.range||n.refRange;e.push((a==null?void 0:a.min)??0)}return e}static get all(){return[...new Set(Object.values(R.registry))]}static register(e,r){if(arguments.length===1&&(r=arguments[0],e=r.id),r=this.get(r),this.registry[e]&&this.registry[e]!==r)throw new Error(`Duplicate color space registration: '${e}'`);if(this.registry[e]=r,arguments.length===1&&r.aliases)for(let n of r.aliases)this.register(n,r);return r}static get(e,...r){if(!e||e instanceof R)return e;if(D(e)==="string"){let a=R.registry[e.toLowerCase()];if(!a)throw new TypeError(`No color space found with id = "${e}"`);return a}if(r.length)return R.get(...r);throw new TypeError(`${e} is not a valid color space`)}static resolveCoord(e,r){var l;let n=D(e),a,s;if(n==="string"?e.includes(".")?[a,s]=e.split("."):[a,s]=[,e]:Array.isArray(e)?[a,s]=e:(a=e.space,s=e.coordId),a=R.get(a),a||(a=r),!a)throw new TypeError(`Cannot resolve coordinate reference ${e}: No color space specified and relative references are not allowed here`);if(n=D(s),n==="number"||n==="string"&&s>=0){let u=Object.entries(a.coords)[s];if(u)return{space:a,id:u[0],index:s,...u[1]}}a=R.get(a);let i=s.toLowerCase(),o=0;for(let u in a.coords){let c=a.coords[u];if(u.toLowerCase()===i||((l=c.name)==null?void 0:l.toLowerCase())===i)return{space:a,id:u,index:o,...c};o++}throw new TypeError(`No "${s}" coordinate found in ${a.name}. Its coordinates are: ${Object.keys(a.coords).join(", ")}`)}};Ce(R,"registry",{}),Ce(R,"DEFAULT_FORMAT",{type:"functions",name:"color"});let m=R;function At(t){let e=[t];for(let r=t;r=r.base;)e.push(r);return e}function ze(t,{coords:e}={}){if(t.coords&&!t.coordGrammar){t.type||(t.type="function"),t.name||(t.name="color"),t.coordGrammar=Pt(t.coords);let r=Object.entries(e).map(([n,a],s)=>{let i=t.coordGrammar[s][0],o=a.range||a.refRange,l=i.range,u="";return i=="<percentage>"?(l=[0,100],u="%"):i=="<angle>"&&(u="deg"),{fromRange:o,toRange:l,suffix:u}});t.serializeCoords=(n,a)=>n.map((s,i)=>{let{fromRange:o,toRange:l,suffix:u}=r[i];return o&&l&&(s=Se(o,l,s)),s=Rt(s,{precision:a,unit:u}),s})}return t}const E=new m({id:"xyz-d65",name:"XYZ D65",coords:{x:{name:"X"},y:{name:"Y"},z:{name:"Z"}},white:"D65",formats:{color:{ids:["xyz-d65","xyz"]}},aliases:["xyz"]});class v extends m{constructor(e){e.coords||(e.coords={r:{range:[0,1],name:"Red"},g:{range:[0,1],name:"Green"},b:{range:[0,1],name:"Blue"}}),e.base||(e.base=E),e.toXYZ_M&&e.fromXYZ_M&&(e.toBase??(e.toBase=r=>{let n=b(e.toXYZ_M,r);return this.white!==this.base.white&&(n=F(this.white,this.base.white,n)),n}),e.fromBase??(e.fromBase=r=>(r=F(this.base.white,this.white,r),b(e.fromXYZ_M,r)))),e.referred??(e.referred="display"),super(e)}}function xe(t,e){return t=S(t),!e||t.space.equals(e)?t.coords.slice():(e=m.get(e),e.from(t))}function J(t,e){t=S(t);let{space:r,index:n}=m.resolveCoord(e,t.space);return xe(t,r)[n]}function ke(t,e,r){return t=S(t),e=m.get(e),t.coords=e.to(t.space,r),t}ke.returns="color";function fe(t,e,r){if(t=S(t),arguments.length===2&&D(arguments[1])==="object"){let n=arguments[1];for(let a in n)fe(t,a,n[a])}else{typeof r=="function"&&(r=r(J(t,e)));let{space:n,index:a}=m.resolveCoord(e,t.space),s=xe(t,n);s[a]=r,ke(t,n,s)}return t}fe.returns="color";const Dt=new m({id:"xyz-d50",name:"XYZ D50",white:"D50",base:E,fromBase:t=>F(E.white,"D50",t),toBase:t=>F("D50",E.white,t)}),Jt=216/24389,$e=24/116,W=24389/27;let he=k.D50;const $=new m({id:"lab",name:"Lab",coords:{l:{refRange:[0,100],name:"Lightness"},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:he,base:Dt,fromBase(t){let r=t.map((n,a)=>n/he[a]).map(n=>n>Jt?Math.cbrt(n):(W*n+16)/116);return[116*r[1]-16,500*(r[0]-r[1]),200*(r[1]-r[2])]},toBase(t){let e=[];return e[1]=(t[0]+16)/116,e[0]=t[1]/500+e[1],e[2]=e[1]-t[2]/200,[e[0]>$e?Math.pow(e[0],3):(116*e[0]-16)/W,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/W,e[2]>$e?Math.pow(e[2],3):(116*e[2]-16)/W].map((n,a)=>n*he[a])},formats:{lab:{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});function T(t){return(t%360+360)%360}const O=new m({id:"lch",name:"LCH",coords:{l:{refRange:[0,100],name:"Lightness"},c:{refRange:[0,150],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:$,fromBase(t){let[e,r,n]=t,a;const s=.02;return Math.abs(r)<s&&Math.abs(n)<s?a=NaN:a=Math.atan2(n,r)*180/Math.PI,[e,Math.sqrt(r**2+n**2),T(a)]},toBase(t){let[e,r,n]=t;return r<0&&(r=0),isNaN(n)&&(n=0),[e,r*Math.cos(n*Math.PI/180),r*Math.sin(n*Math.PI/180)]},formats:{lch:{coords:["<number> | <percentage>","<number> | <percentage>","<number> | <angle>"]}}}),Pe=25**7,K=Math.PI,Be=180/K,A=K/180;function Ee(t){const e=t*t;return e*e*e*t}function Te(t,e,{kL:r=1,kC:n=1,kH:a=1}={}){[t,e]=S([t,e]);let[s,i,o]=$.from(t),l=O.from($,[s,i,o])[1],[u,c,f]=$.from(e),h=O.from($,[u,c,f])[1];l<0&&(l=0),h<0&&(h=0);let M=(l+h)/2,d=Ee(M),g=.5*(1-Math.sqrt(d/(d+Pe))),p=(1+g)*i,C=(1+g)*c,y=Math.sqrt(p**2+o**2),w=Math.sqrt(C**2+f**2),I=p===0&&o===0?0:Math.atan2(o,p),H=C===0&&f===0?0:Math.atan2(f,C);I<0&&(I+=2*K),H<0&&(H+=2*K),I*=Be,H*=Be;let se=u-s,ie=w-y,z=H-I,X=I+H,wt=Math.abs(z),_;y*w===0?_=0:wt<=180?_=z:z>180?_=z-360:z<-180?_=z+360:Q.warn("the unthinkable has happened");let yt=2*Math.sqrt(w*y)*Math.sin(_*A/2),A0=(s+u)/2,ye=(y+w)/2,Ct=Ee(ye),P;y*w===0?P=X:wt<=180?P=X/2:X<360?P=(X+360)/2:P=(X-360)/2;let Lt=(A0-50)**2,D0=1+.015*Lt/Math.sqrt(20+Lt),St=1+.045*ye,G=1;G-=.17*Math.cos((P-30)*A),G+=.24*Math.cos(2*P*A),G+=.32*Math.cos((3*P+6)*A),G-=.2*Math.cos((4*P-63)*A);let Nt=1+.015*ye*G,J0=30*Math.exp(-1*((P-275)/25)**2),O0=2*Math.sqrt(Ct/(Ct+Pe)),j0=-1*Math.sin(2*J0*A)*O0,oe=(se/(r*D0))**2;return oe+=(ie/(n*St))**2,oe+=(yt/(a*Nt))**2,oe+=j0*(ie/(n*St))*(yt/(a*Nt)),Math.sqrt(oe)}const Ot=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],jt=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],Yt=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],Xt=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],j=new m({id:"oklab",name:"Oklab",coords:{l:{refRange:[0,1],name:"Lightness"},a:{refRange:[-.4,.4]},b:{refRange:[-.4,.4]}},white:"D65",base:E,fromBase(t){let r=b(Ot,t).map(n=>Math.cbrt(n));return b(Yt,r)},toBase(t){let r=b(Xt,t).map(n=>n**3);return b(jt,r)},formats:{oklab:{coords:["<percentage> | <number>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});function de(t,e){[t,e]=S([t,e]);let[r,n,a]=j.from(t),[s,i,o]=j.from(e),l=r-s,u=n-i,c=a-o;return Math.sqrt(l**2+u**2+c**2)}const _t=75e-6;function Y(t,e,{epsilon:r=_t}={}){t=S(t),e||(e=t.space),e=m.get(e);let n=t.coords;return e!==t.space&&(n=e.from(t)),e.inGamut(n,{epsilon:r})}function He(t){return{space:t.space,coords:t.coords.slice(),alpha:t.alpha}}function Gt(t,e,r="lab"){r=m.get(r);let n=r.from(t),a=r.from(e);return Math.sqrt(n.reduce((s,i,o)=>{let l=a[o];return isNaN(i)||isNaN(l)?s:s+(l-i)**2},0))}function Zt(t,e){return Gt(t,e,"lab")}const qe=Math.PI/180;function Ft(t,e,{l:r=2,c:n=1}={}){[t,e]=S([t,e]);let[a,s,i]=$.from(t),[,o,l]=O.from($,[a,s,i]),[u,c,f]=$.from(e),h=O.from($,[u,c,f])[1];o<0&&(o=0),h<0&&(h=0);let M=a-u,d=o-h,g=s-c,p=i-f,C=g**2+p**2-d**2,y=.511;a>=16&&(y=.040975*a/(1+.01765*a));let w=.0638*o/(1+.0131*o)+.638,I;Number.isNaN(l)&&(l=0),l>=164&&l<=345?I=.56+Math.abs(.2*Math.cos((l+168)*qe)):I=.36+Math.abs(.4*Math.cos((l+35)*qe));let H=Math.pow(o,4),se=Math.sqrt(H/(H+1900)),ie=w*(se*I+1-se),z=(M/(r*y))**2;return z+=(d/(n*w))**2,z+=C/ie**2,Math.sqrt(z)}const Ae=203,De=new m({id:"xyz-abs-d65",cssId:"--xyz-abs-d65",name:"Absolute XYZ D65",coords:{x:{refRange:[0,9504.7],name:"Xa"},y:{refRange:[0,1e4],name:"Ya"},z:{refRange:[0,10888.3],name:"Za"}},base:E,fromBase(t){return t.map(e=>Math.max(e*Ae,0))},toBase(t){return t.map(e=>Math.max(e/Ae,0))}}),U=1.15,V=.66,Je=2610/2**14,Qt=2**14/2610,Oe=3424/2**12,je=2413/2**7,Ye=2392/2**7,vt=1.7*2523/2**5,Xe=2**5/(1.7*2523),ee=-.56,me=16295499532821565e-27,Wt=[[.41478972,.579999,.014648],[-.20151,1.120649,.0531008],[-.0166008,.2648,.6684799]],Kt=[[1.9242264357876067,-1.0047923125953657,.037651404030618],[.35031676209499907,.7264811939316552,-.06538442294808501],[-.09098281098284752,-.3127282905230739,1.5227665613052603]],Ut=[[.5,.5,0],[3.524,-4.066708,.542708],[.199076,1.096799,-1.295875]],Vt=[[1,.1386050432715393,.05804731615611886],[.9999999999999999,-.1386050432715393,-.05804731615611886],[.9999999999999998,-.09601924202631895,-.8118918960560388]],e0=new m({id:"jzazbz",name:"Jzazbz",coords:{jz:{refRange:[0,1],name:"Jz"},az:{refRange:[-.5,.5]},bz:{refRange:[-.5,.5]}},base:De,fromBase(t){let[e,r,n]=t,a=U*e-(U-1)*n,s=V*r-(V-1)*e,o=b(Wt,[a,s,n]).map(function(h){let M=Oe+je*(h/1e4)**Je,d=1+Ye*(h/1e4)**Je;return(M/d)**vt}),[l,u,c]=b(Ut,o);return[(1+ee)*l/(1+ee*l)-me,u,c]},toBase(t){let[e,r,n]=t,a=(e+me)/(1+ee-ee*(e+me)),i=b(Vt,[a,r,n]).map(function(h){let M=Oe-h**Xe,d=Ye*h**Xe-je;return 1e4*(M/d)**Qt}),[o,l,u]=b(Kt,i),c=(o+(U-1)*u)/U,f=(l+(V-1)*c)/V;return[c,f,u]},formats:{color:{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}}),_e=new m({id:"jzczhz",name:"JzCzHz",coords:{jz:{refRange:[0,1],name:"Jz"},cz:{refRange:[0,1],name:"Chroma"},hz:{refRange:[0,360],type:"angle",name:"Hue"}},base:e0,fromBase(t){let[e,r,n]=t,a;const s=2e-4;return Math.abs(r)<s&&Math.abs(n)<s?a=NaN:a=Math.atan2(n,r)*180/Math.PI,[e,Math.sqrt(r**2+n**2),T(a)]},toBase(t){return[t[0],t[1]*Math.cos(t[2]*Math.PI/180),t[1]*Math.sin(t[2]*Math.PI/180)]}});function t0(t,e){[t,e]=S([t,e]);let[r,n,a]=_e.from(t),[s,i,o]=_e.from(e),l=r-s,u=n-i;Number.isNaN(a)&&Number.isNaN(o)?(a=0,o=0):Number.isNaN(a)?a=o:Number.isNaN(o)&&(o=a);let c=a-o,f=2*Math.sqrt(n*i)*Math.sin(c/2*(Math.PI/180));return Math.sqrt(l**2+u**2+f**2)}const Ge=3424/4096,Ze=2413/128,Fe=2392/128,Qe=2610/16384,r0=2523/32,n0=16384/2610,ve=32/2523,a0=[[.3592832590121217,.6976051147779502,-.035891593232029],[-.1920808463704993,1.100476797037432,.0753748658519118],[.0070797844607479,.0748396662186362,.8433265453898765]],s0=[[2048/4096,2048/4096,0],[6610/4096,-13613/4096,7003/4096],[17933/4096,-17390/4096,-543/4096]],i0=[[.9999999999999998,.0086090370379328,.111029625003026],[.9999999999999998,-.0086090370379328,-.1110296250030259],[.9999999999999998,.5600313357106791,-.3206271749873188]],o0=[[2.0701522183894223,-1.3263473389671563,.2066510476294053],[.3647385209748072,.6805660249472273,-.0453045459220347],[-.0497472075358123,-.0492609666966131,1.1880659249923042]],We=new m({id:"ictcp",name:"ICTCP",coords:{i:{refRange:[0,1],name:"I"},ct:{refRange:[-.5,.5],name:"CT"},cp:{refRange:[-.5,.5],name:"CP"}},base:De,fromBase(t){let e=b(a0,t);return l0(e)},toBase(t){let e=u0(t);return b(o0,e)}});function l0(t){let e=t.map(function(r){let n=Ge+Ze*(r/1e4)**Qe,a=1+Fe*(r/1e4)**Qe;return(n/a)**r0});return b(s0,e)}function u0(t){return b(i0,t).map(function(n){let a=Math.max(n**ve-Ge,0),s=Ze-Fe*n**ve;return 1e4*(a/s)**n0})}function c0(t,e){[t,e]=S([t,e]);let[r,n,a]=We.from(t),[s,i,o]=We.from(e);return 720*Math.sqrt((r-s)**2+.25*(n-i)**2+(a-o)**2)}const f0=k.D65,Ke=.42,Ue=1/Ke,ge=2*Math.PI,Ve=[[.401288,.650173,-.051461],[-.250268,1.204414,.045854],[-.002079,.048952,.953127]],h0=[[1.8620678550872327,-1.0112546305316843,.14918677544445175],[.38752654323613717,.6214474419314753,-.008973985167612518],[-.015841498849333856,-.03412293802851557,1.0499644368778496]],d0=[[460,451,288],[460,-891,-261],[460,-220,-6300]],m0={dark:[.8,.525,.8],dim:[.9,.59,.9],average:[1,.69,1]},q={h:[20.14,90,164.25,237.53,380.14],e:[.8,.7,1,1.2,.8],H:[0,100,200,300,400]},g0=180/Math.PI,et=Math.PI/180;function tt(t,e){return t.map(n=>{const a=x(e*Math.abs(n)*.01,Ke);return 400*ue(a,n)/(a+27.13)})}function b0(t,e){const r=100/e*27.13**Ue;return t.map(n=>{const a=Math.abs(n);return ue(r*x(a/(400-a),Ue),n)})}function p0(t){let e=T(t);e<=q.h[0]&&(e+=360);const r=Et(q.h,e)-1,[n,a]=q.h.slice(r,r+2),[s,i]=q.e.slice(r,r+2),o=q.H[r],l=(e-n)/s;return o+100*l/(l+(a-e)/i)}function M0(t){let e=(t%400+400)%400;const r=Math.floor(.01*e);e=e%100;const[n,a]=q.h.slice(r,r+2),[s,i]=q.e.slice(r,r+2);return T((e*(i*n-s*a)-100*n*i)/(e*(i-s)-100*i))}function rt(t,e,r,n,a){const s={};s.discounting=a,s.refWhite=t,s.surround=n;const i=t.map(g=>g*100);s.la=e,s.yb=r;const o=i[1],l=b(Ve,i);n=m0[s.surround];const u=n[0];s.c=n[1],s.nc=n[2];const f=(1/(5*s.la+1))**4;s.fl=f*s.la+.1*(1-f)*(1-f)*Math.cbrt(5*s.la),s.flRoot=s.fl**.25,s.n=s.yb/o,s.z=1.48+Math.sqrt(s.n),s.nbb=.725*s.n**-.2,s.ncb=s.nbb;const h=Math.max(Math.min(u*(1-1/3.6*Math.exp((-s.la-42)/92)),1),0);s.dRgb=l.map(g=>Le(1,o/g,h)),s.dRgbInv=s.dRgb.map(g=>1/g);const M=l.map((g,p)=>g*s.dRgb[p]),d=tt(M,s.fl);return s.aW=s.nbb*(2*d[0]+d[1]+.05*d[2]),s}const nt=rt(f0,64/Math.PI*.2,20,"average",!1);function be(t,e){if(!(t.J!==void 0^t.Q!==void 0))throw new Error("Conversion requires one and only one: 'J' or 'Q'");if(!(t.C!==void 0^t.M!==void 0^t.s!==void 0))throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");if(!(t.h!==void 0^t.H!==void 0))throw new Error("Conversion requires one and only one: 'h' or 'H'");if(t.J===0||t.Q===0)return[0,0,0];let r=0;t.h!==void 0?r=T(t.h)*et:r=M0(t.H)*et;const n=Math.cos(r),a=Math.sin(r);let s=0;t.J!==void 0?s=x(t.J,1/2)*.1:t.Q!==void 0&&(s=.25*e.c*t.Q/((e.aW+4)*e.flRoot));let i=0;t.C!==void 0?i=t.C/s:t.M!==void 0?i=t.M/e.flRoot/s:t.s!==void 0&&(i=4e-4*t.s**2*(e.aW+4)/e.c);const o=x(i*Math.pow(1.64-Math.pow(.29,e.n),-.73),10/9),l=.25*(Math.cos(r+2)+3.8),u=e.aW*x(s,2/e.c/e.z),c=5e4/13*e.nc*e.ncb*l,f=u/e.nbb,h=23*(f+.305)*Ne(o,23*c+o*(11*n+108*a)),M=h*n,d=h*a,g=b0(b(d0,[f,M,d]).map(p=>p*1/1403),e.fl);return b(h0,g.map((p,C)=>p*e.dRgbInv[C])).map(p=>p/100)}function at(t,e){const r=t.map(w=>w*100),n=tt(b(Ve,r).map((w,I)=>w*e.dRgb[I]),e.fl),a=n[0]+(-12*n[1]+n[2])/11,s=(n[0]+n[1]-2*n[2])/9,i=(Math.atan2(s,a)%ge+ge)%ge,o=.25*(Math.cos(i+2)+3.8),l=5e4/13*e.nc*e.ncb*Ne(o*Math.sqrt(a**2+s**2),n[0]+n[1]+1.05*n[2]+.305),u=x(l,.9)*Math.pow(1.64-Math.pow(.29,e.n),.73),c=e.nbb*(2*n[0]+n[1]+.05*n[2]),f=x(c/e.aW,.5*e.c*e.z),h=100*x(f,2),M=4/e.c*f*(e.aW+4)*e.flRoot,d=u*f,g=d*e.flRoot,p=T(i*g0),C=p0(p),y=50*x(e.c*u/(e.aW+4),1/2);return{J:h,C:d,h:p,s:y,Q:M,M:g,H:C}}new m({id:"cam16-jmh",cssId:"--cam16-jmh",name:"CAM16-JMh",coords:{j:{refRange:[0,100],name:"J"},m:{refRange:[0,105],name:"Colorfulness"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:E,fromBase(t){const e=at(t,nt);return[e.J,e.M,e.h]},toBase(t){return be({J:t[0],M:t[1],h:t[2]},nt)}});const w0=k.D65,y0=216/24389,st=24389/27;function C0(t){return 116*(t>y0?Math.cbrt(t):(st*t+16)/116)-16}function pe(t){return t>8?Math.pow((t+16)/116,3):t/st}function L0(t,e){let[r,n,a]=t,s=[],i=0;if(a===0)return[0,0,0];let o=pe(a);a>0?i=.00379058511492914*a**2+.608983189401032*a+.9155088574762233:i=9514440756550361e-21*a**2+.08693057439788597*a-21.928975842194614;const l=2e-12,u=15;let c=0,f=1/0;for(;c<=u;){s=be({J:i,C:n,h:r},e);const h=Math.abs(s[1]-o);if(h<f){if(h<=l)return s;f=h}i=i-(s[1]-o)*i/(2*s[1]),c+=1}return be({J:i,C:n,h:r},e)}function S0(t,e){const r=C0(t[1]);if(r===0)return[0,0,0];const n=at(t,Me);return[T(n.h),n.C,r]}const Me=rt(w0,200/Math.PI*pe(50),pe(50)*100,"average",!1),te=new m({id:"hct",name:"HCT",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},c:{refRange:[0,145],name:"Colorfulness"},t:{refRange:[0,100],name:"Tone"}},base:E,fromBase(t){return S0(t)},toBase(t){return L0(t,Me)},formats:{color:{id:"--hct",coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}}),N0=Math.PI/180,it=[1,.007,.0228];function ot(t){t[1]<0&&(t=te.fromBase(te.toBase(t)));const e=Math.log(Math.max(1+it[2]*t[1]*Me.flRoot,1))/it[2],r=t[0]*N0,n=e*Math.cos(r),a=e*Math.sin(r);return[t[2],n,a]}function R0(t,e){[t,e]=S([t,e]);let[r,n,a]=ot(te.from(t)),[s,i,o]=ot(te.from(e));return Math.sqrt((r-s)**2+(n-i)**2+(a-o)**2)}const lt={deltaE76:Zt,deltaECMC:Ft,deltaE2000:Te,deltaEJz:t0,deltaEITP:c0,deltaEOK:de,deltaEHCT:R0};function I0(t){const e=t?Math.floor(Math.log10(Math.abs(t))):0;return Math.max(parseFloat(`1e${e-2}`),1e-6)}const ut={hct:{method:"hct.c",jnd:2,deltaEMethod:"hct",blackWhiteClamp:{}},"hct-tonal":{method:"hct.c",jnd:0,deltaEMethod:"hct",blackWhiteClamp:{channel:"hct.t",min:0,max:100}}};function re(t,{method:e=Q.gamut_mapping,space:r=void 0,deltaEMethod:n="",jnd:a=2,blackWhiteClamp:s={}}={}){if(t=S(t),B(arguments[1])?r=arguments[1]:r||(r=t.space),r=m.get(r),Y(t,r,{epsilon:0}))return t;let i;if(e==="css")i=z0(t,{space:r});else{if(e!=="clip"&&!Y(t,r)){Object.prototype.hasOwnProperty.call(ut,e)&&({method:e,jnd:a,deltaEMethod:n,blackWhiteClamp:s}=ut[e]);let o=Te;if(n!==""){for(let u in lt)if("deltae"+n.toLowerCase()===u.toLowerCase()){o=lt[u];break}}let l=re(L(t,r),{method:"clip",space:r});if(o(t,l)>a){if(Object.keys(s).length===3){let y=m.resolveCoord(s.channel),w=J(L(t,y.space),y.id);if(le(w)&&(w=0),w>=s.max)return L({space:"xyz-d65",coords:k.D65},t.space);if(w<=s.min)return L({space:"xyz-d65",coords:[0,0,0]},t.space)}let u=m.resolveCoord(e),c=u.space,f=u.id,h=L(t,c);h.coords.forEach((y,w)=>{le(y)&&(h.coords[w]=0)});let d=(u.range||u.refRange)[0],g=I0(a),p=d,C=J(h,f);for(;C-p>g;){let y=He(h);y=re(y,{space:r,method:"clip"}),o(h,y)-a<g?p=J(h,f):C=J(h,f),fe(h,f,(p+C)/2)}i=L(h,r)}else i=l}else i=L(t,r);if(e==="clip"||!Y(i,r,{epsilon:0})){let o=Object.values(r.coords).map(l=>l.range||[]);i.coords=i.coords.map((l,u)=>{let[c,f]=o[u];return c!==void 0&&(l=Math.max(c,l)),f!==void 0&&(l=Math.min(l,f)),l})}}return r!==t.space&&(i=L(i,t.space)),t.coords=i.coords,t}re.returns="color";const ct={WHITE:{space:j,coords:[1,0,0]},BLACK:{space:j,coords:[0,0,0]}};function z0(t,{space:e}={}){t=S(t),e||(e=t.space),e=m.get(e);const a=m.get("oklch");if(e.isUnbounded)return L(t,e);const s=L(t,a);let i=s.coords[0];if(i>=1){const d=L(ct.WHITE,e);return d.alpha=t.alpha,L(d,e)}if(i<=0){const d=L(ct.BLACK,e);return d.alpha=t.alpha,L(d,e)}if(Y(s,e,{epsilon:0}))return L(s,e);function o(d){const g=L(d,e),p=Object.values(e.coords);return g.coords=g.coords.map((C,y)=>{if("range"in p[y]){const[w,I]=p[y].range;return Bt(w,C,I)}return C}),g}let l=0,u=s.coords[1],c=!0,f=He(s),h=o(f),M=de(h,f);if(M<.02)return h;for(;u-l>1e-4;){const d=(l+u)/2;if(f.coords[1]=d,c&&Y(f,e,{epsilon:0}))l=d;else if(h=o(f),M=de(h,f),M<.02){if(.02-M<1e-4)break;c=!1,l=d}else u=d}return h}function L(t,e,{inGamut:r}={}){t=S(t),e=m.get(e);let n=e.from(t),a={space:e,coords:n,alpha:t.alpha};return r&&(a=re(a,r===!0?void 0:r)),a}L.returns="color";const x0=[[.4865709486482162,.26566769316909306,.1982172852343625],[.2289745640697488,.6917385218365064,.079286914093745],[0,.04511338185890264,1.043944368900976]],k0=[[2.493496911941425,-.9313836179191239,-.40271078445071684],[-.8294889695615747,1.7626640603183463,.023624685841943577],[.03584583024378447,-.07617238926804182,.9568845240076872]],$0=new v({id:"p3-linear",cssId:"--display-p3-linear",name:"Linear P3",white:"D65",toXYZ_M:x0,fromXYZ_M:k0}),P0=[[.41239079926595934,.357584339383878,.1804807884018343],[.21263900587151027,.715168678767756,.07219231536073371],[.01933081871559182,.11919477979462598,.9505321522496607]],B0=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]],E0=new v({id:"srgb-linear",name:"Linear sRGB",white:"D65",toXYZ_M:P0,fromXYZ_M:B0}),ft={aliceblue:[240/255,248/255,1],antiquewhite:[250/255,235/255,215/255],aqua:[0,1,1],aquamarine:[127/255,1,212/255],azure:[240/255,1,1],beige:[245/255,245/255,220/255],bisque:[1,228/255,196/255],black:[0,0,0],blanchedalmond:[1,235/255,205/255],blue:[0,0,1],blueviolet:[138/255,43/255,226/255],brown:[165/255,42/255,42/255],burlywood:[222/255,184/255,135/255],cadetblue:[95/255,158/255,160/255],chartreuse:[127/255,1,0],chocolate:[210/255,105/255,30/255],coral:[1,127/255,80/255],cornflowerblue:[100/255,149/255,237/255],cornsilk:[1,248/255,220/255],crimson:[220/255,20/255,60/255],cyan:[0,1,1],darkblue:[0,0,139/255],darkcyan:[0,139/255,139/255],darkgoldenrod:[184/255,134/255,11/255],darkgray:[169/255,169/255,169/255],darkgreen:[0,100/255,0],darkgrey:[169/255,169/255,169/255],darkkhaki:[189/255,183/255,107/255],darkmagenta:[139/255,0,139/255],darkolivegreen:[85/255,107/255,47/255],darkorange:[1,140/255,0],darkorchid:[153/255,50/255,204/255],darkred:[139/255,0,0],darksalmon:[233/255,150/255,122/255],darkseagreen:[143/255,188/255,143/255],darkslateblue:[72/255,61/255,139/255],darkslategray:[47/255,79/255,79/255],darkslategrey:[47/255,79/255,79/255],darkturquoise:[0,206/255,209/255],darkviolet:[148/255,0,211/255],deeppink:[1,20/255,147/255],deepskyblue:[0,191/255,1],dimgray:[105/255,105/255,105/255],dimgrey:[105/255,105/255,105/255],dodgerblue:[30/255,144/255,1],firebrick:[178/255,34/255,34/255],floralwhite:[1,250/255,240/255],forestgreen:[34/255,139/255,34/255],fuchsia:[1,0,1],gainsboro:[220/255,220/255,220/255],ghostwhite:[248/255,248/255,1],gold:[1,215/255,0],goldenrod:[218/255,165/255,32/255],gray:[128/255,128/255,128/255],green:[0,128/255,0],greenyellow:[173/255,1,47/255],grey:[128/255,128/255,128/255],honeydew:[240/255,1,240/255],hotpink:[1,105/255,180/255],indianred:[205/255,92/255,92/255],indigo:[75/255,0,130/255],ivory:[1,1,240/255],khaki:[240/255,230/255,140/255],lavender:[230/255,230/255,250/255],lavenderblush:[1,240/255,245/255],lawngreen:[124/255,252/255,0],lemonchiffon:[1,250/255,205/255],lightblue:[173/255,216/255,230/255],lightcoral:[240/255,128/255,128/255],lightcyan:[224/255,1,1],lightgoldenrodyellow:[250/255,250/255,210/255],lightgray:[211/255,211/255,211/255],lightgreen:[144/255,238/255,144/255],lightgrey:[211/255,211/255,211/255],lightpink:[1,182/255,193/255],lightsalmon:[1,160/255,122/255],lightseagreen:[32/255,178/255,170/255],lightskyblue:[135/255,206/255,250/255],lightslategray:[119/255,136/255,153/255],lightslategrey:[119/255,136/255,153/255],lightsteelblue:[176/255,196/255,222/255],lightyellow:[1,1,224/255],lime:[0,1,0],limegreen:[50/255,205/255,50/255],linen:[250/255,240/255,230/255],magenta:[1,0,1],maroon:[128/255,0,0],mediumaquamarine:[102/255,205/255,170/255],mediumblue:[0,0,205/255],mediumorchid:[186/255,85/255,211/255],mediumpurple:[147/255,112/255,219/255],mediumseagreen:[60/255,179/255,113/255],mediumslateblue:[123/255,104/255,238/255],mediumspringgreen:[0,250/255,154/255],mediumturquoise:[72/255,209/255,204/255],mediumvioletred:[199/255,21/255,133/255],midnightblue:[25/255,25/255,112/255],mintcream:[245/255,1,250/255],mistyrose:[1,228/255,225/255],moccasin:[1,228/255,181/255],navajowhite:[1,222/255,173/255],navy:[0,0,128/255],oldlace:[253/255,245/255,230/255],olive:[128/255,128/255,0],olivedrab:[107/255,142/255,35/255],orange:[1,165/255,0],orangered:[1,69/255,0],orchid:[218/255,112/255,214/255],palegoldenrod:[238/255,232/255,170/255],palegreen:[152/255,251/255,152/255],paleturquoise:[175/255,238/255,238/255],palevioletred:[219/255,112/255,147/255],papayawhip:[1,239/255,213/255],peachpuff:[1,218/255,185/255],peru:[205/255,133/255,63/255],pink:[1,192/255,203/255],plum:[221/255,160/255,221/255],powderblue:[176/255,224/255,230/255],purple:[128/255,0,128/255],rebeccapurple:[102/255,51/255,153/255],red:[1,0,0],rosybrown:[188/255,143/255,143/255],royalblue:[65/255,105/255,225/255],saddlebrown:[139/255,69/255,19/255],salmon:[250/255,128/255,114/255],sandybrown:[244/255,164/255,96/255],seagreen:[46/255,139/255,87/255],seashell:[1,245/255,238/255],sienna:[160/255,82/255,45/255],silver:[192/255,192/255,192/255],skyblue:[135/255,206/255,235/255],slateblue:[106/255,90/255,205/255],slategray:[112/255,128/255,144/255],slategrey:[112/255,128/255,144/255],snow:[1,250/255,250/255],springgreen:[0,1,127/255],steelblue:[70/255,130/255,180/255],tan:[210/255,180/255,140/255],teal:[0,128/255,128/255],thistle:[216/255,191/255,216/255],tomato:[1,99/255,71/255],turquoise:[64/255,224/255,208/255],violet:[238/255,130/255,238/255],wheat:[245/255,222/255,179/255],white:[1,1,1],whitesmoke:[245/255,245/255,245/255],yellow:[1,1,0],yellowgreen:[154/255,205/255,50/255]};let ht=Array(3).fill("<percentage> | <number>[0, 255]"),dt=Array(3).fill("<number>[0, 255]");const ne=new v({id:"srgb",name:"sRGB",base:E0,fromBase:t=>t.map(e=>{let r=e<0?-1:1,n=e*r;return n>.0031308?r*(1.055*n**(1/2.4)-.055):12.92*e}),toBase:t=>t.map(e=>{let r=e<0?-1:1,n=e*r;return n<=.04045?e/12.92:r*((n+.055)/1.055)**2.4}),formats:{rgb:{coords:ht},rgb_number:{name:"rgb",commas:!0,coords:dt,noAlpha:!0},color:{},rgba:{coords:ht,commas:!0,lastAlpha:!0},rgba_number:{name:"rgba",commas:!0,coords:dt},hex:{type:"custom",toGamut:!0,test:t=>/^#([a-f0-9]{3,4}){1,2}$/i.test(t),parse(t){t.length<=5&&(t=t.replace(/[a-f0-9]/gi,"$&$&"));let e=[];return t.replace(/[a-f0-9]{2}/gi,r=>{e.push(parseInt(r,16)/255)}),{spaceId:"srgb",coords:e.slice(0,3),alpha:e.slice(3)[0]}},serialize:(t,e,{collapse:r=!0}={})=>{e<1&&t.push(e),t=t.map(s=>Math.round(s*255));let n=r&&t.every(s=>s%17===0);return"#"+t.map(s=>n?(s/17).toString(16):s.toString(16).padStart(2,"0")).join("")}},keyword:{type:"custom",test:t=>/^[a-z]+$/i.test(t),parse(t){t=t.toLowerCase();let e={spaceId:"srgb",coords:null,alpha:1};if(t==="transparent"?(e.coords=ft.black,e.alpha=0):e.coords=ft[t],e.coords)return e}}}}),T0=new v({id:"p3",cssId:"display-p3",name:"P3",base:$0,fromBase:ne.fromBase,toBase:ne.toBase}),mt=new m({id:"hsl",name:"HSL",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},s:{range:[0,100],name:"Saturation"},l:{range:[0,100],name:"Lightness"}},base:ne,fromBase:t=>{let e=Math.max(...t),r=Math.min(...t),[n,a,s]=t,[i,o,l]=[NaN,0,(r+e)/2],u=e-r;if(u!==0){switch(o=l===0||l===1?0:(e-l)/Math.min(l,1-l),e){case n:i=(a-s)/u+(a<s?6:0);break;case a:i=(s-n)/u+2;break;case s:i=(n-a)/u+4}i=i*60}return o<0&&(i+=180,o=Math.abs(o)),i>=360&&(i-=360),[i,o*100,l*100]},toBase:t=>{let[e,r,n]=t;e=e%360,e<0&&(e+=360),r/=100,n/=100;function a(s){let i=(s+e/30)%12,o=r*Math.min(n,1-n);return n-o*Math.max(-1,Math.min(i-3,9-i,1))}return[a(0),a(8),a(4)]},formats:{hsl:{coords:["<number> | <angle>","<percentage>","<percentage>"]},hsla:{coords:["<number> | <angle>","<percentage>","<percentage>"],commas:!0,lastAlpha:!0}}}),H0=new m({id:"oklch",name:"Oklch",coords:{l:{refRange:[0,1],name:"Lightness"},c:{refRange:[0,.4],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},white:"D65",base:j,fromBase(t){let[e,r,n]=t,a;const s=2e-4;return Math.abs(r)<s&&Math.abs(n)<s?a=NaN:a=Math.atan2(n,r)*180/Math.PI,[e,Math.sqrt(r**2+n**2),T(a)]},toBase(t){let[e,r,n]=t,a,s;return isNaN(n)?(a=0,s=0):(a=r*Math.cos(n*Math.PI/180),s=r*Math.sin(n*Math.PI/180)),[e,a,s]},formats:{oklch:{coords:["<percentage> | <number>","<number> | <percentage>[0,1]","<number> | <angle>"]}}});m.register(ne),m.register(T0),m.register(mt),m.register(O),m.register(H0);function ae(t){return typeof t=="number"&&Number.isFinite(t)?t:Number.isNaN(t)?0:typeof t=="object"&&"raw"in t?parseFloat(t.raw):0}function we(t){try{let e=Ie(t),r=e.spaceId==="hsl"?e:L(e,mt),n=r.coords,a=ae(n[0]),s=ae(n[1]),i=ae(n[2]),o=ae(r.alpha);return{hue:a,saturation:s,lightness:i,alpha:o,authored:t}}catch{return{hue:0,saturation:0,lightness:0,alpha:0,authored:t}}}function gt(t,e){let r=we(t),n=we(e);return(r.saturation===0||n.saturation===0)&&r.saturation!==n.saturation?n.saturation-r.saturation:r.hue!==n.hue?r.hue-n.hue:r.saturation!==n.saturation?r.saturation-n.saturation:r.saturation===0&&n.saturation===0&&r.lightness!==n.lightness?n.lightness-r.lightness:r.alpha===n.alpha?r.authored.toLowerCase().localeCompare(n.authored.toLowerCase()):n.alpha-r.alpha}function q0(t){return t.sort(gt)}N.convert=we,N.sort=q0,N.sortFn=gt,Object.defineProperty(N,Symbol.toStringTag,{value:"Module"})});
