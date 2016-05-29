define(["mvc/tours","mvc/ui/ui-modal"],function(a,b){var c=Backbone.Collection.extend({model:Backbone.Model.extend({defaults:{visible:!0,target:"_parent"}}),fetch:function(c){c=c||{},this.reset(),this.add({id:"show-chat-online",icon:"fa-comment-o",tooltip:"Chat Online",visible:!1,onclick:function(){var a=window.Galaxy.config.communication_server_host,c=window.Galaxy.config.communication_server_port,d=escape(window.Galaxy.user.attributes.username),e=escape(window.Galaxy.user.id),f="?username="+d+"&uid="+e,g=a+":"+c+f,h="<iframe class='f-iframe' src="+g+" style='width:100%; height:100%;'> </iframe>";$(".modal.ui-modal").length>0&&$(".modal.ui-modal").remove(),this.modal=new b.View({title:"Communicate with online users",body:h,height:350,width:600,closing_events:!0,title_separator:!1}),this.modal.show(),$(".modal-header").css("padding","2px"),$(".modal-body").css("padding","2px")}}),this.add({id:"analysis",title:"Analyze Data",url:"",tooltip:"Analysis home view"}),this.add({id:"workflow",title:"Workflow",url:"workflow",tooltip:"Chain tools into workflows",disabled:!Galaxy.user.id}),this.add({id:"shared",title:"Shared Data",url:"library/index",tooltip:"Access published resources",menu:[{title:"Data Libraries",url:"library/list"},{title:"Histories",url:"history/list_published"},{title:"Workflows",url:"workflow/list_published"},{title:"Visualizations",url:"visualization/list_published"},{title:"Pages",url:"page/list_published"}]}),c.user_requests&&this.add({id:"lab",title:"Lab",menu:[{title:"Sequencing Requests",url:"requests/index"},{title:"Find Samples",url:"requests/find_samples_index"},{title:"Help",url:c.lims_doc_url}]}),this.add({id:"visualization",title:"Visualization",url:"visualization/list",tooltip:"Visualize datasets",disabled:!Galaxy.user.id,menu:[{title:"New Track Browser",url:"visualization/trackster",target:"_frame"},{title:"Saved Visualizations",url:"visualization/list",target:"_frame"},{title:"Interactive Environments",url:"visualization/gie_list",target:"galaxy_main"}]}),Galaxy.user.get("is_admin")&&this.add({id:"admin",title:"Admin",url:"admin",tooltip:"Administer this Galaxy",cls:"admin-only"});var d={id:"help",title:"Help",tooltip:"Support, contact, and community hubs",menu:[{title:"Support",url:c.support_url,target:"_blank"},{title:"Search",url:c.search_url,target:"_blank"},{title:"Mailing Lists",url:c.mailing_lists,target:"_blank"},{title:"Videos",url:c.screencasts_url,target:"_blank"},{title:"Wiki",url:c.wiki_url,target:"_blank"},{title:"How to Cite Galaxy",url:c.citation_url,target:"_blank"},{title:"Interactive Tours",url:"tours",onclick:function(){Galaxy.app?Galaxy.app.display(new a.ToursView):window.location=Galaxy.root+"tours"}}]};if(c.terms_url&&d.menu.push({title:"Terms and Conditions",url:c.terms_url,target:"_blank"}),c.biostar_url&&d.menu.unshift({title:"Ask a question",url:"biostar/biostar_question_redirect",target:"_blank"}),c.biostar_url&&d.menu.unshift({title:"Galaxy Biostar",url:c.biostar_url_redirect,target:"_blank"}),this.add(d),Galaxy.user.id){var e={id:"user",title:"User",cls:"loggedin-only",tooltip:"Account preferences and saved data",menu:[{title:"Logged in as "+Galaxy.user.get("email")},{title:"Preferences",url:"user?cntrller=user",target:"galaxy_main"},{title:"Custom Builds",url:"user/dbkeys",target:"galaxy_main"},{title:"Logout",url:"user/logout",target:"_top",divider:!0},{title:"Saved Histories",url:"history/list",target:"galaxy_main"},{title:"Saved Datasets",url:"dataset/list",target:"galaxy_main"},{title:"Saved Pages",url:"page/list",target:"_top"},{title:"API Keys",url:"user/api_keys?cntrller=user",target:"galaxy_main"}]};c.use_remote_user&&e.menu.push({title:"Public Name",url:"user/edit_username?cntrller=user",target:"galaxy_main"}),this.add(e)}else{var e={id:"user",title:"User",cls:"loggedout-only",tooltip:"Account registration or login",menu:[{title:"Login",url:"user/login",target:"galaxy_main"}]};c.allow_user_creation&&e.menu.push({title:"Register",url:"user/create",target:"galaxy_main"}),this.add(e)}var f=this.get(c.active_view);return f&&f.set("active",!0),(new jQuery.Deferred).resolve().promise()}}),d=Backbone.View.extend({initialize:function(a){this.model=a.model,this.setElement(this._template()),this.$dropdown=this.$(".dropdown"),this.$toggle=this.$(".dropdown-toggle"),this.$menu=this.$(".dropdown-menu"),this.$note=this.$(".dropdown-note"),this.listenTo(this.model,"change",this.render,this)},events:{"click .dropdown-toggle":"_toggleClick"},render:function(){var a=this;return $(".tooltip").remove(),this.$el.attr("id",this.model.id).css({visibility:this.model.get("visible")&&"visible"||"hidden"}),this.model.set("url",this._formatUrl(this.model.get("url"))),this.$note.html(this.model.get("note")||"").removeClass().addClass("dropdown-note").addClass(this.model.get("note_cls")).css({display:this.model.get("show_note")&&"block"||"none"}),this.$toggle.html(this.model.get("title")||"").removeClass().addClass("dropdown-toggle").addClass(this.model.get("cls")).addClass(this.model.get("icon")&&"dropdown-icon fa "+this.model.get("icon")).addClass(this.model.get("toggle")&&"toggle").attr("target",this.model.get("target")).attr("href",this.model.get("url")).attr("title",this.model.get("tooltip")).tooltip("destroy"),this.model.get("tooltip")&&this.$toggle.tooltip({placement:"bottom"}),this.$dropdown.removeClass().addClass("dropdown").addClass(this.model.get("disabled")&&"disabled").addClass(this.model.get("active")&&"active"),this.model.get("menu")&&this.model.get("show_menu")?(this.$menu.show(),$("#dd-helper").show().off().on("click",function(){$("#dd-helper").hide(),a.model.set("show_menu",!1)})):(a.$menu.hide(),$("#dd-helper").hide()),this.$menu.empty().removeClass("dropdown-menu"),this.model.get("menu")&&(_.each(this.model.get("menu"),function(b){a.$menu.append(a._buildMenuItem(b)),b.divider&&a.$menu.append($("<li/>").addClass("divider"))}),a.$menu.addClass("dropdown-menu"),a.$toggle.append($("<b/>").addClass("caret"))),this},_buildMenuItem:function(a){var b=this;return a=_.defaults(a||{},{title:"",url:"",target:"_parent"}),a.url=b._formatUrl(a.url),$("<li/>").append($("<a/>").attr("href",a.url).attr("target",a.target).html(a.title).on("click",function(c){c.preventDefault(),b.model.set("show_menu",!1),a.onclick?a.onclick():Galaxy.frame.add(a)}))},_toggleClick:function(a){function b(a,b){return $("<div/>").append($("<a/>").attr("href",Galaxy.root+b).html(a)).html()}var c=this,d=this.model;a.preventDefault(),$(".tooltip").hide(),d.trigger("dispatch",function(a){d.id!==a.id&&a.get("menu")&&a.set("show_menu",!1)}),d.get("disabled")?(this.$toggle.popover&&this.$toggle.popover("destroy"),this.$toggle.popover({html:!0,placement:"bottom",content:"Please "+b("login","user/login?use_panels=True")+" or "+b("register","user/create?use_panels=True")+" to use this feature."}).popover("show"),setTimeout(function(){c.$toggle.popover("destroy")},5e3)):d.get("menu")?d.set("show_menu",!0):d.get("onclick")?d.get("onclick")():Galaxy.frame.add(d.attributes)},_formatUrl:function(a){return"string"==typeof a&&-1===a.indexOf("//")&&"/"!=a.charAt(0)?Galaxy.root+a:a},_template:function(){return'<ul class="nav navbar-nav"><li class="dropdown"><a class="dropdown-toggle"/><ul class="dropdown-menu"/><div class="dropdown-note"/></li></ul>'}});return{Collection:c,Tab:d}});
//# sourceMappingURL=../../maps/layout/menu.js.map