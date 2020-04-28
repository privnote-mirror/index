// static/js/legacy.js

promise.ajaxTimeout=15000;window.$=function(s){return document.getElementById(s.slice(1));}
if(!window.JSON){window.JSON={parse:function(sJSON){return eval('('+sJSON+')');}}}
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');};}
if(!String.prototype.supplant){String.prototype.supplant=function(o){return this.replace(/\{([^{}]*)\}/g,function(a,b){var r=o[b];return typeof r==='string'||typeof r==='number'?r:a;});};}
var notes=function()
{var note_id='';var is_mobile=false;var has_class=function(el,cl){var re=RegExp("(?:^|\\s)"+cl+"(?!\\S)")
return(el.className.match(re)!=null)};var add_class=function(el,cl){if(!has_class(el,cl)){el.className=el.className+' '+cl;}};var remove_class=function(el,cl){if(el.className)
{var re=RegExp("(?:^|\\s)"+cl+"(?!\\S)","g")
el.className=el.className.replace(re,'')}};var show=function(el){remove_class(el,'hidden');};var hide=function(el){add_class(el,'hidden');};var toggle=function(el){if(has_class(el,'hidden'))
show(el)
else
hide(el)}
var add_event_listener=function(element,event_name,handler)
{if(window.addEventListener)
{element.addEventListener(event_name,handler,false)}
else
{if(event_name=='click')
element.onclick=handler;else if(event_name=='submit')
element.onsubmit=handler;else if(event_name=='keyup')
element.onkeyup=handler;else if(event_name=='keydown')
element.onkeydown=handler;else if(event_name=='keypress')
element.onkeypress=handler;else if(event_name=='hashchange')
element.onhashchange=handler;}};var stop_event_propagation=function(event)
{if(event&&event.stopPropagation){event.stopPropagation();}
else if(window.event){window.event.cancelBubble=true;}}
var prevent_default=function(event)
{if(event&&event.preventDefault){event.preventDefault()}else if(window.event){window.event.returnValue=false}
return false}
var temporary_disable=function(element,duration)
{element.disabled=true
window.setTimeout(function(){element.disabled=false},duration)}
var select_only=function(el)
{function late(n){var p=new promise.Promise();setTimeout(function(){p.done(null,n);},n);return p;}
late(50).then(function(err,n){try{el.setSelectionRange(0,el.value.length)}
catch(e){el.select(0,9999999)}});}
var set_inner_text=function(el,text)
{if(el.innerText!=null)
{el.innerText=text}
else
{el.textContent=text}}
var focus=function(el)
{if(el==null)return;if(is_mobile)return;function late(n){var p=new promise.Promise();setTimeout(function(){p.done(null,n);},n);return p;}
late(50).then(function(err,n){el.focus()
return late(n)})}
var focus_and_select=function(el)
{if(is_mobile)return;function late(n){var p=new promise.Promise();setTimeout(function(){p.done(null,n);},n);return p;}
late(50).then(function(err,n){el.focus()
return late(n)}).then(function(err,n){try{el.setSelectionRange(0,el.value.length)}
catch(e){el.select(0,9999999)}});}
var scroll_top=function()
{document.body.scrollTop=document.documentElement.scrollTop=0;}
var format_remaining=function(rem_secs)
{var d_s=60*60*24
var h_s=60*60
var m_s=60
var params={}
var tpl
if(rem_secs>2*d_s)
{params['days']=parseInt(rem_secs/d_s)
tpl=i18n_tpl['expires_d']}
else if(rem_secs>2*h_s)
{var h=parseInt(rem_secs/h_s)
params['hours']=h
params['minutes']=parseInt((rem_secs-(h*h_s))/60)
tpl=i18n_tpl['expires_h_m']}
else if(rem_secs>2*m_s)
{var m=parseInt(rem_secs/m_s)
params['minutes']=m
params['seconds']=parseInt((rem_secs-(m*m_s)))
tpl=i18n_tpl['expires_m_s']}
else
{if(rem_secs>=0)
params['seconds']=parseInt(rem_secs)
else
params['seconds']=0
tpl=i18n_tpl['expires_s']}
return tpl.supplant(params)}
var schedule_remaining_update=function(el_name,d_expires)
{if($(el_name)==null){return;}
var d_now=new Date()
var r=(d_expires-d_now)/1000
$(el_name).innerHTML=format_remaining(r)
var timeout=1000
if(r>60*60*24*2){timeout=1000*60*60}
else if(r>60*60*2){timeout=1000*60}
else{timeout=1000}
setTimeout(function(){schedule_remaining_update(el_name,d_expires)},timeout)}
var add_hash_option=function(name,value)
{hash=location.hash.substring(1)
options=hash.split('&')
var out={}
for(i in options)
{var pair=options[i].split('=')
if(pair[0]!='')
out[pair[0]]=pair[1]||''}
if(value)
out[name]=encodeURI(value)
else
out[name]=''
var out_hash=[]
for(k in out)
{var o=k
if(out[k]!='')
o+='='+out[k]
out_hash.push(o)}
location.hash=out_hash.join('&')}
var remove_hash_option=function(name)
{var hash=location.hash.substring(1)
var options=hash.split('&')
var out_hash=[]
for(var i in options)
{var re_empty=RegExp('^'+name+'$')
var re=RegExp('^'+name+'=')
if(options[i].match(re_empty)!=null||options[i].match(re)!=null)
continue
else if(options[i]!='')
out_hash.push(options[i])}
location.hash=out_hash.join('&')}
var created_note_data=null;var created_manual_password=null;var read_hash_password=null;return{init_create:function()
{if(document.cookie.indexOf('cookieconsent_status=dissmiss')==-1){remove_class($('#cookie-modal'),'hidden')}
function update_options_set_from_hash()
{var hash=location.hash.trim()
if(!hash||hash.length<2)
return;var option_set=false
var options=hash.substring(1).split('&')
for(i in options)
{var pair=options[i].split('=')
switch(pair[0]){case'dont_ask':$('#destroy_without_confirmation').checked=true
option_set=true
break;case'duration_hours':$('#duration_hours').value=pair[1]||0
option_set=true
break;case'notify_email_e':var v=common.urldemangle(decodeURI(pair[1]))||''
if(common.is_email(v)){$('#notify_email').value=v
option_set=true}
break;case'notify_ref_e':$('#notify_ref').value=common.urldemangle(decodeURI(pair[1]))||''
option_set=true
break;}}
if($('#duration_hours').value==0)
show($('#confirmation_option'))
else
{hide($('#confirmation_option'))
remove_hash_option('dont_ask')
$('#destroy_without_confirmation').checked=false}
if(option_set&&has_class($('#advanced_options'),'hidden'))
{show($('#options_on_notice'))
show($('#options_on_notice_asterisk'))}
else
{hide($('#options_on_notice'))
hide($('#options_on_notice_asterisk'))}
if(option_set)
show($('#advanced_options_tip'))
else
hide($('#advanced_options_tip'))}
add_event_listener($('#cookie_consent'),'click',function(){document.cookie='cookieconsent_status=dissmiss'
add_class(document.getElementById('cookie-modal'),'hidden')})
add_event_listener($('#new_note_help_toggle'),'click',function(event)
{toggle($('#new_note_help'))})
add_event_listener($('#created_note_help_toggle'),'click',function(event)
{toggle($('#created_note_help'))
if(created_manual_password)
toggle($('#created_note_with_pass_help'))})
add_event_listener($('#advanced_options_show'),'click',function(event){show($('#advanced_options'))
show($('#advanced_options_hide'))
hide($('#advanced_options_show'))
hide($('#options_on_notice'))
hide($('#options_on_notice_asterisk'))
focus($('#duration_hours'))})
add_event_listener($('#advanced_options_hide'),'click',function(event){hide($('#advanced_options'))
hide($('#advanced_options_hide'))
show($('#advanced_options_show'))
$('#duration_hours').value=0
$('#destroy_without_confirmation').checked=false
show($('#confirmation_option'))
$('#manual_password').value=''
$('#manual_password_confirm').value=''
$('#notify_email').value=''
$('#notify_ref').value=''
hide($('#error_ajax'))
hide($('#error_connection'))
hide($('#error_note_is_empty'))
hide($('#error_password_mismatch'))
hide($('#error_notify_email_invalid'))
var opts=['very_weak','weak','good','strong','very_strong']
for(var i in opts)
{hide($('#'+opts[i]+'_manual_password'))}
location.hash=''
hide($('#options_on_notice'))
hide($('#options_on_notice_asterisk'))
hide($('#advanced_options_tip'))
focus($('#note_raw'))})
add_event_listener($('#manual_password'),'keyup',function(event){var strength=common.pass_strength($('#manual_password').value)
var opts=['very_weak','weak','good','strong','very_strong']
for(var i in opts)
{hide($('#'+opts[i]+'_manual_password'))}
if($('#manual_password').value)
show($('#'+strength+'_manual_password'))
if($('#manual_password').value&&$('#manual_password_confirm').value&&$('#manual_password').value!=$('#manual_password_confirm').value)
show($('#error_password_mismatch'))
else
hide($('#error_password_mismatch'))})
add_event_listener($('#manual_password_confirm'),'keyup',function(event){if($('#manual_password').value&&$('#manual_password_confirm').value&&$('#manual_password').value!=$('#manual_password_confirm').value)
show($('#error_password_mismatch'))
else
hide($('#error_password_mismatch'))})
add_event_listener($('#notify_email'),'keyup',function(event){if($('#notify_email').value!='')
{if(!common.is_email($('#notify_email').value.trim()))
show($('#error_notify_email_invalid'))
else
hide($('#error_notify_email_invalid'))
add_hash_option('notify_email_e',common.urlmangle($('#notify_email').value.trim()))}
else
{hide($('#error_notify_email_invalid'))
remove_hash_option('notify_email_e')}})
add_event_listener($('#notify_ref'),'keyup',function(event){if($('#notify_ref').value.trim()!='')
{add_hash_option('notify_ref_e',common.urlmangle($('#notify_ref').value.trim()))}
else
{remove_hash_option('notify_ref_e')}})
if($('#note_link_input'))
{add_event_listener($('#select_link'),'click',function(event){focus_and_select($('#note_link_input'))})}
if($('#note_link_a'))
{add_event_listener($('#note_link_a'),'click',function(event){prevent_default(event);})}
if($('#note_password_input'))
{add_event_listener($('#select_password'),'click',function(event){focus_and_select($('#note_password_input'))})}
if($('#show_password'))
{add_event_listener($('#show_password'),'click',function(event){show($('#hide_password'))
hide($('#show_password'))
if(is_mobile)
set_inner_text($('#note_password_span'),created_manual_password)
else
{$('#note_password_input').value=created_manual_password
show($('#select_password'))}})
add_event_listener($('#hide_password'),'click',function(event){hide($('#hide_password'))
show($('#show_password'))
if(is_mobile)
set_inner_text($('#note_password_span'),'*******')
else
{$('#note_password_input').value='*******'
hide($('#select_password'))}})}
add_event_listener($('#encrypt_note'),'click',function(event){$('#encrypt_note').disabled=true
var password
var manual_password=$('#manual_password').value
created_manual_password=manual_password
if(manual_password=='')
password=common.make_password();else
password=manual_password;hide($('#error_ajax'))
hide($('#error_connection'));hide($('#error_note_is_empty'))
hide($('#error_notify_email_invalid'))
var found_note_errors=false
var found_option_errors=false
var note_text=$('#note_raw').value
if(note_text=='')
{show($('#error_note_is_empty'))
found_note_errors=true}
if($('#manual_password').value!=$('#manual_password_confirm').value)
{show($('#error_password_mismatch'))
found_option_errors=true}
if($('#notify_email').value!='')
{if(!common.is_email($('#notify_email').value.trim()))
{show($('#error_notify_email_invalid'))
found_option_errors=true}}
if(found_option_errors)
{show($('#advanced_options'))
show($('#advanced_options_hide'))
hide($('#advanced_options_show'))
hide($('#advanced_options_tip'))}
if(found_option_errors||found_note_errors)
{$('#encrypt_note').disabled=false
return}
scroll_top()
hide($('#new_note'))
show($('#creating_note'))
var note_encrypted=common.encrypt(note_text,password)
if(password.length!=common.auto_pass_length)
password=common.mangle(password)
created_note_data={'data':note_encrypted,'has_manual_pass':(manual_password!=''),'duration_hours':$('#duration_hours').value,'dont_ask':$('#destroy_without_confirmation').checked,'data_type':'T','notify_email':$('#notify_email').value.trim(),'notify_ref':$('#notify_ref').value,'hash':password}
promise.post('//secretroom7.com/legacy/',created_note_data,{"X-Requested-With":'XMLHttpRequest'}).then(function(error,text,xhr){if(error){show($('#error_connection'));show($('#new_note'))
hide($('#creating_note'))
hide($('#created_note'))
try{var response=JSON.parse(text)
var error_msg=response.error
if(error_msg)
{hide($('#error_connection'));show($('#error_ajax'));$('#error_ajax').innerHTML=error_msg;}}catch(e){}
$('#encrypt_note').disabled=false
return;}
var response=JSON.parse(text)
$('#mailto_link').href="mailto:?body="+response.note_link
$('#show_link').href=response.note_link
$('#destroy_link').href=response.note_link
if(is_mobile)
{$('#note_link_a').href=response.note_link
$('#note_link_a').innerHTML=response.note_link}
else
{$('#note_link_input').value=response.note_link}
if(manual_password!='')
{if(is_mobile)
set_inner_text($('#note_password_span'),'*******')
else
$('#note_password_input').value='******'
show($('#note_password_block'))}
else
{var suffix='#'+password
$('#mailto_link').href=$('#mailto_link').href+suffix
$('#show_link').href=$('#show_link').href+suffix
$('#destroy_link').href=$('#destroy_link').href+suffix
if(is_mobile)
{$('#note_link_a').href+=suffix
$('#note_link_a').innerHTML+=suffix}
else
{$('#note_link_input').value+=suffix}}
if(response.policy==1)
{show($('#destroy_link'))
show($('#info_read_once'))}
else
{var d_exp=new Date(response.expires_js)
schedule_remaining_update('#info_expires_text',d_exp)
show($('#info_expires'))
show($('#show_link'))}
$('#note_raw').value=''
$('#manual_password').value=''
hide($('#new_note'))
hide($('#creating_note'))
show($('#created_note'))
if(!is_mobile)
focus_and_select($('#note_link_input'))
$('#encrypt_note').disabled=false});})
add_event_listener($('#destroy_without_confirmation'),'click',function(event){if($('#destroy_without_confirmation').checked)
add_hash_option('dont_ask')
else
remove_hash_option('dont_ask')})
add_event_listener($('#duration_hours'),'change',function(event){var duration_hours=$('#duration_hours').value
if(duration_hours==0)
{remove_hash_option('duration_hours')
show($('#confirmation_option'))}
else
{add_hash_option('duration_hours',duration_hours)
remove_hash_option('dont_ask')
$('#destroy_without_confirmation').checked=false
hide($('#confirmation_option'))}})
remove_hash_option('notify_email')
remove_hash_option('notify_ref')
update_options_set_from_hash()
add_event_listener(window,'hashchange',function(event){update_options_set_from_hash()})
show($('#content'))
hide($('#unsupported'))
focus($('#note_raw'))},init_read:function(note_state,policy,has_manual_pass,dont_ask,expires_js)
{if(document.cookie.indexOf('cookieconsent_status=dissmiss')==-1){remove_class($('#cookie-modal'),'hidden')}
function find_password()
{var password=''
var demangle=true
if($('#note_password')&&$('#note_password').value!='')
{password=$('#note_password').value
demangle=false}
else if($('#note_link_manual')&&$('#note_link_manual').value!='')
{var re=RegExp("#([^#]+)$")
var m=$('#note_link_manual').value.match(re)
password=m[1]}
else if(read_hash_password)
{password=read_hash_password}
if(demangle&&password.length!=common.auto_pass_length)
password=common.demangle(password);return password}
function try_to_decrypt()
{try{var password=find_password()
if(password=='')
{show($('#password_form'))
show($('#error_password_incorrect'))
hide($('#ok_content'))
focus($('#note_password'))
return}
var note_encrypted
note_encrypted=$('#note_contents').value
var note_text=common.decrypt(note_encrypted,password)
hide($('#password_form'))
hide($('#error_password_incorrect'))
if(policy==1||note_state==2)
show($('#info_destroyed'))
else
show($('#info_expires'))
show($('#ok_content'))
if(read_hash_password)
{$('#note_link').href+='#'+read_hash_password
$('#note_link').innerHTML+='#'+read_hash_password}
$('#note_contents').value=note_text
if(is_mobile)
{set_inner_text($('#note_contents_div'),note_text)}
else
{show($('#note_contents'))
focus_and_select($('#note_contents'))}}
catch(e)
{show($('#password_form'))
show($('#error_password_incorrect'))
hide($('#ok_content'))
focus($('#note_password'))}}
function handle_read_and_destroy(error,text,xhr){if(error)
{show($('#confirm_read_note'))
hide($('#fetching_note'))
show($('#error_connection_read'))
try{var response=JSON.parse(text)
var error_msg=response.error
if(error_msg)
{hide($('#error_connection_read'));show($('#error_ajax_read'));$('#error_ajax_read').innerHTML=error_msg;}}catch(e){}
$('#confirm_button').disabled=false
focus($('#confirm_button'))
return}
var response=JSON.parse(text)
if(!response.data||response.data=='')
{location.href='/'+note_id
return}
$('#note_contents').value=response.data
if(read_hash_password==''||has_manual_pass)
{hide($('#fetching_note'))
show($('#read_note'))
show($('#password_form'))
hide($('#error_password_incorrect'))
hide($('#ok_content'))
focus($('#note_password'))}
else
{hide($('#fetching_note'))
show($('#read_note'))
try_to_decrypt()
hide($('#error_password_incorrect'))}
scroll_top()}
if($('#manual_password_help_toggle'))
{add_event_listener($('#manual_password_help_toggle'),'click',function(event){toggle($('#manual_password_help'))})}
if($('#note_password'))
{add_event_listener($('#note_password'),'keypress',function(event){if(!event)event=window.event;var key=event.keyCode||event.which;if(key=='13')
{try_to_decrypt()}})}
add_event_listener($('#decrypt_button'),'click',function(event){try_to_decrypt()})
add_event_listener($('#cookie_consent'),'click',function(){document.cookie='cookieconsent_status=dissmiss'
add_class(document.getElementById('cookie-modal'),'hidden')})
if($('#select_text'))
{add_event_listener($('#select_text'),'click',function(event){focus_and_select($('#note_contents'))})}
if($('#destroy_button'))
{add_event_listener($('#destroy_button'),'click',function(event){$('#destroy_button').disabled=true
hide($('#error_connection_destroy'));hide($('#error_ajax_destroy'));promise.del('/'+note_id,null,{"X-Requested-With":'XMLHttpRequest'}).then(function(error,text,xhr){if(error)
{show($('#error_connection_destroy'))
try{var response=JSON.parse(text)
var error_msg=response.error
if(error_msg)
{hide($('#error_connection_destroy'));show($('#error_ajax_destroy'));$('#error_ajax_destroy').innerHTML=error_msg;}}catch(e){}
$('#destroy_button').disabled=false
return}
hide($('#destroy_button'))
hide($('#info_expires'))
show($('#info_destroyed'))})})}
if(expires_js)
{schedule_remaining_update('#info_expires_text',new Date(expires_js))}
if(location.hash)
{read_hash_password=location.hash.substring(1)
location.hash=''}
if(policy==1)
{add_event_listener($('#confirm_button'),'click',function(event)
{$('#confirm_button').disabled=true
hide($('#confirm_read_note'))
show($('#fetching_note'))
hide($('#error_connection_read'));hide($('#error_ajax_read'));promise.del('/'+note_id,null,{"X-Requested-With":'XMLHttpRequest'}).then(handle_read_and_destroy)})
if(!has_manual_pass&&read_hash_password=='')
{hide($('#link_ok'))
show($('#error_link_incomplete'))}
else if(dont_ask)
{hide($('#confirm_read_note'))
show($('#fetching_note'))
hide($('#error_connection_read'));hide($('#error_ajax_read'));promise.del('/'+note_id,null,{"X-Requested-With":'XMLHttpRequest'}).then(handle_read_and_destroy)}
else
{show($('#confirm_read_note'))
focus($('#confirm_button'))}}
else
{if(read_hash_password==''||has_manual_pass)
{hide($('#confirm_read_note'))
show($('#read_note'))
show($('#password_form'))
hide($('#error_password_incorrect'))
hide($('#ok_content'))
focus($('#note_password'))}
else
{show($('#read_note'))
try_to_decrypt()}}
show($('#content'))
hide($('#unsupported'))},init_error:function()
{show($('#content'))
hide($('#unsupported'))},set_note_id:function(value)
{note_id=value;},set_device_type:function(device_type)
{is_mobile=(device_type!='desktop');},when_ready:function(callback)
{var called=false
function just_once()
{if(!called)
{called=true
callback()}}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",just_once,false)
window.addEventListener("load",just_once,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",just_once);window.attachEvent("onload",just_once);}}}}();
