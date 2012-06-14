{ezscript_require(
		array(	'ezjsc::jquery',
				'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
				'jquery.ui.touch-punch.min.js',
				'jquery.pt-slide-show.js'
				))}
{ezcss_require("pt-slide-show.css")}

{* PARAMS *}
{if is_unset($images)}
	{def $images = array()}
{/if}
{if is_unset($image_width)}
	{def $image_width = 700}
{/if}
{if is_unset($image_height)}
	{def $image_height = 450}
{/if}
{if is_unset($view_area)}
	{def $view_area = 'view_area'}
{/if}
{if is_unset($selector)}
	{def $selector = concat( ' .', $view_area )}
{else}
	{set $selector = $selector|append( concat( ' .', $view_area ) )}
{/if}
{if is_unset($category)}
	{def $category = ''}
{/if}


<div class="{$view_area|wash}"></div>

<script type="text/javascript">
<!--
	$(document).ready( function() {ldelim}
  		$('{$selector|wash}').ptSlideShow( [{$images|implode(',')}], '{$image_width|wash}', '{$image_height|wash}');
  	{rdelim});
//-->
</script>
