/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataMoneybarWidget, getTickerBySymbol, getUserData, getToken, getUserDomains, getPlatformsBySource, getProfiles } from "./api"
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
	const { attributes: { domain, domain_arr, profile, profile_arr, moneybar_source, auth_result, moneybar_source_arr, moneybar_source_code,
		html_to_iframe, moneybar_position, moneybar_platform
	}, setAttributes } = props;


	useEffect(() => {
		if (!window.step_domains) {
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ moneybar_source_arr: empty_sources.slice() }) //individ
					setAttributes({ moneybar_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert	

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ moneybar_source_arr: empty_sources.slice() }) //individ
						setAttributes({ moneybar_source: '' }) //individ		
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
							setAttributes({ moneybar_source_arr: empty_sources.slice() }) //individ
							setAttributes({ moneybar_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert

							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'

							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ moneybar_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;
						if (!moneybar_source) {
							setMoneybarSource(first_source, first_domain)
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
			if (!moneybar_source_arr && window.existing_sources) {
				setAttributes({ moneybar_source_arr: window.existing_sources }) ////individ
			}
			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!moneybar_source && !domain) && (window.first_source && window.first_domain)) {
				setMoneybarSource(window.first_source, window.first_domain)
			}
		}
	})
	function setMoneybarSource(source, domain_first = false) {
		setAttributes({ moneybar_source: source });
		setAttributes({ moneybar_platform: '' });
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
					moneybar_source: source,
					moneybar_position: moneybar_position,
					moneybar_platform: '',
				}
				if (domain_first) {
					send_data.profile = res.first_profile
				} else {
					send_data.profile = profile
				}
				return getDataMoneybarWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ moneybar_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setMoneybarPosition(position) {
		setAttributes({ moneybar_position: position });
		let send_data = {
			moneybar_source: moneybar_source,
			moneybar_position: position,
			moneybar_platform: regSticker(moneybar_platform),
			profile: profile
		}
		getDataMoneybarWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ moneybar_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function regSticker(sticker) {
		if (!sticker) return ''
		let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
		let res_arr = sticker.match(regexp);
		return res_arr[1] ? res_arr[1] : '';
	}

	function setMoneybarSourceCode(code) { //extra capobility
		setAttributes({ moneybar_source_code: code });
	}
	function setPlatform(plat) {
		if (plat.includes('abbr') && regSticker(plat)) {
			setAttributes({ moneybar_platform: plat });
			let send_data = {
				moneybar_source: moneybar_source,
				moneybar_position: moneybar_position,
				moneybar_platform: regSticker(plat),
				profile: profile
			}
			getDataMoneybarWidget(send_data).then(
				res => {
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ moneybar_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}
	function delPlatform() {
		setAttributes({ moneybar_platform: '' });
		let send_data = {
			moneybar_source: moneybar_source,
			moneybar_position: moneybar_position,
			moneybar_platform: '',
			profile: profile
		}
		getDataMoneybarWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ moneybar_source_code: final_code });
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
					moneybar_source: moneybar_source,
					moneybar_position: moneybar_position,
					moneybar_platform: regSticker(moneybar_platform),
					profile: res.first_profile
				}
				return getDataMoneybarWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ moneybar_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			moneybar_source: moneybar_source,
			moneybar_position: moneybar_position,
			moneybar_platform: regSticker(moneybar_platform),
			profile: item
		}
		getDataMoneybarWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ moneybar_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}
	let autoConfigs = [
		{
			name: "Autocomplete",
			triggerPrefix: "/",
			options(search) {
				let payload = moneybar_source;
				if (!moneybar_source) {
					payload = 'REPLACE_WITH_SOURCE';
				}
				return getPlatformsBySource(payload)
			},
			getOptionLabel: option => (
				<span>
					<span className="icon" ><img width="12px" height="12px" src={option.logo}></img></span> {option.name}
				</span>
			),
			// Declares that options should be matched by their name or value
			getOptionKeywords: option => [option.name, option.slug],
			getOptionCompletion: option => (
				<abbr title={option.slug}>{option.name}</abbr>
			),
		}
	];



	return (
		<div {...useBlockProps()}>
			<div class="block-widget">
				<div class="block-widget-title">Money Bar Widget</div>
				<div class="block-widget-description">The MoneyBar is a highly effective widget that rotates our most Premium Partners that pay on a CPC. It can be placed at the top or bottom of your page. You can make this sticky, so it’s always present when a user scrolls. Users can easily close this widget if they’re not interested. Make this site wide for most effective results.</div>

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
							value={moneybar_source}
							onChange={(source) => { setMoneybarSource(source) }}
							options={moneybar_source_arr}
						/>
					</div>

					<hr></hr>
					<div class="blockrb">
						<div>
							<RichText
								autocompleters={autoConfigs}
								value={moneybar_platform}
								label="serach Platform"
								aria-autocomplete="list"
								onChange={(ticker) => setPlatform(ticker)}
								placeholder={__(`Click ${autoConfigs[0].triggerPrefix} to find Platform`)}
							/>
						</div>
						<div>
							<Button
								onClick={() => delPlatform()}
								variant="secondary">
								Delete Platform</Button>
						</div>

					</div>
					<hr></hr>


					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Position:')}
							value={moneybar_position}
							onChange={(ind) => { setMoneybarPosition(ind) }}
							options={[
								{ value: null, label: 'Select Position', disabled: true },
								{ value: 'none', label: 'None' },
								{ value: 'top', label: 'Top' },
								{ value: 'top-fixed', label: 'Top Fixed' },
								{ value: 'bottom', label: 'Bottom' },
								{ value: 'bottom-fixed', label: 'Bottom Fixed' },



							]}
						/>
					</div>


					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={moneybar_source_code}
							onChange={(code) => setMoneybarSourceCode(code)}
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
