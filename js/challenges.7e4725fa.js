"use strict";(self["webpackChunkxivtodo"]=self["webpackChunkxivtodo"]||[]).push([[757],{994:function(e,t,l){l.d(t,{A:function(){return b}});var s=l(641),i=l(33);const n=["src","alt"],u={key:0,class:"text-muted"},a={class:"list-group list-group-flush"};function d(e,t,l,d,o,r){const c=(0,s.g2)("DutyListItem");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("h3",null,[l.type?((0,s.uX)(),(0,s.CE)("img",{key:0,src:"/icons/duty-"+l.type+".png",alt:"Duty icon for type "+l.type},null,8,n)):(0,s.Q3)("",!0),(0,s.eW)((0,i.v_)(l.title),1)]),l.showTotal?((0,s.uX)(),(0,s.CE)("span",u,(0,i.v_)(e.$t("shared.countTotal",{count:l.duties.length})),1)):(0,s.Q3)("",!0),(0,s.Lk)("div",a,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.injectDutyCompletion(l.duties),(e=>((0,s.uX)(),(0,s.Wv)(c,{key:e.Name,duty:e,filters:this.$parent.$data.filters||{}},null,8,["duty","filters"])))),128))]),t[0]||(t[0]=(0,s.Lk)("br",null,null,-1))],64)}var o=l(8483),r={props:{title:String,duties:Array,type:String,showTotal:Boolean},components:{DutyListItem:o.A},methods:{injectDutyCompletion(e){const t=this.$store.getters.achievements,l=this.$store.getters.settings.spoilersOption||0,s=this.$store.getters.encounterIDs,i=this.$store.getters.encountersVerified;for(let n of e){let e=i[n.UUID];-1==e&&s.has(~~n.UUID)&&(e=2),n.cleared=e;let u=!1;if(n.Spoilers){let s=!1;n.SpoilersUntil&&t.has(n.SpoilersUntil)&&(s=!0),("1"==l||0==e&&!s)&&(u=!0),this.$store.getters.achievementsPublic||s||(u=!0)}"2x"!=n.Expansion||t.has(788)||(u=!0),"3x"!=n.Expansion||t.has(1139)||(u=!0),"4x"!=n.Expansion||t.has(1794)||(u=!0),"5x"!=n.Expansion||t.has(2298)||(u=!0),"6x"!=n.Expansion||t.has(2958)||(u=!0),"7x"!=n.Expansion||t.has(3496)||(u=!0),"2"==l&&(u=!1),n.blur=u}return e}}},c=l(6262);const h=(0,c.A)(r,[["render",d]]);var b=h},8559:function(e,t,l){l.r(t),l.d(t,{default:function(){return I}});var s=l(641),i=l(33);const n={class:"row"},u={class:"col-12 col-lg-4"},a={class:"col-12 col-lg-4"},d={class:"col-12 col-lg-4"},o={class:"row"},r={class:"col-12 col-lg-4"},c={class:"col-12 col-lg-4"},h={class:"col-12 col-lg-4"},b={class:"row"},p={class:"col-12 col-lg-4"},g={class:"col-12 col-lg-4"},y={class:"col-12 col-lg-4"},F={class:"row"},v={class:"col-12 col-lg-4"},$={class:"col-12 col-lg-4"},k={class:"col-12 col-lg-4"},L={class:"row"},f={class:"col-12 col-lg-4"},x={class:"col-12 col-lg-4"},m={class:"row"},E={class:"col-12 col-lg-4"},w={class:"col-12 col-lg-4"},S={class:"col-12 col-lg-4"};function A(e,t,l,A,C,T){const D=(0,s.g2)("PageHeader"),B=(0,s.g2)("DutyList");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(D,{title:"page.challenges",subtitle:"pageHeader.clearedByCharacter"}),(0,s.Lk)("div",n,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.exploration")),1),(0,s.Lk)("div",u,[(0,s.bF)(B,{title:e.$t("shared.expansion.arr"),duties:C.db.arrExploration,type:"magnifier"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.hw"),duties:C.db.hwExploration,type:"magnifier"},null,8,["title","duties"])]),(0,s.Lk)("div",a,[(0,s.bF)(B,{title:e.$t("shared.expansion.sb"),duties:C.db.sbExploration,type:"magnifier"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.shb"),duties:C.db.shbExploration,type:"magnifier"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.ew"),duties:C.db.ewExploration,type:"magnifier"},null,8,["title","duties"])]),(0,s.Lk)("div",d,[(0,s.bF)(B,{title:e.$t("shared.expansion.dt"),duties:C.db.dtExploration,type:"magnifier"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.exploratoryMissions"),duties:C.db.explExploration,type:"magnifier"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.sightseeingLogs"),duties:C.db.sightseeingLogs,type:"magnifier"},null,8,["title","duties"])])]),t[0]||(t[0]=(0,s.Lk)("hr",null,null,-1)),(0,s.Lk)("div",o,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.deepDungeons")),1),(0,s.Lk)("div",r,[(0,s.bF)(B,{title:e.$t("challenges.potd"),duties:C.db.potd,type:"deepdungeons"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.potdSolo"),duties:C.db.potdSolo,type:"deepdungeons"},null,8,["title","duties"])]),(0,s.Lk)("div",c,[(0,s.bF)(B,{title:e.$t("challenges.hoh"),duties:C.db.hoh,type:"deepdungeons"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.hohSolo"),duties:C.db.hohSolo,type:"deepdungeons"},null,8,["title","duties"])]),(0,s.Lk)("div",h,[(0,s.bF)(B,{title:e.$t("challenges.eo"),duties:C.db.eo,type:"deepdungeons"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.eoSolo"),duties:C.db.eoSolo,type:"deepdungeons"},null,8,["title","duties"])])]),t[1]||(t[1]=(0,s.Lk)("hr",null,null,-1)),(0,s.Lk)("div",b,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.miscellaneous")),1),(0,s.Lk)("div",p,[(0,s.bF)(B,{title:e.$t("challenges.sharedFateShB"),duties:C.db.shbSharedFATE,type:"fate"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.sharedFateEW"),duties:C.db.ewSharedFATE,type:"fate"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.sharedFateDT"),duties:C.db.dtSharedFATE,type:"fate"},null,8,["title","duties"])]),(0,s.Lk)("div",g,[(0,s.bF)(B,{title:e.$t("challenges.bozjanSouthernFront"),duties:C.db.bozjanChallenges,type:"field"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.zadnor"),duties:C.db.zadnorChallenges,type:"field"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.variantDungeons"),duties:C.db.variantChallenges,type:"vc"},null,8,["title","duties"])]),(0,s.Lk)("div",y,[(0,s.bF)(B,{title:e.$t("challenges.treasureHuntClears"),duties:C.db.treasureHunts,type:"treasure"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.trusts"),duties:C.db.trusts,type:"leveling"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.islandSanctuary"),duties:C.db.islandSanctuary,type:"island"},null,8,["title","duties"])])]),t[2]||(t[2]=(0,s.Lk)("hr",null,null,-1)),(0,s.Lk)("div",F,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.achievementFates")),1),(0,s.Lk)("div",v,[(0,s.bF)(B,{title:e.$t("shared.expansion.arr"),duties:C.db.arrFATEs,type:"fate"},null,8,["title","duties"])]),(0,s.Lk)("div",$,[(0,s.bF)(B,{title:e.$t("shared.expansion.hw"),duties:C.db.hwFATEs,type:"fate"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.sb"),duties:C.db.sbFATEs,type:"fate"},null,8,["title","duties"])]),(0,s.Lk)("div",k,[(0,s.bF)(B,{title:e.$t("shared.expansion.shb"),duties:C.db.shbFATEs,type:"fate"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.ew"),duties:C.db.ewFATEs,type:"fate"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("shared.expansion.dt"),duties:C.db.dtFATEs,type:"fate"},null,8,["title","duties"])])]),t[3]||(t[3]=(0,s.Lk)("hr",null,null,-1)),(0,s.Lk)("div",L,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.mentorStatus")),1),(0,s.Lk)("div",f,[(0,s.bF)(B,{title:e.$t("challenges.mentorBattle"),duties:C.db.mentorBattle,type:"mentor"},null,8,["title","duties"])]),(0,s.Lk)("div",x,[(0,s.bF)(B,{title:e.$t("challenges.mentorTrade"),duties:C.db.mentorTrade,type:"mentor"},null,8,["title","duties"])])]),t[4]||(t[4]=(0,s.Lk)("hr",null,null,-1)),(0,s.Lk)("div",m,[(0,s.Lk)("h2",null,(0,i.v_)(e.$t("challenges.blueMage")),1),(0,s.Lk)("div",E,[(0,s.bF)(B,{title:e.$t("challenges.blueARR"),duties:C.db.arrBlu,type:"blu"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.blueHW"),duties:C.db.hwBlu,type:"blu"},null,8,["title","duties"])]),(0,s.Lk)("div",w,[(0,s.bF)(B,{title:e.$t("challenges.blueSB"),duties:C.db.sbBlu,type:"blu"},null,8,["title","duties"]),(0,s.bF)(B,{title:e.$t("challenges.blueShB"),duties:C.db.shbBlu,type:"blu"},null,8,["title","duties"])]),(0,s.Lk)("div",S,[(0,s.bF)(B,{title:e.$t("challenges.maskedCarnivale"),duties:C.db.maskedCarnivale,type:"blu"},null,8,["title","duties"])])])],64)}var C=l(4304),T=l(994),D=l(4007),B={name:"ChallengesView",data(){return{db:D}},components:{PageHeader:C.A,DutyList:T.A}},_=l(6262);const H=(0,_.A)(B,[["render",A]]);var I=H}}]);
//# sourceMappingURL=challenges.7e4725fa.js.map