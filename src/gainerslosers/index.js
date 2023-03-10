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

//window.gainerslosers_step_domains=0;
/*if(window.step_domains.isset=='undefined'){
	alert(1234);
	/*window.step_domains={
		isset:1,
        message:'',
		data:'',
	};*/
//}

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
		gainerslosers_source_arr:{
			type: 'array',
			default: ''//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
		},
		gainerslosers_source: {
			type: 'string',
			default: ''
		},
		gainerslosers_monitization_type: {
			type: 'string',
			default: 3
		},
		gainerslosers_source_code: {
			type: 'string',
			default: '<div id="gainers-losers-dac76da5-115b-4af6-9123-ab037ed6bf1e" class="money-made-embed" data-name="Crypto/Stock Gainers &amp; Losers" data-width="100%" data-height="0" data-embed-widget="gainers-losers" data-params="monetization=3&amp;type=crypto&amp;limit=4&amp;exchanges=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="gainersLosers" style="display:block"></div>',
			},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="gainers-losers-dac76da5-115b-4af6-9123-ab037ed6bf1e" class="money-made-embed" data-name="Crypto/Stock Gainers &amp; Losers" data-width="100%" data-height="0" data-embed-widget="gainers-losers" data-params="monetization=3&amp;type=crypto&amp;limit=4&amp;exchanges=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="gainersLosers" style="display:block"></div></body></html>'
		},
		gainerslosers_type:{
			type: 'string',
			default: 'crypto'
		},
		gainerslosers_rows:{
			type: 'string',
			default: '4'
		},
		gainerslosers_suggestion_exchanges:{
			type: 'array',
			default: [
				
			]
		},
		gainerslosers_exchanges:{
			type: 'array',
			default: [			
			]
		},
		placeholder_exchange:{
			type: 'string',
			default: 'none'
		},
		//placeholder_exchange

	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
