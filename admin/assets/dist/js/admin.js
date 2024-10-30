window.jQuery((function(e){const t=window.metaslider.app?window.metaslider.app.MetaSlider:null;var i,s={loaded:!1,attach_event:function(e){var t=e.state().get("library");e.listenTo(t,"change",(function(e){s.update_slide_metadata({id:e.get("id"),caption:e.get("caption"),description:e.get("description"),title:e.get("title"),alt:e.get("alt")})}))},update_slide_metadata:function(t){var i=e(".slide").filter((function(i){return e(this).data("attachment-id")===t.id})),s=i.map((function(){return this.id.replace("slide-","")}));e(document).trigger("metaslider/image-meta-updated",[s.toArray(),t]),t.title?e(".title .default",i).html(t.title):e(".title .default",i).html("&nbsp;"),t.alt?e(".alt .default",i).html(t.alt):e(".alt .default",i).html("&nbsp;")}},a=window.create_slides=wp.media.frames.file_frame=wp.media({multiple:"add",frame:"post",library:{type:"image"}}),n=["insert","iframe"],l=a.states.models.filter((function(e){var t=e.id;return!n.filter((function(e){return t.includes(e)})).length}));a.states.remove(l),a.on("insert",(function(){var i=[];if(a.state().get("selection").map((function(e){i.push(e.toJSON().id)})),t){const e=1==i.length?t.__("Preparing 1 slide...","ml-slider"):t.__("Preparing %s slides...");t.notifyInfo("metaslider/creating-slides",t.sprintf(e,i.length),!0)}if(h(),window.location.href.indexOf("metaslider-start")>-1)var s="";else s=window.parent.metaslider_slider_id;var n={action:"create_image_slide",slider_id:s,selection:i,_wpnonce:metaslider.create_slide_nonce};e.ajax({url:metaslider.ajaxurl,data:n,type:"POST",error:function(e,i,s){var a=JSON.parse(e.responseText);t&&t.notifyError("metaslider/slide-create-failed",a.data.messages[1].errors.create_failed[0],!0)},success:function(s){if(window.location.href.indexOf("metaslider-start")>-1)window.location.href="admin.php?page=metaslider&id="+s.data;else{s.data.forEach((function(t){var i=window.metaslider.app.Vue.compile(t.html);const s=new window.metaslider.app.Vue({render:i.render,staticRenderFns:i.staticRenderFns}).$mount().$el;"last"===metaslider.newSlideOrder?e("#metaslider-slides-list > tbody").append(s):e("#metaslider-slides-list > tbody").prepend(s)}));var a=s.data[s.data.length-1].slide_id;e([document.documentElement,document.body]).animate({scrollTop:"last"===metaslider.newSlideOrder?e("#slide-"+a).offset().top:0},2e3),setTimeout((function(){if(t){const e=1==i.length?t.__("1 slide added successfully","ml-slider"):t.__("%s slides added successfully");t.notifySuccess("metaslider/slides-created",t.sprintf(e,i.length),!0)}setTimeout((function(){t&&t.triggerEvent("metaslider/save")}),1e3)}),1e3)}}})})),a.on("attach",(function(){s.loaded||s.attach_event(a)})),a.on("content:activate",(function(){e("#media-attachment-filters").remove()})),a.on("open activate uploader:ready",(function(){e('.media-menu a:contains("Media Library")').remove(),p(),l.forEach((function(t){e("#menu-item-"+t.id).remove()})),e("#media-attachment-filters").remove()})),t&&a.on("open",(function(){t.notifyInfo("metaslider/add-slide-opening-ui",t.__("Opening add slide UI...","ml-slider"))})),t&&a.on("deactivate close",(function(){t.notifyInfo("metaslider/add-slide-closing-ui",t.__("Closing add slide UI...","ml-slider")),h()})),e(".metaslider").on("change",".js-inherit-from-image",(function(t){var i=e(this),s=i.parents(".can-inherit"),a=s.children("textarea,input[type=text]"),n=s.children(".default");i.is(":checked")?s.addClass("inherit-from-image"):(s.removeClass("inherit-from-image"),a.focus(),""===a.val()&&0===n.find(".no-content").length&&a.val(n.html()))})),e(".metaslider").on("click",".update-image",(function(n){n.preventDefault();var l=e(this),d=l.data("attachment-id");(i=window.update_slide_frame=wp.media.frames.file_frame=wp.media({title:MetaSlider_Helpers.capitalize(metaslider.update_image),library:{type:"image"},button:{text:MetaSlider_Helpers.capitalize(l.attr("data-button-text"))}})).on("open",(function(){d&&(i.state().get("selection").reset([wp.media.attachment(d)]),p(l.data("slideType"),l.data("slideId")))})),i.on("attach",(function(){s.loaded||s.attach_event(i)})),i.open(),i.on("select",(function(){i.state().get("selection").map((function(e){e=e.toJSON(),new_image_id=e.id,selected_item=e})),t&&t.notifyInfo("metaslider/updating-slide",t.__("Updating slide...","ml-slider"),!0),h();var a={action:"update_slide_image",_wpnonce:metaslider.update_slide_image_nonce,slide_id:l.data("slideId"),slider_id:window.parent.metaslider_slider_id,image_id:new_image_id};e.ajax({url:metaslider.ajaxurl,data:a,type:"POST",error:function(e){var i=JSON.parse(e.responseText);t&&t.notifyError("metaslider/slide-update-failed",i.data.message,!0)},success:function(i){var a=e("#slide-"+l.data("slideId")+" .thumb").find("img");a.attr("srcset",`${i.data.thumbnail_url_large} 1024w, ${i.data.thumbnail_url_medium} 768w, ${i.data.thumbnail_url_small} 240w`),a.attr("src",i.data.thumbnail_url_small),e("#slide-"+l.data("slideId")+", #slide-"+l.data("slideId")+" .update-image").data("attachment-id",selected_item.id),i.data.thumbnail_url_small&&e("#slide-"+l.data("slideId")).trigger("metaslider/attachment/updated",i.data),s.update_slide_metadata({id:selected_item.id,caption:selected_item.caption,description:selected_item.description,title:selected_item.title,alt:selected_item.alt}),t&&t.notifySuccess("metaslider/slide-updated",t.__("Slide updated successfully","ml-slider"),!0),e(".metaslider table#metaslider-slides-list").trigger("resizeSlides")}})})),i.on("close",(function(){h()})),a.on("close",(function(){h()})),i.on("all",(function(){"library"===i.state().id&&(i.$el.addClass("hide-menu"),i.$el.find(".media-button-select").text(i.options.button.text).addClass("button-primary"))}))})),e(".metaslider").on("click",".duplicate-slide-image",(function(i){i.preventDefault();var s=e(this),a={action:"duplicate_slide",_wpnonce:metaslider.duplicate_slide_nonce,slide_id:s.data("slide-id"),slider_id:window.parent.metaslider_slider_id};e.ajax({url:metaslider.ajaxurl,data:a,type:"POST",error:function(e){t&&t.notifyError("metaslider/slide-duplicate-failed",e,!0)},success:function(i){var s=window.metaslider.app.Vue.compile(i.data.html);const a=new window.metaslider.app.Vue({render:s.render,staticRenderFns:s.staticRenderFns}).$mount().$el;"last"===metaslider.newSlideOrder?e("#metaslider-slides-list > tbody").append(a):e("#metaslider-slides-list > tbody").prepend(a),w("slide-"+i.data.slide_id),e([document.documentElement,document.body]).animate({scrollTop:"last"===metaslider.newSlideOrder?e("#slide-"+i.data.slide_id).offset().top:0},2e3),setTimeout((function(){setTimeout((function(){t&&t.triggerEvent("metaslider/save")}),1e3)}),1e3)}})})),e(".metaslider").on("change",'.ms-settings-table input[name="settings[autoPlay]"], .ms-settings-table input[name="settings[carouselMode]"], .ms-settings-table input[name="settings[infiniteLoop]"]',(function(){d()}));var d=function(){var t=e('.ms-settings-table input[name="settings[carouselMode]"]'),i=e('.ms-settings-table input[name="settings[infiniteLoop]"]'),s=e('.ms-settings-table input[name="settings[autoPlay]"]'),a=e('.ms-settings-table input[name="settings[pausePlay]"]');t.is(":checked")&&i.is(":checked")?(s.parents("tr").hide(),a.parents("tr").hide()):(s.parents("tr").show(),s.is(":checked")?a.parents("tr").show():a.parents("tr").hide())};d(),e(".metaslider").on("change",'.ms-settings-table input[name="settings[pausePlay]"], .ms-settings-table input[name="settings[autoPlay]"]',(function(){r()}));var r=function(){var t=e('.ms-settings-table input[name="settings[pausePlay]"]');e('.ms-settings-table input[name="settings[autoPlay]"]').is(":checked")&&t.is(":checked")?e("tr.customizer-pausePlay").show():e("tr.customizer-pausePlay").hide()};setTimeout((function(){r()}),100),e(".metaslider").on("change",'.ms-settings-table select[name="settings[links]"]',(function(){o()}));var o=function(){"false"===e('.ms-settings-table select[name="settings[links]"]').val()?e("tr.customizer-links").hide():e("tr.customizer-links").show()};setTimeout((function(){o()}),100),e(".metaslider").on("change",'.ms-settings-table select[name="settings[navigation]"]',(function(){c()}));var c=function(){"false"===e('.ms-settings-table select[name="settings[navigation]"]').val()?e("tr.customizer-navigation").hide():e("tr.customizer-navigation").show()};setTimeout((function(){c()}),100),e(".metaslider").on("change",'.ms-settings-table input[name="settings[autoPlay]"], .ms-settings-table select[name="settings[loop]"]',(function(){m()}));var m=function(){var i=e('.ms-settings-table input[name="settings[autoPlay]"]'),s=e('.ms-settings-table select[name="settings[loop]"]');i.is(":checked")?0===s.find('option[value="stopOnFirst"]').length&&s.append(`<option value="stopOnFirst">${t.__("Stop on first slide after looping","ml-slider")}</option>`):s.find('option[value="stopOnFirst"]').remove()};m();var u=function(t){t.preventDefault(),window.metaslider.about_to_reload||(e(this).addClass("active").siblings().removeClass("active"),e("#image-api-container").length||(e(this).parents(".media-frame-router").siblings(".media-frame-content").append('<div id="image-api-container"></div>'),e("#image-api-container").append('<metaslider-external source="unsplash" :slideshow-id="'+window.parent.metaslider_slider_id+'" :slide-id="'+window.metaslider.slide_id+'" slide-type="'+(window.metaslider.slide_type||"image")+'"></metaslider-external>'),e(window).trigger("metaslider/initialize_external_api",{selector:"#image-api-container"}),delete window.metaslider.slide_id,delete window.metaslider.slide_type))},p=window.metaslider.add_image_apis=function(t,i){e('.media-menu-item.active:contains("Layer")').length&&!window.metaslider.pro_supports_imports||(window.metaslider.slide_type="layer",t&&(window.metaslider.slide_type=t),window.metaslider.slide_id=i,e(".unsplash-tab").remove(),e(".media-frame-router .media-router").append('<a href="#" id="unsplash-tab" class="text-black hover:text-blue-dark unsplash-tab media-menu-item">Unsplash Library</a>'),e(".toplevel_page_metaslider").on("click",".unsplash-tab",u),e(".media-frame-router .media-router .media-menu-item").on("click",(function(){e(window).trigger("metaslider/destroy_external_api"),e(this).addClass("active").siblings().removeClass("active")})))},h=window.metaslider.remove_image_apis=function(){window.metaslider.about_to_reload||(e(window).trigger("metaslider/destroy_external_api"),e(".toplevel_page_metaslider").off("click",".unsplash-tab",u),e(".unsplash-tab").remove(),e(".media-frame-router .media-router > a").first().trigger("click"))};e(".metaslider").on("click",".delete-slide",(function(t){t.preventDefault();var i=e(this),s={action:"delete_slide",_wpnonce:metaslider.delete_slide_nonce,slide_id:i.data("slideId"),slider_id:window.parent.metaslider_slider_id};i.parents("#slide-"+i.data("slideId")).removeClass("ms-restored").addClass("ms-deleting").append('<div class="ms-delete-overlay"><i style="height:24px;width:24px"><svg class="ms-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg></i></div>'),i.parents("#slide-"+i.data("slideId")).find(".ms-delete-status").remove(),e.ajax({url:metaslider.ajaxurl,data:s,type:"POST",error:function(e){alert(e.responseJSON.data.message),$slide=i.parents("#slide-"+i.data("slideId")),$slide.removeClass("ms-deleting"),$slide.find(".ms-delete-overlay").remove()},success:function(t){setTimeout((function(){$slide=i.parents("#slide-"+i.data("slideId")),$slide.addClass("ms-deleted").removeClass("ms-deleting").find(".metaslider-ui-controls").append('<button class="undo-delete-slide" title="'+metaslider.restore_language+'" data-slide-id="'+i.data("slideId")+'">'+metaslider.restore_language+"</button>");var t=$slide.find(".thumb").css("background-image").replace(/^url\(["']?/,"").replace(/["']?\)$/,"");t=window.location.href===t?"":t,"none"==e(".trashed-slides-cont").css("display")&&e(".trashed-slides-cont").css("display","")}),1e3)}})})),e(".metaslider").on("click",".undo-delete-slide, .trash-view-restore",(function(t){t.preventDefault();var i=e(this),s={action:"undelete_slide",_wpnonce:metaslider.undelete_slide_nonce,slide_id:i.data("slideId"),slider_id:window.parent.metaslider_slider_id};e("#slide-"+i.data("slideId")).find(".undo-delete-slide").html(""),i.parents("#slide-"+i.data("slideId")).removeClass("ms-deleted").addClass("ms-deleting").css("padding-top","31px").append('<div class="ms-delete-overlay"><i style="height:24px;width:24px"><svg class="ms-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg></i></div>'),i.parents("#slide-"+i.data("slideId")).find(".ms-delete-status").remove(),i.parents("#slide-"+i.data("slideId")).find(".delete-slide").focus(),e.ajax({url:metaslider.ajaxurl,data:s,type:"POST",error:function(e){$slide=i.parents("#slide-"+i.data("slideId")),$slide.removeClass("ms-restoring").addClass("ms-deleted"),$slide.find(".ms-delete-overlay").remove(),e.responseJSON?alert(e.responseJSON.data.message):alert("There was an error with the server and the action could not be completed.")},success:function(t){$slide=i.parents("#slide-"+i.data("slideId")),$slide.addClass("ms-restored"),$slide.removeClass("ms-deleting").find(".undo-delete-slide, .trash-view-restore").remove(),$slide.find(".ms-delete-overlay").remove(),e("#slide-"+i.data("slideId")+" h4").after('<span class="ms-delete-status is-success">'+metaslider.restored_language+"</span>"),e("#slide-"+i.data("slideId")).find(".row-actions.trash-btns").html("");var s=$slide.find(".thumb").css("background-image").replace(/^url\(["']?/,"").replace(/["']?\)$/,"");s=window.location.href===s?"":s}})})),e(".metaslider").on("click",".trash-view-permanent",(function(t){t.preventDefault();var i=e(this),s={action:"permanent_delete_slide",_wpnonce:metaslider.permanent_delete_slide_nonce,slide_id:i.data("slideId")};i.parents("#slide-"+i.data("slideId")).removeClass("ms-restored").addClass("ms-deleting").append('<div class="ms-delete-overlay"><i style="height:24px;width:24px"><svg class="ms-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg></i></div>'),i.parents("#slide-"+i.data("slideId")).find(".ms-delete-status").remove(),e.ajax({url:metaslider.ajaxurl,data:s,type:"POST",error:function(e){alert(e.responseJSON.data.message),$slide=i.parents("#slide-"+i.data("slideId")),$slide.removeClass("ms-deleting"),$slide.find(".ms-delete-overlay").remove()},success:function(t){setTimeout((function(){$slide=i.parents("#slide-"+i.data("slideId")),$slide.addClass("ms-deleted").removeClass("ms-deleting").find(".metaslider-ui-controls").append('<button class="undo-delete-slide" title="'+metaslider.restore_language+'" data-slide-id="'+i.data("slideId")+'">'+metaslider.restore_language+"</button>");var t=$slide.find(".thumb").css("background-image").replace(/^url\(["']?/,"").replace(/["']?\)$/,"");t=window.location.href===t?"":t,"none"==e(".restore-slide-link").css("display")&&e(".restore-slide-link").css("display","inline")}),1e3)}})})),e(".metaslider").on("resizeSlides","table#metaslider-slides-list",(function(t){var i=e("input.width").val(),s=e("input.height").val();e("tr.slide input[name='resize_slide_id']",this).each((function(){$this=e(this);var t=$this.attr("data-width"),a=$this.attr("data-height"),n=e(this).closest("tr"),l=n.data("crop_changed");if(t!=i||a!=s||l){$this.attr("data-width",i),$this.attr("data-height",s);var d={action:"resize_image_slide",slider_id:window.parent.metaslider_slider_id,slide_id:$this.attr("data-slide_id"),_wpnonce:metaslider.resize_nonce};e.ajax({type:"POST",data:d,async:!1,cache:!1,url:metaslider.ajaxurl,success:function(e){l&&n.data("crop_changed",!1),e.data.thumbnail_url_small&&$this.closest("tr.slide").trigger("metaslider/attachment/updated",e.data)}})}}))}));var g=function(){e(".tipsy-tooltip").tipsy({className:"msTipsy",live:!1,delayIn:500,html:!0,gravity:"e"}),e(".tipsy-tooltip-top").tipsy({live:!1,delayIn:500,html:!0,gravity:"s"}),e(".tipsy-tooltip-bottom").tipsy({live:!1,delayIn:500,html:!0,gravity:"n"}),e(".tipsy-tooltip-bottom-toolbar").tipsy({live:!1,delayIn:500,html:!0,gravity:"n",offset:2})};g();const f=e("#metaslider-slides-list");if(f.length){const t={childList:!0,subtree:!0};new MutationObserver((function(t,i){for(const i of t)"childList"===i.type&&i.addedNodes.length>0&&(g(),e("#add-first-slide-notice").hide())})).observe(f[0],t)}if(e("#sampleslider-btn").on("click",(function(){window.location.href=e("#sampleslider-options").val()})),window.location.href.indexOf("withcaption")>-1&&e("input[value='override']").attr("checked",!0).trigger("click"),e("#quickstart-browse-button").click((function(){window.create_slides.open()})),e("#slideshows-list").length&&e("#search_slideshow-search-input").length){var _=e("#search_slideshow-search-input").val();""!=_&&e("#slideshows-list .pagination-links a").each((function(){this.href=this.href+"&s="+_}))}"disabled"==e('select[name="settings[smartCrop]"]').val()?e('input[name="settings[smoothHeight]"]').closest("tr").show():e('input[name="settings[smoothHeight]"]').closest("tr").hide(),e('select[name="settings[smartCrop]"]').change((function(){"disabled"==e(this).val()?e('input[name="settings[smoothHeight]"]').closest("tr").show():(e('input[name="settings[smoothHeight]"]').closest("tr").hide(),e('input[name="settings[smoothHeight]"]').prop("checked",!1))})),e(document).on("click",".ml-legacy-notice .notice-dismiss",(function(){var t={action:"legacy_notification",notif_status:"hide",_wpnonce:metaslider.legacy_notification_nonce};e.ajax({url:metaslider.ajaxurl,data:t,type:"POST",error:function(e){console.log("Something went wrong:"+e)},success:function(e){console.log(e)}})})),e(".copy-shortcode").click((function(){var t=e(this).text();if(window.isSecureContext)navigator.clipboard.writeText(t);else{var i=e("<input>");e("body").append(i),i.val(t).select(),document.execCommand("Copy"),i.remove()}e(this).next(".copy-message").fadeIn().delay(1e3).fadeOut()}));window.metaslider.after_adding_slide_success=function(t){var i=e(".metaslider table#metaslider-slides-list");"last"===window.metaslider.newSlideOrder?i.append(t.html):i.prepend(t.html),e("html, body").animate({scrollTop:"last"===window.metaslider.newSlideOrder?e(e("#slide-"+t.slide_id)).offset().top:0},2e3);var s=window.metaslider.app.MetaSlider;e(".media-modal-close").click(),setTimeout((function(){s&&s.notifySuccess("metaslider/slides-created",s.__("1 slide added successfully","ml-slider"),!0),setTimeout((function(){s&&s.triggerEvent("metaslider/save")}),1e3)}),1e3)};var w=function(i){var s=t&&t.__("Mobile options are enabled for this slide. Adjust using the Mobile tab.","ml-slider"),a=e("#metaslider-slides-list #"+i+" .mobile-checkbox:checked"),n='<span class="mobile_setting_enabled float-left tipsy-tooltip-top" title="'+s+'"><span class="inline-block mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg></span></span>',l=e("#metaslider-slides-list #"+i+" .slide-details .mobile_setting_enabled");a.length>0?0==l.length&&e("#metaslider-slides-list #"+i+" .slide-details").append(n):l.remove()};function v(){"false"==e('[name="settings[links]"]').val()&&"false"==e('[name="settings[navigation]"]').val()?e(".highlight.mobileOptions, .empty-row-spacing.mobileOptions").hide():e(".highlight.mobileOptions, .empty-row-spacing.mobileOptions").show()}e("#metaslider-slides-list > tbody  > tr").each((function(){var t=e(this).attr("id");w(t)})),e(".metaslider").on("click",".mobile-checkbox",(function(){var t=e(this).attr("name").replace(/[^0-9]/g,"");w("slide-"+t)})),e('[name="settings[navigation]"], [name="settings[links]"]').on("change",(function(){v()})),v(),e(".slidethumb").each((function(){var t=1,i=e(this);setInterval((function(){t=i.find(":nth-child("+t+")").fadeOut().next().length?t+1:1,i.find(":nth-child("+t+")").fadeIn(),console.log(i.find(":nth-child("+t+")"))}),2e3)}));-1!==window.location.href.indexOf("metaslider_add_sample_slides_after")&&setTimeout((function(){t&&t.triggerEvent("metaslider/save")}),1e3)}));var MetaSlider_Helpers={capitalize:function(e){return e.replace(/\b\w/g,(function(e){return e.toUpperCase()}))}};