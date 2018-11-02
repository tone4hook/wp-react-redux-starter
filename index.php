<!doctype html>
<html lang="en" class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>
		<meta name="description" content="<?php bloginfo('description'); ?>">
		<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?>" href="<?php bloginfo('rss2_url'); ?>" />
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="<?php echo get_template_directory_uri(); ?>/dist/style.css" rel="stylesheet"></head>
	</head>
	<body>
		<div id="root"></div>
		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/dist/main.bundle.js"></script>
	</body>
</html>
