{ezscript_require(
		array(	'ezjsc::jquery',
				'jquery.splashscreen.js',
				'jquery.cookie.js'
				))}
{ezcss_require("splashscreen.css")}

{* PARAMS *}
{if is_unset($images)}
	{def $images = array()}
{/if}
{if is_unset($showTime)}
	{def $showTime = 900}
{/if}
{if is_unset($topOffset)}
	{def $topOffset = 80}
{/if}
{if is_unset($cookieName)}
	{def $cookieName = 'splash'}
{/if}
{if is_unset($cookieExpiryDays)}
	{def $cookieExpiryDays = 7}
{/if}
{if is_unset($view_area)}
	{def $view_area = 'splashscreen'}
{/if}
{if is_unset($selector)}
	{def $selector = concat( ' .', $view_area )}
{else}
	{set $selector = $selector|append( concat( ' .', $view_area ) )}
{/if}

<div class="{$view_area|wash}"></div>

<script type="text/javascript">
<!--
	$(document).ready( function() {ldelim}
  		if ($.cookie('{$cookieName|wash}') == null){ldelim}
  			$('{$selector|wash}').splashScreen( {ldelim}
  				textLayers		: [{$images|implode(',')}],
  				textShowTime	: {$showTime},
				textTopOffset	: {$topOffset}
  				{rdelim});
  			$.cookie('{$cookieName|wash}', 'true', {ldelim}expires: {$cookieExpiryDays}{rdelim});
  		{rdelim}
  	{rdelim});
//-->
</script>
