/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataInlinedataWidget, getTickerBySymbol, getUserData, getToken, getUserDomains } from "./api"
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
	const { attributes: { inlinedata_data_point, inlinedata_font_size, inlinedata_source, auth_result, inlinedata_source_arr, inlinedata_source_code, inlinedata_ticker, html_to_iframe
	}, setAttributes } = props;
	useEffect(() => {
		if (!window.step_domains) {
			console.log('request user data')
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ inlinedata_source_arr: empty_sources.slice() }) //individ
					setAttributes({ inlinedata_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ inlinedata_source_arr: empty_sources.slice() }) //individ
						setAttributes({ inlinedata_source: '' }) //individ		
						setAttributes({ auth_result: res.message }) //alert

						window.existing_sources = empty_sources.slice()
						window.auth_result = res.message

						return;
					}
					let accessToken = res.AuthenticationResult.AccessToken
					getUserDomains(accessToken).then(res => {
						let sources = res.plans[0].sources;
						if (!sources.length) {
							let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
							setAttributes({ inlinedata_source_arr: empty_sources.slice() }) //individ
							setAttributes({ inlinedata_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert

							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'

							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ inlinedata_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						if (!inlinedata_source) {
							setInlinedataSource(first_source)
						}
						window.existing_sources = existing_sources.slice()
						window.auth_result = 'Authorized'
						window.first_source = first_source
					})
				})
			}
			)
			window.step_domains = 1
		} else {
			if (!inlinedata_source_arr && window.existing_sources) {
				setAttributes({ inlinedata_source_arr: window.existing_sources }) ////individ
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if (!inlinedata_source && window.first_source) {
				setInlinedataSource(window.first_source)
			}
		}
	})
	function setInlineDataPoint(point) {
		setAttributes({ inlinedata_data_point: point });
		let send_data = {
			inlinedata_source: inlinedata_source,
			inlinedata_font_size: inlinedata_font_size,
			inlinedata_data_point: point,
			inlinedata_ticker: regSticker(inlinedata_ticker)
		}
		getDataInlinedataWidget(send_data).then(
			res => {
				console.log(res.final_code)
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ inlinedata_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}
	function setInlineFontSize(size){
		setAttributes({ inlinedata_font_size: size });
		let send_data = {
			inlinedata_source: inlinedata_source,
			inlinedata_font_size: size,
			inlinedata_data_point: inlinedata_data_point,
			inlinedata_ticker: regSticker(inlinedata_ticker)
		}
		getDataInlinedataWidget(send_data).then(
			res => {
				console.log(res.final_code)
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ inlinedata_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}


	function setInlinedataSource(source) {

		setAttributes({ inlinedata_source: source });
		let send_data = {
			inlinedata_source: source,
			inlinedata_font_size: inlinedata_font_size,
			inlinedata_data_point: inlinedata_data_point,
			inlinedata_ticker: regSticker(inlinedata_ticker)
		}
		getDataInlinedataWidget(send_data).then(
			res => {
				console.log(res.final_code)
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ inlinedata_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setInlinedataSourceCode(code) { //extra capobility
		setAttributes({ inlinedata_source_code: code });
	}
	function regSticker(sticker) {
		if (!sticker) return ''
		let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
		let res_arr = sticker.match(regexp);
		return res_arr[1] ? res_arr[1] : '';
	}
	function getTicker(ticker) {
		console.log('tickerr1', ticker)
		if (ticker.includes('abbr') && regSticker(ticker)) {
			setAttributes({ inlinedata_ticker: ticker });
			let send_data = {
				inlinedata_source: inlinedata_source,
				inlinedata_font_size: inlinedata_font_size,
				inlinedata_data_point: inlinedata_data_point,
				inlinedata_ticker: regSticker(ticker)
			}
			getDataInlinedataWidget(send_data).then(
				res => {
					console.log(res.final_code)
					let final_code = res.final_code
					let html_to_iframe = res.html_to_iframe
					setAttributes({ inlinedata_source_code: final_code });
					setAttributes({ html_to_iframe: html_to_iframe })
				}
			)
		}
	}
	function delTicker() {
		setAttributes({ inlinedata_ticker: '' });
		let send_data = {
			inlinedata_source: inlinedata_source,
			inlinedata_font_size: inlinedata_font_size,
			inlinedata_data_point: inlinedata_data_point,
			inlinedata_ticker: ''
		}
		console.log('sdata', send_data)
		getDataInlinedataWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ inlinedata_source_code: final_code });
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
				<div class="block-widget-title">Inline Data Points</div>
				<div class="block-widget-description">A returns chart for one publicly traded ticker, asset class or asset sub-category, plus S&P 500 comparison and additional performance metrics.</div>
		
				<div class="block-widget-body">
					<div class="block-widget-body-elem">
						<div class="title-auth-result">{auth_result}</div>
					</div>
					<div class="block-widget-body-elem moneymade_btn_block">
						<div class="btn_title_moneymade">Select Profile</div>
						<div class="btn_btn_moneymade">
							<a target="_blank" class="btn_monymade" href="https://publisher.moneymade.io/profile/">Create Profile</a>
						</div>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Select Source:')}
							value={inlinedata_source}
							onChange={(source) => { setInlinedataSource(source) }}
							options={inlinedata_source_arr}
						/>
					</div>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Data Point:')}
							value={inlinedata_data_point}
							onChange={(point) => { setInlineDataPoint(point) }}
							options={[
								{ value: null, label: 'Select Data Point', disabled: true },
								{ value: 'market-cap', label: 'Market cap' },
								{ value: 'price', label: 'Price' },
								{ value: 'ytd-return', label: 'YTD return %' },

								{ value: 'todays-return', label: 'Today\'s return %' },
								{ value: 'last-5-trading-days-return', label: 'Last 5 trading days return %' },
								{ value: 'last-52-weeks-return', label: 'Last 52 weeks return %' },
							]}
						/>

					</div>
					<hr></hr>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Font Size:')}
							value={inlinedata_font_size}
							onChange={(size) => { setInlineFontSize(size) }}
							options={[
								{ value: null, label: 'Select Font Size', disabled: true },
								{ value: '12', label: '12' },
								{ value: '14', label: '14' },
								{ value: '16', label: '16' },

								{ value: '18', label: '18' },
								{ value: '20', label: '20' },
								{ value: '22', label: '22' },
							]}
						/>

					</div>



					<hr></hr>
					<div class="block-widget-body-elem">
						<div class="blockrb">
							<div>
								<RichText
									autocompleters={autoConfigs}
									value={inlinedata_ticker}
									label="serach Ticker"
									aria-autocomplete="list"
									onChange={(ticker) => getTicker(ticker)}
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
							value={inlinedata_source_code}
							onChange={(code) => setInlinedataSourceCode(code)}
							disabled="disabled"
						/>
					</div>
					<div class="block-widget-body-elem">
						<FocusableIframe
							width="100%"
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
