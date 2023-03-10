<?php

/**
 * Plugin Name:       Moneymade
 * Description:       You can made money
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       moneymade
 *
 * @package           moneymade
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_moneymade_category_guttenberg_block($categories)
{

	$categories[] = array(
		'slug'  => 'moneymade_monetization',
		'title' => 'Moneymade Monetization widgets'
	);
	$categories[] = array(
		'slug'  => 'moneymade_markets',
		'title' => 'Moneymade Markets Data widgets'
	);

	return $categories;
}

if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
	add_filter('block_categories_all', 'register_moneymade_category_guttenberg_block');
} else {
	add_filter('block_categories', 'register_moneymade_category_guttenberg_block');
}
add_action('admin_menu', 'moneymade_page_setting');

function moneymade_page_setting()
{

	$icon = '<svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M1280 704q0-26-19-45t-45-19q-172 0-318 49.5t-259.5 134-235.5 219.5q-19 21-19 45 0 26 19 45t45 19q24 0 45-19 27-24 74-71t67-66q137-124 268.5-176t313.5-52q26 0 45-19t19-45zm512-198q0 95-20 193-46 224-184.5 383t-357.5 268q-214 108-438 108-148 0-286-47-15-5-88-42t-96-37q-16 0-39.5 32t-45 70-52.5 70-60 32q-43 0-63.5-17.5t-45.5-59.5q-2-4-6-11t-5.5-10-3-9.5-1.5-13.5q0-35 31-73.5t68-65.5 68-56 31-48q0-4-14-38t-16-44q-9-51-9-104 0-115 43.5-220t119-184.5 170.5-139 204-95.5q55-18 145-25.5t179.5-9 178.5-6 163.5-24 113.5-56.5l29.5-29.5 29.5-28 27-20 36.5-16 43.5-4.5q39 0 70.5 46t47.5 112 24 124 8 96z"/></svg>';

	add_options_page(
		'Login page',
		'Moneymade',
		'manage_options',
		'login_page_moneymade',
		'login_money_callback',
		'data:image/svg+xml;base64,' . base64_encode($icon),
		4
	);
}

function send_credentials_to_cognito()
{
	$messege_response = ['message' => 'Something going wrong', 'success' => 'error'];
	if (!get_option('moneymade_login', '') || !get_option('moneymade_password', '')) {
		$messege_response = ['message' => 'You are not logged in', 'success' => 'error'];
	} else {
		$prepare_output = [
			"AuthFlow" => "USER_PASSWORD_AUTH",
			"AuthParameters" => [
				"PASSWORD" => base64_decode(get_option('moneymade_password', '')),
				"USERNAME" => get_option('moneymade_login', '')
			],
			"ClientId" => "6hke5u0vefacct55eocidcngfr"
		];
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://cognito-idp.us-east-1.amazonaws.com/',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => json_encode($prepare_output),
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-amz-json-1.1',
				'x-amz-target: AWSCognitoIdentityProviderService.InitiateAuth'
			),
		));
		$response = curl_exec($curl);
		curl_close($curl);
		$res_arr = json_decode($response, 1);
		if ($res_arr['__type']) {
			$messege_response = ['message' => $res_arr['message'], 'success' => 'error'];
		} else {
            $messege_response = ['message' => 'You have successfully logged in', 'success' => 'success'];
		}		
	}
	add_settings_error('cognito_response', 'cognito_response', $messege_response['message'], $messege_response['success']);
}
function login_money_callback()
{
?>
	<div class="wrap">
		<h1><?php echo get_admin_page_title() ?></h1>
		<?php // if (isset($_GET['settings-updated'])) {
			send_credentials_to_cognito();
		//} ?>
		<form method="post" action="options.php">
			<?php
			settings_errors('cognito_response');
			settings_fields('option_setting_group');
			do_settings_sections('login_page_moneymade');
			submit_button();
			?>
		</form>
	</div>
	<?php
}
add_action('admin_init',  'moneymade_settings_fields');
function moneymade_settings_fields()
{

	$page_slug = 'login_page_moneymade';
	$option_group_setting = 'option_setting_group';
	add_settings_section(
		'setting_group_id', // section ID
		'', // title (optional)
		'', // callback function to display the section (optional)
		$page_slug
	);
	///end title set group


	///section 
	register_setting($option_group_setting, 'moneymade_login', ['type' => 'array', 'sanitize_callback' => 'moneymade_login_sinitize']);
	add_settings_field(
		'moneymade_login',
		'Email address',
		'display_freetitlem', // function to print the field
		$page_slug,
		'setting_group_id' // section ID
	);
	function display_freetitlem($args)
	{
		$value = get_option('moneymade_login', '');   ?>
		<label>
			<input style="width:60%" type="text" id="moneymade_login" placeholder="Input email from Moneymade" name="moneymade_login" value="<?php echo $value;  ?>" />
		</label>
	<?php
	}
	function moneymade_login_sinitize($value)
	{
		if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
			$message = $value . ' -is not correct email';
			add_settings_error('email_error', 'email_error', $message, 'error');
			$value = get_option('moneymade_login', '');
		}
		return $value;
	}
	//end section
	///section 
	register_setting($option_group_setting, 'moneymade_password', ['sanitize_callback' => 'moneymade_password_sinitize']);
	add_settings_field(
		'moneymade_password',
		'Password',
		'display_password', // function to print the field
		$page_slug,
		'setting_group_id' // section ID
	);
	function display_password($args)
	{
		$value = ''  ?>

		<label>
			<input style="width:60%" type="password" id="moneymade_password" placeholder="Input password from Moneymade" name="moneymade_password" value="<?php echo $value;  ?>" />
		</label>
<?php
	}
	function moneymade_password_sinitize($value)
	{
		return base64_encode($value);
	}
	//end section
}

add_action('wp_head', 'moneymade_load_scripts');
function moneymade_load_scripts()
{
	if (is_not_moneymade_page()) return;

	wp_print_script_tag(
		array(
			'src' => 'https://markets.moneymade.io/embed/v2.min.js',
			'defer' => true
		)
	);
}
function is_not_moneymade_page()
{
	global $post;
	$post_content = $post->post_content;
	$parse_block_content = parse_blocks($post_content);
	$need_arr = array_filter($parse_block_content, function ($item) {
		return preg_match('/moneymade/', $item['blockName']);
	});
	return !count($need_arr) > 0;
}

function moneymade_moneymade_block_init()
{
	register_block_type(__DIR__ . '/build/simpleticker');
	register_block_type(__DIR__ . '/build/categoryroundup');
	register_block_type(__DIR__ . '/build/gainerslosers');
	register_block_type(__DIR__ . '/build/compactperformance');
	register_block_type(__DIR__ . '/build/expandedticker');
	register_block_type(__DIR__ . '/build/articlesnapshot');
	register_block_type(__DIR__ . '/build/inlinedata');
	register_block_type(__DIR__ . '/build/comparasiontable');
	register_block_type(__DIR__ . '/build/comparereturnsgraph');
	register_block_type(__DIR__ . '/build/compareprice');
	register_block_type(__DIR__ . '/build/topnft');
	register_block_type(__DIR__ . '/build/stockpage');
	register_block_type(__DIR__ . '/build/cryptopage');
	register_block_type(__DIR__ . '/build/ask');
	register_block_type(__DIR__ . '/build/bpt');
	register_block_type(__DIR__ . '/build/trd');
	register_block_type(__DIR__ . '/build/crdr');
	register_block_type(__DIR__ . '/build/crdk');
	register_block_type(__DIR__ . '/build/sliderestimates');
	register_block_type(__DIR__ . '/build/performance');
	register_block_type(__DIR__ . '/build/editorial');
	register_block_type(__DIR__ . '/build/marketplace');
	register_block_type(__DIR__ . '/build/industry');
	register_block_type(__DIR__ . '/build/moneybar');  //compareplatform
	register_block_type(__DIR__ . '/build/compareplatform');
}
add_action('init', 'moneymade_moneymade_block_init');
//for compactperformance_start 
function api_compactperformance_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_compactperformance_userdata', 'send_data_compactperformance_userdata');
add_action('wp_ajax_nopriv_compactperformance_userdata', 'send_data_compactperformance_userdata');
function send_data_compactperformance_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_compactperformance_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_money_gainerslosers_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_compactperformance_widget', 'send_data_compactperformance_widget');
add_action('wp_ajax_nopriv_compactperformance_widget', 'send_data_compactperformance_widget');
function send_data_compactperformance_widget()
{
	if (isset($_POST['compactperformance_source']) && (isset($_POST['compactperformance_monitization_type']))) {
		$compactperformance_id = '';

		if (isset($_POST['compactperformance_ticker']) && $_POST['compactperformance_ticker']) {
			$compactperformance_ticker = $_POST['compactperformance_ticker'];
			$compactperformance_id = '&amp;ids=' . $compactperformance_ticker;
		}

		$compactperformance_comparasion_id = '';

		if (isset($_POST['compactperformance_comparasion_ticker']) && $_POST['compactperformance_comparasion_ticker']) {
			$compactperformance_comparasion_ticker = $_POST['compactperformance_comparasion_ticker'];
			$compactperformance_comparasion_id = '&amp;compareIds=' . $compactperformance_comparasion_ticker;
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$symbol_search='';

		if($_POST['symbol_search']=='true') {
		$symbol_search='<div class="money-made-embed" data-name="Symbol Search" data-width="100%" data-embed-widget="symbolSearch" data-params="controlId=compact-performance-'.$uid.'" data-utm-medium="embed"></div>';
		}



		$compactperformance_source = $_POST['compactperformance_source'] ? $_POST['compactperformance_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = $symbol_search.'<div id="compact-performance-' . $uid . '" class="money-made-embed" data-name="Compact Performance" data-width="100%" data-height="0" data-embed-widget="compact-performance" data-params="'.$profile.'monetization=' . $_POST['compactperformance_monitization_type'] . '' . $compactperformance_id . '' . $compactperformance_comparasion_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $compactperformance_source . '" data-utm-campaign="compactPerformance" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_money_gainerslosers_return($return_data);
	}
}



//for compactperformance_end

//for expandedticker_start
function api_expandedticker_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_expandedticker_userdata', 'send_data_expandedticker_userdata');
add_action('wp_ajax_nopriv_expandedticker_userdata', 'send_data_expandedticker_userdata');
function send_data_expandedticker_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_expandedticker_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_expandedticker_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_expandedticker_widget', 'send_data_expandedticker_widget');
add_action('wp_ajax_nopriv_expandedticker_widget', 'send_data_expandedticker_widget');
function send_data_expandedticker_widget()
{
	if (isset($_POST['expandedticker_source']) && (isset($_POST['expandedticker_monitization_type']))) {
		$expandedticker_id = '';

		if (isset($_POST['expandedticker_ticker']) && $_POST['expandedticker_ticker']) {
			$expandedticker_ticker = $_POST['expandedticker_ticker'];
			$expandedticker_id = '&amp;ids=' . $expandedticker_ticker;
		}

		$expandedticker_comparasion_id = '';

		if (isset($_POST['expandedticker_comparasion_ticker']) && $_POST['expandedticker_comparasion_ticker']) {
			$expandedticker_comparasion_ticker = $_POST['expandedticker_comparasion_ticker'];
			$expandedticker_comparasion_id = '&amp;compareIds=' . $expandedticker_comparasion_ticker;
		}

		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$symbol_search='';

        if($_POST['symbol_search']=='true') {
		$symbol_search='<div class="money-made-embed" data-name="Symbol Search" data-width="100%" data-embed-widget="symbolSearch" data-params="controlId=ticker-graph-'.$uid.'" data-utm-medium="embed"></div>';
		}
		$expandedticker_source = $_POST['expandedticker_source'] ? $_POST['expandedticker_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = $symbol_search.'<div id="ticker-graph-' . $uid . '" class="money-made-embed" data-name="Expanded Ticker" data-width="100%" data-height="0" data-embed-widget="ticker-graph" data-params="'.$profile.'monetization=' . $_POST['expandedticker_monitization_type'] . '' . $expandedticker_id . '' . $expandedticker_comparasion_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $expandedticker_source . '" data-utm-campaign="tickerGraph" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_expandedticker_return($return_data);
	}
}



//for expandedticker_end






//for articlesnapshot_start
function api_articlesnapshot_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_articlesnapshot_userdata', 'send_data_articlesnapshot_userdata');
add_action('wp_ajax_nopriv_articlesnapshot_userdata', 'send_data_articlesnapshot_userdata');
function send_data_articlesnapshot_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_articlesnapshot_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_articlesnapshot_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_articlesnapshot_widget', 'send_data_articlesnapshot_widget');
add_action('wp_ajax_nopriv_articlesnapshot_widget', 'send_data_articlesnapshot_widget');
function send_data_articlesnapshot_widget()
{
	if (isset($_POST['articlesnapshot_source']) && (isset($_POST['articlesnapshot_monitization_type']))) {
		$articlesnapshot_id = '';
		$articlesnapshot_title = '';

		if (
			isset($_POST['articlesnapshot_ticker1']) && $_POST['articlesnapshot_ticker1'] || isset($_POST['articlesnapshot_ticker2']) && $_POST['articlesnapshot_ticker2']
			|| isset($_POST['articlesnapshot_ticker3']) && $_POST['articlesnapshot_ticker3']
		) {
			$articlesnapshot_id = '&amp;ids=';
			$arr_tickers = [$_POST['articlesnapshot_ticker1'], $_POST['articlesnapshot_ticker2'], $_POST['articlesnapshot_ticker3']];
			$arr_tickers = array_filter($arr_tickers);
			$qty_arr_tickers = count($arr_tickers);

			foreach ($arr_tickers as $key => $ticker) {
				$pref = ($key < ($qty_arr_tickers - 1)) ? '%2C' : '';
				$articlesnapshot_id .= $ticker . $pref;
			}
		}
		if ($_POST['articlesnapshot_title']) {
			$articlesnapshot_title .= '&amp;title=';
			$articlesnapshot_title .= preg_replace('/\s/', '+', $_POST['articlesnapshot_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$articlesnapshot_source = $_POST['articlesnapshot_source'] ? $_POST['articlesnapshot_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="' . $uid . '" class="money-made-embed" data-name="Article Snapshot" data-width="100%" data-height="0" data-embed-widget="article-snapshot" data-params="'.$profile.'monetization=' . $_POST['articlesnapshot_monitization_type'] . '' . $articlesnapshot_title . '' . $articlesnapshot_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $articlesnapshot_source . '" data-utm-campaign="articleSnapshot" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_articlesnapshot_return($return_data);
	}
}



//for articlesnapshot_end



//for inlinedata_start
function api_inlinedata_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_inlinedata_userdata', 'send_data_inlinedata_userdata');
add_action('wp_ajax_nopriv_inlinedata_userdata', 'send_data_inlinedata_userdata');
function send_data_inlinedata_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_inlinedata_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_inlinedata_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_inlinedata_widget', 'send_data_inlinedata_widget');
add_action('wp_ajax_nopriv_inlinedata_widget', 'send_data_inlinedata_widget');
function send_data_inlinedata_widget()
{
	if (isset($_POST['inlinedata_source'])) {
		$inlinedata_id = '';

		if (isset($_POST['inlinedata_ticker']) && $_POST['inlinedata_ticker']) {
			$inlinedata_ticker = $_POST['inlinedata_ticker'];
			$inlinedata_id = 'ids=' . $inlinedata_ticker . '&amp;';
		}


		$uid = md5(uniqid(rand(), true));
		$inlinedata_source = $_POST['inlinedata_source'] ? $_POST['inlinedata_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<span id="inline-data-' . $uid . '" class="money-made-embed" data-name="Inline Data" data-width="84" data-height="0" data-embed-widget="inline-data" data-params="' . $inlinedata_id . 'datapoint=' . $_POST['inlinedata_data_point'] . '&amp;fontSize=' . $_POST['inlinedata_font_size'] . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $inlinedata_source . '" data-utm-campaign="inlineData" style="display:inline-block;vertical-align:middle"></span>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_inlinedata_return($return_data);
	}
}
//for inlinedata_end


//for comparasiontable_start
function api_comparasiontable_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_comparasiontable_userdata', 'send_data_comparasiontable_userdata');
add_action('wp_ajax_nopriv_comparasiontable_userdata', 'send_data_comparasiontable_userdata');
function send_data_comparasiontable_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_comparasiontable_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_comparasiontable_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_comparasiontable_widget', 'send_data_comparasiontable_widget');
add_action('wp_ajax_nopriv_comparasiontable_widget', 'send_data_comparasiontable_widget');
function send_data_comparasiontable_widget()
{
	if (isset($_POST['comparasiontable_source']) && (isset($_POST['comparasiontable_monitization_type']))) {
		$comparasiontable_id = '';

		if (
			isset($_POST['comparasiontable_ticker1']) && $_POST['comparasiontable_ticker1'] || isset($_POST['comparasiontable_ticker2']) && $_POST['comparasiontable_ticker2']
		) {
			$comparasiontable_id .= '&amp;ids=';
			$arr_tickers = [$_POST['comparasiontable_ticker1'], $_POST['comparasiontable_ticker2']];
			$arr_tickers = array_filter($arr_tickers);
			$qty_arr_tickers = count($arr_tickers);

			foreach ($arr_tickers as $key => $ticker) {
				$pref = ($key < ($qty_arr_tickers - 1)) ? '%2C' : '';
				$comparasiontable_id .= $ticker . $pref;
			}
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$comparasiontable_source = $_POST['comparasiontable_source'] ? $_POST['comparasiontable_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="ticker-table-' . $uid . '" class="money-made-embed" data-name="Comparison Table" data-width="100%" data-height="0" data-embed-widget="ticker-table" data-params="'.$profile.'monetization=' . $_POST['comparasiontable_monitization_type'] . '' . $comparasiontable_id . '&amp;timeframe=' . $_POST['comparasiontable_timeframe'] . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $comparasiontable_source . '" data-utm-campaign="tickerTable" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_comparasiontable_return($return_data);
	}
}



//for comparasiontable_end

//for comparereturnsgraph_start
function api_comparereturnsgraph_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_comparereturnsgraph_userdata', 'send_data_comparereturnsgraph_userdata');
add_action('wp_ajax_nopriv_comparereturnsgraph_userdata', 'send_data_comparereturnsgraph_userdata');
function send_data_comparereturnsgraph_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_comparereturnsgraph_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_comparereturnsgraph_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_comparereturnsgraph_widget', 'send_data_comparereturnsgraph_widget');
add_action('wp_ajax_nopriv_comparereturnsgraph_widget', 'send_data_comparereturnsgraph_widget');
function send_data_comparereturnsgraph_widget()
{
	if (isset($_POST['comparereturnsgraph_source']) && (isset($_POST['comparereturnsgraph_monitization_type']))) {
		$comparereturnsgraph_id = '';
		$comparereturnsgraph_title = '';

		if (
			isset($_POST['comparereturnsgraph_ticker1']) && $_POST['comparereturnsgraph_ticker1'] || isset($_POST['comparereturnsgraph_ticker2']) && $_POST['comparereturnsgraph_ticker2']
			|| isset($_POST['comparereturnsgraph_ticker3']) && $_POST['comparereturnsgraph_ticker3'] || isset($_POST['comparereturnsgraph_ticker4']) && $_POST['comparereturnsgraph_ticker4']
		) {
			$comparereturnsgraph_id = '&amp;ids=';
			$arr_tickers = [$_POST['comparereturnsgraph_ticker1'], $_POST['comparereturnsgraph_ticker2'], $_POST['comparereturnsgraph_ticker3'], $_POST['comparereturnsgraph_ticker4']];
			$arr_tickers = array_filter($arr_tickers);
			$qty_arr_tickers = count($arr_tickers);

			foreach ($arr_tickers as $key => $ticker) {
				$pref = ($key < ($qty_arr_tickers - 1)) ? '%2C' : '';
				$comparereturnsgraph_id .= $ticker . $pref;
			}
		}
		if ($_POST['comparereturnsgraph_title']) {
			$comparereturnsgraph_title .= '&amp;title=';
			$comparereturnsgraph_title .= preg_replace('/\s/', '+', $_POST['comparereturnsgraph_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$comparereturnsgraph_source = $_POST['comparereturnsgraph_source'] ? $_POST['comparereturnsgraph_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="compare-returns-' . $uid . '" class="money-made-embed" data-name="Compare Returns Graph" data-width="100%" data-height="0" data-embed-widget="compare-returns" data-params="'.$profile.'monetization=' . $_POST['comparereturnsgraph_monitization_type'] . '' . $comparereturnsgraph_title . '' . $comparereturnsgraph_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $comparereturnsgraph_source . '" data-utm-campaign="compareReturns" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_comparereturnsgraph_return($return_data);
	}
}



//for comparereturnsgraph_end

//for compareprice_start
function api_compareprice_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_compareprice_userdata', 'send_data_compareprice_userdata');
add_action('wp_ajax_nopriv_compareprice_userdata', 'send_data_compareprice_userdata');
function send_data_compareprice_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_compareprice_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_compareprice_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_compareprice_widget', 'send_data_compareprice_widget');
add_action('wp_ajax_nopriv_compareprice_widget', 'send_data_compareprice_widget');
function send_data_compareprice_widget()
{
	if (isset($_POST['compareprice_source']) && (isset($_POST['compareprice_monitization_type']))) {
		$compareprice_id = '';
		$compareprice_title = '';
		if (isset($_POST['compareprice_ticker']) && $_POST['compareprice_ticker']) {
			$compareprice_ticker = $_POST['compareprice_ticker'];
			$compareprice_id = 'ids=' . $compareprice_ticker . '&amp;';
		}

		if ($_POST['compareprice_title']) {
			$compareprice_title .= 'title=';
			$compareprice_title .= preg_replace('/\s/', '+', $_POST['compareprice_title']) . '&amp;';
		}

		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$compareprice_source = $_POST['compareprice_source'] ? $_POST['compareprice_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="compare-price-' . $uid . '" class="money-made-embed" data-name="Compare Prices" data-width="100%" data-height="0" data-embed-widget="compare-price" data-params="'.$profile.'' . $compareprice_title . 'monetization=' . $_POST['compareprice_monitization_type'] . '&amp;' . $compareprice_id . 'category=' . $_POST['compareprice_category'] . '&amp;compareCurrencyId=' . $_POST['compareprice_currency'] . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $compareprice_source . '" data-utm-campaign="comparePrice" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_compareprice_return($return_data);
	}
}



//for compareprice_end

//for topnft_start
function api_topnft_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_topnft_userdata', 'send_data_topnft_userdata');
add_action('wp_ajax_nopriv_topnft_userdata', 'send_data_topnft_userdata');
function send_data_topnft_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_topnft_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_topnft_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_topnft_widget', 'send_data_topnft_widget');
add_action('wp_ajax_nopriv_topnft_widget', 'send_data_topnft_widget');
function send_data_topnft_widget()
{
	if (isset($_POST['topnft_source']) && (isset($_POST['topnft_monitization_type']))) {

		$topnft_title = '';


		if ($_POST['topnft_title']) {
			$topnft_title .= 'title=';
			$topnft_title .= preg_replace('/\s/', '+', $_POST['topnft_title']) . '&amp;';
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$topnft_source = $_POST['topnft_source'] ? $_POST['topnft_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="top-nfts-' . $uid . '" class="money-made-embed" data-name="Top NFTs" data-width="100%" data-height="0" data-embed-widget="top-nfts" data-params="'.$profile.'' . $topnft_title . 'monetization=' . $_POST['topnft_monitization_type'] . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $topnft_source . '" data-utm-campaign="topNfts" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_topnft_return($return_data);
	}
}
//for topnft_end

//for stockpage_start
function api_stockpage_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_stockpage_userdata', 'send_data_stockpage_userdata');
add_action('wp_ajax_nopriv_stockpage_userdata', 'send_data_stockpage_userdata');
function send_data_stockpage_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_stockpage_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_stockpage_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_stockpage_widget', 'send_data_stockpage_widget');
add_action('wp_ajax_nopriv_stockpage_widget', 'send_data_stockpage_widget');
function send_data_stockpage_widget()
{
	if (isset($_POST['stockpage_source']) && (isset($_POST['stockpage_monitization_type']))) {
		$stockpage_id = '';
		$stockpage_description = '';
		if (isset($_POST['stockpage_ticker']) && $_POST['stockpage_ticker']) {
			$stockpage_ticker = $_POST['stockpage_ticker'];
			$stockpage_id = '&amp;ids=' . $stockpage_ticker;
		}

		if ($_POST['stockpage_description']) {
			$stockpage_description .= '&amp;description=';
			$stockpage_description .= preg_replace('/\s/', '+', $_POST['stockpage_description']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$stockpage_source = $_POST['stockpage_source'] ? $_POST['stockpage_source'] : 'REPLACE_WITH_SOURCE';

		$pattern = '<div id="full-stock-' . $uid . '" class="money-made-embed" data-name="Stock page" data-width="100%" data-height="0" data-embed-widget="full-stock" data-params="'.$profile.'monetization=' . $_POST['stockpage_monitization_type'] . '' . $stockpage_id . '' . $stockpage_description . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $stockpage_source . '" data-utm-campaign="fullStock" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_stockpage_return($return_data);
	}
}



//for stockpage_end


//for cryptopage_start
function api_cryptopage_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_cryptopage_userdata', 'send_data_cryptopage_userdata');
add_action('wp_ajax_nopriv_cryptopage_userdata', 'send_data_cryptopage_userdata');
function send_data_cryptopage_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_cryptopage_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_cryptopage_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_cryptopage_widget', 'send_data_cryptopage_widget');
add_action('wp_ajax_nopriv_cryptopage_widget', 'send_data_cryptopage_widget');
function send_data_cryptopage_widget()
{
	if (isset($_POST['cryptopage_source']) && (isset($_POST['cryptopage_monitization_type']))) {
		$cryptopage_id = '';
		$cryptopage_description = '';
		if (isset($_POST['cryptopage_ticker']) && $_POST['cryptopage_ticker']) {
			$cryptopage_ticker = $_POST['cryptopage_ticker'];
			$cryptopage_id = '&amp;ids=' . $cryptopage_ticker;
		}

		if ($_POST['cryptopage_description']) {
			$cryptopage_description .= '&amp;description=';
			$cryptopage_description .= preg_replace('/\s/', '+', $_POST['cryptopage_description']);
		}

		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$cryptopage_source = $_POST['cryptopage_source'] ? $_POST['cryptopage_source'] : 'REPLACE_WITH_SOURCE';

		$pattern = '<div id="full-crypto-' . $uid . '" class="money-made-embed" data-name="Crypto page" data-width="100%" data-height="0" data-embed-widget="full-crypto" data-params="'.$profile.'monetization=' . $_POST['cryptopage_monitization_type'] . '' . $cryptopage_id . '' . $cryptopage_description . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $cryptopage_source . '" data-utm-campaign="fullCrypto" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_cryptopage_return($return_data);
	}
}
//for cryptopage_end


//for ask_start
function api_ask_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_ask_userdata', 'send_data_ask_userdata');
add_action('wp_ajax_nopriv_ask_userdata', 'send_data_ask_userdata');
function send_data_ask_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_ask_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_ask_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_ask_widget', 'send_data_ask_widget');
add_action('wp_ajax_nopriv_ask_widget', 'send_data_ask_widget');
function send_data_ask_widget()
{
	if (isset($_POST['ask_source'])) {
		$uid = md5(uniqid(rand(), true));
		$ask_source = $_POST['ask_source'] ? $_POST['ask_source'] : 'REPLACE_WITH_SOURCE';
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="data-params=\"profile=".$_POST['profile']."\"";
		}
	
		$pattern = '<div id="ask-expert-' . $uid . '" class="money-made-embed" data-name="Ask An Expert" data-width="100%" data-height="450" data-embed-widget="ask-expert" '.$profile.' data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $ask_source . '" data-utm-campaign="askExpert" style="display:block"></div>';
            
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_ask_return($return_data);
	}
}
//for ask_end



//for bpt_start
function api_bpt_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_bpt_userdata', 'send_data_bpt_userdata');
add_action('wp_ajax_nopriv_bpt_userdata', 'send_data_bpt_userdata');
function send_data_bpt_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_compareprice_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_bpt_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_bpt_widget', 'send_data_bpt_widget');
add_action('wp_ajax_nopriv_bpt_widget', 'send_data_bpt_widget');
function send_data_bpt_widget()
{
	if (isset($_POST['bpt_source']) && (isset($_POST['bpt_monitization_type']))) {
		$bpt_title = '';
		if ($_POST['bpt_title']) {
			$bpt_title .= '&amp;title=';
			$bpt_title .= preg_replace('/\s/', '+', $_POST['bpt_title']);
		}
		$bpt_fundamental = '';
		if ($_POST['bpt_fundamental']) {
			$bpt_fundamental .= '&amp;performanceClassification=';
			$bpt_fundamental .= $_POST['bpt_fundamental'];
		}

		$bpt_category = '&amp;category=none';
		if ($_POST['bpt_category']) {
			$bpt_category = '&amp;category=' . str_replace(',', '%2C', preg_replace('/\s/', '+', $_POST['bpt_category']));
		}
		$bpt_industry = '&amp;industry=none';
		if ($_POST['bpt_industry']) {
			$bpt_industry = '&amp;industry=' . str_replace(',', '%2C', preg_replace('/\s/', '+', $_POST['bpt_industry']));
		}

		$bpt_index = '&amp;index=none';
		if ($_POST['bpt_index']) {
			$bpt_index = '&amp;index=' . str_replace(',', '%2C', preg_replace('/\s/', '+', $_POST['bpt_index']));
		}

		$bpt_sector = '&amp;sector=none';
		if ($_POST['bpt_sector']) {
			$bpt_sector = '&amp;sector=' . str_replace(',', '%2C', preg_replace('/\s/', '+', $_POST['bpt_sector']));
		}

		$bpt_supplementary = '&amp;extraColumns=none';
		if ($_POST['bpt_supplementary']) {
			$bpt_supplementary = '&amp;extraColumns=' . str_replace(',', '%2C', preg_replace('/\s/', '+', $_POST['bpt_supplementary']));
		}
		$btn_compare_operator = '&amp;perfomanceClassificationCompareOperator=none';
		if ($_POST['btn_compare_operator']) {
			$btn_compare_operator = '&amp;perfomanceClassificationCompareOperator=';
			$btn_compare_operator .= $_POST['btn_compare_operator'];
		}

		$btn_compare_value = '&amp;perfomanceClassificationCompareValue=1000';
		if ($_POST['btn_compare_value']) {
			$btn_compare_value = '&amp;perfomanceClassificationCompareValue=';
			$btn_compare_value .= $_POST['btn_compare_value'];
		}
		$bpt_rows = '&amp;limit=4';
		if ($_POST['bpt_rows']) {
			$bpt_rows = '&amp;limit=';
			$bpt_rows .= $_POST['bpt_rows'];
		}
		$bpt_sort = '&amp;performanceClassificationOrder=ASC';
		if ($_POST['bpt_sort']) {
			$bpt_sort = '&amp;performanceClassificationOrder=';
			$bpt_sort .= $_POST['bpt_sort'];
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}



		$uid = md5(uniqid(rand(), true));
		$bpt_source = $_POST['bpt_source'] ? $_POST['bpt_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="best-performing-table-' . $uid . '" class="money-made-embed" data-name="Best Performing Table" data-width="100%" data-height="0" data-embed-widget="best-performing-table" data-params="'.$profile.'monetization=' . $_POST['bpt_monitization_type'] . '' . $bpt_title . '&amp;asset=' . $_POST['bpt_asset_type'] . '' . $bpt_fundamental . '' . $bpt_category . '' . $bpt_industry . '' . $bpt_index . '' . $bpt_sector . '' . $bpt_supplementary . '' . $btn_compare_operator . '' . $btn_compare_value . '' . $bpt_rows . '' . $bpt_sort . '"	data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $bpt_source . '" data-utm-campaign="bestPerformingTable" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_bpt_return($return_data);
	}
}



//for bpt_end


//for trd_start
function api_trd_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_trd_userdata', 'send_data_trd_userdata');
add_action('wp_ajax_nopriv_trd_userdata', 'send_data_trd_userdata');
function send_data_trd_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_trd_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_trd_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_trd_widget', 'send_data_trd_widget');
add_action('wp_ajax_nopriv_trd_widget', 'send_data_trd_widget');
function send_data_trd_widget()
{
	if (isset($_POST['trd_source'])) {

		$trd_title = '';


		if ($_POST['trd_title']) {
			$trd_title .= 'title=';
			$trd_title .= preg_replace('/\s/', '+', $_POST['trd_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$trd_source = $_POST['trd_source'] ? $_POST['trd_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="horizontalOffers-' . $uid . '" class="money-made-embed" data-name="The Revenue Driver" data-width="100%" data-height="0" data-embed-widget="horizontalOffers" data-params="'.$profile.'' . $trd_title . '"     data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $trd_source . '" data-utm-campaign="horizontaloffers" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_trd_return($return_data);
	}
}
//for trd_end


//for crdr_start
function api_crdr_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_crdr_userdata', 'send_data_crdr_userdata');
add_action('wp_ajax_nopriv_crdr_userdata', 'send_data_crdr_userdata');
function send_data_crdr_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_crdr_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_crdr_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_crdr_widget', 'send_data_crdr_widget');
add_action('wp_ajax_nopriv_crdr_widget', 'send_data_crdr_widget');
function send_data_crdr_widget()
{
	if (isset($_POST['crdr_source'])) {

		$crdr_title = '';


		if ($_POST['crdr_title']) {
			$crdr_title .= 'title=';
			$crdr_title .= preg_replace('/\s/', '+', $_POST['crdr_title']);
		}

		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$crdr_source = $_POST['crdr_source'] ? $_POST['crdr_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="compact-revenue-driver-' . $uid . '" class="money-made-embed" data-name="Compact Revenue Driver" data-width="100%" data-height="0" data-embed-widget="compact-revenue-driver"  data-params="'.$profile.'' . $crdr_title . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $crdr_source . '" data-utm-campaign="compactRevenueDriver" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_crdr_return($return_data);
	}
}
//for crdr_end


//for crdk_start
function api_crdk_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_crdk_userdata', 'send_data_crdk_userdata');
add_action('wp_ajax_nopriv_crdk_userdata', 'send_data_crdk_userdata');
function send_data_crdk_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_crdk_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_crdk_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_crdk_widget', 'send_data_crdk_widget');
add_action('wp_ajax_nopriv_crdk_widget', 'send_data_crdk_widget');
function send_data_crdk_widget()
{
	if (isset($_POST['crdk_source'])) {

		$crdk_title = '';


		if ($_POST['crdk_title']) {
			$crdk_title .= 'title=';
			$crdk_title .= preg_replace('/\s/', '+', $_POST['crdk_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$crdk_source = $_POST['crdk_source'] ? $_POST['crdk_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="compact-revenue-dark-' . $uid . '" class="money-made-embed" data-name="Compact Revenue Dark" data-width="100%" data-height="0" data-embed-widget="compact-revenue-dark" data-params="'.$profile.'' . $crdk_title . '"  data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $crdk_source . '" data-utm-campaign="compactRevenueDark" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_crdk_return($return_data);
	}
}
//for crdk_end

//for crdk_start
function api_sliderestimates_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_sliderestimates_userdata', 'send_data_sliderestimates_userdata');
add_action('wp_ajax_nopriv_sliderestimates_userdata', 'send_data_sliderestimates_userdata');
function send_data_sliderestimates_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_sliderestimates_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_sliderestimates_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_sliderestimates_widget', 'send_data_sliderestimates_widget');
add_action('wp_ajax_nopriv_sliderestimates_widget', 'send_data_sliderestimates_widget');
function send_data_sliderestimates_widget()
{
	if (isset($_POST['sliderestimates_source'])) {

		$sliderestimates_title = '';


		if ($_POST['sliderestimates_title']) {
			$sliderestimates_title .= 'title=';
			$sliderestimates_title .= preg_replace('/\s/', '+', $_POST['sliderestimates_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$sliderestimates_source = $_POST['sliderestimates_source'] ? $_POST['sliderestimates_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="slider-estimates-' . $uid . '" class="money-made-embed" data-name="Slider Estimates" data-width="100%" data-height="0" data-embed-widget="slider-estimates" data-params="'.$profile.'' . $sliderestimates_title . '"    data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $sliderestimates_source . '" data-utm-campaign="sliderEstimates" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_sliderestimates_return($return_data);
	}
}
//for sliderestimates_end




//for performance_start
function api_performance_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_performance_userdata', 'send_data_performance_userdata');
add_action('wp_ajax_nopriv_performances_userdata', 'send_data_performance_userdata');
function send_data_performance_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_performance_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_performance_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_performance_widget', 'send_data_performance_widget');
add_action('wp_ajax_nopriv_performance_widget', 'send_data_performance_widget');
function send_data_performance_widget()
{
	if (isset($_POST['performance_source'])) {

		$performance_title = '';


		if ($_POST['performance_title']) {
			$performance_title .= 'title=';
			$performance_title .= preg_replace('/\s/', '+', $_POST['performance_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$performance_source = $_POST['performance_source'] ? $_POST['performance_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="performance-' . $uid . '" class="money-made-embed" data-name="Performance" data-width="100%" data-height="0" data-embed-widget="performance" data-params="'.$profile.'' . $performance_title . '"  data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $performance_source . '" data-utm-campaign="performance" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_performance_return($return_data);
	}
}
//for sliderestimates_end


//for editorial_start
function api_editorial_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_editorial_userdata', 'send_data_editorial_userdata');
add_action('wp_ajax_nopriv_editorial_userdata', 'send_data_editorial_userdata');
function send_data_editorial_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_editorial_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_editorial_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_editorial_widget', 'send_data_editorial_widget');
add_action('wp_ajax_nopriv_editorial_widget', 'send_data_editorial_widget');
function send_data_editorial_widget()
{
	if (isset($_POST['editorial_source'])) {

		$editorial_title = '';


		if ($_POST['editorial_title']) {
			$editorial_title .= 'title=';
			$editorial_title .= preg_replace('/\s/', '+', $_POST['editorial_title']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$editorial_source = $_POST['editorial_source'] ? $_POST['editorial_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="editorial-' . $uid . '" class="money-made-embed" data-name="editorial" data-width="100%" data-height="0" data-embed-widget="editorial" data-params="'.$profile.'' . $editorial_title . '"  data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $editorial_source . '" data-utm-campaign="editorial" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_editorial_return($return_data);
	}
}
//for editorial_end



//for marketplace_start
function api_marketplace_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_marketplace_userdata', 'send_data_marketplace_userdata');
add_action('wp_ajax_nopriv_marketplace_userdata', 'send_data_marketplace_userdata');
function send_data_marketplace_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_marketplace_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_marketplace_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_marketplace_widget', 'send_data_marketplace_widget');
add_action('wp_ajax_nopriv_marketplace_widget', 'send_data_marketplace_widget');
function send_data_marketplace_widget()
{
	if (isset($_POST['marketplace_source'])) {
        
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="data-params=\"profile=".$_POST['profile']."\"";
		}


		$uid = md5(uniqid(rand(), true));
		$marketplace_source = $_POST['marketplace_source'] ? $_POST['marketplace_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="marketplace-' . $uid . '" class="money-made-embed" data-name="Marketplace" data-width="100%" data-height="0" data-embed-widget="marketplace" '.$profile.'   data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $marketplace_source . '" data-utm-campaign="marketplace" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_marketplace_return($return_data);
	}
}
//for marketplace_end


//for industry_start
function api_industry_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_industry_userdata', 'send_data_industry_userdata');
add_action('wp_ajax_nopriv_industry_userdata', 'send_data_industry_userdata');
function send_data_industry_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_industry_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_industry_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_industry_widget', 'send_data_industry_widget');
add_action('wp_ajax_nopriv_industry_widget', 'send_data_industry_widget');
function send_data_industry_widget()
{
	if (isset($_POST['industry_source'])) {

		$industry_title = '';


		if ($_POST['industry_title']) {
			$industry_title .= 'title=';
			$industry_title .= preg_replace('/\s/', '+', $_POST['industry_title']) . '&amp;';
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$industry_source = $_POST['industry_source'] ? $_POST['industry_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="horizontal-asset-' . $uid . '" class="money-made-embed" data-name="Industry specific" data-width="100%" data-height="0" data-embed-widget="horizontal-asset" data-params="'.$profile.'' . $industry_title . 'industry=' . $_POST['industry'] . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $industry_source . '" data-utm-campaign="horizontalAsset" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_industry_return($return_data);
	}
}
//for industry_end





//for moneybar_start
function api_moneybar_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_moneybar_userdata', 'send_data_moneybar_userdata');
add_action('wp_ajax_nopriv_moneybar_userdata', 'send_data_moneybar_userdata');
function send_data_moneybar_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_moneybar_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_moneybar_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_moneybar_widget', 'send_data_moneybar_widget');
add_action('wp_ajax_nopriv_moneybar_widget', 'send_data_moneybar_widget');
function send_data_moneybar_widget()
{
	if (isset($_POST['moneybar_source'])) {

		$moneybar_position = '';
		if ($_POST['moneybar_position'] && $_POST['moneybar_position'] != 'none') {
			$moneybar_position = 'data-move-to="' . $_POST['moneybar_position'] . '"';
		}
		$moneybar_platform = 'none';
		if (isset($_POST['moneybar_platform']) && $_POST['moneybar_platform']) {
			$moneybar_platform = $_POST['moneybar_platform'];
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}
		$uid = md5(uniqid(rand(), true));
		$moneybar_source = $_POST['moneybar_source'] ? $_POST['moneybar_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="money-bar-' . $uid . '" class="money-made-embed" data-name="Money Bar" data-width="100%" data-height="0" data-embed-widget="money-bar" data-params="'.$profile.'platform=' . $moneybar_platform . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $moneybar_source . '" data-utm-campaign="moneyBar" ' . $moneybar_position . '  style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_moneybar_return($return_data);
	}
}
//for moneybar_end






//for compareplatform_start
function api_compareplatform_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_compareplatform_userdata', 'send_data_compareplatform_userdata');
add_action('wp_ajax_nopriv_compareplatform_userdata', 'send_data_compareplatform_userdata');
function send_data_compareplatform_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_compareplatform_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_compareplatform_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_compareplatform_widget', 'send_data_compareplatform_widget');
add_action('wp_ajax_nopriv_compareplatform_widget', 'send_data_compareplatform_widget');
function send_data_compareplatform_widget()
{
	if (isset($_POST['compareplatform_source'])) {

		$compareplatform_title = '';


		if ($_POST['compareplatform_title']) {
			$compareplatform_title .= 'title=';
			$compareplatform_title .= preg_replace('/\s/', '+', $_POST['compareplatform_title']) . '&amp;';
		}
		$platform1 = 'none';
		$platform2 = 'none';
		$platform3 = 'none';
		if ($_POST['platform1']) {
			$platform1 = $_POST['platform1'];
		}
		if ($_POST['platform2']) {
			$platform2 = $_POST['platform2'];
		}
		if ($_POST['platform3']) {
			$platform3 = $_POST['platform3'];
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$uid = md5(uniqid(rand(), true));
		$compareplatform_source = $_POST['compareplatform_source'] ? $_POST['compareplatform_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = '<div id="compare-platforms-' . $uid . '" class="money-made-embed" data-name="Compare Platforms" data-width="100%" data-height="0" data-embed-widget="compare-platforms" data-params="'.$profile.'' . $compareplatform_title . 'platform=' . $platform1 . '%2C' . $platform2 . '%2C' . $platform3 . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $compareplatform_source . '" data-utm-campaign="comparePlatforms" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_compareplatform_return($return_data);
	}
}
//for compareplatform_end









//for simplewidget start
function api_money_simple_return($data)
{
	echo json_encode($data);
	die();
};
add_action('wp_ajax_simple_widget', 'send_data_simple_widget');
add_action('wp_ajax_nopriv_simple_widget', 'send_data_simple_widget');
function send_data_simple_widget()
{
	if (isset($_POST['simple_source']) && (isset($_POST['simple_monitization_type']))) {
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}

		$ticker_id = '';

		if (isset($_POST['simple_ticker']) && $_POST['simple_ticker']) {
			$simple_ticker = $_POST['simple_ticker'];
			$ticker_id = '&amp;ids=' . $simple_ticker;
		}
		$uid = md5(uniqid(rand(), true));
		
		$symbol_search='';

		if($_POST['symbol_search']=='true') {
		$symbol_search='<div class="money-made-embed" data-name="Symbol Search" data-width="100%" data-embed-widget="symbolSearch" data-params="controlId=ticker-simple-'.$uid.'" data-utm-medium="embed"></div>';
		}
		$simple_source = $_POST['simple_source'] ? $_POST['simple_source'] : 'REPLACE_WITH_SOURCE';
		$pattern = $symbol_search.'<div id="ticker-simple-' . $uid . '" class="money-made-embed" data-name="Simple Ticker" data-width="100%" data-height="0" data-embed-widget="ticker-simple" data-params="'.$profile.'monetization=' . $_POST['simple_monitization_type'] . '' . $ticker_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $simple_source . '" data-utm-campaign="tickerSimple" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [

			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_money_simple_return($return_data);
	}
}
//for simplewidgetend
//for categoryroundup start

function api_money_categoryroundup_return($data)
{
	echo json_encode($data);
	die();
};


add_action('wp_ajax_categoryroundup_widget', 'send_data_categoryroundup_widget');
add_action('wp_ajax_nopriv_categoryroundup_widget', 'send_data_categoryroundup_widget');
function send_data_categoryroundup_widget()
{
	if (isset($_POST['category_roundup_source']) && (isset($_POST['category_roundup_monitization_type']))) {
		$ticker_ids = '';
		$category_roundup_widget_title = '';

		if ($_POST['category_roundup_widget_title']) {
			$category_roundup_widget_title .= '&amp;title=';
			$category_roundup_widget_title .= preg_replace('/\s/', '+', $_POST['category_roundup_widget_title']);
		}
		$category_roundup_source = $_POST['category_roundup_source'] ? $_POST['category_roundup_source'] : 'REPLACE_WITH_SOURCE';
		if (isset($_POST['category_roundup_tickers']) && $_POST['category_roundup_tickers']) {
			$arr_tickers = $_POST['category_roundup_tickers'];
			$arr_tickers = explode(',', $arr_tickers);
			$qty_arr_tickers = count($arr_tickers);
			if ($qty_arr_tickers) {
				$ticker_ids .= '&amp;ids=';
				foreach ($arr_tickers as $key => $ticker) {
					$pref = ($key < ($qty_arr_tickers - 1)) ? '%2C' : '';
					$ticker_ids .= $ticker . $pref;
				}
			}
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}
		$uid = md5(uniqid(rand(), true));
		//$pattern = '<div id="ticker-simple-'.$uid.'" class="money-made-embed" data-name="Simple Ticker" data-width="100%" data-height="0" data-embed-widget="ticker-simple" data-params="monetization=' . $_POST['category_roundup_monitization_type'] . '' . $ticker_id . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $_POST['category_roundup_source'] . '" data-utm-campaign="tickerSimple" style="display:block"></div>';
		$pattern = '<div id="category-roundup-' . $uid . '" class="money-made-embed" data-name="Category Roundup" data-width="100%" data-height="0" data-embed-widget="category-roundup" data-params="'.$profile.'monetization=' . $_POST['category_roundup_monitization_type'] . '' . $category_roundup_widget_title . '' . $ticker_ids . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $category_roundup_source . '" data-utm-campaign="categoryRoundup" style="display:block"></div>';

		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			//	'category_roundup_source' => $_POST['simple_source'],
			//	'simple_monitization_type' => $_POST['simple_monitization_type'],
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_money_categoryroundup_return($return_data);
	}
}
//for categoryrounup end
//for gainerslosers start
function api_money_gainerslosers_return($data)
{
	echo json_encode($data);
	die();
};

add_action('wp_ajax_gainerslosers_widget', 'send_data_gainerslosers_widget');
add_action('wp_ajax_nopriv_gainerslosers_widget', 'send_data_gainerslosers_widget');
function send_data_gainerslosers_widget()
{
	if (isset($_POST['gainerslosers_source']) && (isset($_POST['gainerslosers_monitization_type']))) {
		$gainerslosers_type = '&amp;type=' . str_replace('stocks', 'stock', $_POST['gainerslosers_type']);
		$gainerslosers_rows = '&amp;limit=' . $_POST['gainerslosers_rows'];
		//&amp;exchanges=none
		$gainerslosers_source = $_POST['gainerslosers_source'] ? $_POST['gainerslosers_source'] : 'REPLACE_WITH_SOURCE';
		$gainerslosers_exchanges = '&amp;exchanges=none';
		if ($_POST['gainerslosers_exchanges']) {
			$gainerslosers_exchanges = '&amp;exchanges=' . str_replace(',', '%2C', $_POST['gainerslosers_exchanges']);
		}
		$profile='';
		if (isset($_POST['profile']) && $_POST['profile']) {
			$profile="profile=".$_POST['profile']."&amp;";
		}
		$uid = md5(uniqid(rand(), true));
		$pattern = '<div id="gainers-losers-' . $uid . '" class="money-made-embed" data-name="Crypto/Stock Gainers &amp; Losers" data-width="100%" data-height="0" data-embed-widget="gainers-losers" data-params="'.$profile.'monetization=' . $_POST['gainerslosers_monitization_type'] . '' . $gainerslosers_type . '' . $gainerslosers_rows . '' . $gainerslosers_exchanges . '" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="' . $gainerslosers_source . '" data-utm-campaign="gainersLosers" style="display:block"></div>';
		$html_to_iframe = '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body>' . $pattern . '</body></html>';
		$return_data = [
			'final_code' => $pattern,
			'html_to_iframe' => $html_to_iframe
		];
		api_money_gainerslosers_return($return_data);
	}
}
//for geinerlosers end

add_action('wp_ajax_simple_userdata', 'send_data_simple_userdata');
add_action('wp_ajax_nopriv_simple_userdata', 'send_data_simple_userdata');
function send_data_simple_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_money_gainerslosers_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_money_gainerslosers_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}



add_action('wp_ajax_category_roundup_userdata', 'send_data_category_roundup_userdata');
add_action('wp_ajax_nopriv_category_roundup_userdata', 'send_data_category_roundup_userdata');
function send_data_category_roundup_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_money_gainerslosers_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_money_gainerslosers_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}

add_action('wp_ajax_gainerslosers_userdata', 'send_data_gainerslosers_userdata');
add_action('wp_ajax_nopriv_gainerslosers_userdata', 'send_data_gainerslosers_userdata');
function send_data_gainerslosers_userdata()
{
	$login = get_option('moneymade_login', '');
	$password = base64_decode(get_option('moneymade_password', ''));
	if (!$login || !$password) api_money_gainerslosers_return(['status' => 0, 'message' => 'Please,input login and password', 'user_data' => '', 'prepare_data' => '']);
	$prepare_output = [
		"AuthFlow" => "USER_PASSWORD_AUTH",
		"AuthParameters" => [
			"PASSWORD" => $password,
			"USERNAME" => $login
		],
		"ClientId" => "6hke5u0vefacct55eocidcngfr"
	];
	api_money_gainerslosers_return(['status' => 1, 'message' => 'ok', 'user_data' => ['login' => $login, 'password' => $password], 'prepare_data' => $prepare_output]);
}
