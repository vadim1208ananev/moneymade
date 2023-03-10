/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataGainersLosersWidget, getTickerBySymbol, getAndSetExchanges, getUserData, getToken, getUserDomains, getProfiles } from "./api"
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
//import { useBlockProps } from '@wordpress/block-editor';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Autocomplete } from '@wordpress/components';
import { FocusableIframe } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { FormTokenField } from '@wordpress/components';
import { useEffect } from '@wordpress/element';


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
	const { attributes: { domain, domain_arr, profile, profile_arr, gainerslosers_source_arr, auth_result, gainerslosers_source, placeholder_exchange, gainerslosers_monitization_type, gainerslosers_source_code, html_to_iframe, gainerslosers_type, gainerslosers_rows, gainerslosers_suggestion_exchanges, gainerslosers_exchanges
	}, setAttributes } = props;

	useEffect(() => {
		if (!window.step_domains) {
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ gainerslosers_source_arr: empty_sources.slice() }) //individ
					setAttributes({ gainerslosers_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ gainerslosers_source_arr: empty_sources.slice() }) //individ
						setAttributes({ gainerslosers_source: '' }) //individ		
						setAttributes({ auth_result: res.message }) //alert
						window.existing_sources = empty_sources.slice()
						window.auth_result = res.message
						return;
					}
					let accessToken = res.AuthenticationResult.AccessToken
					getUserDomains(accessToken).then(res => {
						let sources = res.sources;
						let domains = res.domains;
						if (!sources.length || !domains.length) {
							let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
							setAttributes({ gainerslosers_source_arr: empty_sources.slice() }) //individ
							setAttributes({ gainerslosers_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert
							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'
							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ gainerslosers_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ domain_arr: domains.slice() }) ////setdomains
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;
						if (!gainerslosers_source) {
							setGainersLosersSource(first_source, first_domain)
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
			if (!gainerslosers_source_arr && window.existing_sources) {
				setAttributes({ gainerslosers_source_arr: window.existing_sources }) ////individ
			}
			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!gainerslosers_source && !domain) && (window.first_source && window.first_domain)) {
				//		alert(3333)
				setGainersLosersSource(window.first_source, window.first_domain)
			}

		}
	})

	function setGainersLosersSource(source, domain_first = false) {
		setAttributes({ gainerslosers_source: source });
		if (domain_first) {
			setAttributes({ domain: domain_first });
		}

		getProfiles(domain_first).then(
			res => {
				if (domain_first) {
					setAttributes({ profile: res.first_profile });
					setAttributes({ profile_arr: res.profile_arr });
				}
				let send_data = {
					gainerslosers_source: source,
					gainerslosers_monitization_type: gainerslosers_monitization_type,
					gainerslosers_exchanges: gainerslosers_exchanges.join(','),
					gainerslosers_type: gainerslosers_type,
					gainerslosers_rows: gainerslosers_rows
				}
				if (domain_first) {
					send_data.profile = res.first_profile
				} else {
					send_data.profile = profile
				}
				return getDataGainersLosersWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setGainersLosersMonitizationType(type) {
		setAttributes({ gainerslosers_monitization_type: type });
		let send_data = {
			gainerslosers_source: gainerslosers_source,
			gainerslosers_monitization_type: type,
			gainerslosers_exchanges: gainerslosers_exchanges.join(','),
			gainerslosers_type: gainerslosers_type,
			gainerslosers_rows: gainerslosers_rows,
			profile: profile
		}
		getDataGainersLosersWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setGainersLosersType(type) {
		setAttributes({ gainerslosers_type: type });//gainerslosers_exchanges
		setAttributes({ gainerslosers_exchanges: [] });
		getAndSetExchanges(type).then(
			(res) => {
				let out = []
				let holder = 'none'
				if (res.status != '404') {
					out = res
					holder = 'find exchanges...'
				}
				let sug_arr = out.map(el => el.exchange)
				setAttributes({ gainerslosers_suggestion_exchanges: [...sug_arr] });
				setAttributes({ placeholder_exchange: holder });

				let send_data = {
					gainerslosers_source: gainerslosers_source,
					gainerslosers_monitization_type: gainerslosers_monitization_type,
					gainerslosers_exchanges: gainerslosers_exchanges.join(','),
					gainerslosers_type: type,
					gainerslosers_rows: gainerslosers_rows,
					profile: profile
				}
				getDataGainersLosersWidget(send_data).then(
					res => {
						let final_code = res.final_code
						let html_to_iframe = res.html_to_iframe
						setAttributes({ gainerslosers_source_code: final_code });
						setAttributes({ html_to_iframe: html_to_iframe })
					}
				)
			}
		)
	}
	function setGainersLosersSourceCode(code) { //extra capobility
		setAttributes({ gainerslosers_source_code: code });
	}
	function setGainersLosersRows(row) {
		setAttributes({ gainerslosers_rows: row });

		let send_data = {
			gainerslosers_source: gainerslosers_source,
			gainerslosers_monitization_type: gainerslosers_monitization_type,
			gainerslosers_exchanges: gainerslosers_exchanges.join(','),
			gainerslosers_type: gainerslosers_type,
			gainerslosers_rows: row,
			profile: profile
		}
		getDataGainersLosersWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setExchanges(tokens) {
		setAttributes({ gainerslosers_exchanges: [...tokens] });
		let send_data = {
			gainerslosers_source: gainerslosers_source,
			gainerslosers_monitization_type: gainerslosers_monitization_type,
			gainerslosers_exchanges: tokens.join(','),
			gainerslosers_type: gainerslosers_type,
			gainerslosers_rows: gainerslosers_rows,
			profile: profile
		}
		getDataGainersLosersWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
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
					gainerslosers_source: gainerslosers_source,
					gainerslosers_monitization_type: gainerslosers_monitization_type,
					gainerslosers_exchanges: gainerslosers_exchanges.join(','),
					gainerslosers_type: gainerslosers_type,
					gainerslosers_rows: gainerslosers_rows,
					profile: res.first_profile
				}
				return getDataGainersLosersWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			gainerslosers_source: gainerslosers_source,
			gainerslosers_monitization_type: gainerslosers_monitization_type,
			gainerslosers_exchanges: gainerslosers_exchanges.join(','),
			gainerslosers_type: gainerslosers_type,
			gainerslosers_rows: gainerslosers_rows,
			profile: item
		}
		getDataGainersLosersWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ gainerslosers_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	return (
		<div {...useBlockProps()}>
			<div class="block-widget">
				<div class="block-widget-title">Crypto/Stock Gainers & Losers Widget</div>
				<div class="block-widget-description">A comparison view of the best and worst performing Crypto/Stock assets over time</div>

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
							value={gainerslosers_source}
							onChange={(source) => { setGainersLosersSource(source) }}
							options={gainerslosers_source_arr}
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Monatization type:')}
							value={gainerslosers_monitization_type}
							onChange={(type) => { setGainersLosersMonitizationType(type) }}
							options={[
								{ value: null, label: 'Select Monatization type', disabled: true },
								{ value: 1, label: 'Buy with' },
								{ value: 2, label: 'Graph' },
								{ value: 3, label: 'MoneyBar' },
							]}
						/>

					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Type:')}
							value={gainerslosers_type}
							onChange={(type) => { setGainersLosersType(type) }}
							options={[
								{ value: null, label: 'Select type', disabled: true },
								{ value: 'crypto', label: 'Crypto' },
								{ value: 'stocks', label: 'Stock' },
							]}
						/>
					</div>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Rows:')}
							value={gainerslosers_rows}
							onChange={(row) => { setGainersLosersRows(row) }}
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
							]}
						/>
					</div>
					<div class="block-widget-body-elem">
						<FormTokenField
							label="Exchanges"
							value={gainerslosers_exchanges}
							placeholder={placeholder_exchange}
							suggestions={gainerslosers_suggestion_exchanges}
							__experimentalExpandOnFocus={true}
							onInputChange={(tokens) => { console.log('onInputChang', tokens) }}
							onChange={(tokens) => { setExchanges(tokens) }}

						/>
					</div>




					<hr></hr>

					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={gainerslosers_source_code}
							onChange={(code) => setGainersLosersSourceCode(code)}
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
