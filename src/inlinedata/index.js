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
//window.inlinedata_step_domains=0;

registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	attributes: {

		auth_result:{
			type: 'string',
			default: ''
		},
		inlinedata_source_arr:{
			type: 'array',
			default: '',//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]https://prnt.sc/Anx5Z0SBXUFW
		},
		inlinedata_source: {
			type: 'string',
			default: ''
		},
		
		inlinedata_source_code: {
			type: 'string',
		    default:'<span id="inline-data-7a9c67ec-66bc-46f7-ae47-a60d48ebf35e" class="money-made-embed" data-name="Inline Data" data-width="84" data-height="0" data-embed-widget="inline-data" data-params="datapoint=ytd-return&amp;fontSize=16" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="inlineData" style="display:inline-block;vertical-align:middle"></span>'
		},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><span id="inline-data-7a9c67ec-66bc-46f7-ae47-a60d48ebf35e" class="money-made-embed" data-name="Inline Data" data-width="84" data-height="0" data-embed-widget="inline-data" data-params="datapoint=ytd-return&amp;fontSize=16" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="inlineData" style="display:inline-block;vertical-align:middle"></span></body></html>'
		},
		inlinedata_data_point:{
			type: 'string',
			default: 'ytd-return'
		},
		inlinedata_font_size:{
			type: 'string',
			default: '16'
		},
		inlinedata_ticker:{
			type: 'string',
			default: ''
		},
		
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
