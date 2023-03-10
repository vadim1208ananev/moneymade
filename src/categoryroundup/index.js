/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
//alert(window.category_roundup_step_domains)
/*if(!window.step_domains){
	alert(11111)
}*/
//alert(window.hasOwnProperty(category_roundup_step_domains))
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	attributes: {
		domain: {
			type: 'string',
			default: ''
		},
		domain_arr: {
			type: 'array',
			default: ''
		},
		profile: {
			type: 'string',
			default: ''
		},
		profile_arr: {
			type: 'array',
			default: []
		},
		auth_result:{
			type: 'string',
			default: ''
		},
		category_roundup_source_arr:{
			type: 'array',
			default: ''//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
		},
		category_roundup_source: {
			type: 'string',
			default: ''
		},
		category_roundup_monitization_type: {
			type: 'string',
			default: 3
		},
		category_roundup_source_code: {
			type: 'string',
		//	default: '<div id="ticker-simple-5eca8506-bad8-40a1-a764-82d15c20f8f6" class="money-made-embed" data-name="Simple Ticker" data-width="100%" data-height="0" data-embed-widget="ticker-simple" data-params="monetization=1" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="" data-utm-campaign="tickerSimple" style="display:block"></div>',
		    default:'<div id="category-roundup-7c6008d5-61b1-4b52-9817-a5159291f4c5" class="money-made-embed" data-name="Category Roundup" data-width="100%" data-height="0" data-embed-widget="category-roundup" data-params="monetization=3" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="categoryRoundup" style="display:block"></div>'
		},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="ticker-simple-5eca8506-bad8-40a1-a764-82d15c20f8f6" class="money-made-embed" data-name="Simple Ticker" data-width="100%" data-height="0" data-embed-widget="ticker-simple" data-params="monetization=3" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="tickerSimple" style="display:block"></div></body></html>'
		},
		category_roundup_ticker:{
			type: 'string',
			default: ''
		},
		category_roundup_widget_title:{
			type: 'string',
			default: ''
		},
		arr_tick:{
			type: 'array',
			default: [
			 //    {value:''},
				
			]
		}
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
