<?php
/*
 *  WP React Redux Starter Custom functions, support, custom post types and more.
 *  Author: tone4hook
 *  URL: https://github.com/tone4hook
 *
 */

// Since Version 2.6, themes need to specify
// the $content_width variable in the functions.php file
// https://codex.wordpress.org/Content_Width
if (!isset($content_width)) {
    $content_width = 900;
}

if (function_exists('add_theme_support')) {
    // Add Menu Support
	register_nav_menus( array(
		'main_nav' => 'Main Navigation Menu'
	) );

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_image_size('large', 1050, '', true); // Large Thumbnail
    add_image_size('medium-large', 750, '', true); // Large Thumbnail
    add_image_size('medium', 450, '', true); // Medium Thumbnail
    add_image_size('small', 150, '', true); // Small Thumbnail

    // Localisation Support
    load_theme_textdomain('wpreactreduxstarter', get_template_directory() . '/languages');
}

// get the menu items
// for custom rest endpoint
function wpreactreduxstarter_menu() {
	$locations = get_nav_menu_locations();
	if ( $locations['main_nav'] > 0 ) {
		$menu_object = wp_get_nav_menu_object( $locations['main_nav'] );
		$menu_items = wp_get_nav_menu_items($menu_object->name);
		foreach( $menu_items as $menu_item ) {
			$menu_arr[] = (object) array(
				'id' => get_post_meta( $menu_item->ID, '_menu_item_object_id', true ),
				'type' => $menu_item->object,
				'title' => $menu_item->title,
				'slug' => strtolower(str_replace(' ', '-', $menu_item->title))
			);
		}
	} else {
		$menu_arr = array();
	}
	return $menu_arr;
}
// get sidebar items
// for custom rest endpoint
function wpreactreduxstarter_sidebar() {
	$categories = get_categories();
	foreach( $categories as $category ) {
		$categories_arr[] = (object) array(
			'id' => $category->term_id,
			'type' => 'category',
			'title' => $category->name,
			'slug' => $category->slug,
			'count' => $category->category_count
		);
	}

	$tags = get_tags();
	foreach( $tags as $tag ) {
		$tags_arr[] = (object) array(
			'id' => $tag->term_id,
			'type' => 'tag',
			'title' => $tag->name,
			'slug' => $tag->slug,
			'count' => $tag->count
		);
	}

	$args = array(
		'numberposts' => 5,
		'offset' => 0,
		'category' => 0,
		'orderby' => 'post_date',
		'order' => 'DESC',
		'include' => '',
		'exclude' => '',
		'meta_key' => '',
		'meta_value' =>'',
		'post_type' => 'post',
		'post_status' => 'draft, publish, future, pending, private',
		'suppress_filters' => true
	);

	$recent_posts = wp_get_recent_posts( $args, ARRAY_A );

	foreach($recent_posts as $recent_post) {
		$recent_posts_arr[] = (object) array(
			'id' => $recent_post['ID'],
			'type' => 'post',
			'title' => $recent_post['post_title'],
			'slug' => $recent_post['post_name'],
			'excerpt' => wpreactreduxstarter_limit_text( strip_tags($recent_post['post_content']) )
		);
	}

	$sidebar = (object) array(
		'blog_name' => get_bloginfo('name'),
		'blog_description' => get_bloginfo('description'),
		'category' => $categories_arr,
		'tag' => $tags_arr,
		'recent_posts' => $recent_posts_arr
	);

	return $sidebar;
}

// register API routes
add_action( 'rest_api_init', function() {
	register_rest_route( 'wp/v2', '/menu', array(
		'methods' => 'GET',
		'callback' => 'wpreactreduxstarter_menu'
	));

	register_rest_route( 'wp/v2', '/sidebar', array(
		'methods' => 'GET',
		'callback' => 'wpreactreduxstarter_sidebar'
	));
}); // /add_action

// Utilities
// for post custom excerpt
function wpreactreduxstarter_limit_text($text, $limit=30) {
	if (str_word_count($text, 0) > $limit) {
		$words = str_word_count($text, 2);
		$pos = array_keys($words);
		$text = substr($text, 0, $pos[$limit]);
	}
	$clean_text = preg_replace('/\s+/', ' ', $text);
	return rtrim($clean_text) . '...';
}

?>
