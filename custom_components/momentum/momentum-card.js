var bt=Object.defineProperty;var Et=Object.getOwnPropertyDescriptor;var g=(r,t,e,s)=>{for(var i=s>1?void 0:s?Et(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&bt(t,e,i),i};var L=globalThis,q=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),nt=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},ot=r=>new w(typeof r=="string"?r:r+"",void 0,V),W=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new w(e,r,V)},at=(r,t)=>{if(q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},K=q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ot(e)})(r):r;var{is:St,defineProperty:xt,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:wt,getOwnPropertySymbols:Pt,getPrototypeOf:Ut}=Object,D=globalThis,ht=D.trustedTypes,Ot=ht?ht.emptyScript:"",Ht=D.reactiveElementPolyfillSupport,P=(r,t)=>r,U={toAttribute(r,t){switch(t){case Boolean:r=r?Ot:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},z=(r,t)=>!St(r,t),lt={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:z};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&xt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Ct(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Ut(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,s=[...wt(e),...Pt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(K(i))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:U).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:U;this._$Em=i;let h=o.fromAttribute(e,n.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??z)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[P("elementProperties")]=new Map,m[P("finalized")]=new Map,Ht?.({ReactiveElement:m}),(D.reactiveElementVersions??=[]).push("2.1.2");var Y=globalThis,ct=r=>r,B=Y.trustedTypes,dt=B?B.createPolicy("lit-html",{createHTML:r=>r}):void 0,_t="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+_,Rt=`<${gt}>`,v=document,H=()=>v.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",tt=Array.isArray,Mt=r=>tt(r)||typeof r?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,y=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,ft=/"/g,yt=/^(?:script|style|textarea|title)$/i,et=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),N=et(1),Vt=et(2),Wt=et(3),b=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),$t=new WeakMap,A=v.createTreeWalker(v,129);function At(r,t){if(!tt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var Tt=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=O;for(let h=0;h<e;h++){let a=r[h],d,p,l=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===O?p[1]==="!--"?o=pt:p[1]!==void 0?o=ut:p[2]!==void 0?(yt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=i??O,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?y:p[3]==='"'?ft:mt):o===ft||o===mt?o=y:o===pt||o===ut?o=O:(o=y,i=void 0);let $=o===y&&r[h+1].startsWith("/>")?" ":"";n+=o===O?a+Rt:l>=0?(s.push(d),a.slice(0,l)+_t+a.slice(l)+_+$):a+_+(l===-2?h:$)}return[At(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[d,p]=Tt(t,e);if(this.el=r.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(_t)){let u=p[o++],$=i.getAttribute(l).split(_),j=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:j[2],strings:$,ctor:j[1]==="."?Z:j[1]==="?"?G:j[1]==="@"?Q:x}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:n}),i.removeAttribute(l));if(yt.test(i.tagName)){let l=i.textContent.split(_),u=l.length-1;if(u>0){i.textContent=B?B.emptyScript:"";for(let $=0;$<u;$++)i.append(l[$],H()),A.nextNode(),a.push({type:2,index:++n});i.append(l[u],H())}}}else if(i.nodeType===8)if(i.data===gt)a.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:n}),l+=_.length-1}n++}}static createElement(t,e){let s=v.createElement("template");return s.innerHTML=t,s}};function S(r,t,e=r,s){if(t===b)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=R(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??v).importNode(e,!0);A.currentNode=i;let n=A.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new T(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new X(n,this,t)),this._$AV.push(d),a=s[++h]}o!==a?.index&&(n=A.nextNode(),o++)}return A.currentNode=v,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},T=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),R(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(At(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new J(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new M(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ct(t).nextSibling;ct(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},x=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=S(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{let h=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=S(this,h[s+a],e,a),d===b&&(d=this._$AH[a]),o||=!R(d)||d!==this._$AH[a],d===c?t=c:t!==c&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Z=class extends x{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},G=class extends x{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Q=class extends x{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===b)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Nt=Y.litHtmlPolyfillSupport;Nt?.(M,T),(Y.litHtmlVersions??=[]).push("3.3.3");var vt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new T(t.insertBefore(H(),n),n,void 0,e??{})}return i._$AI(r),i};var st=globalThis,f=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};f._$litElement$=!0,f.finalized=!0,st.litElementHydrateSupport?.({LitElement:f});var kt=st.litElementPolyfillSupport;kt?.({LitElement:f});(st.litElementVersions??=[]).push("4.2.2");var it=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var jt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:z},Lt=(r=jt,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,r,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,r,h),h}}}if(s==="setter"){let{name:o}=e;return function(h){let a=this[o];t.call(this,h),this.requestUpdate(o,a,r,!0,h)}}throw Error("Unsupported decorator location: "+s)};function k(r){return(t,e)=>typeof e=="object"?Lt(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function rt(r){return k({...r,state:!0,attribute:!1})}var E=class extends f{setConfig(t){if(!t.entity)throw new Error("momentum-card: 'entity' is required");this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("momentum-card-editor")}static getStubConfig(){return{entity:"sensor.momentum_example"}}get _entity(){if(!(!this.hass||!this._config))return this.hass.states[this._config.entity]}get _imageUrl(){return this._entity?.attributes?.image_url??""}get _name(){return this._config?.title?this._config.title:this._entity?.attributes?.name??"Memento"}get _elapsed(){let t=this._entity;return!t||t.state==="unavailable"||t.state==="unknown"?null:t.state}render(){return this._config?N`
      <ha-card>
        <div class="card-content">
          ${this._imageUrl?N`<object
                class="sky-map"
                data=${this._imageUrl}
                type="image/svg+xml"
              ></object>`:N`<div class="placeholder">Sky map unavailable</div>`}
          <div class="info">
            <div class="memento-name">${this._name}</div>
            <div class="elapsed ${this._elapsed===null?"unavailable":""}">
              ${this._elapsed??"\u2014"}
            </div>
          </div>
        </div>
      </ha-card>
    `:c}};E.styles=W`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .card-content {
      padding: 0;
    }
    .sky-map {
      width: 100%;
      display: block;
      aspect-ratio: 1;
      background: #0a0a1a;
    }
    .placeholder {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a1a;
      color: #555;
      font-size: 0.9rem;
    }
    .info {
      padding: 12px 16px;
    }
    .memento-name {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .elapsed {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .elapsed.unavailable {
      color: var(--disabled-text-color);
    }
  `,g([k({attribute:!1})],E.prototype,"hass",2),g([rt()],E.prototype,"_config",2),E=g([it("momentum-card")],E);var C=class extends f{setConfig(t){this._config=t}render(){return this._config?N`
      <div>
        <label>Entity ID: <input type="text" .value=${this._config.entity} /></label>
      </div>
    `:c}};g([k({attribute:!1})],C.prototype,"hass",2),g([rt()],C.prototype,"_config",2),C=g([it("momentum-card-editor")],C);export{E as MomentumCard,C as MomentumCardEditor};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
