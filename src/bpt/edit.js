/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataBptWidget, getTickerBySymbol, getAndSetExchanges, getUserData, getToken, getUserDomains, getAssetsTypes, getFundamentals, getCategories, getIndustries, getSectors, getIndexes, getProfiles } from "./api"
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Autocomplete } from '@wordpress/components';
import { FocusableIframe } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { FormTokenField } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __experimentalInputControl as InputControl } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes: { domain, domain_arr, profile, profile_arr, auth_result, bpt_source_arr, bpt_source, bpt_monitization_type, bpt_source_code, html_to_iframe, bpt_title, bpt_asset_type,
		bpt_asset_type_suggest, bpt_fundamental, bpt_fundamental_suggest, bpt_category_suggestion, bpt_category,
		bpt_placeholder_category, bpt_industry_suggestion, bpt_industry, bpt_placeholder_industry, bpt_index_suggestion, bpt_index,
		bpt_placeholder_index, bpt_sector_suggestion, bpt_sector, bpt_placeholder_sector, bpt_supplementary_suggestion,
		bpt_supplementary, bpt_placeholder_supplementary, btn_compare_operator, btn_compare_value, bpt_rows, bpt_sort
	}, setAttributes } = props;

	useEffect(() => {
		if (!window.step_domains) {
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ bpt_source_arr: empty_sources.slice() }) //individ
					setAttributes({ bpt_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert
					setBptSource('', 1)
					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message
					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ bpt_source_arr: empty_sources.slice() }) //individ
						setAttributes({ bpt_source: '' }) //individ		
						setAttributes({ auth_result: res.message }) //alert

						window.existing_sources = empty_sources.slice()
						window.auth_result = res.message
						setBptSource('', 1)

						return;
					}
					let accessToken = res.AuthenticationResult.AccessToken
					getUserDomains(accessToken).then(res => {
						let sources = res.sources;
						let domains = res.domains;
						if (!sources.length || !domains.length) {
							let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
							setAttributes({ bpt_source_arr: empty_sources.slice() }) //individ
							setAttributes({ bpt_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert

							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'
							setBptSource('', 1)
							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ bpt_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ domain_arr: domains.slice() }) ////setdomains
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;
						if (!bpt_source) {
							setBptSource(first_source, 1, first_domain)
						}
						window.existing_sources = existing_sources.slice()
						window.domain_arr = domains
						window.auth_result = 'Authorized'
						window.first_source = first_source
						window.first_domain = first_domain
					})
				})
			}
			)
			window.step_domains = 1
		} else {
			if (!bpt_source_arr && window.existing_sources) {
				setAttributes({ bpt_source_arr: window.existing_sources }) ////individ
				setBptSource('', 1)   ////
			}

			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}

			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!bpt_source && !domain) && (window.first_source && window.first_domain)) {
				setBptSource(window.first_source, 1, window.first_domain)
			}
		}
	})

	function setBptAssetType(type) {
		setAttributes({ bpt_asset_type: type });
		let extra_promises = [getFundamentals(type),
		getCategories(type)
			, getIndustries(type),
		getSectors(type)
		];
		if (type == 'stock') {
			extra_promises.push(getIndexes(type))
		}
		let first_fundamental, first_category
		Promise.all(extra_promises).then(
			(resl) => {
				let fundamental_suggestion_arr = resl[0]
				setAttributes({ bpt_fundamental_suggest: fundamental_suggestion_arr.slice() })
				first_fundamental = fundamental_suggestion_arr.length ? fundamental_suggestion_arr[0].value : '' ///
				setAttributes({ bpt_fundamental: first_fundamental })

				setAttributes({ bpt_supplementary_suggestion: fundamental_suggestion_arr.map(el => el.value) })
				setAttributes({ bpt_placeholder_supplementary: 'find supplementary...' });

				let categories_suggestion_arr = resl[1]
				setAttributes({ bpt_category_suggestion: [...categories_suggestion_arr] })
				first_category = categories_suggestion_arr.length ? [categories_suggestion_arr[0]] : [] //
				if (first_category.length) {
					setAttributes({ bpt_category: first_category });
				} else {
					setAttributes({ bpt_category: [] });
				}
				let industries_suggestion_arr = resl[2]
				setAttributes({ bpt_industry: [] })
				setAttributes({ bpt_index: [] })
				setAttributes({ bpt_sector: [] })
				setAttributes({ bpt_supplementary: [] })
				setAttributes({ bpt_industry_suggestion: [...industries_suggestion_arr] })
				let holder_industry = industries_suggestion_arr.length ? 'find industries ...' : 'none'
				setAttributes({ bpt_placeholder_industry: holder_industry });

				let sectors_suggestion_arr = resl[3]
				setAttributes({ bpt_sector_suggestion: [...sectors_suggestion_arr] })
				let holder_sector = sectors_suggestion_arr.length ? 'find sectors ...' : 'none'
				setAttributes({ bpt_placeholder_sector: holder_sector });

				if ((resl[4])) {

					let indexes_suggestion_arr = resl[4]
					//bpt_index_suggestion

					setAttributes({ bpt_index_suggestion: [...indexes_suggestion_arr] })
					let holder_index = indexes_suggestion_arr.length ? 'find index ...' : 'none'
					setAttributes({ bpt_placeholder_index: holder_index });
				} else {
					setAttributes({ bpt_index_suggestion: [] })
					let holder_index = 'none'
					setAttributes({ bpt_placeholder_index: holder_index });
				}
				let send_data = {
					bpt_source: bpt_source,
					bpt_monitization_type: bpt_monitization_type,
					bpt_title: bpt_title,
					bpt_asset_type: type,
					bpt_fundamental: first_fundamental,
					bpt_category: first_category.join(','),

					bpt_industry: [].join(','),
					bpt_index: [].join(','),
					bpt_sector: [].join(','),

					bpt_supplementary: [].join(','),
					btn_compare_operator: btn_compare_operator,
					btn_compare_value: btn_compare_value,
					bpt_rows: bpt_rows,
					bpt_sort: bpt_sort,
					profile: profile
				}
				return getDataBptWidget(send_data)
			}
		).then(res => {
			let final_code = res.final_code
			let html_to_iframe = res.html_to_iframe
			setAttributes({ bpt_source_code: final_code });
			setAttributes({ html_to_iframe: html_to_iframe })
		})
	}

	function setBptSource(source, first = 0, domain_first = false) {
		setAttributes({ bpt_source: source });

		if (domain_first) {
			setAttributes({ domain: domain_first }); //////////////////////////////
		}

		if (first) {
			let first_asset_type, first_fundamental, first_category, out



			getAssetsTypes().then(
				res => {
					first_asset_type = res[0].value //
					setAttributes({ bpt_asset_type: first_asset_type })
					setAttributes({ bpt_asset_type_suggest: res.slice() })
					let extra_promises = [getFundamentals(first_asset_type),
					getCategories(first_asset_type)
						, getIndustries(first_asset_type),
					getSectors(first_asset_type)
					];
					extra_promises.push(getProfiles(domain_first))  /////////////////

					if (first_asset_type == 'stock') {
						extra_promises.push(getIndexes(first_asset_type))
					}


					return Promise.all(extra_promises)
				}
			).then(
				res => {
					let fundamental_suggestion_arr = res[0]
					setAttributes({ bpt_fundamental_suggest: fundamental_suggestion_arr.slice() })
					first_fundamental = fundamental_suggestion_arr.length ? fundamental_suggestion_arr[0].value : '' ///
					setAttributes({ bpt_fundamental: first_fundamental })

					setAttributes({ bpt_supplementary_suggestion: fundamental_suggestion_arr.map(el => el.value) })
					setAttributes({ bpt_placeholder_supplementary: 'find supplementary...' });

					let categories_suggestion_arr = res[1]
					setAttributes({ bpt_category_suggestion: [...categories_suggestion_arr] })
					first_category = categories_suggestion_arr.length ? [categories_suggestion_arr[0]] : [] //
					if (first_category.length) {
						setAttributes({ bpt_category: first_category });
					}

					let industries_suggestion_arr = res[2]
					setAttributes({ bpt_industry_suggestion: [...industries_suggestion_arr] })
					let holder_industry = industries_suggestion_arr.length ? 'find industries ...' : 'none'
					setAttributes({ bpt_placeholder_industry: holder_industry });

					let sectors_suggestion_arr = res[3]
					setAttributes({ bpt_sector_suggestion: [...sectors_suggestion_arr] })
					let holder_sector = sectors_suggestion_arr.length ? 'find sectors ...' : 'none'
					setAttributes({ bpt_placeholder_sector: holder_sector });

					let domain_suggestion = res[4]////
					if (domain_first) {
						setAttributes({ profile: domain_suggestion.first_profile });   /////////////////
						setAttributes({ profile_arr: domain_suggestion.profile_arr });  /////////////
					}



					//console.log(res)

					if ((res[5])) {
						let indexes_suggestion_arr = res[5]
						//bpt_index_suggestion
						setAttributes({ bpt_index_suggestion: [...indexes_suggestion_arr] })
						let holder_index = indexes_suggestion_arr.length ? 'find index ...' : 'none'
						setAttributes({ bpt_placeholder_index: holder_index });
					} else {
						setAttributes({ bpt_index_suggestion: [] })
						let holder_index = 'none'
						setAttributes({ bpt_placeholder_index: holder_index });
					}



					let send_data = {
						bpt_source: source,
						bpt_monitization_type: bpt_monitization_type,
						bpt_title: bpt_title,
						bpt_asset_type: first_asset_type,
						bpt_fundamental: first_fundamental,
						bpt_category: first_category.join(','),

						bpt_industry: bpt_industry.join(','),
						bpt_index: bpt_index.join(','),
						bpt_sector: bpt_sector.join(','),

						bpt_supplementary: bpt_supplementary.join(','),
						btn_compare_operator: btn_compare_operator,
						btn_compare_value: btn_compare_value,
						bpt_rows: bpt_rows,
						bpt_sort: bpt_sort
					}

					///		if (domain_first) {
					send_data.profile = domain_suggestion.first_profile  ///////////////
					///		} else {
					//	send_data.profile = profile
					///		}

					return getDataBptWidget(send_data)
				}
			).then(res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			})
		} else {
			let send_data = {
				bpt_source: source,
				bpt_monitization_type: bpt_monitization_type,
				bpt_title: bpt_title,
				bpt_asset_type: bpt_asset_type,
				bpt_fundamental: bpt_fundamental,
				bpt_category: bpt_category.join(','),

				bpt_industry: bpt_industry.join(','),
				bpt_index: bpt_index.join(','),
				bpt_sector: bpt_sector.join(','),

				bpt_supplementary: bpt_supplementary.join(','),
				btn_compare_operator: btn_compare_operator,
				btn_compare_value: btn_compare_value,
				bpt_rows: bpt_rows,
				bpt_sort: bpt_sort,
				profile: profile
			}
			getDataBptWidget(send_data).then(
				res => {
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ bpt_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}
	function setBptMonitizationType(type) {
		setAttributes({ bpt_monitization_type: type });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}




	function setDomain(domain_first) {
		setAttributes({ domain: domain_first });
		getProfiles(domain_first).then(
			res => {
				setAttributes({ profile: res.first_profile });
				setAttributes({ profile_arr: res.profile_arr });
				let send_data = {
					bpt_source: bpt_source,
					bpt_monitization_type: bpt_monitization_type,
					bpt_title: bpt_title,
					bpt_asset_type: bpt_asset_type,
					bpt_fundamental: bpt_fundamental,
					bpt_category: bpt_category.join(','),
					bpt_industry: bpt_industry.join(','),
					bpt_index: bpt_index.join(','),
					bpt_sector: bpt_sector.join(','),
					bpt_supplementary: bpt_supplementary.join(','),
					btn_compare_operator: btn_compare_operator,
					btn_compare_value: btn_compare_value,
					bpt_rows: bpt_rows,
					bpt_sort: bpt_sort,
					profile: res.first_profile
				}
				return getDataBptWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: item
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setTitle(title) {
		setAttributes({ bpt_title: title });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setBptSourceCode(code) { //extra capobility
		setAttributes({ bpt_source_code: code });
	}
	function setBptFundamental(type) {
		setAttributes({ bpt_fundamental: type });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: type,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setCategories(cats) {
		setAttributes({ bpt_category: [...cats] });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: cats.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setIndustry(industry) {
		setAttributes({ bpt_industry: [...industry] });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setIndex(indexs) {
		setAttributes({ bpt_index: [...indexs] });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: indexs.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)



	}
	function setSector(sectors) {
		setAttributes({ bpt_sector: [...sectors] });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: sectors.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)



	}
	function setBptCompareOperator(operator) {
		setAttributes({ btn_compare_operator: operator });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setSupplementary(supl) {
		setAttributes({ bpt_supplementary: [...supl] });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: supl.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setBptRows(row) {
		setAttributes({ bpt_rows: row });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: row,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setBptSort(sort) {
		setAttributes({ bpt_sort: sort });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: btn_compare_value,
			bpt_rows: bpt_rows,
			bpt_sort: sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setCompareValue(value) {
		setAttributes({ btn_compare_value: value });
		let send_data = {
			bpt_source: bpt_source,
			bpt_monitization_type: bpt_monitization_type,
			bpt_title: bpt_title,
			bpt_asset_type: bpt_asset_type,
			bpt_fundamental: bpt_fundamental,
			bpt_category: bpt_category.join(','),
			bpt_industry: bpt_industry.join(','),
			bpt_index: bpt_index.join(','),
			bpt_sector: bpt_sector.join(','),
			bpt_supplementary: bpt_supplementary.join(','),
			btn_compare_operator: btn_compare_operator,
			btn_compare_value: value,
			bpt_rows: bpt_rows,
			bpt_sort: bpt_sort,
			profile: profile
		}
		getDataBptWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ bpt_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}

	return (
		<div {...useBlockProps()}>
			<div class="block-widget">
				<div class="block-widget-title">Best Performing Table Widget</div>
				<div class="block-widget-description">View of the best performing ETFs and mutual funds per selected ratio</div>

				<div class="block-widget-body">
					<div class="block-widget-body-elem">
						<div class="title-auth-result">{auth_result}</div>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Select Domain:')}
							value={domain}
							onChange={(d) => { setDomain(d) }}
							options={domain_arr}
						/>
					</div>


					{profile_arr && profile ?
						<div class="block-widget-body-elem">
							<SelectControl
								label={__('Select Profile:')}
								value={profile}
								onChange={(item) => { setProfile(item) }}
								options={profile_arr}
							/>
						</div>
						:
						<div class="block-widget-body-elem moneymade_btn_block">
							<div class="btn_title_moneymade">Select Profile</div>
							<div class="btn_btn_moneymade">
								<a target="_blank" class="btn_monymade" href="https://publisher.moneymade.io/profile/">Create Profile</a>
							</div>
						</div>
					}
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Select Source:')}
							value={bpt_source}
							onChange={(source) => { setBptSource(source) }}
							options={bpt_source_arr}
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Monatization type:')}
							value={bpt_monitization_type}
							onChange={(type) => { setBptMonitizationType(type) }}
							options={[
								{ value: null, label: 'Select Monatization type', disabled: true },
								{ value: 1, label: 'Buy with' },
								{ value: 2, label: 'Graph' },
								{ value: 3, label: 'MoneyBar' },
							]}
						/>
					</div>
					<div class="block-widget-body-elem">
						<InputControl
							value={bpt_title}
							label='Customize Title'
							onChange={(title) => setTitle(title)}
						/>
					</div>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Asset type:')}
							value={bpt_asset_type}
							onChange={(type) => { setBptAssetType(type) }}
							options={bpt_asset_type_suggest}
						/>
					</div>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Fundamental:')}
							value={bpt_fundamental}
							onChange={(type) => { setBptFundamental(type) }}
							options={bpt_fundamental_suggest}
						/>
					</div>



					<div class="block-widget-body-elem">
						<FormTokenField
							label="Categories"
							value={bpt_category}
							placeholder={bpt_placeholder_category}
							suggestions={bpt_category_suggestion}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setCategories(tokens) }}

						/>
					</div>

					<div class="block-widget-body-elem">
						<FormTokenField
							label="Industry"
							value={bpt_industry}
							placeholder={bpt_placeholder_industry}
							suggestions={bpt_industry_suggestion}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setIndustry(tokens) }}

						/>
					</div>
					<div class="block-widget-body-elem">
						<FormTokenField
							label="Index"
							value={bpt_index}
							placeholder={bpt_placeholder_index}
							suggestions={bpt_index_suggestion}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setIndex(tokens) }}

						/>
					</div>
					<div class="block-widget-body-elem">
						<FormTokenField
							label="Sector"
							value={bpt_sector}
							placeholder={bpt_placeholder_sector}
							suggestions={bpt_sector_suggestion}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setSector(tokens) }}

						/>
					</div>

					<div class="block-widget-body-elem">
						<FormTokenField
							label="Supplementary Info"
							value={bpt_supplementary}
							placeholder={bpt_placeholder_supplementary}
							suggestions={bpt_supplementary_suggestion}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setSupplementary(tokens) }}

						/>
					</div>


					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Compare Operator:')}
							value={btn_compare_operator}
							onChange={(type) => { setBptCompareOperator(type) }}
							options={[
								{ value: null, label: 'Select Compare Operator', disabled: true },
								{ value: 'none', label: 'None' },
								{ value: '%3E', label: '>' },
								{ value: '%3D', label: '=' },
								{ value: '%3C', label: '<' },
							]}
						/>
					</div>
					<div class="block-widget-body-elem">
						<NumberControl
							isShiftStepEnabled={true}
							onChange={(value) => setCompareValue(value)}
							shiftStep={1}
							value={btn_compare_value}
							label="Compare Value"
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Rows:')}
							value={bpt_rows}
							onChange={(type) => { setBptRows(type) }}
							options={[
								{ value: null, label: 'Select row', disabled: true },
								{ value: '1', label: '1' },
								{ value: '2', label: '2' },
								{ value: '3', label: '3' },
								{ value: '4', label: '4' },
								{ value: '5', label: '5' },
								{ value: '6', label: '6' },
								{ value: '7', label: '7' },
								{ value: '8', label: '8' },
								{ value: '9', label: '9' },
								{ value: '10', label: '10' },
								{ value: '11', label: '11' },
								{ value: '12', label: '12' },
								{ value: '13', label: '13' },
								{ value: '14', label: '14' },
								{ value: '15', label: '15' },
								{ value: '16', label: '16' },
								{ value: '17', label: '17' },
								{ value: '18', label: '18' },
								{ value: '19', label: '19' },
								{ value: '20', label: '20' },
								{ value: '21', label: '21' },
								{ value: '22', label: '22' },
								{ value: '23', label: '23' },
								{ value: '24', label: '24' },
								{ value: '25', label: '25' },
							]}
						/>
					</div>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Sort:')}
							value={bpt_sort}
							onChange={(type) => { setBptSort(type) }}
							options={[
								{ value: null, label: 'Select Sort', disabled: true },
								{ value: 'DESC', label: 'Descending order' },
								{ value: 'ASC', label: 'Ascending order' },
							]}
						/>
					</div>


					<hr></hr>
					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={bpt_source_code}
							onChange={(code) => setBptSourceCode(code)}
							disabled="disabled"
						/>
					</div>
					<div class="block-widget-body-elem">
						<FocusableIframe
							width="100%"
							height="400px"
							lable="Preview"
							srcdoc={html_to_iframe}
							onFocus={() => console.log('iframe is focused')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
