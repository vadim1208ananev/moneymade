/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataCryptopageWidget, getTickerBySymbol, getUserData, getToken, getUserDomains, getProfiles } from "./api"
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
//import { useBlockProps } from '@wordpress/block-editor';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import { FocusableIframe } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
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
	const { attributes: { domain, domain_arr, profile, profile_arr, cryptopage_source, auth_result, cryptopage_source_arr, cryptopage_monitization_type, cryptopage_source_code, cryptopage_ticker,
		html_to_iframe, cryptopage_description
	}, setAttributes } = props;
	useEffect(() => {
		if (!window.step_domains) {
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ cryptopage_source_arr: empty_sources.slice() }) //individ
					setAttributes({ cryptopage_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert	

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ cryptopage_source_arr: empty_sources.slice() }) //individ
						setAttributes({ cryptopage_source: '' }) //individ		
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
							setAttributes({ cryptopage_source_arr: empty_sources.slice() }) //individ
							setAttributes({ cryptopage_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert

							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'

							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ cryptopage_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ domain_arr: domains.slice() }) ////setdomains
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;

						if (!cryptopage_source) {
							setCryptopageSource(first_source, first_domain)
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
			if (!cryptopage_source_arr && window.existing_sources) {
				setAttributes({ cryptopage_source_arr: window.existing_sources }) ////individ
			}
			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!cryptopage_source && !domain) && (window.first_source && window.first_domain)) {
				setCryptopageSource(window.first_source, window.first_domain)
			}
		}
	})



	function setCryptopageSource(source, domain_first = false) {
		setAttributes({ cryptopage_source: source });
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
					cryptopage_source: source,
					cryptopage_monitization_type: cryptopage_monitization_type,
					cryptopage_description: cryptopage_description,
					cryptopage_ticker: regSticker(cryptopage_ticker),
				}
				if (domain_first) {
					send_data.profile = res.first_profile
				} else {
					send_data.profile = profile
				}
				return getDataCryptopageWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
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
					cryptopage_source: cryptopage_source,
					cryptopage_monitization_type: cryptopage_monitization_type,
					cryptopage_description: cryptopage_description,
					cryptopage_ticker: regSticker(cryptopage_ticker),
					profile: res.first_profile
				}
				return getDataCryptopageWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			cryptopage_source: cryptopage_source,
			cryptopage_monitization_type: cryptopage_monitization_type,
			cryptopage_description: cryptopage_description,
			cryptopage_ticker: regSticker(cryptopage_ticker),
			profile: item
		}
		getDataCryptopageWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}




	function setCryptopageMonitizationType(type) {
		setAttributes({ cryptopage_monitization_type: type });
		let send_data = {
			cryptopage_source: cryptopage_source,
			cryptopage_monitization_type: type,
			cryptopage_description: cryptopage_description,
			cryptopage_ticker: regSticker(cryptopage_ticker),
			profile: profile
		}
		getDataCryptopageWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setCryptopageSourceCode(code) { //extra capobility
		setAttributes({ cryptopage_source_code: code });
	}
	function regSticker(sticker) {
		if (!sticker) return ''
		let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
		let res_arr = sticker.match(regexp);
		return res_arr[1] ? res_arr[1] : '';
	}
	function setDescriptions(title) {
		setAttributes({ cryptopage_description: title });
		let send_data = {
			cryptopage_description: title,
			cryptopage_source: cryptopage_source,
			cryptopage_monitization_type: cryptopage_monitization_type,
			cryptopage_ticker: regSticker(cryptopage_ticker),
			profile: profile
		}
		getDataCryptopageWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setTicker(ticker) {
		if (ticker.includes('abbr') && regSticker(ticker)) {
			setAttributes({ cryptopage_ticker: ticker });
			let send_data = {
				cryptopage_description: cryptopage_description,
				cryptopage_source: cryptopage_source,
				cryptopage_monitization_type: cryptopage_monitization_type,
				cryptopage_ticker: regSticker(ticker),
				profile: profile
			}
			getDataCryptopageWidget(send_data).then(
				res => {
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ cryptopage_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}
	function delTicker() {
		setAttributes({ cryptopage_ticker: '' });
		let send_data = {
			cryptopage_description: cryptopage_description,
			cryptopage_source: cryptopage_source,
			cryptopage_monitization_type: cryptopage_monitization_type,
			cryptopage_ticker: '',
			profile: profile
		}
		getDataCryptopageWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ cryptopage_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	let autoConfigs = [
		{
			name: "Autocomplete",
			triggerPrefix: "/",
			options(search) {
				let payload = '';
				if (search) {
					payload = 'search=' + encodeURIComponent(search);
				}
				return getTickerBySymbol(payload)
			},
			getOptionLabel: option => (
				<span>
					<span className="icon" >{option.symbol}</span> {option.name}
				</span>
			),
			// Declares that options should be matched by their name or value
			getOptionKeywords: option => [option.name, option.symbol],
			getOptionCompletion: option => (
				<abbr title={option.symbolId}>{option.symbol}</abbr>
			),
		}
	];
	return (
		<div {...useBlockProps()}>
			<div class="block-widget">
				<div class="block-widget-title">Crypto page Widget</div>
				<div class="block-widget-description">Page with the overall statistic for crypto coin</div>


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
							value={cryptopage_source}
							onChange={(source) => { setCryptopageSource(source) }}
							options={cryptopage_source_arr}
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Monatization type:')}
							value={cryptopage_monitization_type}
							onChange={(type) => { setCryptopageMonitizationType(type) }}
							options={[
								{ value: null, label: 'Select Monatization type', disabled: true },
								{ value: 1, label: 'Buy with' },
								{ value: 2, label: 'Graph' },
								{ value: 3, label: 'MoneyBar' },
							]}
						/>
					</div>

					<div class="block-widget-body-elem">
						<TextareaControl
							label="Customize Description"
							value={cryptopage_description}
							onChange={(value) => setDescriptions(value)}
						/>
					</div>
					<hr></hr>

					<hr></hr>
					<div class="block-widget-body-elem">
						<div class="blockrb">
							<div>
								<RichText
									autocompleters={autoConfigs}
									value={cryptopage_ticker}
									label="Ticker"
									aria-autocomplete="list"
									onChange={(ticker) => setTicker(ticker)}
									placeholder={__(`Click ${autoConfigs[0].triggerPrefix} to find Ticker`)}
								/>
							</div>
							<div>
								<Button
									onClick={() => delTicker()}
									variant="secondary">
									Delete ticker</Button>
							</div>
						</div>
					</div>
					<hr></hr>

					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={cryptopage_source_code}
							onChange={(code) => setCryptopageSourceCode(code)}
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
