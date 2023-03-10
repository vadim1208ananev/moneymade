/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataComparasiontableWidget, getTickerBySymbol, getUserData, getToken, getUserDomains, getProfiles } from "./api"
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
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { FormTokenField } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { componentDidMount } from '@wordpress/element';







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
	const { attributes: { domain, domain_arr, profile, profile_arr, comparasiontable_source, auth_result, comparasiontable_source_arr, comparasiontable_monitization_type, comparasiontable_source_code, comparasiontable_ticker1,
		comparasiontable_ticker2, comparasiontable_timeframe, html_to_iframe
	}, setAttributes } = props;


	useEffect(() => {
		if (!window.step_domains) {
			console.log('request user data comparasiontable')
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ comparasiontable_source_arr: empty_sources.slice() }) //individ
					setAttributes({ comparasiontable_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert	

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ comparasiontable_source_arr: empty_sources.slice() }) //individ
						setAttributes({ comparasiontable_source: '' }) //individ		
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
							setAttributes({ comparasiontable_source_arr: empty_sources.slice() }) //individ
							setAttributes({ comparasiontable_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert
							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'
							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ comparasiontable_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ domain_arr: domains.slice() }) ////setdomains
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;
						if (!comparasiontable_source) {
							setComparasiontableSource(first_source, first_domain)
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
			if (!comparasiontable_source_arr && window.existing_sources) {
				setAttributes({ comparasiontable_source_arr: window.existing_sources }) ////individ
			}
			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!comparasiontable_source && !domain) && (window.first_source && window.first_domain)) {
				setComparasiontableSource(window.first_source, window.first_domain)
			}
		}
	})



	function setComparasiontableSource(source, domain_first = false) {
		setAttributes({ comparasiontable_source: source });
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
					comparasiontable_source: source,
					comparasiontable_monitization_type: comparasiontable_monitization_type,
					comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
					comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
					comparasiontable_timeframe: comparasiontable_timeframe,
				}
				if (domain_first) {
					send_data.profile = res.first_profile
				} else {
					send_data.profile = profile
				}
				return getDataComparasiontableWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setComparasiontableMonitizationType(type) {
		setAttributes({ comparasiontable_monitization_type: type });
		let send_data = {
			comparasiontable_monitization_type: type,
			comparasiontable_source: comparasiontable_source,
			comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
			comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
			comparasiontable_timeframe: comparasiontable_timeframe,
			profile: profile
		}
		getDataComparasiontableWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}

	function setComparasiontableTymeframe(frame) {
		setAttributes({ comparasiontable_timeframe: frame });
		let send_data = {
			comparasiontable_monitization_type: comparasiontable_monitization_type,
			comparasiontable_source: comparasiontable_source,
			comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
			comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
			comparasiontable_timeframe: frame,
			profile: profile
		}
		getDataComparasiontableWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function setComparasiontableSourceCode(code) { //extra capobility
		setAttributes({ comparasiontable_source_code: code });
	}
	function regSticker(sticker) {
		console.log('sti', sticker)
		if (!sticker) return ''
		let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
		let res_arr = sticker.match(regexp);
		return res_arr[1] ? res_arr[1] : '';
	}
	function setTicker1(ticker) {
		if (ticker.includes('abbr') && regSticker(ticker)) {

			setAttributes({ comparasiontable_ticker1: ticker });
			let send_data = {
				comparasiontable_monitization_type: comparasiontable_monitization_type,
				comparasiontable_source: comparasiontable_source,
				comparasiontable_ticker1: regSticker(ticker),
				comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
				comparasiontable_timeframe: comparasiontable_timeframe,
				profile: profile
			}

			getDataComparasiontableWidget(send_data).then(
				res => {
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ comparasiontable_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}

	function setTicker2(ticker) {
		if (ticker.includes('abbr') && regSticker(ticker)) {
			setAttributes({ comparasiontable_ticker2: ticker });
			let send_data = {
				comparasiontable_monitization_type: comparasiontable_monitization_type,
				comparasiontable_source: comparasiontable_source,
				comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
				comparasiontable_ticker2: regSticker(ticker),
				comparasiontable_timeframe: comparasiontable_timeframe,
				profile: profile
			}
			getDataComparasiontableWidget(send_data).then(
				res => {
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ comparasiontable_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}

	function delTicker1() {
		setAttributes({ comparasiontable_ticker1: '' });
		let send_data = {
			comparasiontable_monitization_type: comparasiontable_monitization_type,
			comparasiontable_source: comparasiontable_source,
			comparasiontable_ticker1: '',
			comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
			comparasiontable_timeframe: comparasiontable_timeframe,
			profile: profile
		}
		console.log('sdata', send_data)
		getDataComparasiontableWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	function delTicker2() {
		setAttributes({ comparasiontable_ticker2: '' });
		let send_data = {
			comparasiontable_monitization_type: comparasiontable_monitization_type,
			comparasiontable_source: comparasiontable_source,
			comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
			comparasiontable_ticker2: '',
			comparasiontable_timeframe: comparasiontable_timeframe,
			profile: profile
		}
		getDataComparasiontableWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
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
					comparasiontable_source: comparasiontable_source,
					comparasiontable_monitization_type: comparasiontable_monitization_type,
					comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
					comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
					comparasiontable_timeframe: comparasiontable_timeframe,
					profile: res.first_profile
				}
				return getDataComparasiontableWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			comparasiontable_source: comparasiontable_source,
			comparasiontable_monitization_type: comparasiontable_monitization_type,
			comparasiontable_ticker1: regSticker(comparasiontable_ticker1),
			comparasiontable_ticker2: regSticker(comparasiontable_ticker2),
			comparasiontable_timeframe: comparasiontable_timeframe,
			profile: item
		}
		getDataComparasiontableWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ comparasiontable_source_code: final_code });
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
				<div class="block-widget-title">Comparison Table Widget</div>
				<div class="block-widget-description">A returns chart for one publicly traded ticker, asset class or asset sub-category, plus S&P 500 comparison and additional performance metrics.</div>

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
							value={comparasiontable_source}
							onChange={(source) => { setComparasiontableSource(source) }}
							options={comparasiontable_source_arr}
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Monatization type:')}
							value={comparasiontable_monitization_type}
							onChange={(type) => { setComparasiontableMonitizationType(type) }}
							options={[
								{ value: null, label: 'Select Monatization type', disabled: true },
								{ value: 1, label: 'Buy with' },
								{ value: 2, label: 'Graph' },
								{ value: 3, label: 'MoneyBar' },
							]}
						/>
					</div>

					<hr></hr>
					<div class="block-widget-body-elem">
						<div class="blockrb">
							<div>
								<RichText
									autocompleters={autoConfigs}
									value={comparasiontable_ticker1}
									label="Ticker1"
									aria-autocomplete="list"
									onChange={(ticker) => { setTicker1(ticker) }}
									placeholder={__(`Click ${autoConfigs[0].triggerPrefix} to find Ticker1`)}
								/>
							</div>
							<div>
								<Button
									onClick={() => delTicker1()}
									variant="secondary">
									Delete ticker1</Button>
							</div>
						</div>
					</div>
					<hr></hr>
					<div class="block-widget-body-elem">
						<div class="blockrb">
							<div>
								<RichText
									autocompleters={autoConfigs}
									value={comparasiontable_ticker2}
									label="Ticker2"
									aria-autocomplete="list"
									onChange={(ticker) => setTicker2(ticker)}
									placeholder={__(`Click ${autoConfigs[0].triggerPrefix} to find Ticker2`)}
								/>
							</div>
							<div>
								<Button
									onClick={() => delTicker2()}
									variant="secondary">
									Delete ticker2</Button>
							</div>
						</div>
					</div>
					<hr></hr>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Timeframe:')}
							value={comparasiontable_timeframe}
							onChange={(frame) => { setComparasiontableTymeframe(frame) }}
							options={[
								{ value: null, label: 'Select Timeframe', disabled: true },
								{ value: '24H', label: '24 hours' },
								{ value: '7D', label: '7 days' },
								{ value: '30D', label: '30 days' },
								{ value: '1Y', label: '1 year' },
								{ value: '5Y', label: '5 year' },
								{ value: '10Y', label: '10 year' },
							]}
						/>
					</div>
					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={comparasiontable_source_code}
							onChange={(code) => setComparasiontableSourceCode(code)}
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
