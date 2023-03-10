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
		industry:{
			type: 'string',
			default: 'Real+Estate'
		},
		industry_source_arr:{
			type: 'array',
			default: ''//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
		},
		industry_title: {
			type: 'string',
			default: ''
		},
		industry_source: {
			type: 'string',
			default: ''
		},	
		industry_source_code: {
			type: 'string',
    		default:'<div id="horizontal-asset-8dd34664-cf18-45b5-9a68-5a9fe7732a7a" class="money-made-embed" data-name="Industry specific" data-width="100%" data-height="0" data-embed-widget="horizontal-asset" data-params="industry=Real+Estate" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="horizontalAsset" style="display:block"></div>'
	   
		},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="horizontal-asset-8dd34664-cf18-45b5-9a68-5a9fe7732a7a" class="money-made-embed" data-name="Industry specific" data-width="100%" data-height="0" data-embed-widget="horizontal-asset" data-params="industry=Real+Estate" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="horizontalAsset" style="display:block"></div></body></html>'
		},
		
		
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
