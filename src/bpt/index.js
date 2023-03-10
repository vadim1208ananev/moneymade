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
		bpt_source_arr:{
			type: 'array',
			default: ''//[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
		},
		bpt_source: {
			type: 'string',
			default: ''
		},
		bpt_monitization_type: {
			type: 'string',
			default: 3
		},
		bpt_source_code: {
			type: 'string',
				default:'<div id="best-performing-table-ebb50036-b77c-452d-8ca5-7d3f2abcac51" class="money-made-embed" data-name="Best Performing Table" data-width="100%" data-height="0" data-embed-widget="best-performing-table" data-params="monetization=3&amp;asset=&amp;performanceClassification=allTimeReturn&amp;category=none&amp;industry=none&amp;index=none&amp;sector=none&amp;extraColumns=none&amp;perfomanceClassificationCompareOperator=none&amp;perfomanceClassificationCompareValue=1000&amp;limit=4&amp;performanceClassificationOrder=DESC" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="bestPerformingTable" style="display:block"></div>'
		},
		html_to_iframe:{
			type: 'string',
			default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="best-performing-table-ebb50036-b77c-452d-8ca5-7d3f2abcac51" class="money-made-embed" data-name="Best Performing Table" data-width="100%" data-height="0" data-embed-widget="best-performing-table" data-params="monetization=3&amp;title=Top+Performing&amp;asset=&amp;performanceClassification=allTimeReturn&amp;category=none&amp;industry=none&amp;index=none&amp;sector=none&amp;extraColumns=none&amp;perfomanceClassificationCompareOperator=none&amp;perfomanceClassificationCompareValue=1000&amp;limit=4&amp;performanceClassificationOrder=DESC" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="bestPerformingTable" style="display:block"></div></body></html>'
		},

        bpt_title:{
			type: 'string',
			default: ''
		},

		///
		bpt_asset_type:{
			type: 'string',
			default: ''
		},
		bpt_asset_type_suggest:{
			type: 'array',
			default: [

			]
		},
        ////


		/////
		bpt_fundamental:{
			type:'string',
			default:''
		},
		bpt_fundamental_suggest:{
			type:'array',
			default:[]
		},
		/////

        ////
		bpt_category_suggestion:{
			type: 'array',
			default: [
				
			]
		},
		bpt_category:{
			type: 'array',
			default: [			
			]
		},
		bpt_placeholder_category:{
			type: 'string',
			default: 'none'
		},
		////

		 ////
		 bpt_industry_suggestion:{
			type: 'array',
			default: [
				
			]
		},
		bpt_industry:{
			type: 'array',
			default: [			
			]
		},
		bpt_placeholder_industry:{
			type: 'string',
			default: 'none'
		},
		////

		////
		bpt_index_suggestion:{
			type: 'array',
			default: [
				
			]
		},
		bpt_index:{
			type: 'array',
			default: [			
			]
		},
		bpt_placeholder_index:{
			type: 'string',
			default: 'none'
		},
		////

		////
		bpt_sector_suggestion:{
			type: 'array',
			default: [
				
			]
		},
		bpt_sector:{
			type: 'array',
			default: [			
			]
		},
		bpt_placeholder_sector:{
			type: 'string',
			default: 'none'
		},
		////

		////
		bpt_supplementary_suggestion:{
			type: 'array',
			default: [
				
			]
		},
		bpt_supplementary:{
			type: 'array',
			default: [			
			]
		},
		bpt_placeholder_supplementary:{
			type: 'string',
			default: 'none'
		},
		////

		/////
		btn_compare_operator:{
			type:'string',
			default:'none'
		},	
		/////
		/////
		btn_compare_value:{
			type:'string',
			default:'1000'
		},	
		/////
		bpt_rows:{
			type: 'string',
			default: '4'
		},
		bpt_sort:{
			type: 'string',
			default: 'ASC'
		},






		

	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
