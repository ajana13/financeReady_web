(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d55612e2"],{"2bfd":function(e,t,i){},"4bd4":function(e,t,i){"use strict";var s=i("58df"),n=i("7e2b"),a=i("3206");t["a"]=Object(s["a"])(n["a"],Object(a["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0}),i={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",s=>{s&&(this.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))}):i.valid=t(e),i},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const i=this.watchers.find(e=>e._uid===t._uid);i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})},"99af":function(e,t,i){"use strict";var s=i("23e7"),n=i("d039"),a=i("e8b5"),r=i("861d"),l=i("7b0b"),o=i("50c4"),h=i("8418"),c=i("65f0"),d=i("1dde"),u=i("b622"),p=i("2d00"),m=u("isConcatSpreadable"),f=9007199254740991,g="Maximum allowed index exceeded",b=p>=51||!n((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),I=d("concat"),v=function(e){if(!r(e))return!1;var t=e[m];return void 0!==t?!!t:a(e)},S=!b||!I;s({target:"Array",proto:!0,forced:S},{concat:function(e){var t,i,s,n,a,r=l(this),d=c(r,0),u=0;for(t=-1,s=arguments.length;t<s;t++)if(a=-1===t?r:arguments[t],v(a)){if(n=o(a.length),u+n>f)throw TypeError(g);for(i=0;i<n;i++,u++)i in a&&h(d,u,a[i])}else{if(u>=f)throw TypeError(g);h(d,u++,a)}return d.length=u,d}})},b6ba:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"application"},[i("h1",[e._v("Registration Page")]),i("app-form")],1)},n=[],a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("v-container",[i("v-row",e._l(e.APPLICATION_FIELDS,(function(t,s){return i("v-col",{key:s,attrs:{cols:"12",sm:t.md}},["textField"===t.type?i("v-text-field",{attrs:{id:t.name,rules:t.rules,label:t.label},model:{value:e.applicant[t.name],callback:function(i){e.$set(e.applicant,t.name,i)},expression:"applicant[field.name]"}}):"select"===t.type?i("v-select",{attrs:{id:t.name,rules:t.rules,label:t.label,items:t.items},model:{value:e.applicant[t.name],callback:function(i){e.$set(e.applicant,t.name,i)},expression:"applicant[field.name]"}}):"combobox"===t.type?i("v-combobox",{attrs:{id:t.name,rules:t.rules,label:t.label,items:t.items,multiple:"","hide-selected":"","persistent-hint":"","small-chips":"",clearable:""},model:{value:e.applicant[t.name],callback:function(i){e.$set(e.applicant,t.name,i)},expression:"applicant[field.name]"}}):e._e()],1)})),1),i("v-btn",{staticClass:"mr-4",attrs:{disabled:e.$store.state.loading,loading:e.$store.state.loading,block:"",color:"primary"},on:{click:e.submitApplication}},[e._v("Submit")])],1)],1)},r=[],l=(i("dca8"),i("99af"),i("2909")),o=Object.freeze({required:function(e){return[function(t){return!!t&&0!==t.length||"".concat(e," is required")}]},emailRules:[function(e){return/.+@.+/.test(e)||"E-mail must be valid"}],phoneRules:[function(e){return/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(e)||"Phone must be valid"}]}),h=[{name:"first_name",label:"First Name",type:"textField",rules:o.required("First Name"),md:"6"},{name:"last_name",label:"Last Name",type:"textField",rules:o.required("Last Name"),md:"6"},{name:"email",label:"E-mail",type:"textField",rules:[].concat(Object(l["a"])(o.required("E-mail")),Object(l["a"])(o.emailRules)),md:"4"},{name:"phone",label:"Phone",type:"textField",rules:[].concat(Object(l["a"])(o.required("Phone")),Object(l["a"])(o.phoneRules)),md:"4"},{name:"gender",label:"Gender",type:"select",rules:o.required("Gender"),md:"4",items:["Male","Female","Other"]}],c=[{title:"What is Bio Tech Conference?",description:"It is a 3 day conference which provides scholars with an opportunity to explore biotech in the industry and research."},{title:"Are there any participation fees?",description:"Ticket fee is $75 per participant for all three days."},{title:"How can I register?",description:"Registration for Bio Tech Conference 2020 is open now. Simply click 'Get Ticket' from the menu bar."},{title:"Where will the Bio Tech Conference be located?",description:"It will be located at the Double Tree by Hilton."},{title:"Is there free food?",description:"Yes, food, drinks, performances, and workshops are provided in all three days."},{title:"What should I wear?",description:"For men, please wear a suit, dress pants, and tie. For women, please wear a dress, or suit and dress pants."},{title:"Is there a chance to meet recruiters?",description:"Yes, there will be a career fair during Day 3 and there will be career seeking opportunities."},{title:"What is taught in the workshops?",description:"You will be trained how to solve real-world bio tech problems and even get to collaborate on research papers."}],d=[{year:"2019-2020",Executives:[{name:"Amir Ramadoss",position:"President",img:"Amir-Ramadoss.jpg",linkedIn:"https://www.linkedin.com/in/amir-ramadoss-974106164/"},{name:"Erica Jung",position:"Vice President",img:"Erica-Jung.jpg",linkedIn:"https://www.linkedin.com/in/erica-jung-8a9460165/"}],General:[{name:"Elizabeth Vera",position:"Head of Operations",img:"Elizabeth-Vera.jpg",linkedIn:"https://www.linkedin.com/in/elizabeth-vera-3b1a9b183"},{name:"Eric Johnson",position:"Special Projects Engineer",img:"Eric-Johnson.jpg",linkedIn:"https://www.linkedin.com/in/eric-johnson-616718141/"},{name:"Jacob Yang",position:"Website Developer",img:"Jacob-Yang.png",linkedIn:"https://www.linkedin.com/in/jacob-yang-324234234/"}],Chairs:[{name:"Kirit Ren",position:"Biochemist Senior Chair",img:"Kirit-Ren.jpg",linkedIn:"https://www.linkedin.com/in/kirit-ren-a60801159/"},{name:"Danny Logan",position:"Biomedical Senior Chair",img:"Danny-Logan.jpg",linkedIn:"https://www.linkedin.com/in/danny-logan-974106164/"},{name:"Paul Rodgers",position:"Environmental Chair",img:"Paul-Rodgers.jpg",linkedIn:"https://www.linkedin.com/in/paul-rodgers-bab205149/"},{name:"Rick Chang",position:"Clinical Research Chair",img:"Rick-Chang.jpg",linkedIn:"https://www.linkedin.com/in/rick-chang-hlk4243242/"}]}],u={cards:[{title:"Learn from Experts",subtitle:"Technical Training and Workshops",img:"learn-from-experts.jpg"},{title:"Cutting-Edge Research",subtitle:"Research Panels and Discussion",img:"cutting-edge-research.jpg"},{title:"Network for Internships",subtitle:"Career Fair Opportunity",img:"career-fair.jpg"}]},p=Object.freeze({icons:[{name:"fab fa-facebook",link:"https://facebook.com"},{name:"fab fa-twitter",link:"https://twitter.com"},{name:"fab fa-linkedin",link:"https://linkedin.com"},{name:"fab fa-instagram",link:"https://instagram.com"}]}),m=Object.freeze({pieCharts:["major","gender","class"],pieChartOptions:{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},credits:{enabled:!1},tooltip:{pointFormat:"{series.name}: <b>{point.y}</b>"},accessibility:{point:{valueSuffix:"%"}},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.y}"}}}}}),f=Object.freeze({APPLICATION_FIELDS:h,FAQS:c,TEAM:d,HOME:u,APP:p,ADMIN:m}),g={data:function(){return{valid:!1,APPLICATION_FIELDS:f.APPLICATION_FIELDS,applicant:{}}},methods:{submitApplication:function(){this.$refs.form.validate()&&this.$store.dispatch("submitApplication",this.applicant)}}},b=g,I=i("2877"),v=i("6544"),S=i.n(v),w=i("8336"),x=i("62ad"),y=(i("2bfd"),i("b974")),D=i("8654"),k=i("d9f7"),C=i("80d2");const V={...y["b"],offsetY:!0,offsetOverflow:!0,transition:!1};var E=y["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,i)=>i.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:y["a"].options.props.menuProps.type,default:()=>V},noFilter:Boolean,searchInput:{type:String,default:void 0}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...y["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(e=>this.getValue(e))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(e=>!this.hasItem(e)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(e=>{const t=Object(C["m"])(e,this.itemText),i=null!=t?String(t):"";return this.filter(e,String(this.internalSearch),i)})},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch=e,this.$emit("update:search-input",e)}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=y["a"].options.computed.$_menuProps.call(this);return e.contentClass=("v-autocomplete__content "+(e.contentClass||"")).trim(),{...V,...e}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue)))},listData(){const e=y["a"].options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=void 0)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},methods:{onFilteredItemsChanged(e,t){e!==t&&(this.setMenuIndex(-1),this.$nextTick(()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.setMenuIndex(0))}))},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===C["r"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===C["r"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==C["r"].backspace&&e!==C["r"].delete||this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const i=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==i)return void(this.selectedIndex=i);const s=this.selectedItems.length,n=e!==s-1?e:e-1,a=this.selectedItems[n];a?this.selectItem(t):this.setValue(this.multiple?[]:void 0),this.selectedIndex=n},clearableCallback(){this.internalSearch=void 0,y["a"].options.methods.clearableCallback.call(this)},genInput(){const e=D["a"].options.methods.genInput.call(this);return e.data=Object(k["a"])(e.data,{attrs:{"aria-activedescendant":Object(C["l"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(C["l"])(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=y["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?y["a"].options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,i=t.value;t.value&&this.activateMenu(),this.internalSearch=i,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;y["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){y["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){y["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){y["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){if(-1===this.selectedIndex)return;const t=this.selectedItems[this.selectedIndex],i=this.getText(t);e.clipboardData.setData("text/plain",i),e.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",i),e.preventDefault()}}}),O=E.extend({name:"v-combobox",props:{delimiters:{type:Array,default:()=>[]},returnObject:{type:Boolean,default:!0}},data:()=>({editingIndex:-1}),computed:{computedCounterValue(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot(){return y["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed(){return!0},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onInternalSearchChanged(e){if(e&&this.multiple&&this.delimiters.length){const t=this.delimiters.find(t=>e.endsWith(t));null!=t&&(this.internalSearch=e.slice(0,e.length-t.length),this.updateTags())}this.updateMenuDimensions()},genInput(){const e=E.options.methods.genInput.call(this);return delete e.data.attrs.name,e.data.on.paste=this.onPaste,e},genChipSelection(e,t){const i=y["a"].options.methods.genChipSelection.call(this,e,t);return this.multiple&&(i.componentOptions.listeners={...i.componentOptions.listeners,dblclick:()=>{this.editingIndex=t,this.internalSearch=this.getText(e),this.selectedIndex=-1}}),i},onChipInput(e){y["a"].options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown(e){e.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged(e,t){this.autoSelectFirst&&E.options.methods.onFilteredItemsChanged.call(this,e,t)},onKeyDown(e){const t=e.keyCode;y["a"].options.methods.onKeyDown.call(this,e),this.multiple&&t===C["r"].left&&0===this.$refs.input.selectionStart?this.updateSelf():t===C["r"].enter&&this.onEnterDown(e),this.changeSelectedIndex(t)},onTabDown(e){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return e.preventDefault(),e.stopPropagation(),this.updateTags();E.options.methods.onTabDown.call(this,e)},selectItem(e){this.editingIndex>-1?this.updateEditing():E.options.methods.selectItem.call(this,e)},setSelectedItems(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue(e){y["a"].options.methods.setValue.call(this,null!=e?e:this.internalSearch)},updateEditing(){const e=this.internalValue.slice();e[this.editingIndex]=this.internalSearch,this.setValue(e),this.editingIndex=-1},updateCombobox(){const e=Boolean(this.$scopedSlots.selection)||this.hasChips;e&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),e&&(this.internalSearch=void 0))},updateSelf(){this.multiple?this.updateTags():this.updateCombobox()},updateTags(){const e=this.getMenuIndex();if(e<0&&!this.searchIsDirty)return;if(this.editingIndex>-1)return this.updateEditing();const t=this.selectedItems.indexOf(this.internalSearch);if(t>-1){const e=this.internalValue.slice();e.splice(t,1),this.setValue(e)}if(e>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null},onPaste(e){if(!this.multiple||this.searchIsDirty)return;const t=e.clipboardData.getData("text/vnd.vuetify.autocomplete.item+plain");t&&-1===this.findExistingIndex(t)&&(e.preventDefault(),y["a"].options.methods.selectItem.call(this,t))}}}),j=i("a523"),F=i("4bd4"),T=i("0fd9"),$=Object(I["a"])(b,a,r,!1,null,null,null),A=$.exports;S()($,{VBtn:w["a"],VCol:x["a"],VCombobox:O,VContainer:j["a"],VForm:F["a"],VRow:T["a"],VSelect:y["a"],VTextField:D["a"]});var P={name:"Application",components:{AppForm:A}},_=P,B=Object(I["a"])(_,s,n,!1,null,null,null);t["default"]=B.exports},bb2f:function(e,t,i){var s=i("d039");e.exports=!s((function(){return Object.isExtensible(Object.preventExtensions({}))}))},dca8:function(e,t,i){var s=i("23e7"),n=i("bb2f"),a=i("d039"),r=i("861d"),l=i("f183").onFreeze,o=Object.freeze,h=a((function(){o(1)}));s({target:"Object",stat:!0,forced:h,sham:!n},{freeze:function(e){return o&&r(e)?o(l(e)):e}})},f183:function(e,t,i){var s=i("d012"),n=i("861d"),a=i("5135"),r=i("9bf2").f,l=i("90e3"),o=i("bb2f"),h=l("meta"),c=0,d=Object.isExtensible||function(){return!0},u=function(e){r(e,h,{value:{objectID:"O"+ ++c,weakData:{}}})},p=function(e,t){if(!n(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,h)){if(!d(e))return"F";if(!t)return"E";u(e)}return e[h].objectID},m=function(e,t){if(!a(e,h)){if(!d(e))return!0;if(!t)return!1;u(e)}return e[h].weakData},f=function(e){return o&&g.REQUIRED&&d(e)&&!a(e,h)&&u(e),e},g=e.exports={REQUIRED:!1,fastKey:p,getWeakData:m,onFreeze:f};s[h]=!0}}]);
//# sourceMappingURL=chunk-d55612e2.2226ff3e.js.map