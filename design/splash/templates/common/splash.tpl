{* PARAMS *}
{if is_unset($related)}
{def $related = fetch( 'content', 'related_objects_count', hash( 'object_id', $node.contentobject_id,
														'all_relations', array('common')
														))}
{/if}

{if $related|gt(0)}
	{def $img_folder = fetch( 'content', 'related_objects', hash( 'object_id', $node.contentobject_id,
														'all_relations', array('common')
														)).0
		$splash_imgs = fetch( 'content', 'list', hash('parent_node_id', $img_folder.main_node_id,
												 'sort_by', $img_folder.main_node.sort_array,
												 'class_filter_type', 'include',
												'class_filter_array', array('image')
												)
						)
		$image_urls = array()
	}
	
	
	{foreach $splash_imgs as $img}
		{set $image_urls = $image_urls|append($img.data_map.image.content.original.url|ezroot('single','full'))}
	{/foreach}
									

	{* DEBUG INFO *}
	{debug-log msg='sorting' var=$img_folder.main_node.sort_array}
	{debug-log msg='image urls' var=$image_urls}
	{debug-log msg='image content' var=$splash_imgs.0.data_map.image.content.original.width}
	
	{include uri="design:splash.tpl" images=$image_urls}
{/if}