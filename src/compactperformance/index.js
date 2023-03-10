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

		symbol_search:{
			type: 'boolean',
			default: false
		},
		auth_result:{
			type: 'string',
			default: ''
		},
		compactperformance_source_arr:{
			type: 'array',
			default: ''//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
		},
		compactperformance_source: {
			type: 'string',
			default: ''
		},
		compactperformance_monitization_type: {
			type: 'string',
			default: 3
		},
		compactperformance_source_code: {
			type: 'string',
		  	default:'<div id="compact-performance-c3516d4b-1a15-4bca-a1da-f7ecd4a62667" class="money-made-embed" data-name="Compact Performance" data-width="100%" data-height="0" data-embed-widget="compact-performance" data-params="monetization=3" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="compactPerformance" style="display:block"></div>'
	
		},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="compact-performance-c3516d4b-1a15-4bca-a1da-f7ecd4a62667" class="money-made-embed" data-name="Compact Performance" data-width="100%" data-height="0" data-embed-widget="compact-performance" data-params="monetization=3" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="compactPerformance" style="display:block"></div></body></html>'
		},
		compactperformance_ticker:{
			type: 'string',
			default: ''
		},
		compactperformance_comparasion_ticker:{
			type: 'string',
			default: ''
		}
		
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
